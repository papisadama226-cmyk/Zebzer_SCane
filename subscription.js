// =============================
// ZEBZER SUBSCRIPTION SYSTEM
// =============================


import { db } from "./firebase.js";


import {

doc,

getDoc,

updateDoc

}

from

"https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";






let selectedPlan = "";





// Choisir une formule


window.choosePlan = function(plan){


selectedPlan = plan;



localStorage.setItem(

"zebzer_plan",

plan

);



alert(

"Formule sélectionnée : "+plan

);



};







// Formules ZebZer


const plans = {


FREE:{

price:0,

pieces:15

},


NORMAL:{

price:500,

pieces:200

},


PRO:{

price:1000,

pieces:1000

},


ELITE:{

price:1500,

pieces:5000

}



};








// Activation code


const activateBtn = document.getElementById(

"activateBtn"

);





if(activateBtn){



activateBtn.addEventListener(

"click",

async()=>{



const codeInput = document.getElementById(

"activationCode"

);



const message = document.getElementById(

"paymentMessage"

);



const code = codeInput.value.trim();






if(!selectedPlan){


message.innerHTML =

"⚠️ Choisissez une formule";


return;


}




if(!code){


message.innerHTML =

"⚠️ Entrez votre code";


return;


}







try{



const codeRef = doc(

db,

"activation_codes",

code

);



const codeSnap = await getDoc(codeRef);






if(!codeSnap.exists()){


message.innerHTML =

"❌ Code invalide";


return;


}






const data = codeSnap.data();






if(data.used === true){


message.innerHTML =

"❌ Code déjà utilisé";


return;


}







if(data.plan !== selectedPlan){


message.innerHTML =

"❌ Ce code ne correspond pas à cette formule";


return;


}







await updateDoc(

codeRef,

{


used:true


}


);






message.innerHTML =

"✅ Abonnement "

+selectedPlan+

" activé";





localStorage.setItem(

"zebzer_subscription",

selectedPlan

);



}



catch(error){



message.innerHTML =

"Erreur activation";


console.log(error);



}



}

);



}
