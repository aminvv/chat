
const socket = io("http://localhost:3000");


socket.on("connect", () => {
    socket.on("namespaceList", namespaceList => {
        const namespaceElement = document.getElementById("namespaces")
           namespaceElement.innerHTML = ""
         for (const namespace of namespaceList) {
            const li = document.createElement("li");
            const p = document.createElement("p")
            p.innerText = namespace.title
            li.appendChild(p)
            namespaceElement . appendChild(li)
        }
    })
})   