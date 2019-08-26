package models.errors

case class ConnectorError(msg: String, err: Throwable) extends Throwable
