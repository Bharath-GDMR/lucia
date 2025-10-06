export function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    if(lightbox) {
        lightbox.classList.remove("active");
        document.body.style.overflow = "";
    }
}