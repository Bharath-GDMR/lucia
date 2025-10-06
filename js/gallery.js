import { state } from './state.js';
import { openLightbox } from './openLightbox.js';

export function initGallery() {
    const gallery = document.getElementById("gallery");
    if (!gallery) return;

    gallery.innerHTML = "";
    state.filteredPhotos.forEach((photo, index) => {
        const card = document.createElement("div");
        card.className = "photo-card loading";
        card.innerHTML = `
            <img src="${photo.thumb}" alt="${photo.title}" loading="lazy">
            <div class="photo-info">
                <div class="photo-title">${photo.title}</div>
                <div class="photo-author">by ${photo.author}</div>
            </div>
        `;

        const img = card.querySelector("img");
        img.onload = () => card.classList.remove("loading");
        img.onerror = () => {
            img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
            card.classList.remove("loading");
        };

        card.addEventListener("click", () => openLightbox(index));
        gallery.appendChild(card);
    });

    const noResults = document.getElementById("noResults");
    if(noResults) {
        noResults.classList.toggle("active", state.filteredPhotos.length === 0);
    }
}