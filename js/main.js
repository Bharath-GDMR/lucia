import { state } from './state.js';
import { initGallery } from './gallery.js';
import { initEventListeners } from './events.js';
import { initScrollToTop } from './scrollToTop.js';
import { initGradientScroll } from './gradientScroll.js';
import { initJumpNavigator } from './jumpNavigator.js';

export async function startApp() {
    try {
        const response = await fetch('gallery.json');
        const t4Response = await fetch('gallery2.json');
        const t4Photos = await t4Response.json();
        state.photos = [...(await response.json()), ...t4Photos];
        state.filteredPhotos = [...state.photos];
        
        initGallery();
        initEventListeners();
        initScrollToTop();
        initGradientScroll();
        initJumpNavigator();
    } catch (error) {
        console.error("Application failed to start:", error);
        const gallery = document.getElementById("gallery");
        if(gallery) {
            gallery.innerHTML = "<p style='color:white; text-align: center;'>Error: Could not load gallery data.</p>";
        }
    }
}