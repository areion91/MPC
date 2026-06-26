import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getDatabase,
    ref,
    set,
    remove,
    onValue
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

/* ===================== */
/* FIREBASE */
/* ===================== */

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

/* ===================== */
/* USER */
/* ===================== */

const user =
JSON.parse(
    localStorage.getItem(
        "s4s_user"
    )
);

if (!user) {

    location.href =
        "./index.html";

}

/* ===================== */
/* ADMIN */
/* ===================== */

const ADMINS = [

    "areionproject@gmail.com",

    "ayigh77@gmail.com",

    "weeraster0@gmail.com"

];

if (

    !ADMINS.includes(
        user.email.toLowerCase()
    )

) {

    location.href =
        "./dashboard.html";

}

/* ===================== */
/* STATUS */
/* ===================== */

const status =
document.getElementById(
    "status"
);

/* ===================== */
/* BACK */
/* ===================== */

document
.getElementById(
    "backBtn"
)
?.addEventListener(

    "click",

    ()=>{

        location.href =
            "./dashboard.html";

    }

);

/* ===================== */
/* SONG POPUP */
/* ===================== */

const songPopup =
document.getElementById(
    "songPopup"
);

document
.getElementById(
    "songBtn"
)
.onclick = ()=>{

    songPopup.classList.add(
        "show"
    );

};

document
.getElementById(
    "closeSong"
)
.onclick = ()=>{

    songPopup.classList.remove(
        "show"
    );

};

/* ===================== */
/* PLAYLIST POPUP */
/* ===================== */

const playlistPopup =
document.getElementById(
    "playlistPopup"
);

document
.getElementById(
    "playlistBtn"
)
.onclick = ()=>{

    playlistPopup.classList.add(
        "show"
    );

};

document
.getElementById(
    "closePlaylist"
)
.onclick = ()=>{

    playlistPopup.classList.remove(
        "show"
    );

};

/* ===================== */
/* PLAYLIST OPEN */
/* ===================== */

document
.querySelectorAll(
    ".playlistCard"
)
.forEach(card=>{

    card.onclick = ()=>{

        const playlist =

            card.dataset.playlist;

        location.href =

            "./playlist.html?id=" +
            playlist;

    };

});

/* ===================== */
/* ANNOUNCEMENT */
/* ===================== */

const announcePopup =
document.getElementById(
    "announcePopup"
);

document
.getElementById(
    "announceBtn"
)
.onclick = ()=>{

    announcePopup.classList.add(
        "show"
    );

};

document
.getElementById(
    "closeAnnouncement"
)
.onclick = ()=>{

    announcePopup.classList.remove(
        "show"
    );

};

document
.getElementById(
    "saveAnnouncement"
)
.onclick = ()=>{

    const text =

        document
        .getElementById(
            "announceText"
        )
        .value;

    set(

        ref(
            db,
            "announcement"
        ),

        {

            text:
                text,

            timestamp:
                Date.now()

        }

    );

    status.textContent =
        "ANNOUNCEMENT SAVED";

    announcePopup.classList.remove(
        "show"
    );

    setTimeout(()=>{

        status.textContent =
            "READY";

    },2000);

};

/* ===================== */
/* SYNC */
/* ===================== */

document
.getElementById(
    "syncBtn"
)
.onclick = ()=>{

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

    },2000);

};

/* ===================== */
/* SONG REQUEST */
/* ===================== */

onValue(

    ref(
        db,
        "songRequests"
    ),

    snapshot=>{

        const data =
            snapshot.val();

        const list =
            document.getElementById(
                "songList"
            );

        list.innerHTML = "";

        let count = 0;

        if (data) {

            Object.keys(data)
            .forEach(key=>{

                count++;

                const item =
                    data[key];

                list.innerHTML += `

                <div class="requestItem">

                    <h3>

                        ${item.title}

                    </h3>

                    <p>

                        ${item.artist}

                    </p>

                    <button
                    onclick="approveSong('${key}')">

                        APPROVE

                    </button>

                </div>

                `;

            });

        }

        document
        .getElementById(
            "songCount"
        )
        .textContent = count;

    }

);

/* ===================== */
/* APPROVE SONG */
/* ===================== */

window.approveSong =
function(id){

    remove(

        ref(
            db,
            "songRequests/" + id
        )

    );

};

/* ===================== */
/* READY */
/* ===================== */

status.textContent =
    "READY";
