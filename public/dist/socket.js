
const socket = io("http://localhost:3000");
let namespaceSocket;

function stringToHTML(str) {
    const parser = new DOMParser()
    const doc = parser.parseFromString(str, "text/html")
    return doc.body.firstChild
}




function initNamespaceConnection(endpoint) {
    if (namespaceSocket) namespaceSocket.close()
    namespaceSocket = io(`http://localhost:3000/${endpoint}`)
    namespaceSocket.on("connect", () => {
        namespaceSocket.on("roomList", rooms => {
            getRoomInfo(endpoint, rooms[0]?.name)
            const roomsElement = document.querySelector("#contacts ul")
            roomsElement.innerHTML = ""
            for (const room of rooms) {
                const html = stringToHTML(`
                <li class="contact" roomName="${room.name}">
                    <div class="wrap">
                        <img src="${room.image}" height="40"/>
                        <div class="meta">
                            <p class="name">${room.name}</p>
                            <p class="preview" >${room.description}</p>
                        </div>
                    </div>
                </li>`)
                roomsElement.appendChild(html)
            }
            const roomNode = document.querySelectorAll("ul li.contact")
            for (const room of roomNode) {
                room.addEventListener("click", () => {
                    const roomName = room.getAttribute("roomName")
                    getRoomInfo(endpoint, roomName)
                })
            }
        })
    })
}




function getRoomInfo(endpoint, roomName) {
    document.querySelector("#roomName h3").setAttribute("roomName", roomName)
    document.querySelector("#roomName h3").setAttribute("endpoint", endpoint)
    namespaceSocket.emit("joinRoom", roomName)
    namespaceSocket.off("roomInfo")
    namespaceSocket.on("roomInfo", (roomInfo) => {
        document.querySelector(".messages ul").innerHTML = ""
        document.querySelector("#roomName h3").innerText = roomInfo.description
        const messages = roomInfo.messages;
        const locations = roomInfo.locations;
        const data=[...messages,...locations].sort((con1,con2)=>{con1.dateTime-con2.dateTime})
        console.log(data);
        const userID = document.getElementById("userID").value;
        for (const message of messages) {
            const li = stringToHTML(`
                <li class="${(userID === message.sender)? 'sent' : 'replies'}">
                    <img src="https://media-exp1.licdn.com/dms/image/C5603AQE3g9gHNfxGrQ/profile-displayphoto-shrink_200_200/0/1645507738281?e=1659571200&v=beta&t=wtwELdT1gp6ICp3UigC2EgutGAQgDP2sZKUx0mjCTwI"
                        alt="" />
                    <p>${message.message}</p>
                </li>   
            `)
            document.querySelector(".messages ul").appendChild(li)
        }
    })
    namespaceSocket.on("countOfOnlineUsers", count => {
        document.getElementById("onlineCount").innerText = count
    })
}





function sendMessage() {
    const roomName = document.querySelector("#roomName h3").getAttribute("roomName")
    const endpoint = document.querySelector("#roomName h3").getAttribute("endpoint")
    let message = document.querySelector(".message-input input#messageInput").value;
    if (message.trim() == "") {
        alert("input message can not be empty")
        return
    }

    const userID = document.getElementById("userID").value
    namespaceSocket.emit("newMessage", { message, roomName, endpoint, sender: userID })
    namespaceSocket.on("confirm", data => {
        console.log(data);
    })


    namespaceSocket.off("confirmMessage")
    namespaceSocket.on("confirmMessage", data => {
        const li = stringToHTML(`
            <li class="${(userID === data.sender) ? "sent" : 'replies'}">
                <img src="https://example.com/profile.jpg" alt="" />
                <p>${data.message}</p>
            </li>
        `);
        document.querySelector(".messages ul").appendChild(li)
        document.querySelector(".message-input input#messageInput").value = ""
        const messagesElement = document.querySelector("div.messages");
        messagesElement.scrollTo(0, messagesElement.scrollHeight);
    })


}









socket.on("connect", () => {
    socket.on("namespaceList", namespaceList => {
        const namespaceElement = document.getElementById("namespaces")
        initNamespaceConnection(namespaceList[0].endpoint)
        namespaceElement.innerHTML = ""
        for (const namespace of namespaceList) {
            const li = document.createElement("li");
            const p = document.createElement("p")
            p.setAttribute("class", "namespaceTitle")
            p.setAttribute("endpoint", namespace.endpoint)
            p.innerText = namespace.title
            li.appendChild(p)
            namespaceElement.appendChild(li)
        }

        const namespaceNode = document.querySelectorAll("#namespaces li p.namespaceTitle")
        for (const namespace of namespaceNode) {
            namespace.addEventListener("click", () => {
                const endpoint = namespace.getAttribute("endpoint")
                initNamespaceConnection(endpoint)
            })
        }
    })

    window.addEventListener("keydown", (e) => {
        if (e.code === "Enter") {
            sendMessage();
        }
    })
    document.querySelector("button.submit").addEventListener("click", () => {
        sendMessage()
    })


})



