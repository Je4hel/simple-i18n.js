# simple-i18n.js
A very simple and lightweight i18n JS library

## About simple-i18n.js
As its name suggests, `simple-i18n.js` is a simple internationalization module based on JavaScript resource files. If offers the following features:
- Function-based translation for JS code: `i18n.t.my.translation.key(optionalParameter1, optionalParameter2)`
- Translation functions in resource files: `if (myParameter === 1) { return 'singular' } else { return 'plural' }`
- HTML-attributes-based translation for HTML code: `<h1 data-i18n="my.translation.key">A fallback text</h1>`
- Continuous translation through DOM changes (node changes as well as data-i18n attributes changes)

### Resource files
For now, resource files must be named `<languageCode>.js` and contain translation in the following format:

     [
        ["misc", "welcomeText", "user", "return 'Bienvenue, ' + user"],
        ["misc", "yes", "return 'Oui'"],
        ["misc", "no", "return 'Non'"],
        ["misc", "documents","return 'Documents'"],

        ["nav", "home", "return 'Accueil'"],

        ["focus", "sectionTitle", "return 'Focus'"],
        ["focus", "loading", "return 'Chargement...'"],

        ["otherNews", "sectionTitle", "return 'Autres actualités'"],

        ["social", "commentPrompt", "return 'Poster un commentaire...'"],
        ["social", "yamFeedIntro", "return 'Interagissez entre collègues sur Yammer'"],
        ["social", "otherNetworksIntro", "return 'Devenez ambassadeurs de notre Groupe : likez, partagez, commentez nos actus'"]
    ]
