
const app = Vue.createApp({
})

app.component('about-card', {
    template:`<div class="card card-body bg-dark">
          <div class="accordion accordion-flush" id="accordion1">
            <div class="accordion-item">
              <h2 class="accordion-header" id="flush-headingOne">
                <button class="accordion-button collapsed bg-dark text-white" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                  About Cards Against Humanity
                </button>
              </h2>
              <div id="flush-collapseOne" class="accordion-collapse collapse bg-dark" aria-labelledby="flush-headingOne" data-bs-parent="#accordion1">
                <div class="accordion-body text-white">
                  Cards Against Humanity is an adult party game in which players complete fill-in-the-blank statements using words or phrases typically deemed offensive, risqué or politically incorrect printed on playing cards.
                  <br />
                  <img class="rounded mx-auto d-block img-fluid" src="/assets/images/cards.png">
                </div>
              </div>
            </div>
          </div>
        </div>                
    `,
    data: function () {
        return {
        }
    },
})

app.component('history-card', {
    template:` <div class="card card-body bg-dark">
          <div class="accordion accordion-flush" id="accordionTwo">
            <div class="accordion-item">
              <h2 class="accordion-header" id="flush-headingTwo">
                <button class="accordion-button collapsed bg-dark text-white" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                  History
                </button>
              </h2>
              <div id="flush-collapseTwo" class="accordion-collapse collapse bg-dark" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionTwo">
                <div class="accordion-body text-white">
                  A popular card game for all, Cards Against Humanity has been played sober, drunk, on the floors of hotel rooms, and during birthdays since it’s inception in 2011.
                  On the official website, the creators call it a “party game for horrible people”.
                  So how did this infamous card game come to be? Well, let’s find out as we dive into the history of Cards Against Humanity.
                  The game was first financed on Kickstarter, with a crowdfunding campaign that reached just over $15,000 when it ended on 30th January 2011.
                  The founders surpassed their Kickstarter goals which allowed the Highland Park High School Alumni team that developed the game to add another 50 cards to the set.
                </div>
              </div>
            </div>
          </div>
        </div>           
    `,
    data: function () {
        return {
        }
    },
})

app.component('objective-card', {
    template:`         <div class="card card-body bg-dark">
          <h5 class="card-title text-white" ><i class="fas fa-flag-checkered me-2 " ></i>Objective</h5>
          <li class="accordion-body text-white">Try to be as horrible as you can!</li>
          <li class="accordion-body text-white">Don't take it serios or personal it's just a game </li>
          <li class="accordion-body text-white">Have fun!</li>
        </div> 
    `,
    data: function () {
        return {
        }
    },
})

app.component('how-to-play-card', {
    template:`        <div class="card mt-3 card-body bg-dark ">
          <h5 class="card-title text-white"><i class="fas fa-gamepad me-2"></i>How to Play</h5>
          <p class="card-text">
            <table class="table">
              <thead>
                <tr>
                  <td><b class="text-white">Route</b></td>
                  <td><b class="text-white">Info</b></td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="text-white">/</td>
                  <td class="text-white">Renders the current game.</td>
                </tr>
                <tr>
                  <td class="text-white">/about</td>
                  <td class="text-white">Gives you information about the game.</td>
                </tr>
                <tr>
                  <td class="text-white">/new</td>
                  <td class="text-white">Creates a new game.</td>
                </tr>
                <tr>
                  <td class="text-white">/eval/:input</td>
                  <td class="text-white">processing input</td>
                </tr>
              </tbody>
            </table>
          </p>
        </div>
    `,
    data: function () {
        return {
        }
    },
})

app.component('rules-card', {
    template:`        <div class="card card-body bg-dark">
          <h5 class="card-title text-white"><i class="fas fa-exclamation-circle me-2"></i>Rules</h5>
          <p class="card-text bg-dark ">
            <ul class="list-group bg-dark">
              <li class="list-group-item text-white bg-dark">
                One randomly chosen player begins as the Card Czar and plays a Black Card. The Card Czar reads the question or fill-in-the-blank phrase on the Black Card out loud.
              </li>
              <li class="list-group-item text-white bg-dark">
                The Card Czar shuffles all of the answers and shares each card combination with the group. For full effect, the Card Czar should usually re-read the Black Card before presenting each answer.
              </li>
              <li class="list-group-item text-white bg-dark">
                The Card Czar then picks a favorite, and whoever played that answer keeps the Black Card as one Awesome Point.
                After the round, a new player becomes the Card Czar and everyone draws back up to ten White Cards.
                <div id="cah-carousel" class="carousel slide" data-bs-ride="carousel">
                  <div class="carousel-indicators">
                    <button type="button" data-bs-target="#cah-carousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#cah-carousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#cah-carousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    <button type="button" data-bs-target="#cah-carousel" data-bs-slide-to="3" aria-label="Slide 4"></button>
                  </div>
                  <div class="carousel-inner" align="center" style="background-color: lightgray">
                    <div class="carousel-item active">
                      <img class="img-fluid d-block w-75 rounded"  src="/assets/images/1.png">
                      <div class="carousel-caption d-none d-md-block">
                        <h5>select player number </h5>
                      </div>
                    </div>
                    <div class="carousel-item">
                      <img class="img-fluid d-block w-75 rounded" src="/assets/images/2.png">
                      <div class="carousel-caption d-none d-md-block">
                        <h5 class="text-black">add own cards</h5>
                      </div>
                    </div>
                    <div class="carousel-item">
                      <img class="img-fluid d-block w-75 rounded" src="/assets/images/3.png">
                      <div class="carousel-caption d-none d-md-block">
                        <h5 class="text-black">add player names</h5>
                      </div>
                    </div>
                    <div class="carousel-item">
                      <img class="img-fluid d-block w-75 rounded" src="/assets/images/4.png">
                      <div class="carousel-caption d-none d-md-block">
                        <h5>play!</h5>
                      </div>
                    </div>
                  </div>
                  <button class="carousel-control-prev" type="button" data-bs-target="#cah-carousel" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                  </button>
                  <button class="carousel-control-next" type="button" data-bs-target="#cah-carousel" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                  </button>
                </div>
              </li>
              <li class="list-group-item text-white bg-dark">
                If a Black Card is played and you have more than one White Card that you think could win, you can bet one of your Awesome Points to play one additional White Card.
                If you win, you keep your point. If you lose, whoever wins the round gets the point you wagered.
              </li>
              <li class="list-group-item text-white bg-dark">
                At any time, players may discard cards that they don't understand, but they must confess their ignorance to the group and suffer the resulting humiliation.
              </li>
            </ul>
          </p>
        </div>
    `,
    data: function () {
        return {
        }
    },
})

app.mount('#index')



