package controllers

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


  def startGame = Action {
    Ok(gameState)
  }

  def eval(input: String) = Action {
    gameController.eval(input)
    Ok(gameState)
  }
}

