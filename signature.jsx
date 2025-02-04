/**
 * @file signature.jsx
 * @version 2.0
 * @author WA75
 * 
 * This script is designed to work with Adobe InDesign. It corrects the orientation of the content in a selected block,
 * checks for the existence of a specific layer named "Dos", and duplicates and moves elements based on user input.
 * 
 * @requires InDesign CS6 or later
 */

/**
 * Main function to execute the script.
 * 
 * @function
 * @name main
 * @description This function performs the following tasks:
 * - Checks if a selection is made in the document.
 * - Checks if a layer named "Dos" exists and prompts the user to delete it if it does.
 * - Creates a new layer named "Dos".
 * - Prompts the user for the number of pages per section, paper thickness, and paper weight.
 * - Calculates the displacement for the graphic on the spine.
 * - Duplicates and moves elements across pages based on user input.
 * - Moves the duplicated elements to the new layer.
 * 
 * @throws {Error} If no selection is made.
 */

//target CS6
#target "InDesign-8.0"
//target the latest version of InDesign
#target "InDesign"



// la sélection
var selection = app.selection[0];

if (app.selection.length == 0) {
	// 
	var userAction = confirm("Aucun bloc n'est sélectionné.\nVoulez-vous annuler ou calculer l'épaisseur de dos ?");
	
	if (userAction) {
		// Boîte de dialogue pour saisir les informations nécessaires
		var dialog = app.dialogs.add({ name: "Calculer l'épaisseur de dos" });
		
		with (dialog.dialogColumns.add()) {
			staticTexts.add({ staticLabel: "Pages/cahier :" });
			var pagesParCahierField = integerEditboxes.add({ editValue: 8 });
		}
		with (dialog.dialogColumns.add()) {
			staticTexts.add({ staticLabel: "Grammage (g/m2) :" });
			var epaisseurPapierField = measurementEditboxes.add({ editValue: 110 });
		}
		with (dialog.dialogColumns.add()) {
			staticTexts.add({ staticLabel: "Main :" });
			var mainPapierField = measurementEditboxes.add({ editValue: 1.2 });
		}

		if (dialog.show() == true) {
			var pagesParCahier = pagesParCahierField.editValue;
			var epaisseurPapier = epaisseurPapierField.editValue;
			var mainPapier = mainPapierField.editValue;
			dialog.destroy();
		} else {
			dialog.destroy();
			exit();
		}
		
		// Récupère le document actif
		var doc = app.activeDocument;
		var nombreDeCahiers = Math.ceil(doc.pages.length / pagesParCahier);
		//  épaisseur 1 cahier = ((grammage / 1000) * main) * (nombre de pages / 2)
		var epaisseurCahier = ((epaisseurPapier / 1000) * mainPapier) * (pagesParCahier / 2); 
		// La formule pour l'épaisseur totale de tous les cahiers
		var epaisseurTotale = nombreDeCahiers * epaisseurCahier;
		alert("L'épaisseur totale de l’ouvrage est de : " + epaisseurTotale + " mm\n" +
			  "Votre bloc doit faire : " + epaisseurTotale*2 + " mm d’épaisseur");
		exit();
	}else{
		exit();
	}
}

// Récupère le document actif
var doc = app.activeDocument;


// Vérifier si un calque nommé "Dos" existe
var layerName = "Dos";
var layerExists = false;

for (var i = 0; i < app.activeDocument.layers.length; i++) {
    if (app.activeDocument.layers[i].name === layerName) {
        layerExists = true;
        break;
    }
}

// Crée un nouveau calque pour regrouper les éléments dupliqués
if (layerExists) {
    // Le calque "Dos" existe
    // alert("Le calque 'Dos' existe.\n Supprimez-le et relancer le script.");
	
	var userChoice = confirm("Le calque 'Dos' existe. Voulez-vous le supprimer et continuer ?");
	if (userChoice) {
		var layerToDelete = doc.layers.itemByName(layerName);
		layerToDelete.remove();
		var calqueDos = doc.layers.add({ name: "Dos" });
	} else {
		exit();

	}
} else {
    // Le calque "Dos" n'existe pas
    var calqueDos = doc.layers.add({ name: "Dos" });
}


// Boîte de dialogue pour saisir le nombre de pages par cahier
var pagesParCahier = parseInt(prompt("Nombre de pages par cahier :", "8"));
if (isNaN(pagesParCahier)) {
	exit();
}

// Boîte de dialogue pour saisir l'épaisseur du papier
var epaisseurPapier = parseFloat(prompt("Épaisseur du papier en grammes par m2 :", "110"));
if (isNaN(epaisseurPapier)) {
	exit();
}
// Boîte de dialogue pour saisir la main
var mainPapier = parseFloat(prompt("Main du papier :", "1.2"));
if (isNaN(mainPapier)) {
	exit();
}




var positionY = selection.geometricBounds[1];
var coordonnees = selection.geometricBounds;
var largeurDocument = doc.documentPreferences.pageWidth;
var bleed = doc.documentPreferences.documentBleedTopOffset;

// La formule pour l'épaisseur d'un cahier (grammage / 1000) x main) x (nombre de pages /2)
// correspondant au décalage du graphisme sur le dos
var deplacement = ((epaisseurPapier / 1000) * mainPapier) * (pagesParCahier / 2);





// On déplace le bloc pour la page 1
// geometricBounds = [y1, x1, y2, x2]
selection.geometricBounds = [0 - bleed, 0 + deplacement, doc.documentPreferences.pageHeight + bleed, 0];
// déplacement du contenu du bloc
// move([x, y])
var contenuBloc = selection.pageItems[0];
contenuBloc.move([deplacement, 0]);


var s = 1;
// Boucle à travers les pages avec la fréquence choisie
for (var i = pagesParCahier - 1; i < doc.pages.length; i += pagesParCahier) {
	
    // Duplique l'élément deux fois avec déplacement
    var duplicatedElement = selection.duplicate(undefined, undefined);
    
	// On gère le bloc 1
    duplicatedElement.move(doc.pages[i]);
    duplicatedElement.move([largeurDocument, 0]);
	
	// On gère l'élément dans le bloc 1
	if( s < 2){
		var elementDansBloc = duplicatedElement.pageItems[0];
		elementDansBloc.move([largeurDocument + (deplacement * (s + 2)), 0])
	} else{
		var elementDansBloc = duplicatedElement.pageItems[0];
		elementDansBloc.move([largeurDocument + (deplacement * (s + s + 1)), 0]);
	}
	
	// Déplace les éléments vers le nouveau calque
    duplicatedElement.move(calqueDos);


	
	var duplicatedElement2 = selection.duplicate(undefined, undefined);

	// on gère le bloc 2
	duplicatedElement2.move(doc.pages[i]);
    duplicatedElement2.move([largeurDocument - deplacement, 0]);
	
	// On gère l'élément dans le bloc 2

	if(s < 2){
		var elementDansBloc2 = duplicatedElement2.pageItems[0];
		elementDansBloc2.move([largeurDocument + (deplacement * s), 0]);
	} else{
		
		var elementDansBloc2 = duplicatedElement2.pageItems[0];
		elementDansBloc2.move([largeurDocument + (deplacement * (s + s - 1)), 0]);
	}


    // Déplace les éléments vers le nouveau calque
    duplicatedElement2.move(calqueDos);

	s++;
}
