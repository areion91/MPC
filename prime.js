import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getDatabase,
    ref,
    set,
    push,
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
                "./premium.html";

        }
    );

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
// TAB
// ======================

const tabs =
    document.querySelectorAll(
        ".tab"
    );

const contents =
    document.querySelectorAll(
        ".tabContent"
    );

tabs.forEach(tab => {

    tab.addEventListener(
        "click",
        () => {

            tabs.forEach(t =>
                t.classList.remove(
                    "active"
                )
            );

            contents.forEach(c =>
                c.classList.remove(
                    "active"
                )
            );

            tab.classList.add(
                "active"
            );

            const id =
                tab.dataset.tab;

            document
                .getElementById(
                    id
                )
                .classList.add(
                    "active"
                );

        }
    );

});

// ======================
// MEMBER STATUS
// ======================

const requestBtn =
    document.getElementById(
        "requestBtn"
    );

const memberPanel =
    document.getElementById(
        "memberPanel"
    );

memberPanel.style.display =
    "none";

// ======================
// CHECK MEMBER
// ======================

onValue(

    ref(
        db,
        "primeMember/" + user.uid
    ),

    snapshot => {

        const data =
            snapshot.val();

        if (
            data &&
            data.approved
        ) {

            requestBtn.style.display =
                "none";

            memberPanel.style.display =
                "block";

        }

    }

);
// ======================
// REQUEST STATUS
// ======================

onValue(

    ref(
        db,
        "primeRequest/" + user.uid
    ),

    snapshot => {

        const data =
            snapshot.val();

        if (
            data &&
            !data.approved
        ) {

            requestBtn.innerText =
                "WAITING";

            requestBtn.disabled =
                true;

        }

    }

);

// ======================
// CHECK MEMBER
// ======================

onValue(

    ref(
        db,
        "primeMember/" + user.uid
    ),

    snapshot => {

        const data =
            snapshot.val();

        if (
            data &&
            data.approved
        ) {

            requestBtn.style.display =
                "none";

            memberPanel.style.display =
                "block";

            document
                .getElementById(
                    "progressValue"
                )
                .textContent =
                (
                    data.progress || 0
                ) + "%";

            document
                .getElementById(
                    "progressFill"
                )
                .style.width =
                (
                    data.progress || 0
                ) + "%";

        }

    }

);

// ======================
// REQUEST JOIN
// ======================

requestBtn.onclick =
    () => {

        if (
            requestBtn.innerText ===
            "WAITING"
        ) return;

        set(

            ref(
                db,
                "primeRequest/" +
                user.uid
            ),

            {

                uid:
                    user.uid,

                name:
                    user.name ||
                    "USER",

                email:
                    user.email ||
                    "",

                picture:
                    user.picture ||
                    "",

                approved:
                    false,

                progress:
                    0,

                time:
                    Date.now()

            }

        ).then(() => {

            requestBtn.innerText =
                "WAITING";

            requestBtn.disabled =
                true;

        });

    };

// ======================
// CHECK IN
// ======================

document
    .getElementById(
        "checkinBtn"
    )
    ?.addEventListener(
        "click",
        () => {

            const today =
                new Date()
                .toDateString();

            set(

                ref(
                    db,
                    "primeCheckin/" +
                    user.uid
                ),

                {

                    uid:
                        user.uid,

                    name:
                        user.name,

                    date:
                        today,

                    time:
                        Date.now()

                }

            );

        }
    );
