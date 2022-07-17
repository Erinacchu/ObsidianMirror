### Titel: Modulauswahl
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