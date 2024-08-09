const toast = (title) => {
    Toastify({
        text: `${title}   `,
        duration: 1200,
        close: true,
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
    }).showToast();
}

// const token = localStorage.getItem("ak-secret");

// export function decodeAndVerifyJwt(token) {
//     console.log({ token });
//     try {
//         // Decode the token using jwt-decode
//         const decoded = jwt_decode(token);

//         // Log the decoded payload
//         console.log('Decoded JWT:', decoded);
//     } catch (err) {
//         // Handle token decoding errors
//         console.error('Token decoding failed:', err.message);
//     }
// }

// decodeAndVerifyJwt(token);