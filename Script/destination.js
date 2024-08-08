import { GetData, GetDataByID, searchDestination } from "../Helper/fetchData.js";
import { activities, activityByID } from "./HomeContents/Activities.js";
import { destinationByID, destinations } from "./HomeContents/Destinations.js";


window.addEventListener("load", async () => {
    const allSearchParams = window.location.search.split("?")?.[1]?.split("&");
    const pathname = window.location.pathname;
    // console.log({ pathname })

    let searchObj = {};
    allSearchParams?.forEach(s => {
        const arr = s.split("=");
        searchObj[`${arr[0]}`] = arr[1];
    })


    //destination
    if (pathname == "/destination/index.html") {
        await destinationByID("destination", searchObj?.id);
    }
    //details
    else if (pathname == "/destination/details.html") {
        await activityByID("activity", searchObj?.id);
    }
    // search 
    else if (pathname == "/destination/search.html") {
        function formateDate(date) {
            const dateArr = date.slice(0, 10).split("-");
            return `${dateArr?.[2]}-${dateArr?.[1]}-${dateArr?.[0]}`
        }
        function formateDateMinusOne(date) {
            const dateArr = date.slice(0, 10).split("-");
            const day = parseInt(dateArr?.[2]) - 1;
            return `${day ? day : 30}-${dateArr?.[1]}-${dateArr?.[0]}`
        }

        const notFound = document.getElementById("not-found");
        if (searchObj?.query === 'all') {
            const searchBanner = document.getElementById("search-banner");
            searchBanner.innerHTML = `<h1>All Activities</h1>`;
            notFound.classList.add("hidden");

            await activities("search-activities-container", "activity");
        }
        else {
            const { query, startDate, endDate } = searchObj;
            const data = await searchDestination(query, startDate, endDate);

            const searchBanner = document.getElementById("search-banner");


            const length = data?.data?.length;
            if (length > 0) {
                searchBanner.innerHTML = `<h1>${query}</h1>
                        <p>All activities from ${formateDate(startDate)} to ${formateDateMinusOne(endDate)}</p>`

                notFound.classList.add("hidden");
                await activities("search-activities-container", null, data);
            }
            else {
                searchBanner.innerHTML = `<h1>${query}</h1>
                        <p>No activity is available from ${formateDate(startDate)} to ${formateDateMinusOne(endDate)}</p>`

                document.getElementById('search-activities-container').classList.add("hidden");
                notFound.innerHTML = ` <img src="/public/assets/icon/warning.svg" alt="">
                <p>Not found any activities !</p>`;
            }
        }
    }
    else if (pathname == "/destination/all.html") {
        console.log({ pathname, searchObj })

        const notFound = document.getElementById("not-found");


        const data = await GetData("destination", "name0images");

        const allDestinations = document.getElementById("all-destinations-container");


        const length = data?.data?.length;
        if (length > 0) {
            await destinations("all-destinations-container", null, data);
            notFound.classList.add("hidden");
        }
        else {
            allDestinations.innerHTML = `<h1>${query}</h1>
                        <p>No activity is available from </p>`

            allDestinations.classList.add("hidden");
            notFound.innerHTML = ` <img src="/public/assets/icon/warning.svg" alt="">
                <p>Not found any activities !</p>`;
        }

    }
    //payment success
    else if (pathname == '/payment/success.html') {
        const data = await GetDataByID('order', searchObj?.id);

        const { status, total, pickUpLocation, phone, email, name, discountedAmount, discountCode, address, cart } = data?.data || {};

        if (status) {
            localStorage.removeItem('ak-travelers-cart');
            localStorage.removeItem('ak-traveler-dis');
        }

        document.getElementById("order-personal-info").innerHTML = `
        <h1>Thank you for your purchase!</h1>
                <h3>Billing Information</h3>
                <table>
                    <tr>
                        <td class="bold">Name:</td>
                        <td>${name}</td>
                    </tr>
                    <tr>
                        <td class="bold">Phone:</td>
                        <td>${phone}</td>
                    </tr>
                    <tr>
                        <td class="bold">Email:</td>
                        <td>${email}</td>
                    </tr>
                    <tr>
                        <td class="bold">Address:</td>
                        <td>${address}</td>
                    </tr>
                    <tr>
                        <td class="bold">Pickup location:</td>
                        <td>${pickUpLocation}</td>
                    </tr>
                </table>

                <div class="btn-container">
                    <a class="btn-outline" href="/index.html">Back To Home</a>
                    <a class="btn-outline" href="/index.html">View Order</a>
                </div>`;

        const orderedDiv = document.getElementById("ordered-destinations");
        orderedDiv.innerHTML = "";

        cart?.forEach(so => {
            console.log({ so })
            const sp = document.createElement("div");
            sp.classList.add("single-cart");

            sp.innerHTML = `
                        <img class="single-cart-image"
                            src="${so?.id?.images?.[0]}"
                            alt="" />
                        <div class="single-cart-info">
                            <div>
                                <h4>${so?.id?.name}</h4>
                                <p>Person: ${so?.person}</p>
                            </div>
                             <p>$${(so?.id?.price * so?.person).toFixed(1)}</p>
                        </div>
                    `;

            orderedDiv.appendChild(sp)
        });

        const discount = discountCode ? `<img src="/public/assets/icon/tag.svg" alt="" class="icon">
                                    <p id="discountCode-p">(${discountCode})</p>` : "";

        const amountTable = document.getElementById("amount-table");
        amountTable.innerHTML = `<tr>
                        <td class="bold">Subtotal:</td>
                        <td></td>
                        <td class="end">$${total}</td>
                    </tr>
                    <tr>
                        <td class="bold">Discount:</td>
                        <td class="discount-icon-div">${discount}</td>
                        <td class="end">- $${discountedAmount || 0.0}</td>
                    </tr>
                    <tr class="total-tr">
                        <td class="bold">Total:</td>
                        <td></td>
                        <td class="bold end">$${(total - discountedAmount.toFixed(1))}</td>
                    </tr>`;
    }
})


