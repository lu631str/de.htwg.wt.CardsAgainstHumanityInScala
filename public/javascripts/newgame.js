document.getElementById("add_name_button").addEventListener("click", addName);
document.getElementById("name_textfield").addEventListener("change", addName);
document.getElementById("start_btn").addEventListener("click", startGame)

var playerNameList = [];

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
  $.ajax({
    url:"eval/"+input,
    type:"POST",
    contentType:"text/plain",
    success: function() {cFunction();}
  })
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
    }
}