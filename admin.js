import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getDatabase,
    ref,
    set,
    get,
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

if(!user){

    location.href =
        "./index.html";

}

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

if(!isAdmin){

    location.href =
        "./dashboard.html";

}

/* STATUS */

const status =
    document.getElementById(
        "status"
    );

/* JOIN NOTIFICATION */

onValue(

    ref(db,"joinRequests"),

    snapshot=>{

        const data =
            snapshot.val();

        const count =
            data
            ? Object.keys(data).length
            : 0;

        document.getElementById(
            "joinCount"
        ).textContent =
            count;

    }

);

/* SONG NOTIFICATION */

onValue(

    ref(db,"songRequests"),

    snapshot=>{

        const data =
            snapshot.val();

        const count =
            data
            ? Object.keys(data).length
            : 0;

        document.getElementById(
            "songCount"
        ).textContent =
            count;

    }

);

/* SYNC */

document
    .getElementById(
        "syncBtn"
    )
    .addEventListener(

        "click",

        ()=>{

            set(

                ref(
                    db,
                    "sync"
                ),

                {

                    timestamp:
                        Date.now()

                }

            );

            status.textContent =
                "SYNC SUCCESS";

            setTimeout(()=>{

                status.textContent =
                    "READY";

            },3000);

        }

    );

/* POPUP */

const popup =
    document.getElementById(
        "announcePopup"
    );

document
    .getElementById(
        "announceBtn"
    )
    .addEventListener(

        "click",

        ()=>{

            popup.classList.add(
                "show"
            );

        }

    );

document
    .getElementById(
        "closeAnnouncement"
    )
    .addEventListener(

        "click",

        ()=>{

            popup.classList.remove(
                "show"
            );

        }

    );

/* LOAD ANNOUNCEMENT */

get(

    ref(
        db,
        "announcement"
    )

).then(snapshot=>{

    const data =
        snapshot.val();

    if(data){

        document.getElementById(
            "announceText"
        ).value =
            data.text || "";

    }

});

/* SAVE ANNOUNCEMENT */

document
    .getElementById(
        "saveAnnouncement"
    )
    .addEventListener(

        "click",

        ()=>{

            const text =

                document
                .getElementById(
                    "announceText"
                )
                .value
                .trim();

            set(

                ref(
                    db,
                    "announcement"
                ),

                {

                    text:text,

                    active:true,

                    timestamp:
                        Date.now()

                }

            );

            popup.classList.remove(
                "show"
            );

            status.textContent =
                "ANNOUNCEMENT SENT";

            setTimeout(()=>{

                status.textContent =
                    "READY";

            },3000);

        }

    );
