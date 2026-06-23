document
    .getElementById(
        "backBtn"
    )
    .onclick = () => {

        window.location.href =
            "./dashboard.html";

    };

// contoh progress

const percent = 100;

document
    .getElementById(
        "progressFill"
    )
    .style.width =
    percent + "%";

document
    .getElementById(
        "progressText"
    )
    .textContent =
    percent + "%";

if (percent >= 100) {

    document
        .getElementById(
            "checkin"
        )
        .disabled = false;

}
