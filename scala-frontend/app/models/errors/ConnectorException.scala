package models.errors

case class ConnectorException(msg: String, err: Throwable) extends Exception(msg, err)
