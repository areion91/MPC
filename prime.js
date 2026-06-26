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

let todayCheckin = 0;

let totalProgress = 0;

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
    "confirmModal"
);

const confirmYes =
document.getElementById(
    "confirmYes"
);

const confirmNo =
document.getElementById(
    "confirmNo"
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
   BACK
========================= */

document
.getElementById(
    "backBtn"
)
.onclick = ()=>{

    location.href =
    "./premium.html";

};

/* =========================
   PROFILE
========================= */

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
   LOAD PRIMARY LASTFM
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

}

loadPrimary();

/* =========================
   CHECK ADMIN
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
   PLAYLIST SONG
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

        if(playlistSongs){

            playlistSongs.innerText =

            songs.length +
            " SONGS";

        }

        renderSongs();

        updateProgress();

    }

);

/* =========================
   MEMBER COUNT
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

        if(playlistMembers){

            playlistMembers.innerText =

            members.length +
            " MEMBERS";

        }

    }

);

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

/* =========================
   PROGRESS
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

        " / 2 CHECKIN TODAY";

    }

    if(checkBtn){

        checkBtn.disabled =

        totalProgress < 100 ||

        todayCheckin >= 2;

    }

}

/* =========================
   SONG MATCH
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

    .replace(/\s/g,"");

}

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

                    <div class="eq">

                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>

                    </div>

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

            <div class="songCover">

                <img src="${
                    song.cover || ""
                }">

            </div>

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

        if(

            Object.keys(
                progressSongs
            ).length === 0

        ){

            progressSongs =

            data.progress || {};

            sessionSongs =

            data.session || [];

            renderSongs();

            updateProgress();

        }

    }

);

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

        ){

            return;

        }

        const tracks =

        json.recenttracks.track;

        tracks.forEach(track=>{

            const title =

            track.name || "";

            const artist =

            track.artist["#text"] || "";

            const key =

            matchSong(
                title,
                artist
            );

            const isPlaying =

            track["@attr"] &&

            track["@attr"].nowplaying ===
            "true";

            const exists =

            songs.some(song=>{

                const songKey =

                matchSong(

                    song.title,

                    song.artist

                );

                return songKey === key;

            });

            if(!exists)
                return;

            progressSongs[key] = {

                now:
                isPlaying,

                title:
                title,

                artist:
                artist,

                time:

                track.date

                ?

                Number(
                    track.date.uts
                ) * 1000

                :

                Date.now()

            };

            const already =

            sessionSongs.find(

                s=>

                s.key === key

            );

            if(!already){

                sessionSongs.push({

                    key:
                    key,

                    title:
                    title,

                    artist:
                    artist,

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
   FIRST CHECK
========================= */

setTimeout(

    ()=>{

        checkLastfm();

    },

    3000

);

/* =========================
   AUTO CHECK
========================= */

setInterval(

    ()=>{

        checkLastfm();

    },

    20000

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
            "CHECKIN LIMIT TODAY"
        );

        return;

    }

    const now =
    Date.now();

    /* CHECKIN */

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

            saveDate

        ),

        {

            name:
            user.name,

            songs:
            sessionSongs,

            time:
            now

        }

    );

    /* MEMBER DATA */

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
        "CHECK IN SUCCESS"
    );

};

/* =========================
   MEMBER REQUEST
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

        let joined = false;

        if(data){

            Object.keys(data)
            .forEach(uid=>{

                const member =
                data[uid];

                if(uid === UID){

                    joined = true;

                }

                const weekly =

                member.weekly || 0;

                const saving =

                member.saving || 0;

                let badge = "";

                if(weekly >= 5){

                    badge =
                    "✓";

                }

                let savingIcon = "";

                for(

                    let i = 0;

                    i < saving;

                    i++

                ){

                    savingIcon += "🎵";

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

                            ${badge}

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

        if(!data){

            activityList.innerHTML =

            `

            <div class="activityItem">

                No activity.

            </div>

            `;

            return;

        }

        let rows = [];

        Object.keys(data)
        .forEach(uid=>{

            Object.values(
                data[uid]
            )
            .forEach(item=>{

                rows.push(item);

            });

        });

        rows.sort(

            (a,b)=>

            b.time - a.time

        );

        let currentDate = "";

        rows.forEach(item=>{

            let label = "";

            const yesterday =

            new Date();

            yesterday.setDate(

                yesterday.getDate()-1

            );

            if(item.date === TODAY){

                label = "TODAY";

            }

            else if(

                item.date ===

                yesterday.toDateString()

            ){

                label = "YESTERDAY";

            }

            else{

                label = item.date;

            }

            if(currentDate !== label){

                currentDate = label;

                activityList.innerHTML +=

                `

                <div class="activityDate">

                    ${label}

                </div>

                `;

            }

            let view = "";

            if(isAdmin){

                view =

                `

                <button

                class="memberButton"

                onclick="openHistory(

                    '${item.uid}'

                )">

                    VIEW

                </button>

                `;

            }

            activityList.innerHTML +=

            `

            <div class="activityItem">

                <span>

                    ${item.name}

                    CHECKIN

                </span>

                ${view}

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

    if(!snap.exists()){

        historyContent.innerHTML =

        "<div class='empty'>NO HISTORY</div>";

        historyModal.style.display =
        "flex";

        return;

    }

    const data =
    snap.val();

    historyContent.innerHTML = "";

    const dates =

    Object.keys(data)
    .reverse();

    dates.forEach(date=>{

        let title = date;

        const d =

        new Date(date)
        .toDateString();

        const yesterday =

        new Date();

        yesterday.setDate(

            yesterday.getDate()-1

        );

        if(d === TODAY){

            title = "TODAY";

        }

        else if(

            d ===

            yesterday.toDateString()

        ){

            title = "YESTERDAY";

        }

        historyContent.innerHTML +=

        `

        <div class="historyDay">

            ${title}

        </div>

        `;

        data[date]

        .songs

        .forEach(

            (song,index)=>{

            historyContent.innerHTML +=

            `

            <div class="historySong">

                ${index + 1}.

                ${song.title}

            </div>

            `;

        });

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
   CONFIRM NO
========================= */

if(confirmNo){

    confirmNo.onclick = ()=>{

        confirmModal.style.display =
        "none";

    };

}

/* =========================
   CONFIRM YES
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
            "RESET SUCCESS"
        );

    };

}

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
    .forEach(date=>{

        if(

            data[date].time <

            limit

        ){

            remove(

                ref(

                    db,

                    "primeHistory/" +

                    UID +

                    "/" +

                    date

                )

            );

        }

    });

}

cleanHistory();

/* =========================
   START
========================= */

if(checkBtn){

    checkBtn.disabled =
    true;

}

renderSongs();

updateProgress();

checkLastfm();
