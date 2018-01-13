//BREAKOUT
// XAM YP

// -------------GESTION DE LA BARRE------------------
$('.GameArea').append('<div class="bar"></div>'); // Une div avec une classe bar est crée

$('.GameArea').mousemove(function(barMooving){
        var deplacementx_bar = barMooving.pageX - this.offsetLeft; // Variable qui a pour objectif de bouger dans mon aire de jeux
        deplacementmax = dimensionLargeurGameArea - (dimensionBar/2);
		if (dimensionBar/2<=deplacementx_bar && deplacementx_bar<= deplacementmax) { // Condition de déplacement sur l'aire de jeu en prenant compte de la taille de la barre.
			$('.bar').css({'left': deplacementx_bar}); // Ajoute chaque deplacement de la barre dans le fichier css avec la propriété left

			return xBar = deplacementx_bar; // Récupération de cette variable pour l'utiliser plus tard
      }
});

    
// -------------------DESIGN & CSS--------------------
var dimensionLargeurGameArea = 650; // Les dimensions sont personnalisables 
var dimensionLongueurGameArea = 600;
var dimensionBar = 150;

bodycss =	$('body').css({ // Ici, quelques lignes css sont ajoutées. Très utile pour les dimensions de l'aire de jeux et de la barre !
	"background-image": "url('bg.jpg')",
	"background-size":"cover"
});

airedejeuxcss = $('.GameArea').css({
	"width":dimensionLargeurGameArea + "px",
	"height":dimensionLongueurGameArea + "px",
	"background-color":"#262626",
	"position": "relative",
	"margin": "auto",
	"border": "2px solid white",
	"cursor": "none"
});

barcss = $(".bar").css({
	"width": dimensionBar + "px",
	"border-bottom": "10px solid white",
    "top": "91%",
	"position": "absolute",
	"border-radius": "5px",
	"left": "75px",
	"transform": "translate(-50%, -50%)",
});



//------------------GENERATION DU TABLEAU-----------


var brickid = $("#brick")[0]; // Va chercher le premier élèment de l'id brick 

var lignes = 5; // Les données sont personnalisables 
var colonnes = 6;

var table = document.createElement("table"); // Création d'une variable table qui va créer une table dans le document html
var tbody = document.createElement("tbody");
var creationLig, creationCol;

        for(i = 0; i < lignes; i++) // Boucle qui va ajouter chaque tr en fonction des données renseignées plus haut
        {
            creationLig = document.createElement("tr");
            for(j = 0; j < colonnes; j++) // Boucle qui va ajouter chaque td en fonction des données renseignées plus haut
            {
                creationCol = document.createElement("td");
                creationLig.append(creationCol); // Ajoute des td dans les tr grace à la boucle imbriquée
            }

            tbody.append(creationLig);
        }

table.prepend(tbody);
brickid.append(table);

// -------------COULEURS DES CELLULES------------------
var nbPixelCellules = dimensionLongueurGameArea/2/lignes; // Cette variable permet de re-calculer les dimensions des cellules dans l'aire de jeux
var cellules = $('td'); // Récupération de tout les td
var theme1 = ['011f4b','03396c','005b96','6497b1']; // Array avec un ensemble de couleur qui va être récupéré plus bas
var theme2 = ['769FCD', 'B9D7EA', 'D6E6F2', 'F7FBFC'];
var theme3 = ['581845','900C3F','C70039','FF5733']
var couleursAleatoires = theme1;
var classecss = ['visible', 'invisible', 'visible', 'visible']; // Array utilisé plus bas pour ajouter des classes et cacher les cellules

function changerLeTheme() { // Fonction permettant de changer le thème de la partie (en cours)
	if (couleursAleatoires == theme1) {
		$(".bar").css({"border-bottom": "10px solid rgb(118, 159, 205)"}); // Cela change également la couleur de la barre
		couleursAleatoires = theme2; // la variable change au cas où l'utilisateur rappel la fonction et pour ainsi changer la couleur du theme
		couleurdescellules();
	}
	else if(couleursAleatoires == theme2) {
		$(".bar").css({"border-bottom": "10px solid #900C3F"});
		couleursAleatoires = theme3;
		couleurdescellules();
	}
	else if(couleursAleatoires == theme3) {
		$(".bar").css({"border-bottom": "10px solid white"});
		couleursAleatoires = theme1;
		couleurdescellules();
	}
}

function couleurdescellules() { // Fonction permettant la création aléatoire des couleurs en fonction des listes ci-dessus
for(var i = 0; i < cellules.length; i++) { // Pour chaque cellule on incrémente i
    cellules[i].style.backgroundColor = '#' + couleursAleatoires[Math.floor(Math.random()*couleursAleatoires.length)]; // Chaque cellule va prendre une couleur aléatoire en fonction de la liste
	}
};
$("td").each(function(){ // Cette fonction va permettre d'ajouter une classe pour chaque td et ainsi la cacher ou non
        $(this).addClass(classecss[Math.floor(Math.random()*classecss.length)]);
});

cellulecss = $('td').css({
	"border": "none",
	"height": nbPixelCellules + "px",
	"opacity": "0.9"
});

// ----------------GESTION MENU--------------

$(document).keyup(function(e) { // Fonction qui s'ouvre à l'ouverture de la page
     if (e.keyCode == 27) { // Si la personne appuye sur échap alors cela ferme le menu
        closemenu();
            }
     if (e.keyCode === 0 || e.keyCode === 32) { // Si la personne appuye sur espace alors cela ouvre le menu
    	menu();
		}

});

function recommencerPartie() {
    if (confirm('Etes vous sur de vouloir recommencer ?')) {
        location.reload(); // Actualise la page
    }
};

function nouvellePartie() {
       location.reload();
};

window.onload=function(){
	couleurdescellules();
};

var premierepartie = true;
function debutdujeu() {
	if (premierepartie){
            premierepartie = false;
          	infoMessage(); 
          	setInterval(zone,5);
        }
};

function vitesseBalle() {
	$('.menu').fadeOut(0).delay(100);
	setInterval(zone,5);
};

var premiereFois = true;
function infoMessage() {
	if (premiereFois){
            premiereFois = false;
            $('.ball').delay(1000).show(0);
            $('.info').show(0).delay(1000).slideUp( 800 ).hide(0); // Permet d'afficher et de cacher la classe info
        }
};

function closemenu() {
	$('.menu').hide(0).delay(1000);
};


function menu() {

	$('.menu').fadeIn(1000).show(0).delay(1000);

};
// ----------------DEPLACEMENT DE LA BALLE--------------
var x = dimensionLargeurGameArea-15; // On définition les dimensions du plateau (moins les bordures et le rayon de la balle)
var y = dimensionLongueurGameArea-15;
var deplacementX = -1; // On créer une variable qui permettra le déplacement de la balle de -1 en -1
var deplacementY = -1;

function deplacementBalle(x,y){ // Fonctionne appelé à chaque déplacement (zone)
	var balle = $('.ball'); // Sélectionne la balle (la classe .ball)
	balle.css('marginTop', y);"px"; // Changement de sa valeur en css avec margin-top qui prend y
	balle.css('marginLeft', x);"px"; // Changement de sa valeur en css avec marginLeft qui prend x
 };

function zone(){ // Fonction appelé avec debutdujeu() et qui fonctionne en permanence avec un setInveral de 5
 if(x + deplacementX > dimensionLargeurGameArea-15 || x + deplacementX < 0) { // Si le déplacement de la balle touche les dimensions à droite ou à gauche de l'aire de jeu
        deplacementX = -deplacementX; // Alors on inverse le déplacement de X
    }
if(y + deplacementY > dimensionLongueurGameArea-15 || y + deplacementY < 0) {
        deplacementY = -deplacementY;
    }
 x = x + deplacementX; // x est la position de la balle sur l'axe des abscices
 y = y + deplacementY; // y est la position de la balle sur l'axe des ordonnés

collision(x,y,xBar); // La fonction collision est appelé en permanence pour vérifier à chaque mouvement de la balle s'il y-a une collision
deplacementBalle(x,y); // Appel la fonction deplacementBalle et renvoie les valeurs de x et de y 
victoire(); // Vérifie si la fonction victoire est vérifié
};


//------------------------ GESTION DES COLLISIONS----------------------

var vies = 3;
var score = 0;
var soncasse = new Audio('casse.mp3'); // Bruitage pour le son d'une brique qui se casse

function collision(x,y,xBar){
	var tds = $("td.visible"); // On récupère chaque td avec la classe visible (cela permet pour la suite de ne pas faire une collision avec une brique invisible)
	var ball = $('.ball')[0];
	var balleRect = ball.getBoundingClientRect(); // Prend les bordures de l'element. (trouvé sur mozilla developer)
for(i = 0; i < tds.length; i++) // Pour chaque td on vérifie les condition ci-dessous en icrémentant i
{
    var tdRect = tds[i].getBoundingClientRect();
    if(balleRect.top < tdRect.bottom && balleRect.bottom > tdRect.top && balleRect.right > tdRect.left && balleRect.left < tdRect.right){
    // if : ma condition permet de contrôler une collision de ma balle avec celle d'une brique en comparant les coordonnées de la balle et de chaque td
        tds[i].classList.remove("visible"); // Si c'est le cas la briqué touché se voit enlevée la classe visible
        soncasse.play(); // Son de la brique qui se casse
        tds[i].className += "invisible"; // Ajout de la classe invisible pour la rendre invisible dans l'aire de jeux
        score ++; // on incrémente score avec +1
        $( ".score h3" ).html(score+'pts | '+vies+' vies'); // Ajout du score et le nombre de vies restantes
        deplacementY = -deplacementY; // Enfin la balle change de y pour la renvoyer vers le côté opposé
    }
}

if (y == dimensionLongueurGameArea-80 && xBar-80<x && x<xBar+60) { // Si la balle rencontre ma barre alors il y a une collision (récupère la dimension de la barre et la compare)
	deplacementY = -deplacementY; // Renvoie la balle vers le côté opposé
		// if (xBar-100<x<xBar-81 && x<xBar+75) {      Condition non aboutie pour changer la balle si cette dernière touche les extrimités de la barre
		// 	deplacementX = -deplacementX;
		// }
}


if (y == dimensionLongueurGameArea-15) { // Si la barre touche le bas de l'aire de jeu
	 vies --; // On décremente vies
		if (vies == 0) { // Si vies vaut 0 alors on renvoie la fonction perdu
				perdu();
			}
		else {
			score -= 5; // On enlève -5 au score actuel
			$( ".score h3" ).html(score+'pts | '+vies+' vies'); // On affiche le nombre de points et le nombre de vies
		}
	}

};

//------------------------CONDITION VICTOIRE/ DEFAITE----------------
var victoiresound = new Audio('bravo.mp3');

function victoire () {
	if ($("td.invisible").length == 30) { // Si chaque td a la classe invisible alors la partie est gagnée
		victoiresound.play(); // Musique de victoire
		alert('Victoire ! Votre score est de : '+score); // On fait une alert avec la victoire et le score
		location.reload();
	}
};

function perdu() {
		$('.loose').fadeIn(0).show(0).delay(1000).fadeOut(1000); // Affiche un texte avec la classe loose qui apparait puis disparait
		setTimeout(function(){
    		location.reload(); // on recharche la page après 500ms
				},500);
	};