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
// POPUP MEMBER
// ======================
const memberPopup =
    document.getElementById(
        "memberPopup"
    );

const songPopup =
    document.getElementById(
        "songPopup"
    );

const popupContent =
    document.getElementById(
        "popupContent"
    );

const songHistory =
    document.getElementById(
        "songHistory"
    );

// ======================
// VIEW REQUEST
// ======================
document
.querySelectorAll(
    ".viewBtn"
)
.forEach(btn => {

    btn.onclick = () => {

        popupContent.innerHTML = `

            <b>Username</b>
            <br>
            Ariyou

            <br><br>

            <b>Last.fm</b>
            <br>
            Ariyou

            <br><br>

            <b>Playlist</b>
            <br>
            PRIME

            <br><br>

            <b>Song Request</b>

            <br>

            https://spotify....

        `;

        memberPopup.style.display =
            "flex";

    };

});

// ======================
// CLOSE POPUP
// ======================
document
.getElementById(
    "closePopup"
)
.onclick = () => {

    memberPopup.style.display =
        "none";

};

document
.getElementById(
    "closeSongPopup"
)
.onclick = () => {

    songPopup.style.display =
        "none";

};

// ======================
// VIEW SONG HISTORY
// ======================
document
.querySelectorAll(
    ".viewSongBtn"
)
.forEach(btn => {

    btn.onclick = () => {

        songHistory.innerHTML = `

            <b>Lunaria</b>

            <br>

            Sampai Titik Terakhirmu

            <br><br>

            <b>Arizky Armay</b>

            <br>

            CEO

            <br><br>

            <b>Reality Club</b>

            <br>

            Anything You Want

        `;

        songPopup.style.display =
            "flex";

    };

});

// ======================
// APPROVE
// ======================
document
.querySelectorAll(
    ".approveBtn"
)
.forEach(btn => {

    btn.onclick = () => {

        alert(
            "APPROVED"
        );

    };

});

// ======================
// REJECT
// ======================
document
.querySelectorAll(
    ".rejectBtn"
)
.forEach(btn => {

    btn.onclick = () => {

        alert(
            "REJECTED"
        );

    };

});

// ======================
// CLICK OUTSIDE
// ======================
window.onclick = (e) => {

    if (
        e.target === memberPopup
    ) {

        memberPopup.style.display =
            "none";

    }

    if (
        e.target === songPopup
    ) {

        songPopup.style.display =
            "none";

    }

};
