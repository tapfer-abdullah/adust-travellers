import { GetData, GetDataByID } from "../../Helper/fetchData.js";


export const activities = async (id, url, select, options) => {

    const allSearchParams = window.location.search.split("?")?.[1]?.split("&");
    const pathname = window.location.pathname;
    let searchObj = {};
    allSearchParams?.forEach(s => {
        const arr = s.split("=");
        searchObj[`${arr[0]}`] = arr[1];
    })

    let data;
    if (url != null) {
        data = await GetData(url, select || null, options);
    }
    else {
        data = select;
    }

    if (data?.data?.data?.length > 0 && options != '?page=1&limit=8')// limit = 8, means the request come from home
    {

        const totalPages = Math.ceil(data?.data?.totalDocuments / 6);

        let locationURL = window.location.href + '&limit=6&page=';

        if (searchObj?.page && searchObj?.limit) {
            locationURL = pathname + '?';
            allSearchParams?.forEach((sp, index) => {
                if (sp?.split('=')?.[0] !== "page") {
                    locationURL += `${sp}&`
                }
            });

            locationURL += 'page=';

        }

        const paginationContainer = document.getElementById("activity-pagination");
        let paginationContents = (searchObj?.page - 1) > 0 ? `<a id="prev-btn" class="pagination-btn" href="${locationURL}${(searchObj?.page - 1)}">Prev</a>` : '<span class="pagination-btn disabled">Prev</span>';

        for (let i = 1; i <= totalPages; i++) {


            paginationContents += `<a  href="${locationURL}${i}" class="pagination-btn ${searchObj?.page == i ? 'active-pagination-btn disabled' : ''} ${!searchObj?.page && i == 1 ? 'active-pagination-btn disabled' : ''}">${i}</a>`
        }

        paginationContents += (searchObj?.page < totalPages) ? `<a id="next-btn" class="pagination-btn" href="${locationURL}${(parseInt(searchObj?.page) + 1)}">Next</a>` : '<span class="pagination-btn disabled">Next</span>';

        paginationContainer.innerHTML = paginationContents;

        // const totalPages = 
    }
    else {
        const notFound = document.getElementById("not-found");
        notFound.classList.remove('hidden')
        notFound.innerHTML = `<img src="/public/assets/icon/warning.svg" alt="">
                    <p>Not found any activities !</p></div>`
    }

    const container = document.getElementById(id);

    data?.data?.data?.map(singleData => {
        const a = document.createElement("a");
        a.href = `/destination/details.html?id=${singleData?._id}`;

        a.innerHTML = `<div class="activity-card">
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
                            </div>`

        container.appendChild(a)
    })

}



function formateDate(date) {
    const dateObj = new Date(date);
    // Get the day, month, and year from the Date object
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();

    // Format the date as DD-MM-YYYY
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
}

export const activityByID = async (url, pageID) => {
    if (!url || !pageID) {
        return;
    }

    const data = await GetDataByID(url, pageID);

    const selectedDate = new Date(data?.data?.startingDate);

    // Get the current date and time
    const currentDate = new Date();


    // const container = document.getElementById(id);
    const header = document.getElementById("activity-page-header");
    const images = document.getElementById("activity-page-images");
    const placeDesc = document.getElementById("activity-page-place");
    const tourDesc = document.getElementById("activity-page-tour");
    const cart = document.getElementById("activity-page-cart");
    // const activities = document.getElementById("single-destination-page-activities");


    header.innerHTML = `<h2>${data?.data?.name}</h2>
    <div class="location"><ion-icon name="location"></ion-icon> <span>${data?.data?.location}</span>
    </div>`;

    data?.data?.images?.map((i, idx) => {
        const img = document.createElement('img');
        img.classList.add(`img-${idx + 1}`);
        img.src = `${i}`;
        images.appendChild(img)
    })

    // placeDesc.innerText = `${data?.data?.placeDescription}`;
    // tourDesc.innerText = `${data?.data?.tourDescription}`;
    placeDesc.innerHTML = `${data?.data?.placeDescription}`;
    tourDesc.innerHTML = `${data?.data?.tourDescription}`;

    const condition = (currentDate >= selectedDate) || (data?.data?.totalSeats - data?.data?.booked === 0);
    // console.log({ condition, data: data?.data, currentDate, selectedDate, d: currentDate >= selectedDate })

    cart.innerHTML = `
                    <div>
                        <img src="/public/assets/icon/calender.svg" alt="" class="icon-image">
                        <p>${formateDate(data?.data?.startingDate)} to ${formateDate(data?.data?.endingDate)}</p>
                    </div>
                    <div>
                        <img src="/public/assets/icon/duration.svg" alt="" class="icon-img">
                        <p>${data?.data?.days} days ${data?.data?.nights} nights</p>
                    </div>
                    <div>
                        <img src="/public/assets/icon/seats.svg" alt="" class="icon-img">
                        <p>${data?.data?.totalSeats - data?.data?.booked} seats available</p>
                    </div>
                    <div class="">
                        <img src="/public/assets/icon/star.svg" alt="" class="icon-img">
                        <p class="">${data?.data?.ratings} (${data?.data?.totalReviews} reviews)</p>
                    </div>
                    <div class="price">
                        <img src="/public/assets/icon/taka.svg" alt="" class="icon-img">
                        <p><span>${(data?.data?.price)?.toFixed(1)}</span> (1 person)</p>
                    </div>
                    <div class="divider"></div>

                    <div>
                        <div class="">
                            <img src="/public/assets/icon/user-group.svg" alt="" class="icon-img">
                            <p class="">Person:</p>
                        </div>
                        <div class="quantity">
                            <button ${condition ? 'disabled' : ''} onclick="decreaseQuantity()" class="quantity-btn quantity-btn-minus ${(condition ? 'disabled' : '')}">
                                <img src="/public/assets/icon/minus.svg" alt="" class="icon-img">
                            </button>
                            <input ${condition ? 'readOnly' : ''} class="${(condition ? 'disabled' : '')}" value='1' type="number" name="actual-quantity" id="actual-quantity-field" min="1">
                            <button ${condition ? 'disabled' : ''} onclick="increaseQuantity()" class="quantity-btn quantity-btn-plus ${(condition ? 'disabled' : '')}" id="quantity-btn quantity-btn-plus">
                                <img src="/public/assets/icon/plus-2.svg" alt="" class="icon-img">
                            </button>
                        </div>
                    </div>
                    <button ${condition ? 'disabled' : ''} onclick="addToCart('${data?.data?._id}', '${data?.data?.name}', '${data?.data?.price}', '${data?.data?.images?.[0]}')" class="btn-add-cart ${(condition ? 'disabled unavailable' : '')}">${condition ? "UNAVAILABLE" : "ADD TO CART"}</button>
                `
}

