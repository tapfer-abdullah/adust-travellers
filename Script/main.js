// Uncomment and ensure the correct path if needed
// import { swiper1, swiper2 } from "./home.js";
import cartComponent from "./sharedScript/cartComponent.js";
import footer from "./sharedScript/footer.js";
import { navbar } from "./sharedScript/navbar.js";

window.addEventListener('load', () => {
    document.getElementById("nav").innerHTML = navbar();
    document.getElementById("footer").innerHTML = footer();
    document.getElementById("shopping-cart").innerHTML = cartComponent();


    // Uncomment if needed
    // swiper1();
    // swiper2();

    document.getElementById('shopping-icon').addEventListener('change', toggleShoppingCart);
});

export function toggleShoppingCart() {

    console.log(this.checked, "kk", document.getElementById('shopping-icon'))
    if (this.checked) {
        console.log("yes")
        document.getElementById('shopping-cart').classList.remove('visible');
    } else {
        document.getElementById('shopping-cart').classList.add('visible');
        console.log("no")
    }
}
