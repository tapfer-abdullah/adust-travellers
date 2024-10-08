
import { basicAlert, loadSearchFunction } from "./common.js";
import { activities } from "./HomeContents/Activities.js";
import { destinations, homeDedicatedDestinations, interNationalTours } from "./HomeContents/Destinations.js";


export const swiper1 = new Swiper(".mySwiper2", {
    slidesPerView: 4,
    spaceBetween: 30,
    freeMode: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next2',
        prevEl: '.swiper-button-prev2',
    },
    breakpoints: {
        // when window width is >= 1024px (desktops)
        1024: {
            slidesPerView: 4,
            spaceBetween: 30,
        },
        // when window width is >= 768px (tablets)
        768: {
            slidesPerView: 3,
            spaceBetween: 20,
        },
        // when window width is >= 480px (smartphones)
        480: {
            slidesPerView: 2,
            spaceBetween: 10,
        },
        // when window width is < 480px (small screens)
        0: {
            slidesPerView: 1,
            spaceBetween: 10,
        }
    }
});

export const swiper2 = new Swiper(".mySwiper1", {
    slidesPerView: 4,
    spaceBetween: 30,
    freeMode: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next1',
        prevEl: '.swiper-button-prev1',
    },
    breakpoints: {
        // when window width is >= 1024px (desktops)
        1024: {
            slidesPerView: 4,
            spaceBetween: 30,
        },
        // when window width is >= 768px (tablets)
        768: {
            slidesPerView: 3,
            spaceBetween: 20,
        },
        // when window width is >= 480px (smartphones)
        480: {
            slidesPerView: 2,
            spaceBetween: 10,
        },
        // when window width is < 480px (small screens)
        0: {
            slidesPerView: 1,
            spaceBetween: 10,
        }
    }
});


export function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

export function getCurrentAndFutureDate(future) {
    const currentDate = new Date();
    const futureDate = new Date();

    futureDate.setDate(currentDate.getDate() + future);

    const formattedCurrentDate = formatDate(currentDate);
    const formattedFutureDate = formatDate(futureDate);

    return {
        currentDate: formattedCurrentDate,
        futureDate: formattedFutureDate
    };
}

function addDaysToDate(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}
// Function to format date to ISO 8601 in Bangladeshi timezone
function formatDateToISOInBST(date) {
    const options = {
        timeZone: 'Asia/Dhaka',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        fractionalSecondDigits: 3
    };

    const dateTimeFormat = new Intl.DateTimeFormat('en-US', options);
    const parts = dateTimeFormat.formatToParts(date);
    const formattedDate = parts.reduce((acc, part) => {
        if (part.type !== 'literal') {
            acc[part.type] = part.value;
        }
        return acc;
    }, {});

    console.log({ formattedDate })

    // Construct the ISO 8601 string
    return `${formattedDate.year}-${formattedDate.month}-${formattedDate.day}T${formattedDate.hour}:${formattedDate.minute}:${formattedDate.second}.${formattedDate.fractionalSecond}Z`;
}

// Initialize Flatpickr with date range mode
const flatpickrInstance = flatpickr("#date-range", {
    mode: "range",
    dateFormat: "d-m-Y",
    defaultDate: [getCurrentAndFutureDate(3).currentDate, getCurrentAndFutureDate(3).futureDate]
});

// Function to get and display the selected date range
function showSelectedDateRange() {
    const selectedDates = flatpickrInstance.selectedDates;
    if (selectedDates.length === 2) {
        const startDate = selectedDates[0];
        const endDate = selectedDates[1];

        // Convert dates to ISO string format adjusted for Bangladeshi timezone
        const startDateISO = formatDateToISOInBST(startDate);
        const endDateISO = formatDateToISOInBST(addDaysToDate(endDate, 1));


        return { startDate: startDateISO, endDate: endDateISO };

    } else {
        console.log("No complete date range selected.");
        basicAlert("Please select a complete date range.", "warning");
    }
}


document.getElementById("handleSearch").addEventListener("click", async () => {
    const { startDate, endDate } = showSelectedDateRange();
    const searchText = document.getElementById('searchInput').value;
    window.location.assign(`/destination/search.html?query=${searchText}&startDate=${startDate}&endDate=${endDate}`);
})



window.addEventListener('load', async () => {
    // search 
    await loadSearchFunction();
    // id, url, select
    await destinations("destination-wrapper", "destination", "name0images");

    // 2 dedicated places in home 
    // await homeDedicatedDestinations("home-dedicated-destination");


    // await activities("top-activities-carts-container", "activity");
    await activities("top-activities-carts-container", "activity", undefined, `?page=1&limit=8`);
    await interNationalTours('InternationalTourContainer');

    // alert("welcome")


});


