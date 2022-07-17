#### Aufgabe 1  a1.cgi 

Bei dieser Aufgabe ging es darum, ein einfaches CGI Skript zu schreiben und zu verstehen, wie das ganze funktioniert.

Grundsätzlich:
CGI-Dateien müssen Ausführungsrechte haben. D.h neu angelegte Dateien müssen mit 
```chmod 777 dateiname```
die Rechte gesetzt werden, damit diese vom Webserver ausgeführt werden kann.

Bei der a1.cgi Aufgabe ging es darum, dass wir ein Skript schreiben, welches alle Envoirement-Variablen (Umgebungsvariablen) als Liste ausgibt.

```py
#!/usr/bin/env python3


import cgi, cgitb, os

def dump():

    print("<ul>")

    for x in sorted(os.environ):

        print("<li>", x + os.environ[x] + "</li>")


    print("</ul>")

  
print("Content-Type: text/html")
cgitb.enable()

print()

dump()
```

Bei Python, damit der Webserver weiß, dass es sich dabei um eine Python3 Datei handelt, muss oben ```#!/usr/bin/env python3``` stehen.

```cgitb.enable()``` ist ein cgitb Modul, ist ein special exception handler für Pyton. Falls im Code ein Fehler vorliegt, wird dieser in plain text ausgegeben.

*Beispiel für Error handling:*
![[Pasted image 20220421120019.png]]

```def dump()``` ist als Funktion zu verstehen, die dann unten noch einmal aufgerufen wird.

```py
print("<ul>")
    for x in sorted(os.environ):

        print("<li>", x + os.environ[x] + "</li>")

print("</ul>")
```

Verstehen kann man das so, dass in HTML folgendes erzeugt wird:
```
<ul>
	<li>Eintrag</li>
</ul>
```
Die for schleife geht alle os.environ Umgebunsgvariablen durch und füllt die HTML Tabelle mit Einträgen. ```sorted()``` dient dazu, die Einträge nach ABC.. zu sortieren.

```
print("Content-Type: text/html")
print()
```
legt fest, dass es sich hierbei um eine text/html seite handelt, das wird an den Browser gesendet und dieser validiert diese dann dementsprechend. Es könnte sich z.b auch um ein Image handeln, und dann wäre der content-type (MIME-TYPE) ```Content-Type:   
image/jpeg```

##### Die Ausgabe:
![[Pasted image 20220421114222.png]]

#### Aufgabe 2
- a2-hidden.py
- a2-cookie.py

Bei der 2ten Aufgabe ging es darum, **GET und POST** Requests zwischen dem Webserver und User zu simulieren.

Die Aufgabe war es, eine kleine Website zu schreiben, bei der der User aufgefordert wird, eine Rechenaufgabe zu lösen.

![[Pasted image 20220421114705.png]]

Die Eingabe sollte dann an das CGI Skript gesendet werden, wo die Eingabe dann validiert wird. Es wird geguckt ob die Eingabe richtig, falsch oder invalide ist und danach in eine Tabelle darunter gespeichert. Alle Einträge werden zu der generierten *Session-ID* gespeichert.

Bei der a2-hidden Aufgabe wird die Session-ID nicht in einem Cookie gespeichert. Sprich, nach reloaden des Browsers wird eine neue Session-ID generiert und die gespeicherten Einträge gehen verloren.

Bei der a2-cookie Aufgabe wird die Session-ID in einem Cookie gespeichert. Bei Aufrufen des CGI-Skripts wird geschaut, ob eine Session-ID im Cookie existiert. Falls eine existiert, werden alle eingaben, die unter dieser Session-ID getätigt wurden, wieder angezeigt. Falls nicht, wird eine neue Session-ID angelegt und in einem neuem Cookie gespeichert.

**a2-hidden.py*

```py

#!/usr/bin/env python3

import cgi, cgitb, uuid, os, random

import shelve

  
print('Content-Type: text/html')

print()


cgitb.enable(logdir=os.path.expanduser("~/logs"))


MYSESSIONKEY = "mysessionID"

DBPFAD = os.path.expanduser("~/sessiondata")


forminput = cgi.FieldStorage()  


# wenn SessionID empfangein - verwenden; sonst neue erzeugen

sessionid = forminput.getvalue(MYSESSIONKEY, str(uuid.uuid4()))


def aufgabe():

    zahl1 = int (random.uniform(1, 17))

    zahl2 = int (random.uniform(1, 17))

  

    ergebnis = zahl1 + zahl2;

  

    print("<h1>Was ergibt " + str(zahl1) + " + " + str(zahl2) + "</h1>")

    print(ergebnis)

    print("<br>")

    print("Ihre derzeitige Session-ID:" + sessionid)

    return ergebnis

  

def printList(input):

    for eintrag in input:

        if 'falsch' in str(eintrag):

            print("<li>",eintrag)

        if 'richtig' in str(eintrag):

            print("<li>",eintrag)

        print("</ul>")

  

def hidden():

    with shelve.open(DBPFAD, writeback=True) as db:

        if sessionid not in db:

                db[sessionid] = []

        if "eingabe" in forminput:

            if float(forminput["eingabe"].value) == db[sessionid][-1]:
                db[sessionid].append(forminput["eingabe"].value + ' - richtig')
				
            else:
                db[sessionid].append(forminput["eingabe"].value + ' - falsch - Erg: ' + str(db[sessionid][-1]))

                db[sessionid][0] = 0
                db[sessionid][1] = db[sessionid][1] + 1

  
        ergebnis = aufgabe()

        print(

        '<form action="{contextroot}" method=POST>'

        '<input type="hidden" name="{skey}" value="{sval}"/>'

        '<input type="text" name="eingabe"/>'

        '<input type="submit"/>'

        '</form>'

        'Bisherige Eingaben in Ihrer Session:'

        '<ul>'.format(skey=MYSESSIONKEY,sval=sessionid, contextroot=os.environ['SCRIPT_NAME']))

        db[sessionid].append(ergebnis)

        print(db[sessionid])

        printList(db[sessionid])

  
hidden()
```

```MYSESSIONKEY = "mysessionID"

DBPFAD = os.path.expanduser("~/sessiondata")
```

Ein neuer Datenbankpfad wird geöffnet und alle einträge werden in ~/sessiondata gespeichert.

```sessionid = forminput.getvalue(MYSESSIONKEY, str(uuid.uuid4()))```

Bei forminput wird geschaut, ob es eine sessionid gibt, ansonsten wird eine neue erstellt.

```py
with shelve.open(DBPFAD, writeback=True) as db:

        if sessionid not in db:

                db[sessionid] = []

        if "eingabe" in forminput:

            if float(forminput["eingabe"].value) == db[sessionid][-1]:
                db[sessionid].append(forminput["eingabe"].value + ' - richtig')
				
            else:
                db[sessionid].append(forminput["eingabe"].value + ' - falsch - Erg: ' + str(db[sessionid][-1]))

                db[sessionid][0] = 0
                db[sessionid][1] = db[sessionid][1] + 1
```

shelve.open öffnet die DB verbindung als db. 
Falls sessionid nicht in db, dann neues Array anlegen.

Das Codestück checkt die jeweilige Eingabe und speichert das Ergebnis dann in das Array.

![[Pasted image 20220421120606.png]]

```py
print(
        '<form action="{contextroot}" method=POST>'

        '<input type="hidden" name="{skey}" value="{sval}"/>'

        '<input type="text" name="eingabe"/>'

        '<input type="submit"/>'

        '</form>'

        'Bisherige Eingaben in Ihrer Session:'

        '<ul>'.format(skey=MYSESSIONKEY,sval=sessionid, contextroot=os.environ['SCRIPT_NAME']))
```

Das Input Formular. Ein hidden input, wo die Session-ID gespeichert wird.
Ansonsten "eingabe" als Input feld, welches dann vom Skript überprüft wird.

#### Ergebnis:
![[Pasted image 20220421120810.png]]