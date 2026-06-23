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
// USER PATH
// ======================
const userPath =
    "users/" +
    user.email.replace(
        /\./g,
        "_"
    );

let selectedPrimary = 1;

// ======================
// LOAD PROFILE
// ======================
get(
    ref(
        db,
        userPath
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

    // LASTFM
    if (data.lastfm) {

        data.lastfm.forEach(
            (name, index) => {

                const slot =
                    index + 1;

                const input =
                    document.getElementById(
                        "lastfm" + slot
                    );

                if (input) {

                    input.value =
                        name;

                }

                if (slot > 1) {

                    document
                        .getElementById(
                            "row" + slot
                        )
                        .style.display =
                        "flex";

                }

            }
        );

    }

    // PRIMARY
    if (data.primary) {

        selectedPrimary =
            Number(
                data.primary
            );

    }

    updatePrimary();

});

// ======================
// PRIMARY UI
// ======================
function updatePrimary() {

    document
        .querySelectorAll(
            ".primaryBtn"
        )
        .forEach(btn => {

            if (
                Number(
                    btn.dataset.slot
                ) === selectedPrimary
            ) {

                btn.textContent =
                    "●";

            } else {

                btn.textContent =
                    "○";

            }

        });

}

// ======================
// PRIMARY CLICK
// ======================
document
    .querySelectorAll(
        ".primaryBtn"
    )
    .forEach(btn => {

        btn.onclick = () => {

            selectedPrimary =
                Number(
                    btn.dataset.slot
                );

            updatePrimary();

            set(
                ref(
                    db,
                    userPath +
                    "/primary"
                ),
                selectedPrimary
            );

        };

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
        )
            return;

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

            const input =
                document.getElementById(
                    "lastfm" + i
                );

            if (
                input &&
                input.value.trim()
            ) {

                lastfm.push(
                    input.value.trim()
                );

            }

        }

        set(
            ref(
                db,
                userPath
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
                    selectedPrimary

            }

        );

        // TOAST
        const toast =
            document.getElementById(
                "toast"
            );

        toast.classList.add(
            "show"
        );

        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 2500);

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
