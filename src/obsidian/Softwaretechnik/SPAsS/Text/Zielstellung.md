# Studienplaner (SPAsS)

## Inhaltsverzeichnis

1. [Projektgrundlagen](#Projektgrundlagen)
	1. [Einführung](#Einführung)
	2. [Ziele](#Ziele)
	3. [Rahmenbedingungen](#Rahmenbedingungen)
		1. [Anforderungen an die Benutzungsoberfläche](#Anforderungen+an+die+Benutzungsoberfläche)
		2. [Technologische Anforderungen](#Technologische+Anforderungen)
			1. [Software](#Software)
			2. [Hardware](#Hardware)
			3. [Qualitätsanforderungen](#Qualitätsanforderungen)
2. [Abläufe und Funktionen](#Abläufe+und+Funktionen)
	1. [Anwendungsfälle](#Anwendungsfälle)
		1. [Semesterplan erstellen](#Semesterplan+erstellen)
		2. [Modulauswahl](#Modulauswahl)
		3. [Modulanpassung](#Modulanpassung)
		4. [Modulmanagement](#Modulmanagement)
		5. [Modulabhängigkeiten anzeigen](#Modulabhängigkeiten+anzeigen)
		6. [Noten eintragen](#Noten+eintragen)
		7. [Notenschnitt Prognose](#Notenschnitt+Prognose)
	2. [Benutzer Anwendungsszenario](#Benutzer+Anwendungsszenario)
		1. [User Story Noten Eintragen](#User+Story+Noten+Eintragen)
		2. [Märchen vom User](#Märchen+vom+User)
		3. [Modulabhängigkeiten anzeigen](#Modulabhängigkeiten+anzeigen)
3. [Benutzungsschnittstelle](#Benutzungsschnittstelle)
4. [Domänenmodell](#Domänenmodell)
5. [Glossar](#Glossar)

<div style="page-break-after: always;"></div>

# Projektgrundlagen

## Einführung
Bei dem Projekt handelt es sich um einen inviduellen interaktiven Studienplaner **(Kurz SPAsS)**, für Studenten der Hochschule Rhein Main. In diesem Tool soll es möglich sein, für den eigenen Studienverlauf einen Plan zu generieren, 
der bestandene Module, Fortschrittsregelung und fachliche Abhängigkeiten berücksichtigt.

## Ziele
- Eine ==grafische Benutzungsoberfläche,== die Drag & Drop bearbeitung ermöglicht.
	- Einheitliches Stylesheet / Design
 - In dieser Benutzungsoberfläche sollen enthalten sein:
	 - Übersicht über den Studienfortschritt (Nicht-/bestandene Module farblich unterlegt) sowie höhere Semester direkt sichtbar.
	 - Mögliche Abhängigkeiten der Module sollen per Knopfdruck einsehbar sein.
	 - Zu jedem Modul sollen außerdem Informationen gespeichert sein, wie beispielsweise der Dozent, Raum, Fehlversuche und die Note. 
	 - Der aktuelle Notenschnitt soll ausgegeben werden. 
	- Eine Wunschnotenschnitt soll eingetragen werden können, dann werden zu den aktuell belegten Modulen Noten berechnet, welche erreicht werden müssen, um auf diesen Wunschschnitt zu kommen.
- Ausgabe eines **übersichtlichen** und **lesbaren** Studienplan als PDF

## Rahmenbedingungen

### Anforderungen an die Benutzungsoberfläche

- Reaktionsschnelle GUI
- Ästhetisches Design
- Intuitive Benutzbarkeit
- Bedienung mit Maus und Tastatur

<div style="page-break-after: always;"></div>

### Technologische Anforderungen

#### Software:
 - Java 17
- Gradle build- und testbar
- JavaFx-Desktop Anwendung
- Unter Linux ausführbar

#### Hardware:
- Halbwegs moderner PC sollte reichen (HDD, RAM und CPU sollten vorhanden sein, sonst ist die Ausführung dieses Programm nicht das größte Problem des Nutzers)
- Auflösung mindestens Full-HD (1920 x 1080)
- Farbmonitor mit mindestens sRGB-Farbraum

#### Qualitätsanforderungen
- Usability
- Ressourcenschonend(Nicht zu viel RAM zumüllen oder CPU-Last generieren)



<div style="page-break-after: always;"></div>

# Abläufe und Funktionen
![](https://i.imgur.com/pGDu4VB.png)

## Anwendungsfälle 
---
### Semesterplan erstellen

##### Akteure
Benutzer / Anwender

##### Fachlicher Auslöser 
Der Benutzer hat ein Studium belegt und möchte nun einen Semesterplan erstellen.

##### Vorbedingungen
Module für das Studium sind im System hinterlegt.
Studiengang ist erstellt. 

##### Standardablauf

1. **System:**
	1. Zeigt nur die äußere UI an, aber keinen Studienplan.
2. **<font style="color:#317bd3">Benutzer:</font>**
	1. Klickt auf *Neuen Semesterplan erstellen* 
		1. wählt Studiengang aus
3. **System:** 
	1. Ein leerer Studienplan wird geöffnet und die Modulauswahl wird geöffnet.


##### Alternative Abläufe / Fehlersituationen / Sonderfälle
* Der Studiengang befindet sich nicht im System. (Sonderfall)
	* **<font style="color:#317bd3">Benutzer:</font>** liest einen anderen bzw. neuen Studiengangplan ein, auß dem dann die Module ausgelesen werden können.
	* **System** fügt neuen Studiengang hinzu.
	* Standardablauf wird wiederholt.

##### Nachbedingung / Ergebnis
In der Benutzeroberfläche werden als Ergebnis alle Abhängigkeiten des ausgewählten Moduls angezeigt. 

##### Nicht-funktionale Anforderungen
Reaktionsschnelle GUI 

##### Parametrisierbarkeit / Flexibilität
-/-

##### Nutzungshäufigkeit / Mengengerüst
1-mal bei Erstbenutzung oder n-mal bei Studiengangwechsel.

> Anwendungsfall erstellt von Julia Honisch

<div style="page-break-after: always;"></div>

### Modulauswahl

<b>Akteure:</b> Benutzer / Anwender
<b>Fachlicher Auslöser:</b> Modulauswahl muss zum Beginn des Semesters getroffen werden
<b>Vorbedingungen:</b>
<ul>
<li>Verfügbare Module des Semesters sind in "Persistenz-Schicht" eingerichtet und abrufbereit</li>
<li>Benutzer hat Wunschnotenschnitt im System hinterlegt</li>
</ul>
<b>Standardablauf:</b>
<ol>
<li>System: Zeigt belegbare, angebotene und noch nicht bestandene Module an</li>
<li>Benutzer: Zieht per Drag & Drop Module in den Semesterplan</li>
<li>System: System zeigt maximal erreichbare ECTS, Semesterwochenstunden und benötigeten Notenschnitt für Wunschschnitt</li>
<li>Benutzer: Bestätigt getätigte Auswahl für den Semesterplan</li>
<li>System: Speichert Semesterplan ab</li>
</ol>
<b>Alternative Abläufe / Fehlersituationen / Sonderfälle:</b><br>
&nbsp;&nbsp;&nbsp;&nbsp;-3a Wunschnotenschnitt wurde nicht eingetragen<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-3a1 System gibt keinen benötigten Notenschnitt an<br>
&nbsp;&nbsp;&nbsp;&nbsp;-3b Wunschnotenschnitt ist nicht erreichbar<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-3b1 System gibt Warnung aus<br>
&nbsp;&nbsp;&nbsp;&nbsp;-4a Es existiert bereits ein Semesterplan für das aktuelle Semester<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-4a1 System fragt Benutzer ob der alte Plan überschrieben werden soll<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-4a2 Benutzer bestätigt oder verwirft neuen Plan<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-4a3 Weiter bei 5 oder Abbruch der Modulauswahl<br>
<b>Nachbedingung / Ergebnis:</b> System geht zurück auf die Übersichtsseite<br>
<b>Nicht-funktionale Anforderungen:</b> Reaktionsschnelle GUI<br>
<b>Parametrisierbarkeit / Flexibilität:</b> <br>
<b>Nutzungshäufigkeit / Mengengerüst:</b> 2x jährlich (zum Semesterbeginn)

> Anwendungsfall erstellt von Felix Ruf

<div style="page-break-after: always;"></div>

### Modulanpassung

<b>Akteure:</b> Benutzer / Anwender</br>
<b>Fachlicher Auslöser:</b> Es werden jedes Jahr unterschiedliche Wahlpflichtmodule angeboten</br>
<b>Vorbedingungen:</b>
<ul>
<li>Modul-Templates(Themenbereich und ECTS) sind im System hinterlegt</li>
<li>Benutzer kennt aktuell angebotene Wahlpflichtmodule durch Infoveranstaltung</li>
</ul>
<b>Standardablauf:</b>
<ol>
<li>System: Zeigt verschiedene Modul-Templates und "alte" Wahlpflichtmodule an</li>
<li>Benutzer: Klickt auf veraltetes Modul oder Modul-Template</li>
<li>System: System zeigt Modul / Modul-Template in Pop-Up-Fenster an</li>
<li>Benutzer: Klickt auf bearbeiten</li>
<li>System: Markiert bearbeitbare "Labels"</li>
<li>Benutzer: Passt Namen, ETCS, Semesterwochenstunden, Beschreibung, Veranstaltungen und die Prüfungsform an</li>
<li>Benutzer: Bestätigt Bearbeitung</li>
<li>System: Speichert Semesterplan ab</li>
</ol>
<b>Alternative Abläufe / Fehlersituationen / Sonderfälle:</b><br>
&nbsp;&nbsp;&nbsp;&nbsp;-7a Name existiert bereits<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-7a1 System gibt Fehlermeldung aus<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-7a2 Benutzer passt Namen an<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-7a3 weiter bei 7<br>
<b>Nachbedingung / Ergebnis:</b> System schließt Pop-Up-Fenster<br>
<b>Nicht-funktionale Anforderungen:</b> Reaktionsschnelle GUI<br>
<b>Parametrisierbarkeit / Flexibilität:</b> <br>
<b>Nutzungshäufigkeit / Mengengerüst:</b> 1x vor dem 5. Semester, oder falls sich "normale" Module verändern

> Anwendungsfall erstellt von Felix Ruf

<div style="page-break-after: always;"></div>

### Modulmanagement

##### Akteure
Benutzer / Anwender

##### Fachlicher Auslöser 
Der Benutzer möchte ein Modul ändern.

##### Vorbedingungen
Es wurde ein Semesterplan erstellt.

##### Standardablauf [Bearbeiten]

1. **<font style="color:#317bd3">Benutzer:</font>**
	1. Öffnet die Modulauswahl
2. **System:** 
	1. Listete alle Module in der Modulauswahl auf.
3. **<font style="color:#317bd3">Benutzer:</font>**
	1. Klickt auf zu änderndes Modul
4. **System:** 
	1. Zeigt Modul und alle Details in Pop-Up-Fenster an
5. **<font style="color:#317bd3">Benutzer:</font>**
	1. Klickt auf das zu ändernde Feld
6.	**System:** 
	1. Neuer Wert wird akzeptiert  
7. **<font style="color:#317bd3">Benutzer:</font>**
	1. Drückt OK
8.	**System:** 
	1. Fügt geändertes Modul hinzu 

##### Standardablauf [Löschen]

1. **<font style="color:#317bd3">Benutzer:</font>**
	1. Klickt auf zu löschendes Modul
2. **System:** 
	1. System zeigt Modul und alle Details in Pop-Up-Fenster an
3. **<font style="color:#317bd3">Benutzer:</font>**
	1. Klickt auf das Lösch-Icon
4. **System:** 
	1. Fragt erneut nach, ob das löschen wirklich durchgeführt werden sollte 
5. **<font style="color:#317bd3">Benutzer:</font>**
	1. Bestätigt
6.	**System:** 
	1. Löscht das Modul aus dem Semesterplan und graut es aus
	
##### Standardablauf [Hinzufügen]

1. **<font style="color:#317bd3">Benutzer:</font>**
	1. Klickt auf hinzufügendes Modul und zieht es in den Plan rein 
2. **System:** 
	1. System zeigt Modul und alle Details in Pop-Up-Fenster an
3. **<font style="color:#317bd3">Benutzer:</font>**
	1. Klickt auf belegen 
4. **System:** 
	1.  Prüft, ob alle Anforderungen für das Modul erfüllt sind 
5. **<font style="color:#317bd3">Benutzer:</font>**
	1. Drückt OK
6.	**System:** 
	1. Fügt Modul hinzu, wenn alles erfüllt ist, wenn nicht, dann erscheint ein Pop-up Fenster

##### Alternative Abläufe / Fehlersituationen / Sonderfälle
-/-

##### Nachbedingung / Ergebnis
* Modul wurde erfolgreich aktualisiert.
* Modul wurde erfolgreich gelöscht.
* Modul wurde erfolgreich hinzugefügt.

##### Nicht-funktionale Anforderungen
Reaktionsschnelle GUI 

##### Parametrisierbarkeit / Flexibilität
-/-

##### Nutzungshäufigkeit / Mengengerüst
Möglichkeit gegeben, den Plan jederzeit anzupassen

> Anwendungsfall erstellt von Julia Honisch

<div style="page-break-after: always;"></div>

### Modulabhängigkeiten anzeigen
Der Benutzer kann sich die Modulabhängigkeiten auf *zwei Ebenen* anzeigen lassen.

> [!Modulansichtsauswahl]
>Die Modulansichtsauswahl sammelt in einem Container *alle* existierenden Module für den ausgewählten Studiengang.


> [!Semesterplan]
> Der Semesterplan zeigt die Module an, die sich der User ausgewählt hat.

![](https://i.imgur.com/U5BAkhQ.png)



##### Akteure
Benutzer / Anwender

##### Fachlicher Auslöser 
1. Der User wählt sich für das kommende Semester neue Module aus und möchte sehen, ob seine bereits erlangte Erfahrung in bestandenen Modulen ihm helfen werden.
2. Der User überlegt sich im nächsten Semester ein Modul nicht zu belegen und möchte sehen, ob die verlorene Erfahrung für andere Module zu einem Problem kommen könnte.

##### Vorbedingungen
- User hat einen Studiengang in seine Modulauswahl geladen.

##### Standardablauf

Da Modulansicht und Semesterplan zur selben Zeit geöffnet sein können, geschieht die jeweilige Aktion im ausgewählten Container. (AND OR)
> Wenn in der Modulauswahl Abhängigkeiten für das Modul "Mathematik" hervorgehoben werden, werden diese nicht im Semesterplan hervorgehoben. Es kann aber zeitgleich auch im Semesterplan Abhängigkeiten von einem anderen Fach (oder demselben) angezeigt werden - oder andersherum. 

1. **<font style="color:#317bd3">Benutzer:</font>**
	1. Öffnet (AND OR):
		1. Modulansicht
		2. Semesterplan
2. **System:** 
	1. Listet die Module auf.
3. **<font style="color:#317bd3">Benutzer:</font>** 
	1. Macht einen Rechtsklick auf ein Modul
4. **System:** 
	1. UI zeigt Kontextmenü an.
5. **<font style="color:#317bd3">Benutzer:</font>** 
	1. Wählt im Kontextmenü *Abhängigkeiten anzeigen* aus.
6. **System:** 
	1. UI blendet Module, die keine Abhängigkeiten haben, aus.
	2. UI hebt Module, die Abhängigkeiten besitzen, hervor.
7. **<font style="color:#317bd3">Benutzer:</font>** 
	1. Macht einen Rechtsklick in die/den: (AND OR)
		1. Modulansicht 
		2. Semesterplan
8. **System:** 
	1. UI zeigt Kontextmenü an.
9. **<font style="color:#317bd3">Benutzer:</font>** 
	1. Wählt im Kontextmenü *Abhängigkeiten nicht mehr anzeigen* aus.
10. **System:** 
	1. UI setzt Semesterplan (AND OR) Modulansicht in den Normalzustand zurück.

##### Alternative Abläufe / Fehlersituationen / Sonderfälle
5. Das gewünschte Modul besitzt keine Abhängigkeiten.
	1. **System** blendet alle Module aus.
	2. **<font style="color:#317bd3">Benutzer:</font>** macht einen Rechtsklick und wählt *Abhängigkeiten nicht mehr anzeigen* aus.
	3. Standardablauf wirdfortegesetzt (10 a) 

##### Nachbedingung / Ergebnis
In der Benutzeroberfläche werden als Ergebnis alle Abhängigkeiten des ausgewählten Moduls angezeigt. 

##### Nicht-funktionale Anforderungen
Reaktionsschnelle GUI 

##### Parametrisierbarkeit / Flexibilität
-/-

##### Nutzungshäufigkeit / Mengengerüst
n-mal während des gesamten Studiums.

> Anwendungsfall erstellt von Erina Daraz

<div style="page-break-after: always;"></div>

### Noten eintragen
<b>Akteure:</b> Benutzer </br>
<b>Fachlicher Auslöser:</b> Der Benutzer hat einige Module Schon belegt oder Gutgeschrieben Bekommen.</br>
<b>Vorbedingungen:</b>
<ul>
<li>Module sind im System hinterlegt
<li>Benutzer kennt seine Noten zu den Modulen
</ul>
<b>Standardablauf:</b>
<ol>
<li>System: Zeigt alle Module an
<li>Benutzer: Klickt auf Modul
<li>System: System zeigt Modul und alle Details in Pop-Up-Fenster an
<li>Benutzer: Klickt auf den Bereich Note. 
<li>System: Auswahlfeld für Note wird highlighted (1.0-4.0)
<li>Benutzer: Gibt seine Note an
<li>Benutzer: Drückt OK
<li>System: Speichert Note ab
<li>Wiederholung für Praktikum (Haken für bestanden)
</ol>
<b>Alternative Abläufe / Fehlersituationen / Sonderfälle:</b><br>
 Nutzer gibt ausversehen im Falschen Modul seine Note ab -> Bei Note bearbeiten kann man die Note wieder entfernen, bzw das Praktikum häkchen entfernen

<b>Nachbedingung / Ergebnis:</b> Note ist gespeichert<br>

<b>Nicht-funktionale Anforderungen:</b> Reaktionsschnelle GUI<br>
<b>Parametrisierbarkeit / Flexibilität:</b> <br>
<b>Nutzungshäufigkeit / Mengengerüst:</b> Regelmäßig bei Ende eines Semesters, um seinen Notenschnitt auszurechnen

> Anwendungsfall erstellt von Timothy Doukhin
> 
<div style="page-break-after: always;"></div>

### Notenschnitt Prognose
>  Falls der Benutzer für seine bestandenen Module Noten eingetragen hat, gibt der Plan ihm automatisch einen aktuellen Notenschnitt aus. Im Beispiel hat der Benutzer einen Schnitt von 3,0.
>  
>  Der User möchte sich in diesem Semester mehr anstrengen und trägt als Schnitt eine 2,0 ein und belegt 5 Module im aktuellen Semester. Als Ausgabe bekommt der User die Antwort, das damit er auf einen Schnitt von 2,0 kommen kann, er in allen 5 Modulen eine 1,0 schreiben muss.

![](https://i.imgur.com/utOUfzF.png)

##### Akteure
Benutzer / Anwender

##### Fachlicher Auslöser 
Der User fängt ein neues Semester an und hat seine bestandenen Module im vergangenen Semester eingetragen und möchte seinen Schnitt für das neue Semester verbessern.

##### Vorbedingungen
- Es sind bereits Noten für bestandene Module hinterlegt.
- Der User hat unbenotete neue Module hinzugefügt.

##### Standardablauf
1. **<font style="color:#317bd3">Benutzer:</font>**
	1. Wählt seinen aktuellen Studienplan aus.
2. **System:** 
	1. Zeigt aktuellen Studienplan an.  Unter den Zusatzinformationen zu dem Studienplan befindet sich der aktuelle Notenschnitt.
3. **<font style="color:#317bd3">Benutzer:</font>** 
	1. Drückt auf den Knopf Notenschnitt Prognose.
4. **System:** 
	1. Gibt dem User ein Pop-Up Fenster, in dieser er die möglichkeit hat in ein Inputfeld seinen gewünschen Notenschnitt einzutragen.
5. **<font style="color:#317bd3">Benutzer:</font>** 
	1. Trägt einen Notenschnittwunsch in das Inputfeld ein.
6. **System:** 
	1. Berechnet anhand der bestehenden Noten, dem Wunsch und der anzahl der belegten Module im aktuellen Semester, welche Noten der Benutzer im aktuellen Semester schreiben muss, um auf seinen Wunschschnitt zu kommen und zeigt diese im Anschluss an.
7. **<font style="color:#317bd3">Benutzer:</font>** 
	1. Speichet die Prognose.
8. **System:** 
	1. Speichert die Prognose.


##### Alternative Abläufe / Fehlersituationen / Sonderfälle
6. Gewünschte Note ist nicht erreichbar mit der anzahl der belegten Module
	1. **System** gibt Fehlermeldung aus.
	2. **<font style="color:#317bd3">Benutzer:</font>** Benutzer gibt einen anderen Notenschnitt ein
	3. Standardablauf wirdfortegesetzt (6 a) 

##### Nachbedingung / Ergebnis
Das Sytem schließt das Pop-Up Fenster.

##### Nicht-funktionale Anforderungen
Reaktionsschnelle GUI

##### Parametrisierbarkeit / Flexibilität
-/-

##### Nutzungshäufigkeit / Mengengerüst
n-mal nach auswahl der neuen Module.

> Anwendungsfall erstellt von Erina Daraz

<div style="page-break-after: always;"></div>



## Benutzer Anwendungsszenario

### User Story Noten Eintragen
> Der Benutzer Öffnet seinen Übersichtsplan, und da er Schon im 3. Fachsemester ist, möchte er Seine Noten für die Bereits bestandenen Module auswählen, welche er schon in seinen Semesterübersichtsplan gezogen hat. Hierfür klickt er auf das Gewünschte Modul und bearbeitet Rechts im Pop-Up das Auswahlfeld für "Note". Anschließend Setzt er einen Haken bei "Praktikum Bestanden". Dies wiederholt er für Alle Kurse, die er schon bestanden hat.
> - Timothy Doukhin

### Märchen vom User
> Es war einmal ein User, der das Glück hatte die ersten vier Semester des Medieninformatik Studiengangs an der Hochschule Rhein-Main, trotz der extrem hohen Anforderungen überstanden zu haben. Bis zu diesem Tag hatte ihm sein Studienplaner, der ihm von ein paar netten Kommilitonen zur Verfügung gestellt wurde immer treue Dienste erwiesen. Doch nun war es soweit, die Infoveranstaltung zu den Wahlpflichtmodulen hatte stattgefunden. 
> Doch da die Professoren gar kein Mitleid mit dem armen User haben wollten, veränderten sie einfach nach Lust und Laune die angebotenen Wahlpflichtmodule. Nach dieser traumatisierenden Erfahrung kam es nun so wie es kommen musste. Der User stellte fest, dass keines der Wahlpflichtmodule aus seinem treuen, funktionalen sowie performanten Studienplaner mehr zu den angebotenen Veranstaltungen passen wollte. “Welch Unglück soll mich denn noch ereilen? Kennen diese Professoren denn gar kein Erbarmen?” schrie der User entmutigt in seinen Bildschirm. 

 ... *Die Fragen blieben unbeantwortet.*

> Doch eine kleine Stimme des Widerstandes regte sich in seinem Verstand. “Deine ehrenwerten Vorgänger und Bezwinger dieses chaotischen und anarchistischen Systems haben dir eine Waffe zum Überwinden aller Gemeinheiten des Regimes an die Hand gegeben. NUTZE SIE!” Und plötzlich wusste er was zu tun war. Natürlich hatten die genialen Entwickler seines treuen, funktionalen sowie performanten Studienplaners mit diesem listigen Zug der Herrscherkaste gerechnet und eine Möglichkeit vorgesehen, vorhandene Module zu bearbeiten oder gar ganz neue Module zu erstellen. Selbst vorgefertigte Modul-Templates, die nur kleinste Anpassungen brauchen wurden eingebaut. Mit neu gefasstem Mut wollte der User nun also das Modul “Mobile Computing” an die neuen Umstände anpassen. Dafür musste er nur auf das dem Zahn der Zeit zum Opfer gefallene Modul “Mobile Computing” klicken und in dem sich rasch öffnenden Pop-Up-Fenster die bearbeiten Funktion aktivieren. Nachdem er die ECTS verringert, die Semesterwochenstunden erhöht und die Prüfungsform erweitert hatte, speicherte er die so entstandene Monstrosität mit einem Lächeln auf den Lippen ab. Dieses Lächeln galt natürlich nicht dem Modul oder gar dem System, nein, er wusste wenn er diese Schikanen mit seinem treuen, funktionalen sowie performanten Studienplaner überstehen konnte dann konnte er alles schaffen. Vielleicht ja sogar das Regime stürzen, wie es seine ach so genialen Vorgänger schon vor ihm taten. Und wenn er nicht verzweifelt ist
> - Felix Ruf

### Modulabhängigkeiten anzeigen

> Für den Benutzer hat das neue Semester begonnen und dieser ist gerade dabei sich Module für die kommenden Monate auszusuchen. Er ist neugierig und würde gerne wissen, ob von seinen bereits bestandenen Modulen, welche dabei sind, die ihm für das nächste Semester weiterhelfen. So macht er einen Rechtsklick auf das Modul **Computergrafik** und wählt dort im Menü den Punkt *Abhängigkeiten anzeigen* aus. Danach stellt er fest, dass ihm tatsächlich **Lineare Algebra** und **Programmieren 3** für dieses Modul helfen werden. Er ist glücklich, diese Module letztes Semester belegt zu haben und freut sich sich darauf, seine Erfahrung in Computergrafik anwenden zu können.
> - Erina Daraz

<div style="page-break-after: always;"></div>

# Domänenmodell

![](https://i.imgur.com/AeVLzUl.png)

<div style="page-break-after: always;"></div>

# Benutzungsschnittstelle

## Skizzen
![](https://i.imgur.com/lNUyecc.png)
![](https://i.imgur.com/cWlbgkX.png)
![](https://i.imgur.com/BaKTDFd.png)


<div style="page-break-after: always;"></div>

# Glossar

### UX – User Experience
Das zu deutsch „Nutzererlebnis“ umschreibt alle Wahrnehmungen und Emotionen eines Nutzers in Bezug auf ein Produkt oder eine Anwendung.

### Usability

Eine gute Usability bedeutet, dass der User findet, was er sucht und das möglichst schnell und einfach. Im Einzelnen bedeutet das:

-   das Produkt/die Anwendung ist nützlich und bietet etwas, was der User braucht
-   der User erkennt schnell die Funktionsweisen und kann sie sich einprägen
-   der User versteht den inhaltlichen Aufbau und findet, was er sucht
-   der User braucht wenig Zeit und Energie um sein Ziel zu erreichen
-   der Gebrauch ist einfach und macht bestenfalls Spaß

### UI – User Interface (Design)
Ein User Interface ist die Benutzeroberfläche einer digitalen Anwendung, z. B. einer App oder Webseite. Im UI Design wird die Gestaltung der Benutzeroberfläche definiert. Ein gutes User Interface ist im Idealfall selbsterklärend und gibt nur kleine, notwendige Hilfestellungen in menschlicher Sprache.

### Komponenten
Komponenten sind Teil-Elemente des UIs. Das können z. B. einzelne Buttons oder das gesamte Main Menu oder das Sidebar Menü sein. Die Komponenten zeigen die verschiedenen Status an, die das Element hat: z. B. Default, Hover und/oder Active.

### UI Element
Ein UI Element ist ein einzelnes Element der Benutzeroberfläche, z. B. ein Button, Eingabefeld oder eine Checkbox

### Modul
Ein Modul ist eine UI Komponente, die den Semesterplan füllt, und Daten über die jeweilige Lehrveranstaltung Enthält, kann per Drag and Drop in den Plan integriert werden.

### Drag and Drop
Die möglichkeit, eine UI-Komponente mit der Maus an eine Andere Stelle der UI zu ziehen.

### Fortschrittsregelung:
Jede Lehrveranstaltung hat ein Empfohlenes Fachsemester n. Um ein Modul zu belegen, muss man alle Module Bestanden haben, die für das n-3 Fachsemester bestimmt sind, also im 4. alle aus dem 1. Bestanden haben.

### Stylesheet
Das einheitliche aussehen der Anwendung und ihrer Komponenten wird über ein Stylesheet definiert / festgelegt.k
