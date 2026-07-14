// =============================
// ZEBZER PAYMENT SYSTEM
// =============================


import { db } from "./firebase.js";


import {

collection,

addDoc

}

from

"https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";







// Lien Fineo Pay


const FINEO_PAY =

"https://app.fineopay.com/hkmi_touroi_lNv/bamba_9tO/checkout";







// Bouton paiement


const payBtn = document.getElementById(

"payBtn"

);







if(payBtn){



payBtn.addEventListener(

"click",

()=>{


window.open(

FINEO_PAY,

"_blank"

);



}

);



}









// Enregistrer une demande paiement


export async function createPayment(


userID,

plan,

amount


){



try{



await addDoc(

collection(db,"payments"),

{


userID:userID,


plan:plan,


amount:amount,


status:"PENDING",


createdAt:new Date()


}


);





return true;



}

catch(error){



console.log(

"Erreur paiement",

error

);



return false;



}



}









// Liste des prix ZebZer


export const prices = {


FREE:0,


NORMAL:500,


PRO:1000,


ELITE:1500


};
