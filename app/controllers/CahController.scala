package controllers

import view.CaHMain
import play.api.mvc._

import javax.inject._

@Singleton
class CahController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {
  val gameController = CaHMain.controller
  def gameState =  gameController.getCurrentStateAsString()

  def home= Action {
    Ok(views.html.index())
  }

  def rules= Action {
    Ok(views.html.rules())
  }

  def start = Action {
    Ok(gameState)
  }

  def eval(input: String) = Action {
    gameController.eval(input)
    Ok(gameState)
  }

  def allRoutes = {
    """
    GET  /
    GET  / rules
    GET  / start
    POST  / eval
    """
  }
}





