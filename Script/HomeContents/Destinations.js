import { GetData, GetDataByID, GetDataByRef } from "../../Helper/fetchData.js";


import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs';
const swiper = new Swiper('.swiper', {
    slidesPerView: 4,
    spaceBetween: 30,
    freeMode: true,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
    scrollbar: {
        el: '.swiper-scrollbar',
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


export const destinations = async (id, url, select, options) => {
    let data;

    const container = document.getElementById(id);

    if (url != null) {
        data = await GetData(url, select || null, options);

        data?.data?.data?.map(singleData => {
            const div = document.createElement("div");

            div.classList.add("swiper-slide");
            div.innerHTML = `<a href="/destination/index.html?id=${singleData?._id}">
                <div class="top-destination-card">
                    <img src=${singleData?.images?.[0]} alt=${singleData?.name}/>
                    <div class="overlay">
                    </div>
                    <p>${singleData?.name}</p>
                </div>
            </a>`

            container.appendChild(div)
        })
    }
    else {
        data = select?.data;


        const allSearchParams = window.location.search.split("?")?.[1]?.split("&");
        const pathname = window.location.pathname;

        let searchObj = {};
        allSearchParams?.forEach(s => {
            const arr = s.split("=");
            searchObj[`${arr[0]}`] = arr[1];
        })
        const totalPages = Math.ceil(select?.data?.totalDocuments / 4);

        let locationURL = window.location.href + '?limit=4&page=';

        console.log({ totalPages, locationURL, searchObj, pathname, p: select?.data?.totalDocuments })

        if (searchObj?.page && searchObj?.limit) {
            locationURL = pathname + '?';
            allSearchParams?.forEach((sp, index) => {
                if (sp?.split('=')?.[0] !== "page") {
                    locationURL += `${sp}&`
                }
            });

            locationURL += 'page=';

        }

        const paginationContainer = document.getElementById("destination-pagination");
        let paginationContents = (searchObj?.page - 1) > 0 ? `<a id="prev-btn" class="pagination-btn" href="${locationURL}${(searchObj?.page - 1)}">Prev</a>` : '<span class="pagination-btn disabled">Prev</span>';

        for (let i = 1; i <= totalPages; i++) {
            paginationContents += `<a  href="${locationURL}${i}" class="pagination-btn ${searchObj?.page == i ? 'active-pagination-btn disabled' : ''} ${!searchObj?.page && i == 1 ? 'active-pagination-btn disabled' : ''}">${i}</a>`
        }

        paginationContents += (searchObj?.page < totalPages) ? `<a id="next-btn" class="pagination-btn" href="${locationURL}${(parseInt(searchObj?.page) + 1)}">Next</a>` : '<span class="pagination-btn disabled">Next</span>';

        paginationContainer.innerHTML = paginationContents;

        data?.data?.map(singleData => {
            const div = document.createElement("div");

            div.innerHTML = `<a href="/destination/index.html?id=${singleData?._id}">
                <div class="top-destination-card">
                    <img src=${singleData?.images?.[0]} alt=${singleData?.name}/>
                    <div class="overlay">
                    </div>
                    <p>${singleData?.name}</p>
                </div>
            </a>`

            container.appendChild(div)
        })
    }





}


export const destinationByID = async (url, pageID) => {
    // console.log({ pageID, url })
    if (!url || !pageID) {
        return;
    }

    const data = await GetDataByID(url, pageID);
    const sliderData = await GetDataByRef(`activity/ref/${pageID}`);
    // console.log({ data, sliderData })

    // const container = document.getElementById(id);
    const header = document.getElementById("single-destination-header");
    const images = document.getElementById("single-destination-page-images");
    const article = document.getElementById("single-destination-page-article");
    const activitiesTitle = document.getElementById("single-destination-page-activities-title");


    header.innerHTML = `<h2>${data?.data?.name}</h2>
    <div class="location"><ion-icon name="location"></ion-icon> <span>${data?.data?.location}</span>
    </div>`;

    data?.data?.images?.map((i, idx) => {
        const img = document.createElement('img');
        img.classList.add(`img-${idx + 1}`);
        img.src = `${i}`;
        images.appendChild(img)
    })

    article.innerHTML = `
    <h3>Discover the Magic of ${data?.data?.name}</h3>
    <p>${data?.data?.description}</p>`;


    // const sliderData = await GetDataByRef(`activity/ref/${pageID}`);

    activitiesTitle.innerText = `Activities in ${data?.data?.name}`;

    sliderData?.data?.data?.map(singleData => {
        const sliderDiv = document.getElementById("single-destination-page-activities-slider");
        const slide = document.createElement("div");
        slide.classList.add("swiper-slide");

        slide.innerHTML = `<a href='/destination/details.html?id=${singleData?._id}'>
        <div class="activity-card">
        <img src=${singleData?.images?.[0]}
            alt="">
        <div class="activity-card-content">
        <h3>${singleData?.name}</h3>
            <div class="flex gap-3 items-start">
                <p class="icon"><ion-icon name="location-outline"></ion-icon></p>
                <p class="capitalized">${singleData?.location}</p>
            </div>
            
            <div class="ratings-container">
                <div class="ratings">
                    <p class="icon"><ion-icon name="star"></ion-icon></p>
                  </div>
                <p class="">${singleData?.ratings} (${singleData?.totalReviews || 4.9} reviews)</p>
            </div>

            <div class="flex gap-3 items-center">
                <p class="way way-rail">${singleData?.way?.[0]}</p>
                <p class="way way-cruise">${singleData?.way?.[1]}</p>
            </div>

            <div class="divider"></div>

            <div class="flex gap-3 items-center justify-between">
                <div class="">
                    <h4 class="line-through">৳${singleData?.comparePrice}</h4>
                    <h3><span>From </span>৳${singleData?.price}</h3>
                </div>

                <div class="flex gap-3 items-center">
                    <p class="icon"><ion-icon name="time-outline"></ion-icon></p>
                    <p class="">${singleData?.days} days ${singleData?.nights} nights</p>
                </div>
            </div>
        </div>
    </div>
    </a>`

        sliderDiv.appendChild(slide);
    })

}




