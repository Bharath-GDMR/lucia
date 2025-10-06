import { state } from './state.js';
import { initGallery } from './gallery.js';
import { initEventListeners } from './events.js';
import { initScrollToTop } from './scrollToTop.js';
import { initGradientScroll } from './gradientScroll.js';

export async function startApp() {
    try {
        const response = await fetch('gallery.json');
        state.photos = await response.json();
        state.filteredPhotos = [...state.photos];
        
        initGallery();
        initEventListeners();
        initScrollToTop();
        initGradientScroll();
    } catch (error) {
        console.error("Application failed to start:", error);
        const gallery = document.getElementById("gallery");
        if(gallery) {
            gallery.innerHTML = "<p style='color:white; text-align: center;'>Error: Could not load gallery data from gallery.json.</p>";
        }
    }
}