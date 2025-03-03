const socket = io();

document.getElementById('chat-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let message = document.getElementById('message-input').value;
    if (message.trim() !== '') {
        socket.emit('message', message);
        document.getElementById('message-input').value = '';
    }
});

socket.on('message', function(msg) {
    let messageElement = document.createElement('div');
    messageElement.textContent = msg;
    document.getElementById('messages').appendChild(messageElement);
});
