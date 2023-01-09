document.getElementById("add_name_button").addEventListener("click", addName);
document.getElementById("name_textfield").addEventListener("change", addName);
document.getElementById("start_btn").addEventListener("click", startGame)

var playerNameList = [];
var websocket = new WebSocket("ws://localhost:9000/websocket");
function connectWebSocket() {

    websocket.onopen = function(event) {
        console.log("Connected to Websocket");
    }

    websocket.onclose = function () {
        console.log('Connection with Websocket Closed!');
    };

    websocket.onerror = function (error) {
        console.log('Error in Websocket Occured: ' + error);
    };
}

function addName() {
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
        setTimeout(function() {
            li.className = li.className + " show";
        }, 10);
    }
}

function evaluate(input, cFunction) {
    websocket.send(input);
    cFunction();
}

function startGame() {
    if (playerNameList.length <= 0) {
        alert("You seem to be quite alone, please add some players.");
        return;
    }
    evaluate(playerNameList.length.toString(), startGame2);
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





$(document).ready(function() {
    connectWebSocket()
});