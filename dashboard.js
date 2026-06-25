// ======================
// LOGIN
// ======================
const user = JSON.parse(localStorage.getItem("s4s_user"));

if (!user) {
    location.href = "index.html";
}

// ======================
// ADMIN EMAIL
// ======================
const adminEmails = [
    "ayigh77@gmail.com",
    "weeraster0@gmail.com"
];

// ======================
// USERNAME
// ======================
const username = document.getElementById("username");

if (adminEmails.includes(user.email)) {
    username.innerText = "ADMIN";
    document.getElementById("adminArea").style.display = "block";
} else {
    username.innerText = user.name || "MEMBER";
}

// ======================
// AVATAR
// ======================
const profileBtn = document.getElementById("profileBtn");

if (profileBtn && user.picture) {
    profileBtn.src = user.picture;
}

// ======================
// EQ
// ======================
const bars = document.querySelectorAll(".equalizer span");

setInterval(() => {
    bars.forEach(bar => {
        bar.style.height =
            Math.floor(Math.random() * 60 + 20) + "px";
    });
}, 300);

// ======================
// LOGOUT
// ======================
function logout() {
    localStorage.removeItem("s4s_user");
    location.href = "index.html";
}
