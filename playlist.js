import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getDatabase,
    ref,
    set,
    get,
    remove
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

const user = JSON.parse(

    localStorage.getItem(
        "s4s_user"
    )

);

if(!user){

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

if(

    !ADMINS.includes(
        user.email.toLowerCase()
    )

){

    location.href =
        "./dashboard.html";

}

/* ===================== */
/* PLAYLIST ID */
/* ===================== */

const playlistId =

    new URLSearchParams(
        location.search
    ).get("id");

document
.getElementById(
    "playlistName"
)
.innerText =
    playlistId
    ?.toUpperCase()
    || "PLAYLIST";

/* ===================== */
/* ELEMENT */
/* ===================== */

const container =

    document.getElementById(
        "playlistContainer"
    );

const countText =

    document.getElementById(
        "songCount"
    );

let currentEdit = null;

/* ===================== */
/* LOAD SONGS */
/* ===================== */

async function loadSongs(){

    const snap = await get(

        ref(
            db,
            "playlists/" + playlistId
        )

    );

    const data =
        snap.val() || {};

    container.innerHTML = "";

    const songs =
        Object.values(data);

    countText.innerText =
        songs.length +
        " / 100 SONGS";

    songs.forEach((song,index)=>{

        container.innerHTML += `

        <div class="songItem">

            <div class="songInfo">

                <div class="songTitle">

                    ${index + 1}.
                    ${song.title}

                </div>

                <div class="songArtist">

                    ${song.artist}

                </div>

            </div>

            <div class="songButtons">

                <button
                class="editBtn"
                onclick="editSong(${index})">

                    EDIT

                </button>

                <button
                class="deleteBtn"
                onclick="deleteSong(${index})">

                    DELETE

                </button>

            </div>

        </div>

        `;

    });

}

/* ===================== */
/* DELETE */
/* ===================== */

window.deleteSong =
async function(index){

    const snap = await get(

        ref(
            db,
            "playlists/" + playlistId
        )

    );

    const songs =
        Object.values(
            snap.val() || {}
        );

    songs.splice(index,1);

    const newData = {};

    songs.forEach((song,i)=>{

        newData[
            "song" + (i+1)
        ] = song;

    });

    await set(

        ref(
            db,
            "playlists/" + playlistId
        ),

        newData

    );

    loadSongs();

};

/* ===================== */
/* EDIT */
/* ===================== */

window.editSong =
async function(index){

    currentEdit =
        index;

    document
    .getElementById(
        "editPopup"
    )
    .classList.add(
        "show"
    );

};

document
.getElementById(
    "closePopup"
)
.onclick = ()=>{

    document
    .getElementById(
        "editPopup"
    )
    .classList.remove(
        "show"
    );

};

document
.getElementById(
    "saveSong"
)
.onclick =
async ()=>{

    const link =

        document
        .getElementById(
            "spotifyLink"
        )
        .value;

    if(!link)
        return;

    const response =
        await fetch(

            "https://stream4stream-api.areionproject.workers.dev/?url=" +
            encodeURIComponent(link)

        );

    const song =
        await response.json();

    const snap =
        await get(

            ref(
                db,
                "playlists/" + playlistId
            )

        );

    const songs =
        Object.values(
            snap.val() || {}
        );

    songs[currentEdit] =
        song;

    const newData = {};

    songs.forEach((s,i)=>{

        newData[
            "song" + (i+1)
        ] = s;

    });

    await set(

        ref(
            db,
            "playlists/" + playlistId
        ),

        newData

    );

    document
    .getElementById(
        "editPopup"
    )
    .classList.remove(
        "show"
    );

    document
    .getElementById(
        "spotifyLink"
    )
    .value = "";

    loadSongs();

};

/* ===================== */
/* ADD */
/* ===================== */

const addPopup =
document.getElementById(
    "addPopup"
);

document
.getElementById(
    "addSongBtn"
)
.onclick = ()=>{

    addPopup.classList.add(
        "show"
    );

};

document
.getElementById(
    "closeAdd"
)
.onclick = ()=>{

    addPopup.classList.remove(
        "show"
    );

};

document
.getElementById(
    "addSong"
)
.onclick =
async ()=>{

    try{

        const link =

            document
            .getElementById(
                "newSpotifyLink"
            )
            .value
            .trim();

        if(!link){

            alert(
                "MASUKKAN LINK SPOTIFY"
            );

            return;

        }

        const snap =
            await get(

                ref(
                    db,
                    "playlists/" +
                    playlistId
                )

            );

        const songs =
            Object.values(
                snap.val() || {}
            );

        if(
            songs.length >= 100
        ){

            alert(
                "MAXIMUM 100 SONGS"
            );

            return;

        }

        let song;

        try{

            const response =
                await fetch(

                    "https://stream4stream-api.areionproject.workers.dev/?url=" +
                    encodeURIComponent(
                        link
                    )

                );

            song =
                await response.json();

        }

        catch(err){

            song = {

                title:
                    "UNKNOWN SONG",

                artist:
                    "UNKNOWN ARTIST",

                link:
                    link

            };

        }

        if(!song.title){

            song.title =
                "UNKNOWN SONG";

        }

        if(!song.artist){

            song.artist =
                "UNKNOWN ARTIST";

        }

        song.link = link;

        songs.push(song);

        const newData = {};

        songs.forEach((s,i)=>{

            newData[
                "song" + (i+1)
            ] = s;

        });

        await set(

            ref(
                db,
                "playlists/" +
                playlistId
            ),

            newData

        );

        document
        .getElementById(
            "newSpotifyLink"
        )
        .value = "";

        addPopup.classList.remove(
            "show"
        );

        loadSongs();

    }

    catch(err){

        alert(
            "ERROR : " +
            err.message
        );

        console.log(err);

    }

};
/* ===================== */
/* BACK */
/* ===================== */

document
.getElementById(
    "backBtn"
)
.onclick = ()=>{

    location.href =
        "./admin.html";

};

/* ===================== */
/* START */
/* ===================== */

loadSongs();
