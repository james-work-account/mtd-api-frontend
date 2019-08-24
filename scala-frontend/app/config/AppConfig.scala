package config

import javax.inject.{Inject, Singleton}
import play.api.Configuration

@Singleton
class AppConfig @Inject()(config: Configuration) {
  def backendBaseUrl: String = config.getOptional[String]("backend-base-url").getOrElse("")
}
