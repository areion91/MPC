const user = JSON.parse(
    localStorage.getItem("s4s_user")
);

// ======================
// Belum Login
// ======================
if (!user) {
    window.location.href = "./index.html";
}

// ======================
// Avatar
// ======================
const avatar =
    document.getElementById("avatar");

if (avatar && user.picture) {
    avatar.src = user.picture;
}

// ======================
// Daftar Admin
// ======================
const ADMINS = [
    "areionproject@gmail.com",
    "ayigh77@gmail.com",
    "weeraster0@gmail.com"
];

// ======================
// Cek Role
// ======================
const isAdmin =
    user.email &&
    ADMINS.includes(
        user.email.toLowerCase()
    );

// ======================
// Welcome
// ======================
if (isAdmin) {

    document.getElementById(
        "welcome"
    ).innerHTML =
        "WELCOME, ADMIN";

} else {

    document.getElementById(
        "welcome"
    ).innerHTML =
        `WELCOME, ${
            (user.name || "USER")
            .toUpperCase()
        }`;

}

// ======================
// Tombol Manage
// ======================
const manage =
    document.getElementById(
        "manage"
    );

if (isAdmin && manage) {
    manage.style.display =
        "block";
}

// ======================
// Load Playlist Data
// ======================
const playlistData =
    JSON.parse(
        localStorage.getItem(
            "playlist_data"
        )
    );

if (playlistData) {

    document.getElementById(
        "indieTitle"
    ).innerHTML =
        playlistData.indieTitle;

    document.getElementById(
        "indieDesc"
    ).innerHTML =
        playlistData.indieDesc;

    document.getElementById(
        "primeTitle"
    ).innerHTML =
        playlistData.primeTitle;

    document.getElementById(
        "primeDesc"
    ).innerHTML =
        playlistData.primeDesc;

}

// ======================
// Manage Playlist
// ======================
if (isAdmin && manage) {

    manage.onclick = () => {

        const indieTitle =
            prompt(
                "INDIE TITLE:",
                document
                .getElementById(
                    "indieTitle"
                ).innerHTML
            );

        if (indieTitle === null)
            return;

        const indieDesc =
            prompt(
                "INDIE DESCRIPTION:",
                document
                .getElementById(
                    "indieDesc"
                ).innerHTML
            );

        if (indieDesc === null)
            return;

        const primeTitle =
            prompt(
                "PRIME TITLE:",
                document
                .getElementById(
                    "primeTitle"
                ).innerHTML
            );

        if (primeTitle === null)
            return;

        const primeDesc =
            prompt(
                "PRIME DESCRIPTION:",
                document
                .getElementById(
                    "primeDesc"
                ).innerHTML
            );

        if (primeDesc === null)
            return;

        localStorage.setItem(
            "playlist_data",
            JSON.stringify({

                indieTitle,
                indieDesc,
                primeTitle,
                primeDesc

            })
        );

        location.reload();

    };

}

// ======================
// Playlist Indie
// ======================
document.getElementById(
    "indie"
).onclick = () => {

    window.location.href =
        "./indie.html";

};

// ======================
// Playlist Primezone
// ======================
document.getElementById(
    "prime"
).onclick = () => {

    window.location.href =
        "./primezone.html";

};

// ======================
// Logout
// ======================
document.getElementById(
    "logout"
).onclick = () => {

    localStorage.removeItem(
        "s4s_user"
    );

    window.location.href =
        "../index.html";

};

// ======================
// Equalizer Animation
// ======================
const bars =
    document.querySelectorAll(
        ".equalizer span"
    );

if (bars.length > 0) {

    setInterval(() => {

        bars.forEach(bar => {

            bar.style.height =
                (
                    Math.floor(
                        Math.random() * 42
                    ) + 8
                ) + "px";

        });

    }, 120);

}
