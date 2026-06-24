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

const app =
    initializeApp(firebaseConfig);

const db =
    getDatabase(app);

// ======================
// USER
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
// AVATAR
// ======================

const avatar =
    document.getElementById(
        "avatar"
    );

if (
    avatar &&
    user.picture
) {

    avatar.src =
        user.picture;

}

// ======================
// PROFILE
// ======================

document
    .getElementById(
        "profileBtn"
    )
    ?.addEventListener(
        "click",
        () => {

            window.location.href =
                "./profile.html";

        }
    );

// ======================
// ADMIN
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
// WELCOME
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
// LOAD PLAYLIST DATA
// ======================

onValue(
    ref(db, "playlist"),
    snapshot => {

        const data =
            snapshot.val();

        if (!data)
            return;

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
                data.indieTitle ||
                "INDIE TRENDING";

        if (indieDesc)
            indieDesc.textContent =
                data.indieDesc ||
                "FREE COMMUNITY PLAYLIST";

        if (primeTitle)
            primeTitle.textContent =
                data.primeTitle ||
                "PRIME ZONE";

        if (primeDesc)
            primeDesc.textContent =
                data.primeDesc ||
                "PREMIUM MEMBER PLAYLIST";

    }
);

// ======================
// SHOW EDIT ICON
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
// SAVE DATA
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
// EDIT FUNCTION
// ======================

function enableEdit(
    buttonId,
    targetId,
    title
) {

    document
        .getElementById(
            buttonId
        )
        ?.addEventListener(
            "click",
            () => {

                if (!isAdmin)
                    return;

                const value =
                    prompt(

                        title,

                        document
                        .getElementById(
                            targetId
                        )
                        .textContent

                    );

                if (
                    value &&
                    value.trim() !== ""
                ) {

                    document
                        .getElementById(
                            targetId
                        )
                        .textContent =
                        value;

                    savePlaylist();

                }

            }
        );

}

// ======================
// ENABLE EDIT
// ======================

enableEdit(
    "editIndieTitle",
    "indieTitle",
    "INDIE TITLE"
);

enableEdit(
    "editIndieDesc",
    "indieDesc",
    "INDIE DESCRIPTION"
);

enableEdit(
    "editPrimeTitle",
    "primeTitle",
    "PRIME TITLE"
);

enableEdit(
    "editPrimeDesc",
    "primeDesc",
    "PRIME DESCRIPTION"
);

// ======================
// FREE PAGE
// ======================

document
    .getElementById(
        "indie"
    )
    ?.addEventListener(
        "click",
        () => {

            window.location.href =
                "./free.html";

        }
    );

// ======================
// PREMIUM PAGE
// ======================

document
    .getElementById(
        "prime"
    )
    ?.addEventListener(
        "click",
        () => {

            window.location.href =
                "./premium.html";

        }
    );

// ======================
// EQUALIZER
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
