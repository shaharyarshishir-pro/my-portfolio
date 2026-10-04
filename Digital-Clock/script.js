// ========================================
// DIGITAL CLOCK V2
// Muzahidul Islam
// ========================================

let is24Hour = false;

// ================================
// ELEMENTS
// ================================

const timeElement = document.getElementById("time");
const dateElement = document.getElementById("date");
const periodElement = document.getElementById("period");
const formatButton = document.getElementById("formatToggle");
const themeButton = document.getElementById("themeToggle");


// ================================
// UPDATE CLOCK
// ================================

function updateClock() {

    const now = new Date();

    // ========================================
    // GET DHAKA TIME
    // ========================================

    const timeOptions = {
        timeZone: "Asia/Dhaka",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: !is24Hour
    };

    const dhakaTime = new Intl.DateTimeFormat(
        "en-US",
        timeOptions
    ).formatToParts(now);


    // ========================================
    // GET TIME PARTS
    // ========================================

    let hours = "";
    let minutes = "";
    let seconds = "";
    let period = "";

    dhakaTime.forEach(part => {

        if (part.type === "hour") {
            hours = part.value;
        }

        if (part.type === "minute") {
            minutes = part.value;
        }

        if (part.type === "second") {
            seconds = part.value;
        }

        if (part.type === "dayPeriod") {
            period = part.value;
        }

    });


    // ========================================
    // DISPLAY TIME
    // ========================================

    timeElement.textContent =
        `${hours}:${minutes}:${seconds}`;


    // ========================================
    // DISPLAY AM / PM
    // ========================================

    periodElement.textContent =
        is24Hour ? "24 HOUR" : period;


    // ========================================
    // DATE
    // ========================================

    const dateOptions = {

        timeZone: "Asia/Dhaka",

        weekday: "long",

        year: "numeric",

        month: "long",

        day: "numeric"

    };


    const formattedDate =
        new Intl.DateTimeFormat(
            "en-US",
            dateOptions
        ).format(now);


    dateElement.textContent =
        formattedDate;

}


// ================================
// FORMAT TOGGLE
// ================================

formatButton.addEventListener(
    "click",
    () => {

        is24Hour = !is24Hour;

        if (is24Hour) {

            formatButton.textContent =
                "12 Hour";

        } else {

            formatButton.textContent =
                "24 Hour";

        }

        updateClock();

    }
);


// ================================
// DARK / LIGHT MODE
// ================================

themeButton.addEventListener(
    "click",
    () => {

        document.body.classList.toggle("light");

        if (
            document.body.classList.contains("light")
        ) {

            themeButton.textContent = "☀️";

        } else {

            themeButton.textContent = "🌙";

        }

    }
);


// ================================
// INITIAL UPDATE
// ================================

updateClock();


// ================================
// UPDATE EVERY SECOND
// ================================

setInterval(
    updateClock,
    1000
);