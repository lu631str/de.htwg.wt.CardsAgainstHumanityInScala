package controllers

import model.BaseImpl.{AnswerCard, QuestionCard}
import play.api.libs.json.{JsArray, JsBoolean, JsNumber, JsString, Json}
import view.CaHMain
import play.api.mvc._
import play.twirl.api.Html
import view.CaHMain.controller

import javax.inject._

@Singleton
class CahController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {
  val gameController = CaHMain.controller

  def gameState = gameController.getCurrentStateAsString()

  def home = Action {
    Ok(print())
  }

  def about(): Action[AnyContent] = Action {
    Ok(views.html.index())
  }

  def print(): Html = {
    views.html.cah(controller)
  }

  def startGame: Action[AnyContent] = Action {
    Ok(views.html.newGame(controller))
  }

  def gameScreen: Action[AnyContent] = Action {
    Ok(views.html.gameScreen(controller))
  }

  def eval(input: String): Action[AnyContent] = Action {
    gameController.eval(input)
    Ok(gameState)
  }

  def getGamePage(): Action[AnyContent] = Action {

    def jsonOut = Json.obj("game" -> Json.obj(
      "numberOfPlayers" -> JsNumber(gameController.getGameManager().numberOfPlayers),
      "numberOfPlayableRounds" -> JsNumber(gameController.getGameManager().numberOfPlayableRounds),
      "numberOfRounds" -> JsNumber(gameController.getGameManager().numberOfRounds),
      "activePlayer" -> JsNumber(gameController.getGameManager().activePlayer),
      "kompositumCard" -> Json.obj("cardList" -> Json.obj(
        "questionCards" -> JsArray(for (card <- gameController.getGameManager().kompositumCard.cardList if card.isInstanceOf[QuestionCard]) yield
          JsString(card.toString)
        ),
        "answerCards" -> JsArray(for (card <- gameController.getGameManager().kompositumCard.cardList if card.isInstanceOf[AnswerCard]) yield
          JsString(card.toString)
        )
      )),
      "player" -> JsArray(for (dude <- gameController.getGameManager().player) yield Json.obj(
      "name" -> dude.name,
      "state" -> JsBoolean(dude.isAnswering),
      "playerCards" -> JsArray(for (card <- dude.playerCards )yield JsString(card.toString))
    ) ),
    "answerList" -> JsArray(for (card <- gameController.getGameManager().answerList ) yield JsString(card.toString)),
    "questionList" -> JsArray(for (card <- gameController.getGameManager().questionList )yield JsString(card.toString)),
    "roundAnswerCards" -> JsArray(for (mapping <- gameController.getGameManager().roundAnswerCards.toList) yield Json.obj(
      "name" -> mapping._1.name.toString,
      "placedCard" -> mapping._2.toString)
    ),
    "roundQuestion" -> JsString(gameController.getGameManager().roundQuestion)
    ) ).toString()

    Ok(jsonOut)

  }
}

