import { basicAlert, loginAlert } from "./common.js";

const bashedURL = 'https://adust-travllers-backend.vercel.app/api/v1';
// const bashedURL = 'http://localhost:5000/api/v1';

export function decodeAndVerifyJwt(token) {
    try {
        // Decode the token using jwt-decode
        const decoded = jwt_decode(token);
        return decoded;
    } catch (err) {
        // Handle token decoding errors
        console.error('Token decoding failed:', err.message);
    }
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

function setDefaultData(data) {
    // Iterate over the keys of the object
    for (let key in data) {
        // Check if the form has a field with the name attribute matching the key
        if (key != "image") {
            let field = document.querySelector(`[name=${key}]`);
            if (field) {
                // Set the value of the form field to the corresponding value in the object
                field.value = data[key];
            }
        }

    }
}

window.addEventListener("load", async () => {
    const allSearchParams = window.location.search.split("?")?.[1]?.split("&");
    const pathname = window.location.pathname;
    const token = localStorage.getItem("ak-secret");


    let searchObj = {};
    allSearchParams?.forEach(s => {
        const arr = s.split("=");
        searchObj[`${arr[0]}`] = arr[1];
    });
    // console.log({ pathname, searchObj })

    if (pathname == "/dashboard/index.html") {
        const existingCart = localStorage.getItem('ak-travelers-cart');

        if (!token) {
            localStorage.removeItem("ak-secret");

            return loginAlert("Session expired, please login!", 'error');
        }


        try {
            const response = await fetch(`${bashedURL}/user/info`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });


            if (response?.status == 401) {
                localStorage.removeItem("ak-secret");

                return loginAlert("Session expired, please login!", "error");
            }



            const data = await response.json();
            setDefaultData(data?.data);
            document.getElementById('profileImage').src = data.data?.image;
            document.getElementById('nav-profile-img').src = data.data?.image;


            if (!data?.success) {
                return basicAlert(data?.message, "error")
            }


        } catch (error) {
            console.error('Error fetching data:', error.message); // Log any errors
            basicAlert(error.message, "error")
        }


    }

    if (searchObj?.params == "orders" || searchObj?.role == "user") {
        console.log("orders");
        document.getElementById("profile-form").classList.add("hidden");

        try {
            const response = await fetch(`${bashedURL}/order/user`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });


            if (response?.status == 401) {
                localStorage.removeItem("ak-secret");
                window.location.assign("/index.html");
                return loginAlert("Session expired, please login!", "error");
            }

            const data = await response.json(); // Parse the JSON data from the response
            // console.log('Data fetched:', data); // Log the fetched data


            if (!data?.success) {
                return basicAlert(data?.message, "error");
            }

            const ordersContainer = document.getElementById("all-orders-container");

            data?.data?.map((order, index) => {
                const div = document.createElement("div");
                div.classList.add("single-order-container");

                div.innerHTML = `
                <div class="order-number">
                        <p>#${order?.orderNumber || index + 1}</p>
                        <img src="/public/assets/dashboard/right-down.svg" alt="">
                    </div>
                    <div class="single-order">
                        <div class="orders" id="order-cart-${index}"> 

                        </div>
                        <div class="personal-info">
                            <h3>${order?.name}</h3>
                            <p><span class="semi-bold">Mobile:</span> ${order?.phone}</p>
                            <p><span class="semi-bold">Email:</span> ${order?.email}</p>
                            <p><span class="semi-bold">Address:</span> ${order?.address}</p>
                            <p><span class="semi-bold">Pickup:</span> ${order?.pickUpLocation}</p>
                            <p><span class="semi-bold">Order date:</span> ${formateDate(order?.createdAt)}</p>
                            <div class="divider"></div>
                            <div class="flex items-center justify-between">
                                <p class="semi-bold">Subtotal:</p>
                                <p>৳ ${(order?.total).toFixed(1)}</p>
                            </div>
                            <div class="flex items-center justify-between">
                                <p class="semi-bold">Discount:</p>
                                <p>- ৳ ${(order?.discountedAmount).toFixed(1)}</p>
                            </div>
                            <div class="text-xl mt-1 bold-7 flex items-center justify-between">
                                <p class="">Total:</p>
                                <p>৳ ${(order?.total - order?.discountedAmount).toFixed(1)}</p>
                            </div>
                        </div>
                    </div>
                `;

                ordersContainer.appendChild(div);


                order?.cart?.map((c, idx) => {
                    const cart = document.getElementById(`order-cart-${index}`);
                    const innerDiv = document.createElement("div");
                    innerDiv.classList.add("order-info");

                    innerDiv.innerHTML = `
                    <a href="/destination/details.html?id=${c?.id?._id}" class="view-url">View Details</a>
                    <div>
                    <a href="/destination/details.html?id=${c?.id?._id}">
                    <img src="${c?.id?.images?.[0]}" alt="">
                    </a>
                    </div>
                                
                                <div class="description">
                                    <h3>${c?.id?.name}</h3>
                                    <p class="semi-bold">${c?.id?.location}</p>
                                    <p>${c?.id?.days} days ${c?.id?.nights} nights</p>
                                    <p><span class="semi-bold">Journey:</span> ${formateDate(c?.id?.startingDate)} to ${formateDate(c?.id?.endingDate)}</p>
                                    <p><span class="semi-bold">Persons:</span> ${c?.person}</p>
                                    <p class="price">
                                        <span>৳${c?.id?.comparePrice} </span> ৳${c?.id?.price}
                                    </p>
                                </div>
                            `;

                    cart.appendChild(innerDiv);
                })

            })



        } catch (error) {
            console.error('Error fetching data:', error.message); // Log any errors
        }
    }
    else if (searchObj?.params == "profile") {

        const form = document.getElementById('profile-form');
        form.classList.remove('hidden');
        document.getElementById('all-orders-container').classList.add('hidden');

        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            // Collect form data
            const formData = new FormData(event.target); // Handles both text fields and image
            try {
                const response = await fetch(`${bashedURL}/user`, {
                    method: 'PATCH',
                    headers: {
                        'Authorization': `Bearer ${token}`, // JWT token for authorization
                    },
                    body: formData, // FormData includes image and other fields
                });

                const result = await response.json();

                if (result?.success) {
                    document.getElementById('nav-profile-img').src = result?.data?.result?.image;
                    localStorage.setItem('ak-secret', result?.data?.jwtRes); // Update JWT token if returned
                    basicAlert('Info updated!', "success");
                }

            } catch (error) {
                console.error('Error updating profile:', error);
            }
        });

        // Image preview when user selects a file
        document.getElementById('imageUpload').addEventListener('change', function (event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    document.getElementById('profileImage').src = e.target.result; // Show preview image
                };
                reader.readAsDataURL(file);
            }
        });

    }
});


document.getElementById("log-out").addEventListener("click", () => {
    localStorage.removeItem("ak-secret");
    Swal.fire({
        icon: "success",
        title: "Log out successful!",
    }).then(() => {
        window.location.assign("/index.html");
    })
    // loginAlert("Log out successful!");
})