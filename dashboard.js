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
const profileBtn =
    document.getElementById(
        "profileBtn"
    );

if (profileBtn) {

    profileBtn.addEventListener(
        "click",
        () => {

            window.location.href =
                "./profile.html";

        }
    );

}

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
const welcome =
    document.getElementById(
        "welcome"
    );

if (welcome) {

    if (isAdmin) {

        welcome.textContent =
            "WELCOME, ADMIN";

    } else {

        welcome.textContent =
            `WELCOME, ${
                (
                    user.name ||
                    "USER"
                )
                .toUpperCase()
            }`;

    }

}

// ======================
// Show Create Playlist
// ======================
const createBtn =
    document.getElementById(
        "createPlaylist"
    );

if (
    isAdmin &&
    createBtn
) {

    createBtn.style.display =
        "block";

}

// ======================
// Create Playlist
// ======================
if (createBtn) {

    createBtn.onclick =
        () => {

            window.location.href =
                "./create.html";

        };

}

// ======================
// Load Playlist
// ======================
onValue(
    ref(db, "playlist"),
    snapshot => {

        const data =
            snapshot.val();

        if (!data) return;

        const indieTitle =
            document.getElementById(
                "indieTitle"
            );

        const indieDesc =
            document.getElementById(
                "indieDesc"
            );

        const primeTitle =
            document.getElementById(
                "primeTitle"
            );

        const primeDesc =
            document.getElementById(
                "primeDesc"
            );

        if (indieTitle)
            indieTitle.textContent =
                data.indieTitle;

        if (indieDesc)
            indieDesc.textContent =
                data.indieDesc;

        if (primeTitle)
            primeTitle.textContent =
                data.primeTitle;

        if (primeDesc)
            primeDesc.textContent =
                data.primeDesc;

    }
);

// ======================
// Show Edit Icon
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
// Save Playlist
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
// Edit Indie Title
// ======================
document
    .getElementById(
        "editIndieTitle"
    )?.addEventListener(
        "click",
        () => {

            if (!isAdmin) return;

            const value =
                prompt(
                    "INDIE TITLE",
                    document
                        .getElementById(
                            "indieTitle"
                        )
                        .textContent
                );

            if (
                value &&
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

        }
    );

// ======================
// Edit Indie Desc
// ======================
document
    .getElementById(
        "editIndieDesc"
    )?.addEventListener(
        "click",
        () => {

            if (!isAdmin) return;

            const value =
                prompt(
                    "INDIE DESCRIPTION",
                    document
                        .getElementById(
                            "indieDesc"
                        )
                        .textContent
                );

            if (
                value &&
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

        }
    );

// ======================
// Edit Prime Title
// ======================
document
    .getElementById(
        "editPrimeTitle"
    )?.addEventListener(
        "click",
        () => {

            if (!isAdmin) return;

            const value =
                prompt(
                    "PRIME TITLE",
                    document
                        .getElementById(
                            "primeTitle"
                        )
                        .textContent
                );

            if (
                value &&
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

        }
    );

// ======================
// Edit Prime Desc
// ======================
document
    .getElementById(
        "editPrimeDesc"
    )?.addEventListener(
        "click",
        () => {

            if (!isAdmin) return;

            const value =
                prompt(
                    "PRIME DESCRIPTION",
                    document
                        .getElementById(
                            "primeDesc"
                        )
                        .textContent
                );

            if (
                value &&
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

        }
    );

// ======================
// Playlist Button
// ======================
document
    .getElementById(
        "indie"
    )?.addEventListener(
        "click",
        () => {

            window.location.href =
                "./indie.html";

        }
    );

document
    .getElementById(
        "prime"
    )?.addEventListener(
        "click",
        () => {

            window.location.href =
                "./primezone.html";

        }
    );

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
