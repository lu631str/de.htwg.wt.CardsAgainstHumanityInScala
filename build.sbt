
name := """Cards Against Humanity in Scala for WebTech"""

version := "1.2"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

resolvers += Resolver.sonatypeRepo("snapshots")

scalaVersion := "2.12.7"

libraryDependencies += guice

libraryDependencies += "net.codingwell" %% "scala-guice" % "4.1.0"

libraryDependencies += "org.scalatest" %% "scalatest" % "3.0.4" % "test"

libraryDependencies += "org.scalatestplus.play" %% "scalatestplus-play" % "3.1.2" % Test

libraryDependencies += "org.scala-lang.modules" %% "scala-xml" % "1.1.0"

libraryDependencies += "com.h2database" % "h2" % "1.4.196"

libraryDependencies += "org.scala-lang.modules" % "scala-swing_2.12" % "2.0.3"

libraryDependencies += "ch.qos.logback" % "logback-classic" % "1.2.3"

libraryDependencies += "com.typesafe.scala-logging" %% "scala-logging" % "3.7.2"


libraryDependencies += "javax.xml.bind" % "jaxb-api" % "2.1"
