import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getDatabase,
    ref,
    set,
    get,
    onValue,
    remove
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

/* =====================
UID
===================== */

const UID =
    user.email
    .toLowerCase()
    .replace(/\./g, "_")
    .replace(/@/g, "_");

/* =====================
PLAYLIST
===================== */

const PLAYLIST_ID =
    "primezone";

/* =====================
LASTFM
===================== */

const LASTFM_API =
    "e7666184bdc7537f3e1d8c9e54419b7f";

let currentLastfm =
    null;

/* =====================
DATA
===================== */

let playlistSongs = [];

let playedSongs = {};

let todayCheckin = 0;

let totalProgress = 0;

/* =====================
ELEMENT
===================== */

const avatar =
    document.getElementById(
        "avatar"
    );

const checkBtn =
    document.getElementById(
        "checkinBtn"
    );

const songList =
    document.getElementById(
        "songList"
    );

const activityList =
    document.getElementById(
        "activityList"
    );

const playlistCover =
    document.getElementById(
        "playlistCover"
    );

const progressFill =
    document.getElementById(
        "progressFill"
    );

const progressValue =
    document.getElementById(
        "progressValue"
    );

/* =====================
AVATAR
===================== */

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
.onclick = ()=>{

    location.href =
        "./premium.html";

};

/* =====================
PROFILE
===================== */

document
.getElementById(
    "profileBtn"
)
.onclick = ()=>{

    location.href =
        "./profile.html";

};

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

tabs.forEach(tab=>{

    tab.onclick = ()=>{

        tabs.forEach(t=>

            t.classList.remove(
                "active"
            )

        );

        contents.forEach(c=>

            c.classList.remove(
                "active"
            )

        );

        tab.classList.add(
            "active"
        );

        document
        .getElementById(
            tab.dataset.tab
        )
        .classList.add(
            "active"
        );

    };

});

/* =====================
LOAD PRIMARY LASTFM
===================== */

async function loadPrimary(){

    const snap =

        await get(

            ref(

                db,

                "users/" +

                user.email
                .replace(/\./g,"_")

            )

        );

    if(!snap.exists())
        return;

    const data =
        snap.val();

    if(
        !data.lastfm ||
        !data.primary
    )
        return;

    currentLastfm =

        data.lastfm[
            data.primary - 1
        ];

}

loadPrimary();

/* =====================
TIME AGO
===================== */

function timeAgo(time){

    const diff =

        Math.floor(

            (Date.now() - time)

            / 1000

        );

    if(diff < 60){

        return "just now";

    }

    if(diff < 3600){

        return Math.floor(

            diff / 60

        ) + " minutes ago";

    }

    if(diff < 86400){

        return Math.floor(

            diff / 3600

        ) + " hours ago";

    }

    return Math.floor(

        diff / 86400

    ) + " days ago";

}

/* =====================
PROGRESS
===================== */

function updateProgress(){

    const total =

        playlistSongs.length;

    const played =

        Object.keys(
            playedSongs
        ).length;

    const percent =

        total === 0

        ? 0

        :

        Math.floor(

            (played / total)

            * 100

        );

    totalProgress =

        percent;

    document
    .getElementById(
        "progressValue"
    )
    .innerText =

        percent + "%";

    document
    .getElementById(
        "progressFill"
    )
    .style.width =

        percent + "%";

    document
    .querySelector(
        ".progressBar"
    )
    .style.setProperty(

        "--progress",

        percent + "%"

    );

    checkBtn.disabled =

        percent < 100 ||

        todayCheckin >= 2;

}

/* =====================
RENDER SONG
===================== */

function renderSongs(){

    songList.innerHTML = "";

    playlistSongs.forEach(

        (song,index)=>{

        const key =

            (
                song.title +
                song.artist
            )
            .toLowerCase()
            .replace(/\s/g,"");

        const playData =

            playedSongs[key];

        let status = "";

        if(playData){

            if(playData.now){

                status = `

                <div class="playingNow">

                    ▂▅▃▆▂

                    PLAYING NOW

                </div>

                `;

            }

            else{

                status = `

                <div class="songHistory">

                    ${timeAgo(
                        playData.time
                    )}

                </div>

                `;

            }

        }

        songList.innerHTML += `

        <div class="songItem
        ${playData ? "playedSong" : ""}">

            <img
            class="songCover"
            src="${
                song.cover || ""
            }">

            <div class="songText">

                <div class="songTitle">

                    ${song.title}

                </div>

                <div class="songArtist">

                    ${song.artist}

                </div>

                ${status}

            </div>

        </div>

        `;

    });

}

/* =====================
PLAYLIST REALTIME
===================== */

onValue(

    ref(
        db,
        "playlists/" +
        PLAYLIST_ID
    ),

    snapshot=>{

        const data =
            snapshot.val();

        if(!data)
            return;

        playlistSongs =
            Object.values(
                data
            );

        if(
            playlistSongs[0]
        ){

            if(playlistCover){

                playlistCover.src =

                    playlistSongs[0]
                    .cover || "";

            }

        }

        renderSongs();

        updateProgress();

    }

);

/* =====================
SYNC INFO
===================== */

onValue(

    ref(
        db,
        "playlistInfo/" +
        PLAYLIST_ID
    ),

    snapshot=>{

        const data =
            snapshot.val();

        if(!data)
            return;

        const title =

            document.getElementById(
                "playlistTitle"
            );

        const desc =

            document.getElementById(
                "playlistDesc"
            );

        if(
            title &&
            data.title
        ){

            title.innerText =
                data.title;

        }

        if(
            desc &&
            data.description
        ){

            desc.innerText =
                data.description;

        }

        if(
            playlistCover &&
            data.cover
        ){

            playlistCover.src =
                data.cover;

        }

    }

);

/* =====================
LASTFM CHECK
===================== */

async function checkLastfm(){

    if(!currentLastfm)
        return;

    try{

        const url =

        "https://ws.audioscrobbler.com/2.0/" +

        "?method=user.getrecenttracks" +

        "&user=" + currentLastfm +

        "&api_key=" + LASTFM_API +

        "&format=json" +

        "&limit=50";

        const response =
            await fetch(url);

        const json =
            await response.json();

        if(
            !json.recenttracks ||
            !json.recenttracks.track
        )
            return;

        const tracks =
            json.recenttracks.track;

        const newPlayed = {};

        tracks.forEach(track=>{

            const title =

                track.name || "";

            const artist =

                track.artist["#text"] || "";

            const key =

                (
                    title +
                    artist
                )
                .toLowerCase()
                .replace(/\s/g,"");

            const isPlaying =

                track["@attr"] &&
                track["@attr"].nowplaying === "true";

            newPlayed[key] = {

                now:
                    isPlaying,

                time:

                    track.date
                    ?
                    Number(
                        track.date.uts
                    ) * 1000
                    :
                    Date.now()

            };

        });

        playedSongs =
            newPlayed;

        renderSongs();

        updateProgress();

        saveProgress();

    }

    catch(error){

        console.log(
            "LASTFM ERROR",
            error
        );

    }

}

/* =====================
SAVE PROGRESS
===================== */

async function saveProgress(){

    await set(

        ref(
            db,
            "primeProgress/" +
            UID
        ),

        {

            playedSongs:
                playedSongs,

            updated:
                Date.now()

        }

    );

}

/* =====================
LOAD PROGRESS
===================== */

onValue(

    ref(
        db,
        "primeProgress/" +
        UID
    ),

    snapshot=>{

        const data =
            snapshot.val();

        if(!data)
            return;

        if(
            Object.keys(
                playedSongs
            ).length === 0
        ){

            playedSongs =

                data.playedSongs || {};

            renderSongs();

            updateProgress();

        }

    }

);

/* =====================
LASTFM INTERVAL
===================== */

setTimeout(

    ()=>{

        checkLastfm();

    },

    3000

);

setInterval(

    ()=>{

        checkLastfm();

    },

    20000

);

/* =====================
TODAY
===================== */

const TODAY =
    new Date()
    .toDateString();

/* =====================
CHECKIN COUNT
===================== */

onValue(

    ref(
        db,
        "primeCheckin/" +
        UID
    ),

    snapshot=>{

        const data =
            snapshot.val();

        todayCheckin = 0;

        if(data){

            Object.values(data)
            .forEach(item=>{

                if(
                    item.date === TODAY
                ){

                    todayCheckin++;

                }

            });

        }

        updateProgress();

    }

);

/* =====================
CHECKIN
===================== */

checkBtn.onclick =
async ()=>{

    if(
        totalProgress < 100
    )
        return;

    if(
        todayCheckin >= 2
    )
        return;

    const time =
        Date.now();

    await set(

        ref(
            db,
            "primeCheckin/" +
            UID +
            "/" +
            time
        ),

        {

            uid:
                UID,

            name:
                user.name,

            picture:
                user.picture,

            date:
                TODAY,

            time:
                time

        }

    );

    playedSongs = {};

    await saveProgress();

    renderSongs();

    updateProgress();

    alert(
        "CHECK IN SUCCESS"
    );

};

/* =====================
ACTIVITY
===================== */

onValue(

    ref(
        db,
        "primeCheckin"
    ),

    snapshot=>{

        const data =
            snapshot.val();

        const activity =

            document.getElementById(
                "activityList"
            );

        activity.innerHTML = "";

        if(!data){

            activity.innerHTML =

            `
            <div class="activityItem">

                No activity.

            </div>
            `;

            return;

        }

        Object.keys(data)
        .forEach(uid=>{

            const entries =

                Object.values(
                    data[uid]
                );

            const todayEntries =

                entries.filter(

                    item=>

                    item.date === TODAY

                );

            if(
                todayEntries.length === 0
            )
                return;

            const name =

                todayEntries[0]
                .name;

            activity.innerHTML +=

            `

            <div class="activityItem">

                <span>

                    ${name}

                </span>

                <span>

                    ${todayEntries.length}

                    CHECKIN

                </span>

            </div>

            `;

        });

    }

);

/* =====================
AUTO CLEAN 30 DAYS
===================== */

async function cleanHistory(){

    const snap =

        await get(

            ref(
                db,
                "primeCheckin/" +
                UID
            )

        );

    if(!snap.exists())
        return;

    const data =
        snap.val();

    const limit =

        Date.now() -

        (
            30 *
            24 *
            60 *
            60 *
            1000
        );

    Object.keys(data)
    .forEach(key=>{

        if(
            data[key].time <
            limit
        ){

            remove(

                ref(
                    db,
                    "primeCheckin/" +
                    UID +
                    "/" +
                    key
                )

            );

        }

    });

}

cleanHistory();

/* =====================
START
===================== */

checkBtn.disabled = true;

renderSongs();

updateProgress();

checkLastfm();
