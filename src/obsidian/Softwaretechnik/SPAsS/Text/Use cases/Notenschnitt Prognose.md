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