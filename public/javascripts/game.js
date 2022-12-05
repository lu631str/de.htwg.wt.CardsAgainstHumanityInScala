


function getPlayerName(input) {
    $.ajax({
        url:"getPlayerName/"+input,
        type:"GET",
        contentType:"text/plain",
    })
}

