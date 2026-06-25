import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getDatabase,
    ref,
    set,
    onValue
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

/* FIREBASE */

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

/* USER */

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

/* AVATAR */

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

/* PROFILE */

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

/* ADMIN */

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

/* WELCOME */

const welcome =
    document.getElementById(
        "welcome"
    );

if (isAdmin) {

    welcome.textContent =
        "WELCOME, ADMIN";

    const adminArea =
        document.getElementById(
            "adminArea"
        );

    if(adminArea){

        adminArea.classList.add(
            "show"
        );

    }

    const adminBtn =
        document.getElementById(
            "adminBtn"
        );

    if(adminBtn){

        adminBtn.addEventListener(
            "click",
            () => {

                window.location.href =
                    "./admin.html";

            }
        );

    }

} else {

    welcome.textContent =
        "WELCOME, " +
        (
            user.name ||
            "USER"
        ).toUpperCase();

}

/* SHOW EDIT */

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

/* LOAD */

onValue(
    ref(db, "dashboard"),
    snapshot => {

        const data =
            snapshot.val();

        if (!data)
            return;

        document.getElementById(
            "freeTitle"
        ).textContent =
            data.freeTitle ||
            "FREE";

        document.getElementById(
            "premiumTitle"
        ).textContent =
            data.premiumTitle ||
            "PREMIUM";

        document.getElementById(
            "freeDesc"
        ).textContent =
            data.freeDesc ||
            "";

        document.getElementById(
            "premiumDesc"
        ).textContent =
            data.premiumDesc ||
            "";

    }
);

/* SAVE */

function saveDashboard() {

    set(
        ref(
            db,
            "dashboard"
        ),
        {

            freeTitle:
                document
                .getElementById(
                    "freeTitle"
                )
                .textContent,

            freeDesc:
                document
                .getElementById(
                    "freeDesc"
                )
                .textContent,

            premiumTitle:
                document
                .getElementById(
                    "premiumTitle"
                )
                .textContent,

            premiumDesc:
                document
                .getElementById(
                    "premiumDesc"
                )
                .textContent

        }
    );

}

/* FREE TITLE */

document
    .getElementById(
        "editFreeTitle"
    )
    ?.addEventListener(
        "click",
        () => {

            if (!isAdmin)
                return;

            const value =
                prompt(
                    "FREE TITLE",
                    document
                        .getElementById(
                            "freeTitle"
                        )
                        .textContent
                );

            if (
                value &&
                value.trim()
            ) {

                document
                    .getElementById(
                        "freeTitle"
                    )
                    .textContent =
                    value;

                saveDashboard();

            }

        }
    );

/* FREE DESC */

document
    .getElementById(
        "editFreeDesc"
    )
    ?.addEventListener(
        "click",
        () => {

            if (!isAdmin)
                return;

            const value =
                prompt(
                    "FREE DESCRIPTION",
                    document
                        .getElementById(
                            "freeDesc"
                        )
                        .textContent
                );

            if (value !== null) {

                document
                    .getElementById(
                        "freeDesc"
                    )
                    .textContent =
                    value;

                saveDashboard();

            }

        }
    );

/* PREMIUM TITLE */

document
    .getElementById(
        "editPremiumTitle"
    )
    ?.addEventListener(
        "click",
        () => {

            if (!isAdmin)
                return;

            const value =
                prompt(
                    "PREMIUM TITLE",
                    document
                        .getElementById(
                            "premiumTitle"
                        )
                        .textContent
                );

            if (
                value &&
                value.trim()
            ) {

                document
                    .getElementById(
                        "premiumTitle"
                    )
                    .textContent =
                    value;

                saveDashboard();

            }

        }
    );

/* PREMIUM DESC */

document
    .getElementById(
        "editPremiumDesc"
    )
    ?.addEventListener(
        "click",
        () => {

            if (!isAdmin)
                return;

            const value =
                prompt(
                    "PREMIUM DESCRIPTION",
                    document
                        .getElementById(
                            "premiumDesc"
                        )
                        .textContent
                );

            if (value !== null) {

                document
                    .getElementById(
                        "premiumDesc"
                    )
                    .textContent =
                    value;

                saveDashboard();

            }

        }
    );

/* OPEN PAGE */

document
    .getElementById(
        "free"
    )
    ?.addEventListener(
        "click",
        () => {

            window.location.href =
                "./free.html";

        }
    );

document
    .getElementById(
        "premium"
    )
    ?.addEventListener(
        "click",
        () => {

            window.location.href =
                "./premium.html";

        }
    );

/* EQUALIZER */

const bars =
    document.querySelectorAll(
        ".equalizer span"
    );

setInterval(() => {

    bars.forEach(bar => {

        bar.style.height =
            (
                Math.random() * 45 +
                8
            ) + "px";

    });

}, 120);
