
// liaison des éléments du DOM avec le js par la declaration des constantes 
const formulaire = document.getElementById('formulaire');
const erreur = document.getElementById('erreur');
const tableau = document.getElementById('tableau');


formulaire.addEventListener('submit', function (event) {
    event.preventDefault();  // permet de definir les actions à exécuter losqu'on soumet le formulaire et anuler le comportement par defau du formulaire

    // récupération et convertion en entier des valeurs sésis par l'utilisateur
    const dimension = parseInt(document.getElementById('dimension').value);
    const limiteInf = parseInt(document.getElementById('limiteInf').value);
    const limiteSup = parseInt(document.getElementById('limiteSup').value);


    //gérer les erreurs

    const champs = document.querySelectorAll('input[type="text"]'); // Sélectionne les trois champs de formulaire

    champs.forEach(function (champ)/*"forEach" nous permet deparcourir tout les input de notre page */ {
        champ.addEventListener('input', function () {
            // Code de vérification ici
            if (isNaN(this.value)) {
                //this.classList.add('ip');
                erreur.textContent = 'Veuillez entrer un entier valide.';
                return;
            } else {
                //this.classList.remove('ip');
                erreur.textContent = ""
                tableau.innerHTML = ''
                return;
            }
        });
    });


    // gérer les erreurs
    document.getElementById('soumettre').addEventListener('click', function () {
        var champs = document.querySelectorAll('input[type="text"]');
        champs.forEach(function (champ) {
            if (isNaN(champ.value)) {
                champ.placeholder = champ.value; // Définit le contenu actuel comme placeholder
                champ.value = ''; // Vide le champ
               // document.getElementsByClassName("ip").style.borderColor = "red";
                erreur.textContent = 'Veuillez entrer des entiers valides.';
                return;
            } else {
                //this.classList.remove('ip');
                erreur.textContent = ""
                tableau.innerHTML = ''
                return;
            }
        })
    });


    if (isNaN(dimension) || isNaN(limiteInf) || isNaN(limiteSup)) {
        erreur.textContent = 'Veuillez entrer des entiers valides.';

        if (isNaN(dimension)) {
            document.getElementById('dimension').placeholder = "Exp : 60"
            document.getElementById('dimension').value = ""
        }

        if (isNaN(limiteInf)) {
            document.getElementById('limiteInf').placeholder = "Exp : 20"
            document.getElementById('limiteInf').value = ""
        }

        if (isNaN(limiteSup)) {
            document.getElementById('limiteSup').placeholder = "Exp : 40"
            document.getElementById('limiteSup').value = ""
        }

        return;
    }
    erreur.textContent = ""

    // vérifier si  limiteInf est inferieur à limiteSup
    if (limiteInf >= limiteSup) {
        erreur.textContent = 'La limite inférieure doit être inférieure à la limite supérieure.';
        // rénitialiser le champ "limite supérieur" si la condition n'est pas vérifier
        document.getElementById('limiteSup').placeholder = limiteSup
        document.getElementById('limiteSup').value = ""
        return;
    }
    erreur.textContent = ""

    // générer les nombres aléatoires 
    const nombresAleatoires = [];
    for (let i = 0; i < dimension; i++) {
        nombresAleatoires.push(Math.floor(Math.random() * (limiteSup - limiteInf + 1)) + limiteInf);
    }

    // compter le nombre de fois qu'un nombre se repète
    const comptage = {};
    for (let i = 0; i < nombresAleatoires.length; i++) {
        const nombre = nombresAleatoires[i];
        if (comptage[nombre]) {
            comptage[nombre]++;
        } else {
            comptage[nombre] = 1;
        }
    }

    let html = '<table class="table table-striped">';  // declaration du tableau à utiliser et insertion de la class bootstrap à utiliser pour faire les rayure zébré sur le tableau
    for (let i = 0; i < nombresAleatoires.length; i++) {
        const nombre = nombresAleatoires[i];

        // incertion du nombres aléatoires et de leurs indice de comptage dans les cellules du tableau
        html += `<td style="background-color: #f0f0f0; border: 1px solid #ccc; text-align: center; padding:0 0px;">${nombre}<br><small style="color: rgb(207, 27, 27); text-align: right; vertical-align: bottom;">${comptage[nombre]}</small></td>`;

        // gérer la création et le retoure automatique à ligne après 10 colonnes
        if ((i + 1) % 10 === 0) {
            html += '</tr><tr>';
        }

        //gérer la ferméture de la dernière ligne du tableau
        if (i === nombresAleatoires.length - 1) {
            html += '</tr>';
        }
    }
    html += '</table>'; // ferméture du tableau

    // afficher le tableau dans notre parge web atravers la "div" d'identifiant "tableau"
    tableau.innerHTML = html;
});