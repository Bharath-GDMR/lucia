import { state } from './state.js';
import { initGallery } from './gallery.js';
import { closeLightbox } from './closeLightbox.js';
import { navigateLightbox } from './navigateLightbox.js';
import { updateJumpNavigator } from './jumpNavigator.js';

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


    let keyPressInterval = null;
    let initialDelayTimeout = null;

    let keyPressTimer = null;
    let scrollInterval = null;

    document.addEventListener("keydown", (e) => {
        if (document.getElementById("lightbox").classList.contains("active")) {
            if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
                if (keyPressTimer === null) { // First press
                    const direction = e.key === "ArrowLeft" ? -1 : 1;
                    navigateLightbox(direction);

                    keyPressTimer = setTimeout(() => {
                        // Long press
                        scrollInterval = setInterval(() => {
                            navigateLightbox(direction);
                        }, 100); // Navigate every 100ms
                    }, 500); // Start continuous scroll after 500ms
                }
            }
        } else {
            if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                e.preventDefault();
                if (keyPressTimer === null) { // First press
                    const photoCard = document.querySelector(".photo-card");
                    if (photoCard) {
                        const photoCardHeight = photoCard.offsetHeight;
                        const scrollAmount = e.key === "ArrowDown" ? photoCardHeight * 4 : -photoCardHeight * 4;
                        window.scrollBy({ top: scrollAmount, left: 0, behavior: "smooth" });

                        keyPressTimer = setTimeout(() => {
                            // Long press
                            scrollInterval = setInterval(() => {
                                const scrollAmount = 0.1 * photoCardHeight;
                                if (e.key === "ArrowDown" && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
                                    clearInterval(scrollInterval);
                                    scrollInterval = null;
                                    return;
                                }
                                if (e.key === "ArrowUp" && window.scrollY === 0) {
                                    clearInterval(scrollInterval);
                                    scrollInterval = null;
                                    return;
                                }
                                window.scrollBy({ top: e.key === "ArrowDown" ? scrollAmount : -scrollAmount, left: 0, behavior: "auto" });
                            }, 10); // Scroll every 10ms
                        }, 500); // Start continuous scroll after 500ms
                    }
                }
            }
        }
    });

    document.addEventListener("keyup", (e) => {
        if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
            clearTimeout(keyPressTimer);
            keyPressTimer = null;
            clearInterval(scrollInterval);
            scrollInterval = null;
        } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            clearTimeout(keyPressTimer);
            keyPressTimer = null;
            clearInterval(scrollInterval);
            scrollInterval = null;
        }
    });

    let scrollTimeout;
    window.addEventListener("scroll", () => {
        const jumpNavigator = document.getElementById("jumpNavigator");
        if (jumpNavigator) {
            if (window.scrollY > 300) {
                jumpNavigator.classList.add("visible");
            } else {
                jumpNavigator.classList.remove("visible");
            }

            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                updateJumpNavigator();
            }, 100);
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
    }, { passive: true });

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
