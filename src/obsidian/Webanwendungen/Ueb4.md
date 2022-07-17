# Übung 4

In dieser Aufgabe ging es um die validierung von User eingaben. 
Prinzipiell gibt es zwei Arten der Validierung,
==Client-Side== und ==Server-Side==

## Aufgabe 1 (Validierung)

In dieser Aufgabe sollten wir die Standard Spring Boot Bean validierung verwenden. 

Im ==BenutzerProfil.java==:
```java
	@Size(min = 3, max = 60, message = "{err.name}")
    @NotNull
    private String name;

    @NotNull(message = "{err.adresse}")
    private String adresse;

    @Email(message = "{err.email}")
    private String email;

    @Bunt
    @NotNull
    private String lieblingsfarbe;

    @NotBlank(message = "{err.interessen}")
    private String interessen;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @NotNull(message = "{err.geburtsdatum}")
    @PastOrPresent(message = "{err.birthpast}")
    private LocalDate geburtsdatum;
```

- @NotNull bedeutet, dass das Feld nicht ==null== enthalten darf.
- @NotBlank = Nicht leer lassen.
- @Past = Kein Datum in der Zukunft.
- @PastOrPresent = Kein Datum in der Zukunft oder heute.
- @Email = Format muss xx@xx.com sein.
- @Size(min = 3, max = 60) = Eingabe darf mind. 3 Buchstaben und 60 lang sein.

Prinzipiell kann man alle Annotationen eine message = "" dran hängen. 
In der späteren Aufgabe dann auch mit Internationalisierung. 

Um auf Fehler zu reagieren, muss man im Controller in der POST-Methode noch auf diese Fehler hören.

```java
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
```
In den Methodenkopf muss ==BindingResult benutzerErrors== hinzugefügt werden. mit benutzerErrors können wir jetzt auf die Fehler reagieren.
```java
  if (benutzerErrors.hasFieldErrors()) {
            return "benutzerprofil/profileditor";
        }
```
Falls benutzerErrors FieldErrors hat (Die Annotationen von oben)
soll auf die selbe Seite weitergeleitet werden und dann die Fehler returnen.

![[Pasted image 20220512121709.png]]

## Aufgabe 2 (Eigener Validator)

In Aufgabe1 haben wir die Standard Spring Boot Beans annotationen verwendet. Man kann aber auch seine eigenen validierungen programmieren.
Folgende Ordnerstruktur:

- java/de/hsrm/mi/web/projekt
	- validierung
		- Bunt.java
		- BuntValidator.java
	
### Bunt.java
	
Bunt.java ist die custom Annotation @Bunt

```java
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = BuntValidator.class)
public @interface Bunt {
    String message() default "{err.color}";

    Class<?>[] groups() default{ };
    Class<? extends Payload>[] payload() default { };

}
```


- @Target beschreibt auf was die Annotation greifen soll.
	- In unsrem Fall auf ein Field, deswegen steht die Annotation auch über unserem String input;
	- Alternativ könnte es auch eine Annotation für eine ganze Klasse sein. In diesem Fall würde @Bunt über der Klasse stehen.

Gutes Video dazu:
https://www.youtube.com/watch?v=NP0w86efeUU

```java
String message() default "{err.color}";
```

Hier geht es darum, dass wenn die validierung fehlschlägt, diese nachricht zurückgegeben wird (thymeleaf).

```java
Class<?>[] groups() default{ };
Class<? extends Payload>[] payload() default { };
 ```

  
  Standard-Code, im Video noch mal ansehen. Wird dort erklärt. 
  
  ### BuntValidator.java
  
  Für die Bunt.java klasse braucht es jetzt noch einen Validator, welcher die Eingabe validiert.
  
  ```java
public class BuntValidator implements ConstraintValidator<Bunt, String> {


    @Override
    public void initialize(Bunt annotationBunt) {
        
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {

        if(value == null) {
            return true;
        }

        if(value.isBlank() || value.isEmpty()) {
            return true;
        }

        if(!isRGB(value)) {
            return false;
        }

        if(value.startsWith("#") && !value.isBlank() && value.length() == 7 || value.length() == 4 && isRGB(value)) {
            Color c = Color.decode(value);

            int red = c.getRed();
            int blue = c.getBlue();
            int green = c.getGreen();

            if(!(red == blue || red == green || blue == green)) {
                return true;
            }
        }

        return false;
    }

    public boolean isRGB(String value) {
        Pattern regex = Pattern.compile("#([0-9a-f-A-F]{3}|[0-9a-f-A-F]{6})$");
        Matcher matcher = regex.matcher(value);

        if(matcher.matches()) {
            return true;
        } else {
            return false;
        }

    }
}
```
 
 Der Part:
 
 ```java
@Override
    public void initialize(Bunt annotationBunt) {
        
    }
```
Ist dafür da, das wenn man bei @Bunt(custom="test") ein Custom Parameter mitgeben möchte. z.b @Zahl(teilbar="2")
Dann kann man diesen Input im Validator verwenden. In diesem Beispiel wäre annotationBunt = 2

Wenn man nicht mit custom Parametern arbeiten möchte, dann braucht es im Prinzip nur den zweiten Teil.

```java
@Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
```

Hier kommt dann die Validationslogik rein.

z.b

```java
if(value == null) {

return true;

}
```
Das würde bedeuten, dass eine null eingabe OK ist und der Validator ==TRUE== zurückgibt. In diesem Fall würde kein Fehler ausgegeben werden, wenn die Eingabe null ist.

Warum man das machen sollte? 
Vielleicht möchte man diese Annotation an anderen Stellen verwenden und dort soll keine null eingabe valide sein.
In diesem Fall macht es aber mehr sinn, die Annotation @NotNull zusammen mit der Custom Annotation zu verwenden. In diesem Fall lässt man sich also die Möglichkeit offen, dass eine null eingabe valide oder nicht valide sein kann und muss es nicht hardcoden.

Die eigentliche Validation für die @Bunt eingabe z.b
```java
Color c = Color.decode(value);

            int red = c.getRed();
            int blue = c.getBlue();
            int green = c.getGreen();

            if(!(red == blue || red == green || blue == green)) {
                return true;
            }
```
Hier wird geprüft, ob es sich bei der Eingabe um eine RGB Farbe handelt oder nicht. Also bei falscher Farbeingabe = return false = Fehler wird ausgegeben.

### Aufgabe 3 Internationalisierung (l18n und L10n)

Bei Internationalisierung spricht man davon, dass eine Website oder eine Applikation in mehreren Sprachen verwendet werden kann.

Um die Internationalisierung zu realisieren, benötigt es in Java Spring boot im Projekt order message.properties Dateien.

- java/de/hsrm/mi/web/projekt
	- messages.properties
	- messages_en.properties
	- messages_de.properties
	- messages_nl.properties

messages.properties muss *immer* existieren. Diese Datei ist der Fallback, falls der Browser nicht auslesen kann, aus welchem Land der User kommt. Dann wird *immer* die standard ==messages.properties== verwendet.

In den anderen properties Dateien, kann man dann die jeweiligen Sprachen anlegen. 

##### Aufbau der messages.properties

```txt
profil.ihredaten=Your data
profil.name=Name
profil.geburtsdatum=Date of birth
profil.adresse= Street address
profil.email=EMail address
profil.lieblingsfarbe=Favourite colour
profil.interessen=Hobbies
profil.speichern=save
profil.abbrechen=cancel
profil.bearbeiten=edit
profilansicht.titel=User profile
profilansicht.neu=Create Profile
profilbearbeiten.titel=Edit user profile
profilbearbeiten.interessen=Hobbies (comma-separated list)
profilbearbeiten.anlegen=Create
profilbearbeiten.speichern=Save
profilansicht.zusatz=from
profilansicht.noprofile=There is no Profile yet to be shown.
err.name=Name is only allowed to be {min} letters shot and max. {max} letters long.
err.adresse=Please enter an adress
err.geburtsdatum=Please provide your date of birth.
err.birthpast=Your date of birth can not be in the future
err.email=Please provide a valid email address
err.interessen=Please indicate interests
err.color=This colour ${validatedValue} contains two equal R/G/B parts and is therefore not colourful enough
```

Einbindung in thymyleaf und Java Spring Boot:

##### In HTML Thymyleaf

```html
<h1 th:text="#{profil.ihredaten}">Ihre Daten</h1>
```
Über th:text="" wird die Internationalisierung eingebunden.

##### Als Annotation's message in BenutzerProfil.java
```java
@NotBlank(message = "{err.interessen}")
    private String interessen;
```
==err.interessen=Please indicate interests==

##### Annoation mit Custom inhalt
==err.name=Name is only allowed to be {min} letters shot and max. {max} letters long.==
```java
@Size(min = 3, max = 60, message = "{err.name}")
    @NotNull
    private String name;
```