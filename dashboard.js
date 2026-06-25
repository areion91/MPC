// ======================
// CEK LOGIN
// ======================

const user = JSON.parse(
    localStorage.getItem("s4s_user")
);

if(!user){
    location.href = "index.html";
}

// ======================
// ELEMENT
// ======================

const username =
document.getElementById("username");

const avatar =
document.getElementById("avatar");

const adminArea =
document.getElementById("adminArea");

const adminBtn =
document.getElementById("adminBtn");

// ======================
// DATA USER
// ======================

if(avatar && user.picture){
    avatar.src = user.picture;
}

// ======================
// EMAIL ADMIN
// ======================

const adminEmails = [

    "ayigh77@gmail.com",
    "weeraster0@gmail.com"

];

// ======================
// CEK ADMIN
// ======================

if(
    user.email &&
    adminEmails.includes(
        user.email.toLowerCase()
    )
){

    username.innerText = "ADMIN";

    adminArea.style.display = "block";

    adminBtn.onclick = () => {
        location.href = "admin.html";
    };

}else{

    username.innerText =
        user.name || "MEMBER";

}

// ======================
// EQUALIZER
// ======================

const bars =
document.querySelectorAll(".bar");

function randomEQ(){

    bars.forEach(bar => {

        const h =
        Math.floor(
            Math.random() * 60
        ) + 20;

        bar.style.height =
        h + "px";

    });

}

setInterval(randomEQ,300);

// ======================
// LOGOUT
// ======================

function logout(){

    localStorage.removeItem(
        "s4s_user"
    );

    location.href =
    "index.html";

}
