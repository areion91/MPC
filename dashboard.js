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

// ======================
// Belum Login
// ======================
if (!user) {

    window.location.href =
        "./index.html";

}

// ======================
// Avatar
// ======================
const avatar =
    document.getElementById(
        "avatar"
    );

if (avatar && user.picture) {

    avatar.src =
        user.picture;

}

// ======================
// Open Profile
// ======================
document
    .getElementById(
        "profileBtn"
    )
    .onclick = () => {

        window.location.href =
            "./profile.html";

    };

// ======================
// Admin
// ======================
const ADMINS = [

    "areionproject@gmail.com",
    "ayigh77@gmail.com",
    "weeraster0@gmail.com"

];

const isAdmin =
    user.email &&
    ADMINS.includes(
        user.email.toLowerCase()
    );

// ======================
// Welcome
// ======================
if (isAdmin) {

    document
        .getElementById(
            "welcome"
        )
        .textContent =
        "WELCOME, ADMIN";

} else {

    document
        .getElementById(
            "welcome"
        )
        .textContent =
        `WELCOME, ${
            (
                user.name ||
                "USER"
            )
            .toUpperCase()
        }`;

}

// ======================
// Load Firebase Playlist
// ======================
onValue(
    ref(db, "playlist"),
    snapshot => {

        const data =
            snapshot.val();

        if (!data) return;

        document
            .getElementById(
                "indieTitle"
            )
            .textContent =
            data.indieTitle;

        document
            .getElementById(
                "indieDesc"
            )
            .textContent =
            data.indieDesc;

        document
            .getElementById(
                "primeTitle"
            )
            .textContent =
            data.primeTitle;

        document
            .getElementById(
                "primeDesc"
            )
            .textContent =
            data.primeDesc;

    }
);

// ======================
// Tampilkan Pensil
// ======================
if (isAdmin) {

    document
        .querySelectorAll(
            ".edit"
        )
        .forEach(edit => {

            edit.style.display =
                "inline";

        });

}

// ======================
// Edit Indie Title
// ======================
document
    .getElementById(
        "editIndieTitle"
    )
    .onclick = () => {

        if (!isAdmin) return;

        const value = prompt(
            "INDIE TITLE",
            document
                .getElementById(
                    "indieTitle"
                )
                .textContent
        );

        if (
            value !== null &&
            value.trim() !== ""
        ) {

            document
                .getElementById(
                    "indieTitle"
                )
                .textContent =
                value;

            savePlaylist();

        }

    };

// ======================
// Edit Indie Desc
// ======================
document
    .getElementById(
        "editIndieDesc"
    )
    .onclick = () => {

        if (!isAdmin) return;

        const value = prompt(
            "INDIE DESCRIPTION",
            document
                .getElementById(
                    "indieDesc"
                )
                .textContent
        );

        if (
            value !== null &&
            value.trim() !== ""
        ) {

            document
                .getElementById(
                    "indieDesc"
                )
                .textContent =
                value;

            savePlaylist();

        }

    };

// ======================
// Edit Prime Title
// ======================
document
    .getElementById(
        "editPrimeTitle"
    )
    .onclick = () => {

        if (!isAdmin) return;

        const value = prompt(
            "PRIME TITLE",
            document
                .getElementById(
                    "primeTitle"
                )
                .textContent
        );

        if (
            value !== null &&
            value.trim() !== ""
        ) {

            document
                .getElementById(
                    "primeTitle"
                )
                .textContent =
                value;

            savePlaylist();

        }

    };

// ======================
// Edit Prime Desc
// ======================
document
    .getElementById(
        "editPrimeDesc"
    )
    .onclick = () => {

        if (!isAdmin) return;

        const value = prompt(
            "PRIME DESCRIPTION",
            document
                .getElementById(
                    "primeDesc"
                )
                .textContent
        );

        if (
            value !== null &&
            value.trim() !== ""
        ) {

            document
                .getElementById(
                    "primeDesc"
                )
                .textContent =
                value;

            savePlaylist();

        }

    };

// ======================
// Save Firebase
// ======================
function savePlaylist() {

    set(
        ref(
            db,
            "playlist"
        ),
        {

            indieTitle:
                document
                .getElementById(
                    "indieTitle"
                )
                .textContent,

            indieDesc:
                document
                .getElementById(
                    "indieDesc"
                )
                .textContent,

            primeTitle:
                document
                .getElementById(
                    "primeTitle"
                )
                .textContent,

            primeDesc:
                document
                .getElementById(
                    "primeDesc"
                )
                .textContent

        }
    );

}

// ======================
// Playlist
// ======================
document
    .getElementById(
        "indie"
    )
    .onclick = () => {

        window.location.href =
            "./indie.html";

    };

document
    .getElementById(
        "prime"
    )
    .onclick = () => {

        window.location.href =
            "./primezone.html";

    };

// ======================
// Logout
// ======================
document
    .getElementById(
        "logout"
    )
    .onclick = () => {

        localStorage.removeItem(
            "s4s_user"
        );

        window.location.href =
            "../index.html";

    };

// ======================
// Equalizer
// ======================
const bars =
    document.querySelectorAll(
        ".equalizer span"
    );

if (bars.length > 0) {

    setInterval(() => {

        bars.forEach(bar => {

            bar.style.height =
                (
                    Math.floor(
                        Math.random() * 42
                    ) + 8
                ) + "px";

        });

    }, 120);

}
