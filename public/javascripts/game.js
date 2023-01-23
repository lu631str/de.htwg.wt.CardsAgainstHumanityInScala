const app = Vue.createApp({})


app.component('cah-field', {
    template: `            <div class="container align-items-center"><h1 id="current-question">loading...</h1></div>
            <div class="row">
                <div class="col align-items-center">
                    <div class='played-cardstack'>
                    </div>
                    <p class="game-subtitle"  id="player">player 1</p>
                    <div class='cardstack'>
                    </div>
                </div>
                <div class="col align-items-center">
                    <div class='played-cardstack'>
                    </div>
                    <p class="game-subtitle" id="player">player 2</p>
                    <div class='cardstack'>
                    </div>
                </div>
            </div>
    `,
    data: function () {

        return {}
    },
})

var websocket = new WebSocket("ws://localhost:9000/websocket");
var data;
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

    websocket.onmessage = function (e) {
        if (typeof e.data === "string") {
            updateData(e.data)
        }

    };
}

function evaluate(input, cFunction) {
    websocket.send(input);
    cFunction();
}

function evaluate2(input) {
    websocket.send(input);
}

function updateGameData() {
    websocket.send("update");
}


function loadJson(cFunction, last) {
    $.ajax({
        url:"loadJson",
        type:"GET",
        contentType:"text/plain",
        success: function(data) {cFunction(data, last);}
    })
}
function updateData(input) {
   data = input;
    updateGamePage(data)
}

function useUpdatedData(cFunction, last) {
  cFunction(data, last)
}



function updateGamePage(data, last) {
    if(data !== undefined) {
        let json_data = $.parseJSON(data);
        document.getElementById('current-question').innerHTML = json_data.game.roundQuestion;

        let playerTitles = document.querySelectorAll('[id^=player]');
        let i = 0;
        for (let player in playerTitles) {
            playerTitles[player].innerHTML = json_data.game.player[i].name;
            if (i === json_data.game.activePlayer) {
                playerTitles[player].classList.add("game-subtitle");
                playerTitles[player].classList.remove("game-subtitle-dark");
            } else {
                playerTitles[player].classList.add("game-subtitle-dark");
                playerTitles[player].classList.remove("game-subtitle");
            }
            i++;
            if (i >= json_data.game.numberOfPlayers) {
                break;
            }
        }

        let cardstacks = document.querySelectorAll('[class^=cardstack]');
        i = 0;
        for (let cardstack in cardstacks) {
            cardstacks[cardstack].innerHTML = "";
            for (let cardIndex = 0; cardIndex < json_data.game.player[i].playerCards.length; cardIndex++) {
                let newCard = document.createElement("div");
                newCard.id = cardIndex.toString();
                if (i === json_data.game.activePlayer) {
                    if (i === json_data.game.numberOfPlayers - 1) {
                        newCard.addEventListener("click", function () {
                            evaluate2(cardIndex);
                            setTimeout(function(){ showPlayedCard(this.data,true);}, 2000);
                            console.log("lastCardClicked")
                        });
                    } else {
                        newCard.addEventListener("click", function () {
                            evaluate2(cardIndex);
                            setTimeout(function(){ showPlayedCard(this.data,false);}, 2000);
                            console.log("CardClicked")
                        });
                    }
                }
                newCard.classList.add("light");
                newCard.classList.add("stackcard");
                let newCardContent = document.createElement("ul");
                newCardContent.classList.add("cardtext");
                newCardContent.classList.add("menu");
                let newCardContentLi = document.createElement("li");
                newCardContentLi.innerHTML = json_data.game.player[i].playerCards[cardIndex];
                newCardContent.append(newCardContentLi);
                newCard.append(newCardContent);
                cardstacks[cardstack].append(newCard);
            }
            i++;
            if (i >= json_data.game.numberOfPlayers) {
                break;
            }
        }
    }

}

function showPlayedCard(data, last) {
    if(data !== undefined) {
        let json_data = $.parseJSON(data);
        //alert(json_data.game.roundAnswerCards[json_data.game.roundAnswerCards.length-1].placedCard);

        let cardstacks = document.querySelectorAll('[class^=played-cardstack]');
        let current_card_index = json_data.game.roundAnswerCards.length - 1;
        let i = 0;
        console.log(current_card_index)
        for (let cardstack in cardstacks) {
            if (i === current_card_index) {
                console.log("showPlayedCardnooooow")

                let newCard = document.createElement("div");
                newCard.classList.add("dark");
                newCard.classList.add("played-stackcard");
                let newCardContent = document.createElement("ul");
                newCardContent.classList.add("cardtext");
                newCardContent.classList.add("menu");
                let newCardContentLi = document.createElement("li");
                newCardContentLi.innerHTML = json_data.game.roundAnswerCards[i].placedCard;
                newCardContent.append(newCardContentLi);
                newCard.append(newCardContent);
                cardstacks[cardstack].append(newCard);
            }

            i++;
            if (i >= json_data.game.numberOfPlayers) {
                break;
            }
        }

        if (last) {
            nextCard();
        } else {
            updateGamePage(data, last);
        }
    }
}

function nextCard() {
    evaluate("next", function () {useUpdatedData(updateGamePage,false)});
}
$(document).ready(function() {
    connectWebSocket()
    setTimeout(function(){ loadJson(updateGamePage, false);}, 1000);
    setTimeout(function(){ updateGameData();}, 2000);
    setTimeout(function(){ console.log(data)}, 3000);
});


app.mount('#game')