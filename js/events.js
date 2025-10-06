import { state } from './state.js';
import { initGallery } from './gallery.js';
import { closeLightbox } from './closeLightbox.js';
import { navigateLightbox } from './navigateLightbox.js';
import { downloadImage } from './download.js';

export function initEventListeners() {
    document.getElementById("searchInput").addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase();
        state.filteredPhotos = state.photos.filter(
            (photo) =>
                photo.title.toLowerCase().includes(query) ||
                photo.author.toLowerCase().includes(query)
        );
        initGallery();
    });

    document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
    document.getElementById("lightboxPrev").addEventListener("click", () => navigateLightbox(-1));
    document.getElementById("lightboxNext").addEventListener("click", () => navigateLightbox(1));
    document.getElementById("downloadBtn").addEventListener("click", downloadImage);

    document.addEventListener("keydown", (e) => {
        if (!document.getElementById("lightbox").classList.contains("active")) return;
        switch (e.key) {
            case "Escape":
                closeLightbox();
                break;
            case "ArrowLeft":
                navigateLightbox(-1);
                break;
            case "ArrowRight":
                navigateLightbox(1);
                break;
        }
    });

    document.getElementById("lightbox").addEventListener("click", (e) => {
        if (e.target.id === "lightbox") {
            closeLightbox();
        }
    });

    let touchStartX = 0;
    document.getElementById("lightbox").addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.getElementById("lightbox").addEventListener("touchend", (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        if (touchEndX < touchStartX - 50) {
            navigateLightbox(1);
        }
        if (touchEndX > touchStartX + 50) {
            navigateLightbox(-1);
        }
    });
}
