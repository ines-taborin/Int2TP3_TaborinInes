const handleSubmit = (event) => {
    event.preventDefault(); 

    // Récupérer les valeurs des champs du formulaire
    const nom = document.getElementById("nom").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const pays = document.getElementById("pays").value.trim();
    const date = document.getElementById("date").value;
    const langue = document.getElementById("langue").value;
    const projet = document.querySelector("textarea").value.trim();

    let isValid = true;

    // Validation du champ Nom
    if (nom === "") {
        isValid = false;
        displayErrorMessage("nom", "Saisis ton nom.");
    } else {
        clearErrorMessage("nom");
    }

    // Validation du champ Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        isValid = false;
        displayErrorMessage("email", "Saisis un mail valide.");
    } else {
        clearErrorMessage("email");
    }

    // Validation du champ Téléphone
    const phoneRegex = /^[0-9]{3}-[0-9]{2}-[0-9]{3}$/;
    if (!phoneRegex.test(phone)) {
        isValid = false;
        displayErrorMessage("phone", "Saisis un numéro valide");
    } else {
        clearErrorMessage("phone");
    }

    // Validation du champ Pays
    if (pays === "") {
        isValid = false;
        displayErrorMessage("pays", "Saisis le pays.");
    } else {
        clearErrorMessage("pays");
    }

    // Validation du champ Date
    if (!date) {
        isValid = false;
        displayErrorMessage("date", "Sélectionne une date.");
    } else {
        clearErrorMessage("date");
    }

    // Validation du champ Langue
    if (langue === "" || langue === "Quelle est votre langue ?") {
        isValid = false;
        displayErrorMessage("langue", "Sélectionne une langue.");
    } else {
        clearErrorMessage("langue");
    }

    // Validation du champ Projet
    if (projet === "") {
        isValid = false;
        displayErrorMessage("projet", "Parle moi de ton projet.");
    } else {
        clearErrorMessage("projet");
    }

    // Si tout valide, envoyer 
    if (isValid) {
        console.log("C'est okay");
        
    }
};

const displayErrorMessage = (fieldId, message) => {
    let errorMessageElement = document.querySelector(`#${fieldId} + .input-error`);
    if (!errorMessageElement) {
        errorMessageElement = document.createElement('div');
        errorMessageElement.className = 'input-error';
        document.querySelector(`#${fieldId}`).parentNode.appendChild(errorMessageElement);
    }
    errorMessageElement.textContent = message;
    errorMessageElement.style.display = "block";
};

const clearErrorMessage = (fieldId) => {
    const errorMessageElement = document.querySelector(`#${fieldId} + .input-error`);
    if (errorMessageElement) {
        errorMessageElement.textContent = "";
        errorMessageElement.style.display = "none";
    }
};
