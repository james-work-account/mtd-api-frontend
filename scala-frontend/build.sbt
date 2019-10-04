name := "ScalaFrontend"
 
version := "1.0" 
      
lazy val `scalafrontend` = (project in file(".")).enablePlugins(PlayScala)

resolvers += "scalaz-bintray" at "https://dl.bintray.com/scalaz/releases"
      
resolvers += "Akka Snapshot Repository" at "https://repo.akka.io/snapshots/"
      
scalaVersion := "2.12.2"

libraryDependencies ++= Seq( jdbc , caffeine , ws , specs2 % Test , guice )

libraryDependencies += "org.jsoup" % "jsoup" % "1.12.1"

unmanagedResourceDirectories in Test +=  baseDirectory ( _ /"target/web/public/test" ).value

      