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

flatpickr("#date-range", {
    mode: "range",
    dateFormat: "d-m-Y",
    // defaultDate: ["20-07-2024", "30-07-2024"] // Preloading range dates
    defaultDate: [getCurrentAndFutureDate(3).currentDate, getCurrentAndFutureDate(3).futureDate] // Preloading range dates
});