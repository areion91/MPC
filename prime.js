= () => {

    totalInput++;

    const container =
        document.getElementById(
            "songInputs"
        );

    const input =
        document.createElement(
            "input"
        );

    input.type = "text";

    input.className =
        "songInput";

    input.placeholder =
        "Spotify Link " +
        totalInput;

    container.appendChild(
        input
    );

};

// ======================
// SUBMIT REQUEST
// ======================

document
    .getElementById(
        "submitRequest"
    )
    ?.addEventListener(
        "click",
        () => {

            const inputs =
                document.querySelectorAll(
                    ".songInput"
                );

            const songs = [];

            inputs.forEach(input => {

                if (
                    input.value.trim()
                ) {

                    songs.push(
                        input.value.trim()
                    );

                }

            });

            if (
                songs.length === 0
            ) {

                alert(
                    "Add song first."
                );

                return;

            }

            push(

                ref(
                    db,
                    "primeRequest"
                ),

                {

                    uid:
                        user.uid,

                    name:
                        user.name ||
                        "USER",

                    email:
                        user.email ||
                        "",

                    picture:
                        user.picture ||
                        "",

                    songs:
                        songs,

                    approved:
                        false,

                    time:
                        Date.now()

                }

            ).then(() => {

                alert(
                    "Request sent."
                );

                popup.style.display =
                    "none";

            });

        }
    );
