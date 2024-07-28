// import { swiper1, swiper2 } from "./home.js";
import footer from "./sharedScript/footer.js";
import { navbar } from "./sharedScript/navbar.js";


window.addEventListener('load', () => {
    document.getElementById("nav").innerHTML = navbar;
    document.getElementById("footer").innerHTML = footer;

    // swiper1();
    // swiper2();
})