// ======================
// CEK LOGIN
// ======================
const user = JSON.parse(localStorage.getItem("s4s_user"));

if (!user) {
  window.location.href = "index.html";
}

// ======================
// DATA USER
// ======================
const username = document.getElementById("username");
const avatar = document.getElementById("avatar");

if (username) {
  username.innerText = user.name || "MEMBER";
}

if (avatar) {
  avatar.src = user.picture;
}

// ======================
// EMAIL ADMIN
// ======================
const adminEmails = [
  "ayigh77@gmail.com",
  "weeraster0@gmail.com",
  "emailadmin3@gmail.com"
];

// ======================
// TAMPILKAN TOMBOL ADMIN
// ======================
if (adminEmails.includes(user.email)) {
  const adminBtn = document.createElement("button");

  adminBtn.id = "adminBtn";
  adminBtn.innerHTML = "⚙ ADMIN PANEL";

  adminBtn.onclick = () => {
    window.location.href = "admin.html";
  };

  const eq = document.querySelector(".equalizer");

  if (eq) {
    eq.parentNode.insertBefore(adminBtn, eq);
  } else {
    document.body.appendChild(adminBtn);
  }
}

// ======================
// LOGOUT
// ======================
function logout() {
  localStorage.removeItem("s4s_user");
  window.location.href = "index.html";
}

// ======================
// ANIMASI EQ RANDOM
// ======================
const bars = document.querySelectorAll(".bar");

setInterval(() => {
  bars.forEach(bar => {
    const h = Math.floor(Math.random() * 80) + 20;
    bar.style.height = h + "px";
  });
}, 300);
