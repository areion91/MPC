// BACK
document
    .getElementById(
        "backBtn"
    )
    .onclick = () => {

        window.location.href =
            "./dashboard.html";

    };

// CHECK-IN
document
    .getElementById(
        "checkin"
    )
    .onclick = () => {

        const toast =
            document.getElementById(
                "toast"
            );

        toast.classList.add(
            "show"
        );

        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 2500);

    };
