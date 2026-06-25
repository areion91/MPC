import {
    initializeApp
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getAuth,
    GoogleAuthProvider,
    signInWithRedirect,
    getRedirectResult,
    onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// ======================
// FIREBASE
// ======================
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

// ======================
// INIT
// ======================
const app =
    initializeApp(
        firebaseConfig
    );

const auth =
    getAuth(
        app
    );

const provider =
    new GoogleAuthProvider();

// ======================
// LOGIN BUTTON
// ======================
document
    .getElementById(
        "googleLogin"
    )
    ?.addEventListener(
        "click",

        () => {

            signInWithRedirect(
                auth,
                provider
            );

        }

    );

// ======================
// REDIRECT RESULT
// ======================
getRedirectResult(auth)

.then(result => {

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

.catch(error => {

    console.error(error);

    alert(

        error.code +
        "\n\n" +
        error.message

    );

});

// ======================
// AUTO LOGIN
// ======================
onAuthStateChanged(

    auth,

    user => {

        if (!user)
            return;

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

        if (
            !window.location.pathname
            .includes(
                "dashboard"
            )
        ) {

            window.location.href =
                "./dashboard.html";

        }

    }

);
