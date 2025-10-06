export function initGradientScroll() {
    window.addEventListener("scroll", () => {
        const gradient = document.querySelector(".bg-gradient");
        if (gradient) {
            const scrolled = window.pageYOffset;
            gradient.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
}
