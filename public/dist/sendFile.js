function sendFile(files){
    if (!files || files.length === 0) return;

    const file = files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const buffer = new Uint8Array(e.target.result); // تبدیل به بایت‌ها

        namespaceSocket.emit("upload", { 
            file: Array.from(buffer), // فرستادن به شکل آرایه ساده
            filename: file.name 
        }, (status) => {
            console.log(status); // حالا باید { message: "success" } بیاد
        });
    }

    reader.readAsArrayBuffer(file); // خواندن فایل
}
