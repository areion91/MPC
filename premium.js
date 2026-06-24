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

const user =
    JSON.parse(
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
// SHOW EDIT
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
// LOAD DESCRIPTION
// ======================

onValue(

    ref(
        db,
        "premium"
    ),

    snapshot => {

        const data =
            snapshot.val();

        if (!data) return;

        if (data.prime)
            document.getElementById(
                "primeDesc"
            ).textContent =
            data.prime;

        if (data.upmoo)
            document.getElementById(
                "upmooDesc"
            ).textContent =
            data.upmoo;

        if (data.lgmel)
            document.getElementById(
                "lgmelDesc"
            ).textContent =
            data.lgmel;

        if (data.cahin)
            document.getElementById(
                "cahinDesc"
            ).textContent =
            data.cahin;

        if (data.gimix)
            document.getElementById(
                "gimixDesc"
            ).textContent =
            data.gimix;

        if (data.bbris)
            document.getElementById(
                "bbrisDesc"
            ).textContent =
            data.bbris;

        if (data.inmix)
            document.getElementById(
                "inmixDesc"
            ).textContent =
            data.inmix;

    }

);

// ======================
// SAVE
// ======================

function saveDesc(
    key,
    value
){

    set(

        ref(
            db,
            "premium/" + key
        ),

        value

    );

}

// ======================
// EDIT
// ======================

function setupEdit(
    button,
    key,
    target
){

    document
        .getElementById(button)
        ?.addEventListener(
            "click",
            () => {

                if (!isAdmin)
                    return;

                const value =
                    prompt(
                        "DESCRIPTION",
                        document
                            .getElementById(
                                target
                            )
                            .textContent
                    );

                if (
                    value !== null
                ){

                    saveDesc(
                        key,
                        value
                    );

                }

            }
        );

}

setupEdit(
    "editPrimeDesc",
    "prime",
    "primeDesc"
);

setupEdit(
    "editUpmooDesc",
    "upmoo",
    "upmooDesc"
);

setupEdit(
    "editLgmelDesc",
    "lgmel",
    "lgmelDesc"
);

setupEdit(
    "editCahinDesc",
    "cahin",
    "cahinDesc"
);

setupEdit(
    "editGimixDesc",
    "gimix",
    "gimixDesc"
);

setupEdit(
    "editBbrisDesc",
    "bbris",
    "bbrisDesc"
);

setupEdit(
    "editInmixDesc",
    "inmix",
    "inmixDesc"
);

// ======================
// PAGE
// ======================

document
    .getElementById(
        "prime"
    )
    ?.addEventListener(
        "click",
        () => {

            window.location.href =
                "./prime.html";

        }
    );

document
    .getElementById(
        "upmoo"
    )
    ?.addEventListener(
        "click",
        () => {

            window.location.href =
                "./upmoo.html";

        }
    );

document
    .getElementById(
        "lgmel"
    )
    ?.addEventListener(
        "click",
        () => {

            window.location.href =
                "./lgmel.html";

        }
    );

document
    .getElementById(
        "cahin"
    )
    ?.addEventListener(
        "click",
        () => {

            window.location.href =
                "./cahin.html";

        }
    );

document
    .getElementById(
        "gimix"
    )
    ?.addEventListener(
        "click",
        () => {

            window.location.href =
                "./gimix.html";

        }
    );

document
    .getElementById(
        "bbris"
    )
    ?.addEventListener(
        "click",
        () => {

            window.location.href =
                "./bbris.html";

        }
    );

document
    .getElementById(
        "inmix"
    )
    ?.addEventListener(
        "click",
        () => {

            window.location.href =
                "./inmix.html";

        }
    );

// ======================
// COVER
// ======================

document.getElementById("primeCover").src =
"https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84";

document.getElementById("upmooCover").src =
"https://picsum.photos/300?1";

document.getElementById("lgmelCover").src =
"https://picsum.photos/300?2";

document.getElementById("cahinCover").src =
"https://picsum.photos/300?3";

document.getElementById("gimixCover").src =
"https://picsum.photos/300?4";

document.getElementById("bbrisCover").src =
"https://picsum.photos/300?5";

document.getElementById("inmixCover").src =
"https://picsum.photos/300?6";

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
                        Math.random() * 35
                    ) + 8

                ) + "px";

        });

    }, 120);

}
