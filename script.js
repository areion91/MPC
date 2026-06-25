import {
    initializeApp
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getAuth,
    GoogleAuthProvider,
    signInWithRedirect,
    getRedirectResult
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// FIREBASE
const firebaseConfig = {

    apiKey:
        "AIzaSyD1qVByOVP_oLxyjVrE7zLNAHKwA5o3IyU",

    authDomain:
        "stream4stream-eda97.firebaseapp.com",

    databaseURL:
        "https://stream4stream-eda97-default-rtdb.asia-southeast1.firebasedatabase.app",

    projectId:
        "stream4stream-eda97",

    storageBucket:
        "stream4stream-eda97.firebasestorage.app",

    messagingSenderId:
        "315567847124",

    appId:
        "1:315567847124:web:8ce342a02b38b030f26d41"

};

const app =
    initializeApp(
        firebaseConfig
    );

const auth =
    getAuth(app);

const provider =
    new GoogleAuthProvider();

// HASIL LOGIN
getRedirectResult(auth)

.then((result) => {

    if (!result)
        return;

    const user =
        result.user;

    localStorage.setItem(
        "s4s_user",
        JSON.stringify({

            uid:
                user.uid,

            name:
                user.displayName,

            email:
                user.email,

            picture:
                user.photoURL

        })
    );

    window.location.href =
        "./dashboard.html";

})

.catch((error) => {

    alert(
        error.code
    );

});

// TOMBOL LOGIN
document
.getElementById(
    "googleLogin"
)
.addEventListener(
    "click",

    () => {

        signInWithRedirect(
            auth,
            provider
        );

    }

);
