
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
        document.querySelector("#roomName h3").innerText = roomInfo.description
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
    namespaceSocket.emit("newMessage", { message, roomName, endpoint })
    namespaceSocket.on("confirm", data => {
        console.log(data);
    })

    const li = stringToHTML(`
        <li class="sent">
            <img src="https://example.com/profile.jpg" alt="" />
            <p>${message}</p>
        </li>
    `);
    document.querySelector(".messages ul").appendChild(li)
    document.querySelector(".message-input input #messageInput").value = ""
    const messagesElement = document.querySelector("div.messages");
    messagesElement.scrollTo(0, messagesElement.scrollHeight);

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



