import { state } from './state.js';

export function navigateLightbox(direction) {
    state.currentIndex = (state.currentIndex + direction + state.filteredPhotos.length) % state.filteredPhotos.length;
    const photo = state.filteredPhotos[state.currentIndex];
    const img = document.getElementById("lightboxImg");
    if (!photo || !img) return;

    img.style.opacity = "0";
    setTimeout(() => {
        img.src = photo.full;
        document.getElementById("infoTitle").textContent = photo.title;
        document.getElementById("infoAuthor").textContent = `by ${photo.author}`;
        img.style.opacity = "1";
    }, 150);
}