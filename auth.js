// =============================
// ZEBZER AUTH SYSTEM
// =============================


import { auth, db } from "./firebase.js";


import {

createUserWithEmailAndPassword,

signInWithEmailAndPassword,

signOut

}

from

"https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";



import {

doc,

setDoc,

getDoc

}

from

"https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";






// Éléments interface


const emailInput = document.getElementById("email");

const passwordInput = document.getElementById("password");

const accountMessage = document.getElementById("accountMessage");

const registerBtn = document.getElementById("registerBtn");

const loginBtn = document.getElementById("loginBtn");






// Création compte


registerBtn.addEventListener(

"click",

async()=>{


const email = emailInput.value.trim();

const password = passwordInput.value.trim();



if(!email || !password){

accountMessage.innerHTML =
"⚠️ Remplissez les champs";

return;

}



try{


const result = await createUserWithEmailAndPassword(

auth,

email,

password

);



const user = result.user;



// Création profil Firestore


await setDoc(

doc(db,"users",user.uid),

{


email:email,


subscription:"FREE",


pieces:15,


active:true,


createdAt:new Date()


}


);



accountMessage.innerHTML =

"✅ Compte créé avec succès";


}


catch(error){


accountMessage.innerHTML =

"❌ "+error.message;


}



}

);









// Connexion


loginBtn.addEventListener(

"click",

async()=>{


const email = emailInput.value.trim();

const password = passwordInput.value.trim();



try{


await signInWithEmailAndPassword(

auth,

email,

password

);



accountMessage.innerHTML =

"✅ Connexion réussie";


}


catch(error){


accountMessage.innerHTML =

"❌ "+error.message;


}



}

);








// Fonction récupérer profil


export async function getUserProfile(uid){



const userRef = doc(

db,

"users",

uid

);



const userSnap = await getDoc(userRef);



if(userSnap.exists()){


return userSnap.data();


}



return null;


}








// Déconnexion disponible


export async function logout(){


await signOut(auth);


}
