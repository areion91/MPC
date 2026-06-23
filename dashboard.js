const user = JSON.parse(localStorage.getItem("s4s_user"));

// ======================
// Belum Login
// ======================
if (!user) {
    window.location.href = "../index.html";
}

// ======================
// Daftar Admin
// ======================
const ADMINS = [
    "areionproject@gmail.com",
    "ayigh77@gmail.com",
    "suparmituman@gmail.com"
];

// ======================
// Cek Role
// ======================
const isAdmin = ADMINS.includes(user.email.toLowerCase());

// ======================
// Welcome
// ======================
if (isAdmin) {

    document.getElementById("welcome").innerHTML =
    "WELCOME, ADMIN";

    // Kalau nanti ada tombol admin
    const manage = document.getElementById("manage");

    if (manage) {
        manage.style.display = "block";
    }

} else {

    document.getElementById("welcome").innerHTML =
    `WELCOME, ${user.name.toUpperCase()}`;

}

// ======================
// Playlist Indie
// ======================
document.getElementById("indie").onclick = () => {

    window.location.href = "./indie.html";

};

// ======================
// Playlist Primezone
// ======================
document.getElementById("prime").onclick = () => {

    window.location.href = "./primezone.html";

};

// ======================
// Logout
// ======================
document.getElementById("logout").onclick = () => {

    localStorage.removeItem("s4s_user");

    window.location.href = "../index.html";

};

// ======================
// Equalizer Animation
// ======================
const bars = document.querySelectorAll(".equalizer span");

if (bars.length > 0) {

    setInterval(() => {

        bars.forEach(bar => {

            bar.style.height =
            (Math.floor(Math.random() * 42) + 8) + "px";

        });

    }, 120);

}
