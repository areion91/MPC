import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getDatabase,
    ref,
    set,
    get
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
// LOAD PROFILE
// ======================
get(
    ref(
        db,
        "users/" + user.email.replace(/\./g,"_")
    )
).then(snapshot => {

    if (!snapshot.exists())
        return;

    const data =
        snapshot.val();

    document.getElementById(
        "profileName"
    ).value =
        data.name || "";

    document.getElementById(
        "profilePhone"
    ).value =
        data.phone || "";

    // LAST FM
    if (data.lastfm) {

        data.lastfm.forEach(
            (name, index) => {

                const num =
                    index + 1;

                const input =
                    document.getElementById(
                        "lastfm" + num
                    );

                if (input) {

                    input.value =
                        name;

                }

                if (num > 1) {

                    document
                        .getElementById(
                            "row" + num
                        )
                        .style.display =
                        "flex";

                }

            }
        );

    }

    // PRIMARY
    if (data.primary) {

        document
            .querySelectorAll(
                ".primaryBtn"
            )
            .forEach(btn => {

                btn.textContent =
                    "○";

            });

        const index =
            data.primary;

        const btn =
            document.querySelector(
                `[data-slot="${index}"]`
            );

        if (btn) {

            btn.textContent =
                "●";

        }

    }

});

// ======================
// ADD LASTFM
// ======================
let visibleRows = 1;

document
    .getElementById(
        "addLastfm"
    )
    .onclick = () => {

        if (
            visibleRows >= 5
        ) return;

        visibleRows++;

        document
            .getElementById(
                "row" +
                visibleRows
            )
            .style.display =
            "flex";

        if (
            visibleRows === 5
        ) {

            document
                .getElementById(
                    "addLastfm"
                )
                .style.display =
                "none";

        }

    };

// ======================
// PRIMARY
// ======================
document
    .querySelectorAll(
        ".primaryBtn"
    )
    .forEach(btn => {

        btn.onclick = () => {

            document
                .querySelectorAll(
                    ".primaryBtn"
                )
                .forEach(b => {

                    b.textContent =
                        "○";

                });

            btn.textContent =
                "●";

            savePrimary(
                btn.dataset.slot
            );

        };

    });

// ======================
// SAVE PRIMARY
// ======================
function savePrimary(slot) {

    set(
        ref(
            db,
            "users/" +
            user.email.replace(
                /\./g,
                "_"
            ) +
            "/primary"
        ),
        slot
    );

}

// ======================
// SAVE PROFILE
// ======================
document
    .getElementById(
        "saveProfile"
    )
    .onclick = () => {

        const lastfm = [];

        for (
            let i = 1;
            i <= 5;
            i++
        ) {

            const value =
                document
                    .getElementById(
                        "lastfm" + i
                    )
                    .value
                    .trim();

            if (value) {

                lastfm.push(
                    value
                );

            }

        }

        const active =
            document.querySelector(
                ".primaryBtn"
            );

        set(
            ref(
                db,
                "users/" +
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
                    lastfm,

                primary:
                    document
                        .querySelector(
                            "span[data-slot][style]"
                        )?.dataset
                        .slot || 1

            }

        );

        alert(
            "PROFILE SAVED"
        );

    };

// ======================
// BACK
// ======================
document
    .getElementById(
        "backBtn"
    )
    .onclick = () => {

        window.location.href =
            "./dashboard.html";

    };

// ======================
// LOGOUT
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
            "./index.html";

    };
