# Signatures

InDesign .JSX script to add graphics on the back of a book signatures
Script .JSX InDesign pour ajouter du graphisme au dos des cahiers d'un livre

## Installation

### Dans macOS
Placez le fichier `signature.jsx` dans le dossier

`Users/[nom d’utilisateur]/Bibliothèque/Preferences/Adobe InDesign/[version]/[langue]/Scripts/Panneau Scripts`

### Dans Windows XP
Placez le fichier `signature.jsx` dans le dossier

`Documents and Settings\[nom d’utilisateur]\Application Data\Adobe\InDesign\[version][langue]\Scripts\Panneau Scripts`

### Windows Vista et Windows 7
Placez le fichier `signature.jsx` dans le dossier

`Users\[nom d’utilisateur]\AppData\Roaming\Adobe\InDesign\[version][langue]\Scripts\Scripts Panel`

### Depuis Indesign
Vous pouvez également localiser le dossier dans lequel les scripts de l'utilisateur.trice sont situés depuis Indesign.
- lancez Indesign
- ouvrez le panneau Scripts (`Fenêtre > Utilitaires > Scripts`)
- sélectionnez le dossier Utilisateur.
- cliquez sur le menu du panneau Script et sélectionner la fonction `Faire apparaitre dans le Finder`
- organisez librement vos scripts dans le dossier qui s'est ouvert dans le Finder.

[Plus d'informations sur le site d'Adobe](https://helpx.adobe.com/fr/indesign/using/scripting.html)

## Compatibilité
Ce script a été testé avec les versions d'Adobe Indesign CC2021 à CC2025.

## Fonctionnalités

### Obtenir la largeur de de dos de l’ouvrage
Pour connaître la largeur totale de l’ouvrage :

1. Lancez le script **sans sélectionner** le bloc.

![image](https://github.com/user-attachments/assets/5232da7e-083f-4ec9-837b-ff43ded8a448)

2. Renseignez le **nombre de pages par cahier**, le **grammage du papier** en g/m2, la **main du papier**. Le nombre de page total est celui du fichier.

![image](https://github.com/user-attachments/assets/1cee6d59-3e1d-44b3-8b33-db2bb396c03a)

_NB: Pour connaitre la largeur du dos d’un cahier, le script utilise la formule :_ $`\left( \frac{\text{Grammage}}{1000} \times \text{Main} \right) \times \left( \frac{\text{Nombre de pages}}{2} \right)`$

![image](https://github.com/user-attachments/assets/8b397ea2-e33d-408a-8e9b-6e32963f0b53)


Le script multiplie cette valeur par le nombre de cahiers pour obtenir la largeur totale de l’ouvrage.
La largeur minimale conseillée pour le bloc contenant le graphisme devrait être multipliée par 2.



### Distribution du graphisme
> Ce script s'utilise exclusivement dans un fichier multipages avec __Pages en vis-à-vis__ et un nombre de page divisble par 4.

1. Placez sur la première page du premier cahier, placez un bloc qui contient le graphisme que vous souhaitez _diffuser_ sur le dos des cahiers. 
Il est primordial que le bloc n'ait aucune rotation (0°), mais que son contenu ait une **rotation de -90°**.

![image](https://github.com/user-attachments/assets/924049f7-2ba6-467f-9920-0566234eaccd)


2. Selectionnez le bloc avec l'outil de sélection (flèche noire).
3. Lancez le script à partir du **Panneau Scripts**
4. Renseignez le **nombre de pages par cahier**, le **grammage du papier** en g/m2, la **main du papier**.

À partir de ces trois valeurs, le script distribuera le bloc sélectionné sur l'ensemble du fichier sur les doubles pages qui correspondent aux dos des cahiers.
Par exemple, pour un ouvrage de 64 pages, en cahiers de 8 pages, le graphisme sera présent sur les pages : `[1], [8-9], [16-17], [24,25], [32-33], [40-41], [48-49], [56-57], [64]`

![image](https://github.com/user-attachments/assets/20ae8eb8-b3ae-4801-a049-5a35fff6b1b9)

Les éléments sont positionnés sur un nouveau calque "Dos".
Si vous relancez le script et que ce calque est présent, vous avez la possibilité de le supprimer, avec son contenu.

## ⚠️ Clause de non-responsabilité
Utilisez ce script de préférence sur une copie de votre fichier. Ce script est fourni "tel quel", sans garantie d'aucune sorte. L'auteur décline toute responsabilité quant aux dommages pouvant résulter de son utilisation.
Utilisation à vos propres risques.
