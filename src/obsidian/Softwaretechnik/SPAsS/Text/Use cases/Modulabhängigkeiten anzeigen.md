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