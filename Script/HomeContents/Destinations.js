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

    const sliderDiv = document.getElementById("single-destination-page-activities-slider");

    const length = sliderData?.data?.data?.length;
    if (length > 0) {
        sliderData?.data?.data?.map(singleData => {
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
    else {
        sliderDiv.innerHTML = `<div class="not-found">
        <img src="/public/assets/icon/warning.svg" alt="">
                <p>Not found any activities !</p></div>`
    }

}

export const homeDedicatedDestinations = async (id) => {
    const id1 = "66d329fa58a26ac50a9ddcbd";
    const id2 = "66d327afe2b6130a50a34c5f";
    const dest1 = await GetDataByID(`destination`, id1);
    const dest2 = await GetDataByID(`destination`, id2);
    console.log({ dest1, dest2, id })

    const container = document.getElementById(id);
    container.innerHTML = `
    <div class="inspired-card">
                        <img src="https://www.tusktravel.com/blog/wp-content/uploads/2019/10/Gadi-Sagar-Lake-Jaisalmer.jpg"
                            alt="">
                        <div class="overlay"></div>
                        <div class="inspired-card-content">
                            <div>
                                <h3>India (Kolkata, Khasmir, Agra, Kerela, Jaipur)</h3>
                                <p>India is a culturally diverse country with numerous tourist attractions. Key highlights include the iconic Taj Mahal in Agra, Kashmir, known as "Paradise on Earth" and so on</p>
                            </div>
                            <button id="inspired-btn-1" class="btn-solid"><a href="/destination/index.html?id=66d329fa58a26ac50a9ddcbd">See all activities</a></button>
                        </div>
                    </div>
                    <div class="inspired-card">
                        <img src="https://cosmosgroup.sgp1.digitaloceanspaces.com/news/9782559_best%20tea%20gardens%20Bangladesh.jpg"
                            alt="">
                        <div class="overlay"></div>
                        <div class="inspired-card-content">
                            <div>
                                <h3>Sylhet (Srimongol, Ratargul, Jaflong, Volagong)</h3>
                                <p>Sylhet is a picturesque region in northeastern Bangladesh, renowned for its lush tea gardens, rolling hills, and vibrant cultural heritage.</p>
                            </div>
                            <button id="inspired-btn-1" class="btn-solid"><a href="/destination/index.html?id=66d327afe2b6130a50a34c5f">See all activities</a></button>
                        </div>
                    </div>
    `
}




