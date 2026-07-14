// =============================
// ZEBZER APP CONTROLLER
// =============================


import { scanLink } from "./scanner.js";



// Éléments interface

const urlInput = document.getElementById("urlInput");

const scanBtn = document.getElementById("scanBtn");

const scoreBox = document.getElementById("score");

const statusBox = document.getElementById("status");

const detailsBox = document.getElementById("details");

const historyBox = document.getElementById("history");



// Historique local

let history = JSON.parse(

localStorage.getItem("zebzer_history")

) || [];





// Scanner bouton

scanBtn.addEventListener(

"click",

async()=>{


const url = urlInput.value.trim();



if(!url){

alert(
"Veuillez entrer un lien"
);

return;

}



scoreBox.innerHTML="...";

statusBox.innerHTML="Analyse en cours";

detailsBox.innerHTML=
"ZebZer vérifie la sécurité du lien...";



try{


const result = await scanLink(url);



displayResult(result);



saveHistory(result);



}

catch(error){


console.log(error);


statusBox.innerHTML=
"Erreur pendant l'analyse";


}



}

);






// Afficher résultat

function displayResult(result){



scoreBox.innerHTML =

result.score + "%";



statusBox.innerHTML =

result.level;



detailsBox.innerHTML =

result.details;



}





// Sauvegarder historique

function saveHistory(result){



history.unshift({


url:result.url,


score:result.score,


date:new Date().toLocaleString()


});



if(history.length > 20){


history.pop();


}



localStorage.setItem(

"zebzer_history",

JSON.stringify(history)

);



showHistory();


}






// Affichage historique

function showHistory(){


if(history.length===0){


historyBox.innerHTML=
"Aucune analyse enregistrée.";


return;


}



historyBox.innerHTML="";



history.forEach(item=>{


historyBox.innerHTML += `


<div>

🔗 ${item.url}

<br>

🛡️ Sécurité : ${item.score}%

<br>

📅 ${item.date}

</div>

<hr>


`;


});


}





showHistory();








// Choix abonnement global

window.choosePlan=function(plan){



localStorage.setItem(

"zebzer_plan",

plan

);



alert(

"Formule choisie : "+plan

);


};
