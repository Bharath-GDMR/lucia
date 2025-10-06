import { state } from './state.js';

const JUMP_INCREMENT = 100;

export function initJumpNavigator() {
    const jumpNavigator = document.getElementById("jumpNavigator");
    if (!jumpNavigator) return;

    const numPhotos = state.photos.length;
    if (numPhotos <= JUMP_INCREMENT) {
        jumpNavigator.style.display = "none";
        return;
    }

    jumpNavigator.innerHTML = "";

    const isMobile = window.innerWidth < 768;

    if (isMobile) {
        const numPages = Math.ceil(numPhotos / JUMP_INCREMENT);
        for (let i = 0; i < numPages; i++) {
            const button = document.createElement("button");
            button.textContent = i + 1;
            button.dataset.startIndex = i * JUMP_INCREMENT;
            button.addEventListener("click", () => {
                const photoCard = document.querySelector(`[data-index="${i * JUMP_INCREMENT}"]`);
                if (photoCard) {
                    const photoCardTop = photoCard.offsetTop;
                    const headerHeight = document.querySelector("header").offsetHeight;
                    window.scrollTo({
                        top: photoCardTop - headerHeight - 20,
                        behavior: "smooth",
                    });
                }
            });
            jumpNavigator.appendChild(button);
        }
    } else {
        for (let i = 0; i < numPhotos; i += JUMP_INCREMENT) {
            const start = i + 1;
            const end = Math.min(i + JUMP_INCREMENT, numPhotos);
            const button = document.createElement("button");
            button.textContent = `${start}-${end}`;
            button.dataset.startIndex = i;
            button.addEventListener("click", () => {
                const photoCard = document.querySelector(`[data-index="${i}"]`);
                if (photoCard) {
                    const photoCardTop = photoCard.offsetTop;
                    const headerHeight = document.querySelector("header").offsetHeight;
                    window.scrollTo({
                        top: photoCardTop - headerHeight - 20,
                        behavior: "smooth",
                    });
                }
            });
            jumpNavigator.appendChild(button);
        }
    }

    updateJumpNavigator();
}

export function updateJumpNavigator() {
    const jumpNavigator = document.getElementById("jumpNavigator");
    if (!jumpNavigator) return;

    const scrollPosition = window.scrollY;
    const headerHeight = document.querySelector("header").offsetHeight;

    const buttons = jumpNavigator.querySelectorAll("button");
    buttons.forEach(button => {
        const startIndex = parseInt(button.dataset.startIndex);
        const photoCard = document.querySelector(`[data-index="${startIndex}"]`);
        if (photoCard) {
            const photoCardTop = photoCard.offsetTop - headerHeight - 20;
            const nextPhotoCard = document.querySelector(`[data-index="${startIndex + JUMP_INCREMENT}"]`);
            const photoCardBottom = nextPhotoCard ? nextPhotoCard.offsetTop - headerHeight - 20 : document.documentElement.scrollHeight;

            if (scrollPosition >= photoCardTop && scrollPosition < photoCardBottom) {
                buttons.forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");
            }
        }
    });
}
