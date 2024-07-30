import { GetData, GetDataByID } from "../../Helper/fetchData.js";

export const destinations = async (id, url, select) => {
    const data = await GetData(url, select || null);

    const container = document.getElementById(id);

    data?.data?.map(singleData => {
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


export const destinationByID = async (url, pageID) => {
    // console.log({ pageID, url })
    if (!url || !pageID) {
        return;
    }

    const data = await GetDataByID(url, pageID);

    // const container = document.getElementById(id);
    const header = document.getElementById("single-destination-header");
    const images = document.getElementById("single-destination-page-images");
    const article = document.getElementById("single-destination-page-article");
    const activities = document.getElementById("single-destination-page-activities");


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



}