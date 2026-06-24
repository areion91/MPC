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
// BACK
// ======================

document
    .getElementById(
        "backBtn"
    )
    ?.addEventListener(
        "click",
        () => {

            window.location.href =
                "./dashboard.html";

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
// SHOW PENCIL
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

        if (!data)
            return;

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
// SAVE DESCRIPTION
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
// EDIT FUNCTION
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
            e => {

                e.stopPropagation();

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
// OPEN PLAYLIST PAGE
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
// TEMP COVER
// ======================

document.getElementById("primeCover").src =
"./img/premium.png";

document.getElementById("upmooCover").src =
"./img/premium.png";

document.getElementById("lgmelCover").src =
"./img/premium.png";

document.getElementById("cahinCover").src =
"./img/premium.png";

document.getElementById("gimixCover").src =
"./img/premium.png";

document.getElementById("bbrisCover").src =
"./img/premium.png";

document.getElementById("inmixCover").src =
"./img/premium.png";

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
                        Math.random() * 45
                    ) + 8
                ) + "px";

        });

    }, 120);

}
