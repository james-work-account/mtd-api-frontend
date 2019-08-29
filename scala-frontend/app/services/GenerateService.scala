package services

import com.google.inject.{ImplementedBy, Inject}
import connectors.GenerateConnector
import models.FullUserDetails

import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global

@ImplementedBy(classOf[GenerateServiceImpl])
trait GenerateService {
  def generate: Future[GenerateUserDetailsOutcome]
}

class GenerateServiceImpl @Inject()(connector: GenerateConnector) extends GenerateService {
  override def generate: Future[GenerateUserDetailsOutcome] = {
    for {
      user <- connector.generateUser("individuals")
      oauthToken <- connector.grantAccess(user.userId, user.password)
      accessToken <- connector.requestAccessToken(oauthToken)
    } yield {
      FullUserDetails(vrn = user.vrn, nino = user.nino, Authorization = accessToken)
    }
  }
}
