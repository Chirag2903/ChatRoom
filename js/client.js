const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageinput');
const messagecontainer = document.querySelector(".container");
const namecontainer = document.querySelector(".name-container");

var audio = new Audio('mixkit-positive-notification-951.wav');

const append = (message, position) => {
    const messageelement = document.createElement('div');
    messageelement.innerText = message;
    messageelement.classList.add('message')
    messageelement.classList.add(position)
    messagecontainer.append(messageelement);
    if (position == 'left') {
        audio.play();
    }
}
const nameappend = (message, position) => {
    const nameelement = document.createElement('div');
    nameelement.innerText = message;
    nameelement.classList.add('names')
    nameelement.classList.add(position)
    namecontainer.append(nameelement);
}


const removeNameElement = (name) => {
    const elements = document.querySelectorAll('.names.left');
    elements.forEach(element => {
        if (element.innerText === name) {
            element.remove();
        }
    });
}


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You:${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
}
)
const nam = prompt("Enter your name to join");
socket.emit('new-user-joined', nam)

socket.on('user-joined', nam => {
    if (nam) {
        append(`${nam} joined the chat`, 'right')
        nameappend(`${nam}`, 'left')
    }
})


socket.on('receive', data => {
    append(`${data.nam}:${data.message}`, 'left')
})
socket.on('left', nam => {
    if (nam) {
        append(`${nam}:left the chat`, 'left')
        removeNameElement(nam);
    }
})
