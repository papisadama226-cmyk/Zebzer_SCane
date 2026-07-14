// =============================
// ZEBZER SECURITY SCANNER
// =============================



export async function scanLink(url){


let score = 100;


let details = [];





try{


const website = new URL(url);





// Vérification HTTPS


if(website.protocol !== "https:"){


score -=20;


details.push(
"⚠️ Le site n'utilise pas HTTPS"
);


}

else{


details.push(
"✅ Connexion HTTPS sécurisée"
);


}





// Vérification longueur domaine


if(website.hostname.length < 6){


score -=15;


details.push(
"⚠️ Domaine inhabituel"
);


}







// Détection mots suspects


const dangerWords = [


"login",

"signin",

"verify",

"password",

"bank",

"wallet",

"gift",

"free",

"claim",

"update"


];





dangerWords.forEach(word=>{


if(url.toLowerCase().includes(word)){


score -=10;


details.push(

"⚠️ Mot suspect détecté : "

+ word

);


}


});







// Vérification caractères suspects


if(url.includes("@")){


score -=20;


details.push(

"⚠️ Adresse contenant un caractère suspect"

);


}







// Limite score


if(score < 0){

score = 0;

}







let level;



if(score >=80){


level =

"🟢 Site probablement sûr";


}

else if(score >=50){


level =

"🟠 Risque moyen";


}

else{


level =

"🔴 Site dangereux";


}







if(details.length===0){


details.push(

"✅ Aucun problème détecté"

);


}








return {


url:url,


score:score,


level:level,


details:details.join("<br>")


};



}
catch(error){



return {


url:url,


score:0,


level:"🔴 Lien invalide",


details:

"❌ Cette adresse n'est pas valide"


};



}


}
