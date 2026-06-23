import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getDatabase,
    ref,
    set,
    onValue
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// ======================
// Firebase
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

const app =
    initializeApp(firebaseConfig);

const db =
    getDatabase(app);

// ======================
// User
// ======================
const user = JSON.parse(
    localStorage.getItem(
        "s4s_user"
    )
);

if (!user) {

    window.location.href =
        "./index.html";

}

// ======================
// Avatar
// ======================
const avatar =
    document.getElementById(
        "profileAvatar"
    );

if (
    avatar &&
    user.picture
) {

    avatar.src =
        user.picture;

}

// ======================
// Load Profile
// ======================
onValue(
    ref(
        db,
        "profiles/" +
        user.email.replace(
            /\./g,
            "_"
        )
    ),
    snapshot => {

        const data =
            snapshot.val();

        if (!data)
            return;

        document
            .getElementById(
                "profileName"
            )
            .value =
            data.name || "";

        document
            .getElementById(
                "profilePhone"
            )
            .value =
            data.phone || "";

        document
            .getElementById(
                "profileLastfm"
            )
            .value =
            data.lastfm || "";

    }
);

// ======================
// Save
// ======================
document
    .getElementById(
        "saveProfile"
    )
    .onclick = () => {

        set(
            ref(
                db,
                "profiles/" +
                user.email.replace(
                    /\./g,
                    "_"
                )
            ),
            {

                name:
                    document
                    .getElementById(
                        "profileName"
                    )
                    .value,

                phone:
                    document
                    .getElementById(
                        "profilePhone"
                    )
                    .value,

                lastfm:
                    document
                    .getElementById(
                        "profileLastfm"
                    )
                    .value,

                picture:
                    user.picture

            }
        );

        alert(
            "PROFILE SAVED"
        );

    };

// ======================
// Back
// ======================
document
    .getElementById(
        "backDashboard"
    )
    .onclick = () => {

        window.location.href =
            "./dashboard.html";

    };
