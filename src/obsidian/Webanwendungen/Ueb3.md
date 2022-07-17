# Übung 3

## Aufgabe 1

In der ersten Aufgabe, sollten wir ein BenutzerProfil.java anlegen. Im prinzip sehr ähnlich wie bei einem normalen Java Projekt.

```java
private String name;
private String adresse;
private String email;
private String lieblingsfarbe;
private String interessen;
private LocalDate geburtsdatum;
```

Dann den Constructor und die jeweiligen Getter und Setter.

Neu dazugekommen ist die *hashCode()* und *equals()*Methode.

#### hashCode()
```java
@Override
public int hashCode() {
return Objects.hash(name, geburtsdatum);
}
```

![[Pasted image 20220512085421.png]]

Die HashCode Methode wandelt z.b den Strin name in einen HashCode um. 
Eine nummerische Repräsentation von content eines Objekts.

#### equals()

```java
@Override
public boolean equals(Object o) {
	if (o == this)
return true;
if (!(o instanceof BenutzerProfil)) {
	return false;
}
BenutzerProfil benutzerProfil = (BenutzerProfil) o;
return Objects.equals(name, benutzerProfil.name) && Objects.equals(geburtsdatum, benutzerProfil.geburtsdatum);
}
```

Die Standardimplementierung der equals()-Klasse, die von java.lang.Object bereitgestellt wird, vergleicht den Speicherort und gibt nur dann true zurück, wenn zwei Referenzvariablen auf denselben Speicherort zeigen, d.h. sie sind im Wesentlichen dasselbe Objekt. 

Java empfiehlt, die equals- und hashCode-Methode zu überschreiben, wenn die Gleichheit auf logische Weise oder über eine Geschäftslogik definiert werden soll

In der Aufgabe dazu stand z.b, das Instanzen von BenutzerProfil genau dann gleich sind, wenn name und geburtstag übereinstimmen.


## Aufgabe 2 getInteressenListe()

In dieser Aufgabe ging es darum, eine Methode zu schreiben, welche die im String per Komma gespeicherten Interessen z.b (Lesen, Kochen, Aufräumen)
trennt und in ein einzelnes Array abspeichert.

Verkürzte Version:
```java
public List<String> getInteressenListe() {
	
if (!getInteressen().isEmpty()) {
	return Arrays.asList(getInteressen().split("\\s*,\\s*"));
	} else {
	return new ArrayList<String>();
	}
	
}
```

Im Prinzip trennt man aus dem Input (dem Getter return String) mit Regex die einzelnen wörter ab und fügt diese dann einer ArrayList hinzu.
Im Code oben ist das ganze abgekürzt. 

## Aufgabe 3/4 und 5 BenutzerProfilController, Session und Ansichten
Nun sollten wir einen Controller für das BenutzerProfil schreiben.
In diesem Controller werden die einzelnen Views festgehalten. Es soll ein Profil angeschaut werden können /benutzerprofil und das Profil soll auch bearbeitet werden können. /benutzerprofil/bearbeiten. Das Profil soll in einer Session gespeichert werden.

Wie in Übung2:

```java
Controller
@SessionAttributes("profil")
public class BenutzerprofilController {

    @ModelAttribute("profil")
    public void initProfil(Model model, BenutzerProfil benutzerProfil) {
        model.addAttribute("profil", new BenutzerProfil());
    }

    @GetMapping("/benutzerprofil")
    public String index(Model model, @ModelAttribute("profil") BenutzerProfil benutzerProfil) {

        model.addAttribute("profil", benutzerProfil);

        if (benutzerProfil.getInteressen() != null) {
            model.addAttribute("interessen", benutzerProfil.getInteressenListeInput(benutzerProfil.getInteressen()));
        }

        return "benutzerprofil/profilansicht";
    }

    @RequestMapping("/benutzerprofil/bearbeiten")
    public String edit(@ModelAttribute("profil") BenutzerProfil benutzerProfil, HttpSession model,
            HttpServletRequest request,
            SessionStatus sessionstatus) {

        model.setAttribute("profil", benutzerProfil);

        return "benutzerprofil/profileditor";
    }

    
    @PostMapping("/benutzerprofil/bearbeiten")
    public String submit(
            HttpSession model, @Valid @ModelAttribute("profil") BenutzerProfil benutzerProfil,
            BindingResult benutzerErrors, RedirectAttributes atts) {

        if (benutzerErrors.hasFieldErrors()) {

            return "benutzerprofil/profileditor";

        }
     
        model.setAttribute("profil", benutzerProfil);

        return "redirect:/benutzerprofil";

    }

}
```

### SessionAttribute

Neu hinzugekommen sind die Sessions.
Um eine Session anzulegen, legen wir das Sessionattribut als Annotation fest. ```@SessionAttributes("profil")```

Das ModelAttribut wird einmal im Controller aufgerufen
```java
@ModelAttribute("profil")
    public void initProfil(Model model, BenutzerProfil benutzerProfil) {
        model.addAttribute("profil", new BenutzerProfil());
    }
```
Und wir können hier sagen, dass in "profil" ein neues BenutzerProfil() angelegt werden soll. Damit haben wir die session "profil" initalisiert.
Um damit arbeiten zu können, rufen wir in den anderen Methoden z.b POST-Mapping ```@ModelAttribute("profil") BenutzerProfil benutzerProfil``` auf.
Wenn wir nun mit ```model.setAttribute``` auf das profil zugreifen, dann speichern wir direkt einen neuen Inhalt in das Sessionattribut.

#### Ansichten und POST-Methode

- profilansicht.html (Profilansicht)
- profilbearbeiten.html (Profil bearbeiten)

2 HTML Dokumente die unser Profil anzeigen und bearbeiten können.

In der profilbearbeiten.html befindet sich eine thymeleaf Form.
```html
<form action="#" th:action="@{/benutzerprofil/bearbeiten}" th:object="${benutzerProfil}" th:method="POST" method="post">
                    <div class="mb-3">
                        <label for="name" class="form-label">Name</label>
                        <input type="text" th:field="${profil.name}" class="form-control" id="name" required="required">
                    </div>
                    <div class="mb-3">
                      <label for="geburtsdatum" class="form-label">Geburtsdatum</label>
                      <input type="date" th:field="${profil.geburtsdatum}" class="form-control" id="geburtsdatum" required="required">
                  </div>
                    <div class="mb-3">
                        <label for="adresse" class="form-label">Adresse</label>
                        <input type="text" th:field="${profil.adresse}" class="form-control" id="adresse" required="required">
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label">Email</label>
                        <input type="text" th:field="${profil.email}" class="form-control" id="email" required="required">
                    </div>
                    <div class="mb-3">
                        <label for="lieblingsfarbe" class="form-label">Lieblingsfarbe</label>
                        <input type="color" th:field="${profil.lieblingsfarbe}" class="form-control" id="lieblingsfarbe" required="required">
                    </div>
                    <div class="mb-3">
                        <label for="interessen" class="form-label">Interessen</label>
                        <input type="text" th:field="${profil.interessen}" class="form-control" id="interessen">
                    </div>
                    <input th:if="${profil.name == null}" type="submit" class="btn btn-primary" value="Anlegen">
                    <input th:unless="${profil.name == null}" type="submit" class="btn btn-primary" value="Speichern">
                    <a href="../benutzerprofil"></a><button class="btn btn-primary">Zurück</button>
                </form>
```
In der th:action legen wir die POST-Methode im Controller fest. Als object wird benutzerProfil angegeben. Wir erinnern uns: ```@ModelAttribute("profil") BenutzerProfil benutzerProfil```

Nach drücken auf den Speichern Button, wird die Post Methode im Controller ausgeführt und die values werden in die Session gespeichert.

