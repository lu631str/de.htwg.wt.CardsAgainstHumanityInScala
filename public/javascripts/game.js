function getGamePage(cFunction, last) {
    $.ajax({
        url:"getGamePage",
        type:"GET",
        contentType:"text/plain",
        success: function(data) {cFunction(data, last);}
    })
}

function updateGamePage(data, last) {
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
                if (i === json_data.game.numberOfPlayers-1) {
                    newCard.addEventListener("click", function () {lastCardClicked(cardIndex)});
                } else {
                    newCard.addEventListener("click", function () {cardClicked(cardIndex)});
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

function cardClicked(card) {
    evaluate(card, function () {getPlayedCard(false)});
}

function lastCardClicked(card) {
    evaluate(card, function () {getPlayedCard(true)});
}

function getPlayedCard(last) {
    getGamePage(showPlayedCard, last);
}

function showPlayedCard(data, last) {
    let json_data = $.parseJSON(data);
    //alert(json_data.game.roundAnswerCards[json_data.game.roundAnswerCards.length-1].placedCard);

    let cardstacks = document.querySelectorAll('[class^=played-cardstack]');
    let current_card_index = json_data.game.roundAnswerCards.length-1;
    let i = 0;
    for (let cardstack in cardstacks) {
        if (i === current_card_index) {
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

function nextCard() {
    evaluate("next", function () {getGamePage(updateGamePage,false)});
}

getGamePage(updateGamePage, false);