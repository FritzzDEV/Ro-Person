async function sendMessage() {
    const input = document.getElementById("msg").value;
    const chatBox = document.getElementById("chat");

    chatBox.innerHTML += `<div class="user">You: ${input}</div>`;

    const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: input
        })
    });

    const data = await res.json();

    chatBox.innerHTML += `<div class="bot">Yumika: ${data.reply}</div>`;
}
