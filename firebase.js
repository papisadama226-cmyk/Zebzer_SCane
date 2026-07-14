// =============================
// ZEBZER FIREBASE CONFIG
// =============================


import { initializeApp }

from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";



import { getAuth }

from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";



import { getFirestore }

from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";



import { getStorage }

from "https://www.gstatic.com/firebasejs/12.16.0/firebase-storage.js";






// Configuration Firebase ZebZer


const firebaseConfig = {


apiKey:

"AIzaSyB_C5WwHMbJFGRLmaESwDcx7aECSXSgsZs",



authDomain:

"zebzer-c01a1.firebaseapp.com",



projectId:

"zebzer-c01a1",



storageBucket:

"zebzer-c01a1.firebasestorage.app",



messagingSenderId:

"491956722769",



appId:

"1:491956722769:web:42e88d0edc4961936c6c70"


};






// Initialisation


const app = initializeApp(firebaseConfig);





// Services disponibles


export const auth = getAuth(app);



export const db = getFirestore(app);



export const storage = getStorage(app);





export default app;
