import {
initializeApp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getDatabase,
ref,
set,
onValue
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

/* =====================
FIREBASE
===================== */

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

/* =====================
USER
===================== */

const user = JSON.parse(
localStorage.getItem(
"s4s_user"
)
);

if (!user) {

window.location.href =
    "./index.html";

}

/* =====================
AVATAR
===================== */

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

/* =====================
BACK
===================== */

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

/* =====================
PROFILE
===================== */

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

/* =====================
TAB
===================== */

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

/* =====================
CHECKIN LOCK
===================== */

const checkBtn =
document.getElementById(
"checkinBtn"
);

checkBtn.disabled =
true;

/* =====================
PROGRESS
===================== */

onValue(

ref(
    db,
    "primeProgress/" + user.uid
),

snapshot => {

    const data =
        snapshot.val();

    const progress =
        data?.progress || 0;

    document
        .getElementById(
            "progressValue"
        )
        .textContent =
        progress + "%";

    document
        .getElementById(
            "progressFill"
        )
        .style.width =
        progress + "%";

    document
        .querySelector(
            ".progressBar"
        )
        .style.setProperty(
            "--progress",
            progress + "%"
        );

    checkBtn.disabled =
        progress < 100;

}

);

/* =====================
CHECKIN
===================== */

checkBtn
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

                picture:
                    user.picture,

                date:
                    today,

                time:
                    Date.now()

            }

        );

        alert(
            "CHECK IN SUCCESS"
        );

    }
);

/* =====================
ACTIVITY
===================== */

onValue(

ref(
    db,
    "primeCheckin"
),

snapshot => {

    const data =
        snapshot.val();

    const activity =
        document.getElementById(
            "activityList"
        );

    activity.innerHTML =
        "";

    if (!data) {

        activity.innerHTML =
            `
            <div class="activityItem">
                No activity.
            </div>
            `;

        return;

    }

    Object.values(data)
        .reverse()
        .forEach(item => {

            activity.innerHTML +=
            `
            <div class="activityItem">

                ${item.name}

                checked in

            </div>
            `;

        });

}

);
