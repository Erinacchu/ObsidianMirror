# Übung 5
In Übung 5 sollten wir unsere Web Applikation mit einer Datenbank verbinden.
D.h statt die Daten nur local in Sessions zu speichern, sollte es auch möglich sein, die Userprofile in einer DB zu speichern, abzufragen und zu löschen.

> Beachten Sie bitte die Schichtengrenzen. Greifen Sie nicht z.B. direkt aus der obersten Schicht (Controller) unter Umgehung der mittleren (Services) direkt auf die Datenhaltung (Repository) zu.

## Aufgabe 1

In Aufgabe 1 ging es jediglich darum die benötigten Dependencys im Gradle Projekt hinzuzufügen. 

```java
dependencies {
...
implementation(’org.springframework.boot:spring-boot-starter-data-jpa’) {
// Workaround wg Bug in aktuellem hibernate-core 5.6.6/5.6.7
exclude group: ’org.hibernate’, module: ’hibernate-core’
}
implementation ’org.hibernate:hibernate-core:5.6.5.Final’
runtimeOnly ’com.h2database:h2’
...
}
```

Gradle sucht für das Projekt immer die aktuelleste Stabile Version der benötigten dependencies zusammen. Allerdings, in unserem Fall gibt es mit der aktuellsten Version von `hibernate` ein Problem. Deswegen kann man einen Workaround nutzen, um gezielt für Hibernate eine alte Version hinzuzufügen.

Außerdem, müssen wir für unsere Datenbank noch in `applications.properties` 
Einstellungen vornehmen.

```text
# JDBC-Datenbank URI, Benutzer/Passwort setzen  
spring.datasource.url=jdbc:h2:mem:projektdb  
spring.datasource.username=h2  
spring.datasource.password=h2  

# Automatisch Tabellen etc. aus Entities anlegen  
spring.jpa.generate-ddl=true  

# Bei jedem Anwendungsstart Datenbank droppen und frisch anlegen  
# Im in-memory-Betrieb weniger interessant, spaeter mit DB-Dateien aber schon.  
spring.jpa.hibernate.ddl-auto=create-drop  

# SQL-Logging im Spring-Boot-Log aktivieren zu Guck- und Testzwecken  
logging.level.org.hibernate.SQL=DEBUG  
logging.level.org.hibernate.type=INFO
```

An zweiter Stelle werden hier Tabellen automatisch aus Entities angelegt. D.h über die Klasse BenutzerProfil muss nur @Entity drüber geschrieben werden und ALLE Attribute wie name, email etc. werden automatisch gecrawled für die Tabelle.
Wenn man diese Einstellung nicht vornimmt, muss man @Entity und dann noch @ColumnTable festlegen.

**Die Logging Informationen sollten im Normalbetrieb natürlich entfernt werden, wegen der Sicherheit**

## Aufgabe 2

In der zweiten Aufgabe ging es darum, aus der `BenutzerProfil.java` klasse eine Entität zu machen.

Außerdem, sollte für diese Datenbanktabelle auch eine neue ID (fortführend) sowie eine Version Feld hinzugefügt werden.

```java
	@Id
    @GeneratedValue
    private Long id;
```

@Id
@GeneratedValue

Mit diesen zwei JPA Annotationen sorgen wir dafür, dass die Tabelle BenutzerProfil eine ID Als Schlüssel hat und diese ID fortlaufend hochgezählt wird.

Wieso long?

Long kann Zahlen in 64 Bit darstellen. D.h dass wir maximal 9223372036854775807 Benutzer hinzufügen können.

Ein Integer wert zählt nur bis 2,147,483,647. Für unser kleines Projekt wäre das natürlich eigentlich egal. Aber z.b bei Youtube war der View Counter für Videos bis zu einem gewissen Zeitpunkt ein Integer 32-Bit wert. Der Grund warum Gangnam Style bei 2,147,483,647 Views gestoppt hat.

https://www.bbc.com/news/world-asia-30288542

```java
@Version
  private Long version;
```

Das Versionsfeld ist dafür da, zu kontrollieren, um es sich dabei um eine aktuelle Version des Inhalts handelt. JPA (Java Persistance API) überprüft das für uns Automatisch.

D.h bei jeder Änderung wird die Version hochgezählt. 

> JPA uses a version field in your entities to detect concurrent modifications to the same datastore record. When the JPA runtime detects an attempt to concurrently modify the same record, it throws an exception to the transaction attempting to commit last.

Wenn z.b in einem anderem Thread die Entity mit der selben ID schon geupdated wurde, dann wird eine `OptimisticLockException` gethrowed. 

```java
@Entity
public class BenutzerProfil implements Serializable {

    @Id
    @GeneratedValue
    private Long id;

    @Version
    private Long version;
```

Für die @Entity implementieren wir noch Serializable. 

Zusätzlich wird noch eine BenutzerProfilRepository.java, welche sich im selben Package wie BenutzerProfil.java befindet, angelegt. 

```java
package de.hsrm.mi.web.projekt.benutzerprofil;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BenutzerprofilRepository extends JpaRepository<BenutzerProfil, Long> {

}
```

Für die Aufgabe, sollte die Klasse leer angelegt werden, weil das JpaRepository schon alles mitbringt, was wir verwenden sollen.

> `JpaRepository` is JPA specific extension of `Repository`. It contains the full API of `CrudRepository` and `PagingAndSortingRepository`. So it contains API for basic CRUD operations and also API for pagination and sorting.

## Aufgabe 3

In dieser Aufgabe soll zusätzlich noch eine Service schnitstelle angelegt werden.
_Theoretisch, braucht man nicht zwingend eine Service Klasse. Ich hab aber leider keinen Grund gefunden, es nicht zu tun. Und es zu tun wird als "Good Practice" beschrieben._

Im BenutzerProfil package wird also zusätzlich eine 
`BenutzerprofilService.java` angelegt. Danach implementieren wir diese Schnitstelle noch in unserer Klasse `BenutzerprofilServiceImpl.java`

Unsere Package Struktur ist jetzt folgende:

- java/de/hsrm/mi/web/projekt
	- benutzerprofil
		- Benutzerprofil.java
		- BenutzerprofilController.java
		- BenutzerprofilRepository.java
		- BenutzerprofilService.java
		- BenutzerprofilServiceImpl.java
- configuration
	- ...
- validierung
	- ...
- resources
	- static
	- templates

#### BenutzerProfilService.java

Wichtig ist die @Service Annotation.


```java
@Service
public interface BenutzerprofilService {
public BenutzerProfil speichereBenutzerProfil(BenutzerProfil bp);
public Optional<BenutzerProfil> holeBenutzerProfilMitId(Long id);
public List<BenutzerProfil> alleBenutzerProfile();
public void loescheBenutzerProfilMitId(Long loesch);
}
```

In der BenutzerProfilServiceImpl definieren wir dann die Methoden.

#### BenutzerProfilServiceImpl.java
```java
@Service
public class BenutzerprofilServiceImpl implements BenutzerprofilService {

    @Autowired
    BenutzerprofilRepository benutzerrepo;

    @Override
    public BenutzerProfil speichereBenutzerProfil(BenutzerProfil bp) {
        return benutzerrepo.save(bp);
    }

    @Override
    public Optional<BenutzerProfil> holeBenutzerProfilMitId(Long id) {
        if(benutzerrepo.existsById(id)) {
            return benutzerrepo.findById(id);
        }

        return Optional.empty();
    }

    @Override
    public List<BenutzerProfil> alleBenutzerProfile() {
        return benutzerrepo.findAll(Sort.by("name"));

    }

    @Override
    public void loescheBenutzerProfilMitId(Long loesch) {
        benutzerrepo.deleteById(loesch);
    }
    
}
```

In unserem Repository haben wir die Zwei Werte `<BenutzerProfil, Long>` mitgegeben. D.h wir haben Zugriff, auf die BenutzerProfil Entität, sowie auf den Long (Id) Wert.

Wir legen mit **@Autowired** das BenutzerProfilRepository in unserer Service Implimentierung fest.

> The @Autowired annotation **provides more fine-grained control over where and how autowiring should be accomplished**. The @Autowired annotation can be used to autowire bean on the setter method just like @Required annotation, constructor, a property or methods with arbitrary names and/or multiple arguments.

Das BenutzerProfilRepository verwendet die JPA Klassen. D.h wir nutzen einfach die Standard Klassen zum finden, löschen und erstellen.

z.B: `return benutzerrepo.findAll(Sort.by("name"));`

In SQL wäre das:
`SELECT * FROM BenutzerProfil ORDER BY name ASC;`
ASC | DESCENDING

Dem Sort.by kann man noch sagen, ob es aufsteigend oder absteigend sortieren soll.
`return benutzerrepo.findAll(Sort.by(Sort.Direction.ASC,"name"));`

## Aufgabe 4

Die Datenbank funktioniert jetzt, nun müssen wir das ganze noch in unserem Controller verwenden.
Um Auf das Repo zugreifen zu können, fügen wir dieses wieder über @Autowired hinzu.

```java
@Controller
@SessionAttributes("profil")
public class BenutzerprofilController {

    @Autowired 
    private BenutzerprofilService benutzerprofilService;
```

Ein abgespeichertes valides Profil soll zur Datenbank, sowie in der Session gespeichert werden.

In unserer POST-Methode ändert sich daher eigentlich nicht viel, außer das wir eben das benutzerProfil objekt auch in der Datenbank abspeichern.

```java
@PostMapping("/benutzerprofil/bearbeiten")
    public String submit(
            HttpSession model, @Valid @ModelAttribute("profil") BenutzerProfil benutzerProfil,
            BindingResult benutzerErrors, RedirectAttributes atts) {

        if (benutzerErrors.hasFieldErrors()) {
            return "benutzerprofil/profileditor";
        }

        benutzerprofilService.speichereBenutzerProfil(benutzerProfil);
        model.setAttribute("profil", benutzerProfil);
        return "redirect:/benutzerprofil";

    }
```

An der Stelle 
`benutzerprofilService.speichereBenutzerProfil(benutzerProfil);`

Wir erinnern uns, dass wir das ganze in der BenutzerProfilServiceImpl definiert haben. 
```java
@Override
    public BenutzerProfil speichereBenutzerProfil(BenutzerProfil bp) {
        return benutzerrepo.save(bp);
    }
```

Die ServiceKlasse greift auf das BenutzerProfilRepository.java zu, welches dort das JpaRepository implementiert. Und dieses eben, hat standard Klassen wie z.b .save():

Nun werden alle Profile auch in der Datenbank abgespeichert.

![[Pasted image 20220523095408.png]]

## Aufgabe 5

In der letzten Aufgabe, wollen wir die angelegten User noch in einer Liste anzeigen können. Um diese dann dort bearbeiten oder löschen zu können.

![[Pasted image 20220523095529.png]]

Im Controller müssen wir jetzt auf die Ab und Anfragen reagieren.

GET /benutzerprofil/liste soll die Liste Anzeigen.
d.h neues Thymyleaf Template.

Im Controller:

```java
 @GetMapping("/benutzerprofil/liste")
    public String liste(Model model, @ModelAttribute("profil") BenutzerProfil benutzerProfil SessionStatus sessionstatus) {

        model.addAttribute("profildaten", benutzerprofilService.alleBenutzerProfile());
        return "benutzerprofil/profilliste";
    }
```

Dem Attribut "profildaten" geben wir einfach die Datenbank mit benutzerprofilService.alleBenutzerProfile() mit.
 
und returnen dann auf das HTML Dokument.

```html
<tbody>
	<tr th:each="user : ${profildaten}">
		<td><a th:href="@{?op=bearbeiten(id=${user.id})}"><span th:text="${user.name}">name</span></a></td>
		<td><span th:text="${user.geburtsdatum}">geburtsdatum</span></td>
		<td><span th:text="${user.email}">epost</span></td>
		<td><span th:text="${user.adresse}">adresse</span></td>
		<td> <a th:href="@{?op=loeschen(id=${user.id})}"><button type="button" class="btn btn-danger">Löschen</button> </a></td>
	</tr>
</tbody>
```

Jetzt müssen wir noch auf die Bearbeiten und Löschen Anfragen reagieren. Im selben Controller code brauchen wir deshalb in unserem MethodenKopf die RequestParameter.

Es soll auf ?op=[AKTION]&id=[ID] gehört werden.

```java
@RequestParam(value = "op", required = false) String op, @RequestParam(required = false) Long id
```
Diese Zwei RequestParameter werden für unsere Liste benötigt.
Weil wir bei "op" zwei Operationen besitzen, legen wir eine value als String fest.
Außerdem sagen wir, dass required=false ist, damit wenn man den URL Link 
/benutzerprofil/liste OHNE op oder id in der URL aufruft, trotzdem noch angezeigt wird. D.h der Browser erwartet nicht umbedingt, dass wir Parameter in der URL haben, kann aber trotzdem darauf reagieren, falls trotzdem welche da sind.

```java
@GetMapping("/benutzerprofil/liste")
    public String liste(Model model, @ModelAttribute("profil") BenutzerProfil benutzerProfil, @RequestParam(value = "op", required = false) String op, @RequestParam(required = false) Long id, SessionStatus sessionstatus) {

        if(op != null && id != null && !benutzerprofilService.holeBenutzerProfilMitId(id).isEmpty()) {

            if(op.equals("bearbeiten")) {
                model.addAttribute("profil", benutzerprofilService.holeBenutzerProfilMitId(id).get());
                return "redirect:/benutzerprofil/bearbeiten";
            }

            if(op.equals("loeschen")) {
                benutzerprofilService.loescheBenutzerProfilMitId(id);
                sessionstatus.setComplete();
                return "redirect:/benutzerprofil/liste";
            } 
        } 
        
        model.addAttribute("profildaten", benutzerprofilService.alleBenutzerProfile());
        return "benutzerprofil/profilliste";
    }
```

Jetzt wo wir auf die Parameter hören können, kann man mit zwei einfachen if Abfragen auf bearbeiten und löschen hören.

Zusätzlich habe ich noch eine if Abfrage hinzugefügt, die guckt, ob die ID existieren oder ob überhaupt erst eine ID mit angegeben worden ist. EInfach um Fehlermeldungen zu vermeiden.

` if(op != null && id != null && !benutzerprofilService.holeBenutzerProfilMitId(id).isEmpty()) {`
Falls ID mitangebenen und falls ID existiert dann:

```java
  if(op.equals("bearbeiten")) {
                model.addAttribute("profil", benutzerprofilService.holeBenutzerProfilMitId(id).get());
                return "redirect:/benutzerprofil/bearbeiten";
            }

            if(op.equals("loeschen")) {
                benutzerprofilService.loescheBenutzerProfilMitId(id);
                sessionstatus.setComplete();
                return "redirect:/benutzerprofil/liste";
            } 
```

Bei **löschen** ist das sehr einfach. Wir löschen das BenutzerProfil aus unserer Datenbank mit `benutzerprofilService.loescheBenutzerProfilMitId(id);`

und löschen danach die Session mit `sessionstatus.setComplete();`

Bei **bearbeiten** setzen wir die  "profil" Session auf die angeklickte ID. und dann leiten wir auf /benutzerprofil/bearbeiten weiter und dort wird uns dann die Session zum bearbeiten angezeigt.

Vereinfacht: Wir belegen die Session bei bearbeiten mit dem jeweils angeklickten Profil. 



