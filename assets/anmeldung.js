/* Anmelde-Hinweise automatisch umschalten
   ----------------------------------------------------------------------
   Die Seite hat keinen Build-Schritt, deshalb passiert das im Browser des
   Besuchers. Drei Zustaende, damit nie etwas Falsches dasteht:

     1. vor dem Starttermin          -> "Anmeldung ab 15.11.2026"
                                        (steht so im HTML, hier passiert nichts)
     2. Termin erreicht, Adresse da  -> echter Link "Jetzt anmelden"
     3. Termin erreicht, keine Adresse -> "Anmeldung in Kuerze"

   Zustand 3 ist der wichtige: Verzoegert sich das Portal, wirbt die Seite
   nicht weiter mit einem Datum, das vorbei ist — und verlinkt auch nicht
   ins Leere. Solange PORTAL leer bleibt, kann der Termin gefahrlos kommen.

   Zum Scharfschalten genuegt eine Zeile: PORTAL eintragen, neu deployen.

   Grenze dieser Loesung: Sie richtet sich nach der Uhr des Besuchers. Wer
   eine falsch gestellte Uhr hat, sieht den Wechsel frueher oder spaeter.
   Fuer einen Anmeldestart ist das unkritisch; wer es exakt will, deployt
   am Stichtag von Hand.

   Dieses Skript laeuft bewusst VOR dem Seitenskript: Das holt sich
   #navCta einmal und blendet es beim Scrollen ein. Wuerden wir das
   Element danach austauschen, zeigte es auf ein totes Element.
   ---------------------------------------------------------------------- */
(function () {
  "use strict";

  var START  = "2026-11-15T00:00:00+01:00";  // mitteleuropaeische Zeit
  var PORTAL = "https://baer-service.de/veranstaltung/EFT";  // Anmeldeportal, geprueft 31.10.2026
  var TEXT_OFFEN   = "Jetzt anmelden";
  var TEXT_WARTET  = "Anmeldung in Kürze";

  var offen = Date.now() >= new Date(START).getTime();
  if (!offen) return;                        // Zustand 1: HTML stimmt schon

  // Zustand 3: Termin da, aber kein Ziel — nur den Text entschaerfen.
  if (!PORTAL) {
    document.querySelectorAll(
      ".btn-wartet, .mnav-hinweis, .foot-wartet, .lnk-wartet > span:first-child"
    ).forEach(function (el) { el.textContent = TEXT_WARTET; });
    return;
  }

  // Zustand 2: echter Link. Das Element wird ersetzt, weil ein <span>
  // sich nicht nachtraeglich in einen <a> verwandeln laesst — Tastatur,
  // Mittelklick und Vorlesesoftware brauchen aber einen echten Link.
  function link(klassen, inhalt) {
    var a = document.createElement("a");
    a.href = PORTAL;
    if (klassen) a.className = klassen;
    a.innerHTML = inhalt;
    return a;
  }

  function tausche(alt, neu) {
    if (alt.id) neu.id = alt.id;                               // #navCta bleibt
    if (alt.getAttribute("style")) {
      neu.setAttribute("style", alt.getAttribute("style"));    // display:none bleibt
    }
    alt.parentNode.replaceChild(neu, alt);
  }

  document.querySelectorAll(".btn-wartet").forEach(function (el) {
    tausche(el, link("btn btn-pri", TEXT_OFFEN));
  });

  document.querySelectorAll(".mnav-hinweis").forEach(function (el) {
    tausche(el, link("", TEXT_OFFEN));
  });

  document.querySelectorAll(".foot-wartet").forEach(function (el) {
    tausche(el, link("", TEXT_OFFEN));
  });

  // Die Verweisliste unter "Zum Nachlesen" setzt Text und Pfeil in zwei
  // eigene <span> — das Layout haengt daran, also gleich mitbauen.
  document.querySelectorAll(".lnk-wartet").forEach(function (el) {
    tausche(el, link("lnk", "<span>" + TEXT_OFFEN + "</span><span>&rarr;</span>"));
  });
})();
