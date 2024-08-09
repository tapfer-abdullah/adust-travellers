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


window.addEventListener("load", async () => {
    const allSearchParams = window.location.search.split("?")?.[1]?.split("&");
    const pathname = window.location.pathname;
    const token = localStorage.getItem("ak-secret");


    let searchObj = {};
    allSearchParams?.forEach(s => {
        const arr = s.split("=");
        searchObj[`${arr[0]}`] = arr[1];
    });
    console.log({ pathname, searchObj })

    if (pathname == "/dashboard/index.html") {
        const existingCart = localStorage.getItem('ak-travelers-cart');

        let isLogin = false;

        if (token) {
            const result = decodeAndVerifyJwt(token);
            console.log({ result });
            if (result?.data?.role) {
                isLogin = true;
            }
            else {
                localStorage.removeItem("ak-secret")
            }
        }
    }

    if (searchObj?.params == "orders") {
        console.log("orders")

        try {
            const response = await fetch(`${bashedURL}/order/user`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json(); // Parse the JSON data from the response
            console.log('Data fetched:', data); // Log the fetched data


            if (!data?.success) {
                return alert("You haven't order anything yet!")
            }



        } catch (error) {
            console.error('Error fetching data:', error.message); // Log any errors
        }
    }
    else if (searchObj?.params == "profile") {
        console.log("profile")
    }
});


document.getElementById("log-out").addEventListener("click", () => {
    localStorage.removeItem("ak-secret");
    window.location.assign("/index.html");
    alert("Log out successful!")
})