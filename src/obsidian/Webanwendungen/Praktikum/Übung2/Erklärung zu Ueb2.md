## Aufgabe 1 (Spring Boot Projekt Initialisieren)

In Aufgabe1 ging es darum, sich mit Spring Boot und Gradle ausseinanderzusetzen.
Es gibt verschiedene Möglichkeiten, ein Spring Boot Projekt mit hilfe von Gradle aufzusetzen.

####  Spring Boot Initializr
Über die Website https://start.spring.io/, kann man sich mit wenigen Klicks ein fertiges Gradle Projekt *mit Dependencies* anfertigen lassen.

![[Pasted image 20220421121544.png]]

Unser Prof hat uns empfohlen bzw. für die Hochschulprojekte verpflichtet zu verwenden:
- Spring Boot 2.6.6
- Gradle
- Java 17


#### VS-Code

In VS-Code, wenn die benötigten Komponenten installiert sind. Dazu gehören:
- Spring Boot Extension Pack
- Java Extension Pack

Kann man kinderleicht mit ``Strg+Shift+P`` ein neues Spring Boot Projekt anlegen.
Man wird durch die einzelnen Fragen nacheinander abgefragt, wie z.b welche Spring Boot version, welche Java version, welche Dependencies

![[Pasted image 20220421122120.png]]


#### Intelliji

Selbsterklärend
![[Bildschirmfoto 2022-04-21 um 16.46.00.png]]

#### Wichtige Infos (Bugs)
Wichtig ist, dass der JAVA_HOME Path auf die selbe Version gesetzt ist, wie die, die man auf seinem Computer verwendet. 

Unter Windows findet man die JAVA_HOME Variable, wenn man nach den Umgebungsvariablen sucht:

![[Pasted image 20220421122259.png]]

![[Pasted image 20220421122306.png]]

Bei MAC, muss man bei dem jeweiligen Editor den Pfad der Java Version angeben

-- bei mac screenshot machen


#### Gradle 

Wenn man ein Projekt mit Gradle aufsetzt, muss man sich nicht mehr um die dependency verwaltung kümmern. Das übernimmt gradle selbst.

d.h Gradle guckt welche dependencys für dein Projekt gebraucht werden und lädt diese selbst herunter auf der optimierten Softwareversion. 

Gradle kann aus deinem Projekt eine ausführbare JAR erstellen.

Ansonsten baut gradle auf groovy auf.

Fazit: Macht das leben leichter.


## Aufgabe 2 (Spring Boot Projekt)

Bei Aufgabe2 soll man einen einfachen Controller schreiben, welcher GET Input validieren kann und mit POST den Input an den Browser zurückgibt.

Das Projekt auf GitHub: https://github.com/Erinachi/ueb2

---
Für diese Aufgabe sollte der Body-Spaß-Index berechnet werden. 
D.h es gab 3 Inputs (als Integer) und diese sollten mit der Formel 

![[Pasted image 20220421122830.png]]

berechnet werden und zurück an den User gegeben werden.

![[Pasted image 20220421122955.png]]

In Spring Boot kommen die Klassen in das kreierte Package.

Static-Elemente wie z.b Stylesheets kommen in den Unterorder ```resources/static```

Die Template-Files (Also HTML Dateien) kommen in den Unterordner ```resources/template```


#### Beispiel für das Projekt
- main
	- java/tech/erina/web/ueb2/
		- BSIController.java
		- BSIRechner.java
		- Ueb2Application.java (Main Method)
-  resources
	-  static
		-  css
			-  stylesheet.css
	- templates
		- bsi.html
		- error.html

#### Die Main Methode (Ueb2Application.java) 

```java
package tech.erina.web.ueb2;

import java.util.Properties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.handler.SimpleMappingExceptionResolver;

@SpringBootApplication
public class Ueb2Application {

    // Bei Fehlern auf error.html weiterleiten...

    @Configuration
    public class MvcConfiguration {

        @Bean(name = "simpleMappingExceptionResolver")
        public SimpleMappingExceptionResolver createSimpleMappingExceptionResolver() {

            SimpleMappingExceptionResolver r = new SimpleMappingExceptionResolver();
            Properties mappings = new Properties();
            mappings.setProperty("DatabaseException", "databaseError");
            mappings.setProperty("InvalidCreditCardException", "creditCardError");

  
            r.setExceptionMappings(mappings); // None by default
            r.setDefaultErrorView("error"); // No default
            r.setExceptionAttribute("ex"); // Default is "exception"
            r.setWarnLogCategory("example.MvcLogger"); // No default

            return r;

        }
    }

  
    public static void main(String[] args) {

        SpringApplication.run(Ueb2Application.class, args);

    }

}
```

##### Main

##### Configuration (ExceptionHandling)
Zusätzlich für das Projekt, habe ich mir angeschaut, wie exception Handling in Spring Boot gehandhabt wird.

Es gibt mehrere verschiedene Ansätze. Serverseitig auf der Code ebene, sowie in XML oder halt client side. 
Mehr dazu: https://www.baeldung.com/exception-handling-for-rest-with-spring

Für meinen Zweck habe ich den ```simpleMappingExceptionResolver``` benutzt. 

##### Java-Beans Recourse
Was sind Java Beans?

##### simpleMappingExceptionResolver

Der funktioniert so bla bla



