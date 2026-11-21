const form = document.querySelector("#form-reservation");
const nom = document.querySelector("#nom");
const prenom = document.querySelector("#prenom");
const email = document.querySelector("#email");
const telephone = document.querySelector("#telephone");
const dateReservation = document.querySelector("#date-reservation");
const heureReservation = document.querySelector("#heure-reservation");
const nbPersonnes = document.querySelector("#nb-personnes");
const message = document.querySelector("#message");
const messageSucces = document.querySelector("#message-succes");
const compteur = document.querySelector("#compteur");

function afficherErreur(champ, idErreur, texte) {
  document.querySelector(idErreur).textContent = texte;
  champ.classList.add("erreur-bordure");
}

function effacerErreur(champ, idErreur) {
  document.querySelector(idErreur).textContent = "";
  champ.classList.remove("erreur-bordure");
}

message.addEventListener("input", function () {
  compteur.textContent = message.value.length + " / 200";
  effacerErreur(message, "#erreur-message");
});

nom.addEventListener("input", () => effacerErreur(nom, "#erreur-nom"));
prenom.addEventListener("input", () => effacerErreur(prenom, "#erreur-prenom"));
email.addEventListener("input", () => effacerErreur(email, "#erreur-email"));
telephone.addEventListener("input", () =>
  effacerErreur(telephone, "#erreur-telephone")
);
dateReservation.addEventListener("input", () =>
  effacerErreur(dateReservation, "#erreur-date")
);
heureReservation.addEventListener("input", () =>
  effacerErreur(heureReservation, "#erreur-heure")
);
nbPersonnes.addEventListener("input", () =>
  effacerErreur(nbPersonnes, "#erreur-nb")
);

form.addEventListener("submit", function (event) {
  event.preventDefault();
  let toutEstOk = true;
  messageSucces.textContent = "";

  if (nom.value.trim().length < 2) {
    afficherErreur(nom, "#erreur-nom", "le nom contient au moins 2 lettres");
    toutEstOk = false;
  }
  if (prenom.value.trim().length < 2) {
    afficherErreur(
      prenom,
      "#erreur-prenom",
      " Prénom contient au moins 2 lettres"
    );
    toutEstOk = false;
  }
  if (!email.value.includes("@") || !email.value.includes(".")) {
    afficherErreur(
      email,
      "#erreur-email",
      " Email faut, obligatoire contient  @ et ."
    );
    toutEstOk = false;
  }
  let telRegex = /^\+216[0-9]{8}$/;
  if (!telRegex.test(telephone.value.trim())) {
    afficherErreur(
      telephone,
      "#erreur-telephone",
      "obligatoire commance par +216 + 8 chiffres, ex: +21622550211"
    );
    toutEstOk = false;
  }
  if (dateReservation.value === "") {
    afficherErreur(dateReservation, "#erreur-date", "choisie un date");
    toutEstOk = false;
  }
  if (
    heureReservation.value < "11:00" ||
    heureReservation.value > "23:00" ||
    heureReservation.value === ""
  ) {
    afficherErreur(
      heureReservation,
      "#erreur-heure",
      "ouvert  de 11:00 à 23:00 "
    );
    toutEstOk = false;
  }
  let nb = Number(nbPersonnes.value);
  if (nb < 1 || nb > 20) {
    afficherErreur(
      nbPersonnes,
      "#erreur-nb",
      " nombre perssonne entre 1 et 20"
    );
    toutEstOk = false;
  }
  if (message.value.length > 200) {
    afficherErreur(
      message,
      "#erreur-message",
      "message ne depasse pas 200 lettres"
    );
    toutEstOk = false;
  }

  if (toutEstOk === true) {
    let zoneChoisie = document.querySelector(
      'input[name="zone"]:checked'
    ).value;
    let zoneTexte =
      zoneChoisie === "terrasse"
        ? "Terrasse extérieure"
        : "Salle intérieure traditionnelle";
    messageSucces.textContent =
      "Merci " + prenom.value.trim() + " " +nom.value.trim() +" ! Réservation de vous le " +dateReservation.value +" à " +heureReservation.value +" pour " + nb + " personnes (" + zoneTexte +  ") accepté.";
    form.reset();
    messageSucces.textContent = texteSucces;
    compteur.textContent = "0 / 200";
  }
});

form.addEventListener("reset", function () {
  document.querySelectorAll(".erreur").forEach(function (span) {
    span.textContent = "";
  });
  document.querySelectorAll(".erreur-bordure").forEach(function (champ) {
    champ.classList.remove("erreur-bordure");
  });

  compteur.textContent = "0 / 200";
});
