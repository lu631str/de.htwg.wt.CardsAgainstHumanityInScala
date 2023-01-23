const app = Vue.createApp({})

app.component('game-title', {
    template: `<div class="d-flex justify-content-center">
            <h1 class="game-title">Cards Against Humanity</h1>
        </div>   
    `,
    data: function () {

        return {}
    },
})

app.component('player-add', {
    methods: {
        addName() {
            var nameField = document.getElementById("name_textfield")
            var list = document.getElementById("game-name-list")
            var li = document.createElement("li");
            var name = nameField.value;
            if (name != "") {
                playerNameList.push(name);
                nameField.value = "";

                li.appendChild(document.createTextNode(name));
                li.setAttribute("class", "list-group-item");
                list.appendChild(li);
                setTimeout(function () {
                    li.className = li.className + " show";
                }, 10);
            }
        },
        startGame() {
            if (playerNameList.length <= 0) {
                alert("You seem to be quite alone, please add some players.");
                return;
            }
            evaluate(playerNameList.length.toString(), startGame2);
        },

    },
    template: `<div class="d-flex justify-content-center">
            <p class="game-subtitle">Please enter your names:</p>
        </div>

        <div class="d-flex justify-content-center input-group mb-3 game-name-list-width">
            <button class="btn btn-outline-secondary" type="button" id="add_name_button" v-on:click="addName" >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  class="bi bi-plus-lg" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                </svg>
            </button>
            <input type="text" class="form-control" placeholder="" id="name_textfield" v-on:change="addName">
        </div>

        <div class="d-flex justify-content-center">
            <ul class="list-group game-name-list-width game-name-list" id="game-name-list">
            </ul>
        </div>

        <form class="d-flex justify-content-center">
            <button type="button" class="start-btn" id="start_btn" v-on:click="startGame">set</button>
        </form>
    `,
    data: function () {
        return {}
    },
})


var playerNameList = [];
var websocket = new WebSocket("ws://localhost:9000/websocket");


function connectWebSocket() {

    websocket.onopen = function (event) {
        console.log("Connected to Websocket");
    }

    websocket.onclose = function () {
        console.log('Connection with Websocket Closed!');
    };

    websocket.onerror = function (error) {
        console.log('Error in Websocket Occured: ' + error);
    };
}

function evaluate(input, cFunction) {
    websocket.send(input);
    cFunction();
}

function startGame2() {
    evaluate("weiter", startGame3);
}

function startGame3() {
    if (playerNameList.length > 0) {
        evaluate(playerNameList.pop(), startGame3);
    } else {
        $(location).prop('href', '/gameScreen');
        websocket.close()
    }
}


$(document).ready(function () {
    connectWebSocket()
});

app.mount('#newGame')