# Ich hab Bock (Rechnernetze Edition)

Wer richtig Bock hat, schaut sich das hier an: https://www.rfc-editor.org/rfc-index2.html


## Grundlagen #datenübertragung #paketvermittlung

Ein Netzwerk ist eine Verbindung mehrerer Computer zum Zweck des Datenaustauschs, für verteilte Anwendungen oder auch Kommunikation zwischen ihren Benutzern.

Kommunikationsstrukturen, definiert durch sogenannte Netzwerkprotokolle, gibt es unzählige. Viele sind von einem bestimmten Hersteller, einer Plattform oder einem Betriebssystem abhängig, andere - wie die Internetprotokollfamilie TCP/IP - sind offen, unabhängig und weitverbreitet.

Ein wesentliches Merkmal der meisten Netzwerkformen ist die Übertragung von Daten mithilfe von sog. Datenpaketen.

Es gibt die Paketvermittlung (Packet Switching) und Schaltkreisvermittlung (Circut Switching). Letzteres, sind z.B. herkömmliche Telefonleitungen. (**Hinweis: Mittlerweile laufen auch viele Telefonverbindungen packetvermittelt ab**)

Beim Circut Switching wird bei dem wählen einer Rufnummer bestimmte Schalter geschlossen, die für die gesamte Dauer des Anrufs eine feste Punkt-zu-Punkt Verbindung herstellen. Über diese dauerhafte Leitung können Sprache oder Daten in Echtzeit und korrekter Reihenfolge ohne Unterbrechung übertragen werden. Nachdem die Übertragung beendet ist, wird die betroffene Leitung für alle anderen wieder zur Verfügung gestellt. 

### Paketvermittlung 

Bei der Paketvermittlung wird zu keinem Zeitpunkt der Datenübertragung eine direkte Verbindung zwischen den beiden beteiligten Stellen hergestellt. Stattdessen, sind beide nur indirekt über ein loses Netz von Vermittlungsstellen (Router), miteinander verbunden. Damit auf diesem Weg Daten übertragen werden können, wird folgender Mechanismus verwendet:

* Die zu übertragenen Daten werden in kleinerer Einheiten (Pakete) unterteilt.
* Jedes einzelne Datenpaket wird mit Absender- und Empfängeradresse versehen (IP z.B.)
* Der Absender übergibt jedes Datenpaket an den nächstgelegenen Router
* Jeder beteiligte Router versucht, das Paket anhand der Empfängereingabe an den günstigsten Router weiterzuleiten, damit es letztendlich an seinem Ziel ankommt.
* Der Empfänger nimmt die Datenpakete entgegen und interpretiert sie je nach Daten und Übertragungsart auf irgendeine zwischen den beiden Stellen vereinbarte Art und Weise. (Kommunikationsprotokoll z.B.)