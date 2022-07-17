# 📅 Semesterplaner (SPAsS)

## Über

Bei dem Projekt handelt es sich um einen inviduellen interaktiven Studienplaner **(Kurz SPAsS)**, für Studenten der Hochschule Rhein Main. In diesem Tool soll es möglich sein, für den eigenen Studienverlauf einen Plan zu generieren,  
der bestandene Module, Fortschrittsregelung und fachliche Abhängigkeiten berücksichtigt.

## Use Cases
- Benutzer kann einen eigenen Semesterplan für seinen Studiengang anlegen.
- Möglichkeit vorgebene Module zu verändern, hinzuzufügen oder zu Löschen.
- Aus den Studienabhängigen Modulen soll es möglich sein, sich einen Semesterplan zu erstellen.
- Das Eintragen von Noten soll möglich sein.
- Eine Notenschnitt Prognose für das aktuelle Semester soll (wenn gewünscht) möglich sein.
- Es soll möglich sein, Modulabhängigkeiten direkt einzusehen.
- Berstandene Module kann der User markieren.

## Ziele
- Eine ==grafische Benutzungsoberfläche,== die Drag & Drop bearbeitung ermöglicht.
 - In dieser Benutzungsoberfläche sollen enthalten sein:
	 - Übersicht über den Studienfortschritt (Nicht-/bestandene Module farblich unterlegt) sowie höhere Semester direkt sichtbar.
	 - Mögliche Abhängigkeiten der Module sollen per Knopfdruck einsehbar sein.
	 - Zu jedem Modul sollen außerdem Informationen gespeichert sein, wie beispielsweise der Dozent, Raum, Fehlversuche und die Note. 
	 - Der aktuelle Notenschnitt soll ausgegeben werden. 
	- Eine Wunschnotenschnitt soll eingetragen werden können, dann werden zu den aktuell belegten Modulen Noten berechnet, welche erreicht werden müssen, um auf diesen Wunschschnitt zu kommen.
- Ausgabe eines fertigen Semesterplans als PDF

## Rahmenbedingungen

-   Gradle Projekt
-   Java 17
-   Ausführbar als JAR Datei
-   Muss Linux unterstützen

## Architekturüberblick

![mindmap](https://i.imgur.com/dK819Qh.png)