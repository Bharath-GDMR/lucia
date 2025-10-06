import { state } from './state.js';

export function openLightbox(index) {
    state.currentIndex = index;
    const photo = state.filteredPhotos[index];
    const lightbox = document.getElementById("lightbox");
    const img = document.getElementById("lightboxImg");

    if (!photo || !lightbox || !img) return;

    img.src = photo.full;
    document.getElementById("infoTitle").textContent = photo.title;
    document.getElementById("infoAuthor").textContent = `by ${photo.author}`;

    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
}