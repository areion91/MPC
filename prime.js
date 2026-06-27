import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getDatabase,
    ref,
    set,
    get,
    update,
    remove,
    onValue
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

/* =========================
   FIREBASE
========================= */

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
    "stream4stream-eda97.appspot.com",

    messagingSenderId:
    "315567847124",

    appId:
    "1:315567847124:web:8ce342a02b38b030f26d41"

};

const app =
initializeApp(firebaseConfig);

const db =
getDatabase(app);

/* =========================
   USER
========================= */

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

/* =========================
   UID
========================= */

const UID =
user.email
.toLowerCase()
.replace(/\./g,"_")
.replace(/@/g,"_");

/* =========================
   PLAYLIST
========================= */

const PLAYLIST_ID =
"primezone";

/* =========================
   LASTFM
========================= */

const LASTFM_API =
"e7666184bdc7537f3e1d8c9e54419b7f";

let currentLastfm =
null;

let currentLastfmName =
"";

/* =========================
   ADMIN
========================= */

let isAdmin =
false;

/* =========================
   DATE
========================= */

const TODAY =
new Date().toDateString();

/* =========================
   DATA
========================= */

let songs = [];

let progressSongs = {};

let sessionSongs = [];

let totalProgress = 0;

let todayCheckin = 0;

let members = [];

/* =========================
   ELEMENT
========================= */

const avatar =
document.getElementById(
    "avatar"
);

const playlistCover =
document.getElementById(
    "playlistCover"
);

const playlistTitle =
document.getElementById(
    "playlistTitle"
);

const playlistDesc =
document.getElementById(
    "playlistDesc"
);

const playlistSongs =
document.getElementById(
    "playlistSongs"
);

const playlistMembers =
document.getElementById(
    "playlistMembers"
);

const progressFill =
document.getElementById(
    "progressFill"
);

const progressValue =
document.getElementById(
    "progressValue"
);

const checkBtn =
document.getElementById(
    "checkinBtn"
);

const checkInfo =
document.getElementById(
    "checkinInfo"
);

const songList =
document.getElementById(
    "songList"
);

const memberList =
document.getElementById(
    "memberList"
);

const joinArea =
document.getElementById(
    "joinArea"
);

const waitingArea =
document.getElementById(
    "waitingArea"
);

const joinBtn =
document.getElementById(
    "joinBtn"
);

const activityList =
document.getElementById(
    "activityList"
);

const resetBtn =
document.getElementById(
    "resetMemberBtn"
);

const historyModal =
document.getElementById(
    "historyModal"
);

const historyName =
document.getElementById(
    "historyName"
);

const historyContent =
document.getElementById(
    "historyContent"
);

const closeHistory =
document.getElementById(
    "closeHistory"
);

const confirmModal =
document.getElementById(
    "resetModal"
);

const confirmYes =
document.getElementById(
    "resetYes"
);

const confirmNo =
document.getElementById(
    "resetNo"
);

/* =========================
   AVATAR
========================= */

if(
    avatar &&
    user.picture
){

    avatar.src =
    user.picture;

}

/* =========================
   BUTTON
========================= */

document
.getElementById(
    "backBtn"
)
.onclick = ()=>{

    location.href =
    "./premium.html";

};

document
.getElementById(
    "profileBtn"
)
.onclick = ()=>{

    location.href =
    "./profile.html";

};

/* =========================
   TAB
========================= */

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

        tabs.forEach(t=>{

            t.classList.remove(
                "active"
            );

        });

        contents.forEach(c=>{

            c.classList.remove(
                "active"
            );

        });

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

/* =========================
   LASTFM ACCOUNT
========================= */

async function loadPrimary(){

    const snap =
    await get(

        ref(
            db,
            "users/" + UID
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

    currentLastfmName =
    currentLastfm;

}

loadPrimary();

/* =========================
   ADMIN
========================= */

async function checkAdmin(){

    const snap =
    await get(

        ref(
            db,
            "admins/" + UID
        )

    );

    isAdmin =
    snap.exists();

    if(
        !isAdmin &&
        resetBtn
    ){

        resetBtn.style.display =
        "none";

    }

}

checkAdmin();

/* =========================
   MATCH SONG
========================= */

function matchSong(
    title,
    artist
){

    return (
        title +
        artist
    )
    .toLowerCase()
    .replace(/\s/g,"")
    .replace(/[^\w]/g,"");

}

/* =========================
   TIME AGO
========================= */

function timeAgo(time){

    const diff =

    Math.floor(
        (Date.now() - time)
        / 1000
    );

    if(diff < 60){

        return "JUST NOW";

    }

    if(diff < 3600){

        return Math.floor(
            diff / 60
        ) + " MIN AGO";

    }

    return Math.floor(
        diff / 3600
    ) + " H AGO";

}

/* =========================
   PLAYLIST INFO
========================= */

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

        if(
            playlistTitle &&
            data.title
        ){

            playlistTitle.innerText =
            data.title;

        }

        if(
            playlistDesc &&
            data.description
        ){

            playlistDesc.innerText =
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

/* =========================
   PLAYLIST SONGS
========================= */

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

        songs =
        Object.values(data);

        if(
            playlistSongs
        ){

            playlistSongs.innerText =

            songs.length +
            " SONGS";

        }

        renderSongs();

        updateProgress();

    }

);

/* =========================
   MEMBER DATA
========================= */

onValue(

    ref(
        db,
        "primeMembers"
    ),

    snapshot=>{

        const data =
        snapshot.val();

        members = [];

        if(data){

            Object.keys(data)
            .forEach(uid=>{

                members.push({

                    uid:
                    uid,

                    ...data[uid]

                });

            });

        }

        if(
            playlistMembers
        ){

            playlistMembers.innerText =

            members.length +
            " MEMBERS";

        }

    }

);

/* =========================
   JOIN REQUEST
========================= */

onValue(

    ref(
        db,
        "primeRequests"
    ),

    snapshot=>{

        const data =
        snapshot.val();

        if(
            data &&
            data[UID]
        ){

            waitingArea.style.display =
            "block";

            joinArea.style.display =
            "none";

        }

    }

);

/* =========================
   JOIN BUTTON
========================= */

if(joinBtn){

    joinBtn.onclick =
    async ()=>{

        await set(

            ref(

                db,

                "primeRequests/" +

                UID

            ),

            {

                uid:
                UID,

                name:
                user.name,

                picture:
                user.picture,

                time:
                Date.now()

            }

        );

        joinArea.style.display =
        "none";

        waitingArea.style.display =
        "block";

    };

}

/* =========================
   MEMBER LIST
========================= */

onValue(

    ref(
        db,
        "primeMembers"
    ),

    snapshot=>{

        const data =
        snapshot.val();

        memberList.innerHTML = "";

        let joined =
        false;

        if(data){

            Object.keys(data)
            .forEach(uid=>{

                const member =
                data[uid];

                if(uid === UID){

                    joined =
                    true;

                }

                const weekly =

                member.weekly || 0;

                const saving =

                member.saving || 0;

                let complete = "";

                if(weekly >= 5){

                    complete =
                    "✅";

                }

                let savingIcon = "";

                for(

                    let i = 0;

                    i < saving;

                    i++

                ){

                    savingIcon +=
                    "🎵";

                }

                let viewBtn = "";

                if(isAdmin){

                    viewBtn =

                    `

                    <button
                    class="memberButton"

                    onclick="openHistory(

                        '${uid}'

                    )">

                        VIEW

                    </button>

                    `;

                }

                memberList.innerHTML +=

                `

                <div class="memberItem">

                    <div>

                        <div class="memberName">

                            ${member.name}

                            ${complete}

                        </div>

                        <div class="memberPlay">

                            ${savingIcon}

                        </div>

                    </div>

                    ${viewBtn}

                </div>

                `;

            });

        }

        if(joined){

            joinArea.style.display =
            "none";

            waitingArea.style.display =
            "none";

        }

    }

);

/* =========================
   RENDER SONG
========================= */

function renderSongs(){

    if(!songList)
        return;

    songList.innerHTML = "";

    songs.forEach(song=>{

        const key =

        matchSong(
            song.title,
            song.artist
        );

        const played =

        progressSongs[key];

        let status = "";

        if(played){

            if(played.now){

                status = `

                <div class="playingNow">

                    PLAYING NOW

                </div>

                `;

            }

            else{

                status = `

                <div class="songHistory">

                    ${timeAgo(
                        played.time
                    )}

                </div>

                `;

            }

        }

        songList.innerHTML += `

        <div class="songItem
        ${played ? "playedSong" : ""}">

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

/* =========================
   UPDATE PROGRESS
========================= */

function updateProgress(){

    const total =
    songs.length;

    const played =
    Object.keys(
        progressSongs
    ).length;

    totalProgress =

    total === 0

    ? 0

    :

    Math.floor(

        (played / total)

        * 100

    );

    if(progressValue){

        progressValue.innerText =

        totalProgress + "%";

    }

    if(progressFill){

        progressFill.style.width =

        totalProgress + "%";

    }

    const bar =

    document.querySelector(
        ".progressBar"
    );

    if(bar){

        bar.style.setProperty(

            "--progress",

            totalProgress + "%"

        );

    }

    if(checkInfo){

        checkInfo.innerText =

        todayCheckin +

        " / 2 CHECKIN";

    }

    if(checkBtn){

        checkBtn.disabled =

        totalProgress < 100 ||

        todayCheckin >= 2;

    }

}

/* =========================
   LOAD PROGRESS
========================= */

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

        progressSongs =

        data.progress || {};

        sessionSongs =

        data.session || [];

        renderSongs();

        updateProgress();

    }

);

/* =========================
   SAVE PROGRESS
========================= */

async function saveProgress(){

    await set(

        ref(
            db,
            "primeProgress/" +
            UID
        ),

        {

            progress:
            progressSongs,

            session:
            sessionSongs,

            updated:
            Date.now()

        }

    );

}

/* =========================
   LASTFM CHECK
========================= */

async function checkLastfm(){

    if(!currentLastfm)
        return;

    try{

        const url =

        "https://ws.audioscrobbler.com/2.0/" +

        "?method=user.getrecenttracks" +

        "&user=" +

        currentLastfm +

        "&api_key=" +

        LASTFM_API +

        "&format=json" +

        "&limit=2";

        const response =
        await fetch(url);

        const json =
        await response.json();

        if(

            !json.recenttracks ||

            !json.recenttracks.track

        ){

            return;

        }

        const tracks =

        Array.isArray(
            json.recenttracks.track
        )

        ?

        json.recenttracks.track

        :

        [
            json.recenttracks.track
        ];

        let activeSongs = {};

        tracks.forEach(track=>{

            const title =

            (
                track.name || ""
            )
            .trim()
            .toLowerCase();

            const artist =

            (
                track.artist["#text"] || ""
            )
            .trim()
            .toLowerCase();

            songs.forEach(song=>{

                const songTitle =

                (
                    song.title || ""
                )
                .trim()
                .toLowerCase();

                const songArtist =

                (
                    song.artist || ""
                )
                .trim()
                .toLowerCase();

                if(

                    title === songTitle &&

                    artist === songArtist

                ){

                    const key =

                    matchSong(

                        song.title,

                        song.artist

                    );

                    activeSongs[key] = {

                        title:
                        song.title,

                        artist:
                        song.artist,

                        now:

                        track["@attr"]

                        &&

                        track["@attr"]

                        .nowplaying ===

                        "true",

                        time:
                        Date.now()

                    };

                }

            });

        });

        /* RESET JIKA SUDAH HILANG */

        Object.keys(
            progressSongs
        ).forEach(key=>{

            if(

                !activeSongs[key]

            ){

                delete progressSongs[key];

            }

        });

        /* SET YANG MASIH ADA */

        Object.keys(
            activeSongs
        ).forEach(key=>{

            progressSongs[key] =

            activeSongs[key];

            const exist =

            sessionSongs.find(

                s=>

                s.key === key

            );

            if(!exist){

                sessionSongs.push({

                    key:
                    key,

                    title:
                    activeSongs[key]
                    .title,

                    artist:
                    activeSongs[key]
                    .artist,

                    time:
                    Date.now()

                });

            }

        });

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

/* =========================
   START LASTFM
========================= */

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

    10000

);

/* =========================
   USER CHECKIN TODAY
========================= */

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

/* =========================
   CHECKIN
========================= */

checkBtn.onclick =
async ()=>{

    if(totalProgress < 100){

        alert(
            "COMPLETE ALL SONGS FIRST"
        );

        return;

    }

    if(todayCheckin >= 2){

        alert(
            "MAX 2 CHECKIN"
        );

        return;

    }

    const now =
    Date.now();

    const fmName =
    currentLastfm || "-";

    await set(

        ref(

            db,

            "primeCheckin/" +

            UID +

            "/" +

            now

        ),

        {

            uid:
            UID,

            name:
            user.name,

            picture:
            user.picture,

            lastfm:
            fmName,

            date:
            TODAY,

            time:
            now

        }

    );

    /* HISTORY */

    const saveDate =

    new Date()

    .toISOString()

    .split("T")[0];

    await set(

        ref(

            db,

            "primeHistory/" +

            UID +

            "/" +

            now

        ),

        {

            name:
            user.name,

            lastfm:
            fmName,

            songs:
            sessionSongs,

            time:
            now

        }

    );

    /* MEMBER */

    const memberSnap =

    await get(

        ref(
            db,
            "primeMembers/" +
            UID
        )

    );

    if(memberSnap.exists()){

        const member =
        memberSnap.val();

        let weekly =

        member.weekly || 0;

        let saving =

        member.saving || 0;

        weekly++;

        if(weekly > 5){

            saving++;

        }

        await update(

            ref(
                db,
                "primeMembers/" +
                UID
            ),

            {

                weekly:
                weekly,

                saving:
                saving

            }

        );

    }

    /* RESET PROGRESS */

    progressSongs = {};

    sessionSongs = [];

    await saveProgress();

    renderSongs();

    updateProgress();

    alert(
        "CHECKIN SUCCESS"
    );

};

/* =========================
   ACTIVITY
========================= */

onValue(

    ref(
        db,
        "primeCheckin"
    ),

    snapshot=>{

        const data =
        snapshot.val();

        activityList.innerHTML = "";

        if(!data)
            return;

        let users = {};

        Object.keys(data)
        .forEach(uid=>{

            const rows =

            Object.values(
                data[uid]
            );

            const todayRows =

            rows.filter(

                x=>

                x.date === TODAY

            );

            if(todayRows.length){

                users[uid] = {

                    count:
                    todayRows.length,

                    name:
                    todayRows[0].name,

                    lastfm:
                    todayRows[0].lastfm,

                    uid:
                    uid

                };

            }

        });

        Object.values(users)
        .forEach(user=>{

            let text =

            user.count >= 2

            ?

            "2x CHECKIN"

            :

            "CHECKIN";

            let view = "";

            if(isAdmin){

                view =

                `

                <button
                class="memberButton"

                onclick="openHistory(

                    '${user.uid}'

                )">

                    VIEW

                </button>

                `;

            }

            activityList.innerHTML +=

            `

            <div class="activityItem">

                <div>

                    <b>

                        ${user.name}

                    </b>

                    <br>

                    FM:

                    ${user.lastfm}

                </div>

                <div>

                    ${text}

                    ${view}

                </div>

            </div>

            `;

        });

    }

);

/* =========================
   OPEN HISTORY
========================= */

window.openHistory =
async function(uid){

    const snap =

    await get(

        ref(

            db,

            "primeHistory/" +

            uid

        )

    );

    historyContent.innerHTML = "";

    historyName.innerHTML = "";

    if(!snap.exists()){

        historyContent.innerHTML =

        `
        <div class="historyEmpty">

            NO HISTORY

        </div>
        `;

        historyModal.style.display =
        "flex";

        return;

    }

    const data =
    snap.val();

    const rows =

    Object.values(data)

    .sort(

        (a,b)=>

        b.time - a.time

    );

    if(rows.length){

        historyName.innerHTML =

        rows[0].name +

        "<br>FM: " +

        rows[0].lastfm;

    }

    rows.forEach(item=>{

        let label = "";

        const diff =

        Date.now()

        -

        item.time;

        const minute =

        Math.floor(
            diff / 60000
        );

        const hour =

        Math.floor(
            diff / 3600000
        );

        if(hour >= 1){

            label =

            hour +

            " HOURS AGO";

        }

        else{

            label =

            minute +

            " MINUTES AGO";

        }

        historyContent.innerHTML +=

        `

        <div class="historyBlock">

            <div class="historyDate">

                ${label}

            </div>

        `;

        item.songs.forEach(

            (song,index)=>{

                historyContent.innerHTML +=

                `

                <div class="historySong">

                    ${index + 1}.

                    ${song.title}

                </div>

                `;

            }

        );

        historyContent.innerHTML +=

        `

        </div>

        `;

    });

    historyModal.style.display =
    "flex";

};

/* =========================
   CLOSE HISTORY
========================= */

if(closeHistory){

    closeHistory.onclick = ()=>{

        historyModal.style.display =
        "none";

    };

}

window.onclick = e=>{

    if(

        e.target === historyModal

    ){

        historyModal.style.display =
        "none";

    }

};

/* =========================
   CLEAN HISTORY
========================= */

async function cleanHistory(){

    const snap =

    await get(

        ref(

            db,

            "primeHistory/" +

            UID

        )

    );

    if(!snap.exists())
        return;

    const data =
    snap.val();

    const limit =

    Date.now()

    -

    (

        7 *

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

                    "primeHistory/" +

                    UID +

                    "/" +

                    key

                )

            );

        }

    });

}

cleanHistory();

/* =========================
   RESET BUTTON
========================= */

if(resetBtn){

    resetBtn.onclick = ()=>{

        if(!isAdmin)
            return;

        confirmModal.style.display =
        "flex";

    };

}

/* =========================
   RESET NO
========================= */

if(confirmNo){

    confirmNo.onclick = ()=>{

        confirmModal.style.display =
        "none";

    };

}

/* =========================
   RESET YES
========================= */

if(confirmYes){

    confirmYes.onclick =
    async ()=>{

        confirmModal.style.display =
        "none";

        const snap =

        await get(

            ref(
                db,
                "primeMembers"
            )

        );

        if(!snap.exists())
            return;

        const data =
        snap.val();

        Object.keys(data)
        .forEach(uid=>{

            update(

                ref(

                    db,

                    "primeMembers/" +

                    uid

                ),

                {

                    weekly:0

                }

            );

        });

        alert(
            "WEEKLY RESET SUCCESS"
        );

    };

}

/* =========================
   AUTO RESET WEEKLY
========================= */

async function weeklyReset(){

    const now =
    new Date();

    const day =
    now.getDay();

    const hour =
    now.getHours();

    if(

        day === 1 &&

        hour === 0

    ){

        const snap =

        await get(

            ref(
                db,
                "primeMembers"
            )

        );

        if(!snap.exists())
            return;

        const data =
        snap.val();

        Object.keys(data)
        .forEach(uid=>{

            update(

                ref(

                    db,

                    "primeMembers/" +

                    uid

                ),

                {

                    weekly:0

                }

            );

        });

    }

}

setInterval(

    ()=>{

        weeklyReset();

    },

    3600000

);

/* =========================
   START SYSTEM
========================= */

if(checkBtn){

    checkBtn.disabled =
    true;

}

renderSongs();

updateProgress();

checkLastfm();

console.log(

    "PRIME SYSTEM READY"

);
