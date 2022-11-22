
document.getElementById("add_name_button").addEventListener("click", addName);
document.getElementById("name_textfield").addEventListener("change", addName);


function addName() {
    var nameField = document.getElementById("name_textfield")
    var list = document.getElementById("game-name-list")
    var li = document.createElement("li");
    var name = nameField.value;
    if (name != "") {
        nameField.value = "";

        li.appendChild(document.createTextNode(name));
        li.setAttribute("class", "list-group-item");
        list.appendChild(li);
        setTimeout(function() {
            li.className = li.className + " show";
        }, 10);
    }
}