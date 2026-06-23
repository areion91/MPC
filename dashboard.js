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
    document.getElementById(
        "avatar"
    );

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
    ).textContent =
        "WELCOME, ADMIN";

} else {

    document.getElementById(
        "welcome"
    ).textContent =
        `WELCOME, ${
            (user.name || "USER")
            .toUpperCase()
        }`;

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
    ).textContent =
        playlistData.indieTitle;

    document.getElementById(
        "indieDesc"
    ).textContent =
        playlistData.indieDesc;

    document.getElementById(
        "primeTitle"
    ).textContent =
        playlistData.primeTitle;

    document.getElementById(
        "primeDesc"
    ).textContent =
        playlistData.primeDesc;

}

// ======================
// Tampilkan Pensil Admin
// ======================
if (isAdmin) {

    document
        .querySelectorAll(".edit")
        .forEach(edit => {

            edit.style.display =
                "inline";

        });

}

// ======================
// Edit Indie Title
// ======================
document
    .getElementById(
        "editIndieTitle"
    )
    .onclick = () => {

        if (!isAdmin) return;

        const value = prompt(
            "INDIE TITLE",
            document
                .getElementById(
                    "indieTitle"
                )
                .textContent
        );

        if (value !== null &&
            value.trim() !== "") {

            document
                .getElementById(
                    "indieTitle"
                )
                .textContent =
                value;

            savePlaylist();
        }

    };

// ======================
// Edit Indie Desc
// ======================
document
    .getElementById(
        "editIndieDesc"
    )
    .onclick = () => {

        if (!isAdmin) return;

        const value = prompt(
            "INDIE DESCRIPTION",
            document
                .getElementById(
                    "indieDesc"
                )
                .textContent
        );

        if (value !== null &&
            value.trim() !== "") {

            document
                .getElementById(
                    "indieDesc"
                )
                .textContent =
                value;

            savePlaylist();
        }

    };

// ======================
// Edit Prime Title
// ======================
document
    .getElementById(
        "editPrimeTitle"
    )
    .onclick = () => {

        if (!isAdmin) return;

        const value = prompt(
            "PRIME TITLE",
            document
                .getElementById(
                    "primeTitle"
                )
                .textContent
        );

        if (value !== null &&
            value.trim() !== "") {

            document
                .getElementById(
                    "primeTitle"
                )
                .textContent =
                value;

            savePlaylist();
        }

    };

// ======================
// Edit Prime Desc
// ======================
document
    .getElementById(
        "editPrimeDesc"
    )
    .onclick = () => {

        if (!isAdmin) return;

        const value = prompt(
            "PRIME DESCRIPTION",
            document
                .getElementById(
                    "primeDesc"
                )
                .textContent
        );

        if (value !== null &&
            value.trim() !== "") {

            document
                .getElementById(
                    "primeDesc"
                )
                .textContent =
                value;

            savePlaylist();
        }

    };

// ======================
// Simpan Playlist
// ======================
function savePlaylist() {

    localStorage.setItem(
        "playlist_data",
        JSON.stringify({

            indieTitle:
                document
                .getElementById(
                    "indieTitle"
                )
                .textContent,

            indieDesc:
                document
                .getElementById(
                    "indieDesc"
                )
                .textContent,

            primeTitle:
                document
                .getElementById(
                    "primeTitle"
                )
                .textContent,

            primeDesc:
                document
                .getElementById(
                    "primeDesc"
                )
                .textContent

        })
    );

}

// ======================
// Playlist Indie
// ======================
document
    .getElementById(
        "indie"
    )
    .onclick = () => {

        window.location.href =
            "./indie.html";

    };

// ======================
// Playlist Primezone
// ======================
document
    .getElementById(
        "prime"
    )
    .onclick = () => {

        window.location.href =
            "./primezone.html";

    };

// ======================
// Logout
// ======================
document
    .getElementById(
        "logout"
    )
    .onclick = () => {

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
