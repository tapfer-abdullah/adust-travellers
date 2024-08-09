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


window.addEventListener("load", () => {
    const pathname = window.location.pathname;
    if (pathname == "/dashboard/index.html") {
        const existingCart = localStorage.getItem('ak-travelers-cart');
        const token = localStorage.getItem("ak-secret");
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
})