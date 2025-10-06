import { state } from './state.js';

export async function downloadImage() {
    const btn = document.getElementById("downloadBtn");
    const progress = document.getElementById("downloadProgress");
    if (!btn || !progress) return;

    const photo = state.filteredPhotos[state.currentIndex];
    if (!photo) return;

    btn.classList.add("downloading");
    progress.classList.add("active");

    try {
        const response = await fetch(photo.full);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${photo.title.replace(/\s+/g, "_")}.JPG`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        progress.textContent = "Download complete!";
        setTimeout(() => {
            progress.classList.remove("active");
            btn.classList.remove("downloading");
            progress.textContent = "Preparing download...";
        }, 2000);
    } catch (error) {
        console.error('Download failed:', error);
        progress.textContent = "Download failed";
        setTimeout(() => {
            progress.classList.remove("active");
            btn.classList.remove("downloading");
            progress.textContent = "Preparing download...";
        }, 2000);
    }
}
