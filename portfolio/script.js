window.addEventListener("scroll", function() {
    const pageTopBtn = document.querySelector(".top");
    
    if (window.scrollY >= 100) {
        pageTopBtn.classList.add("is-display");
    } else {
        pageTopBtn.classList.remove("is-display");
    }
});

let mouseTimeout;
const hideDelay = 1000;

function hideControls(modalId) {
    const modal = document.getElementById(modalId);
    if (modal && modal.hasAttribute("data-playing")) {
        modal.classList.add("hide-controls");
    }
}

function resetControlTimer(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    modal.classList.remove("hide-controls");

    clearTimeout(mouseTimeout);
    mouseTimeout = setTimeout(() => hideControls(modalId), hideDelay);
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    const video = modal.querySelector("video");

    modal.style.display = 'flex';
    modal.setAttribute("data-playing", "");
    modal.removeAttribute("data-pause");
    
    if (video) {
        video.currentTime = 0;
        video.play();
    }

    const mouseMoveHandler = () => resetControlTimer(modalId);
    modal._mouseMoveHandler = mouseMoveHandler;

    resetControlTimer(modalId);
    modal.addEventListener("mousemove", mouseMoveHandler);
    modal.addEventListener("touchstart", mouseMoveHandler);
}

function closeModal(event, modalId) {
    if (
        event.target.classList.contains("modal-background") || 
        event.target.classList.contains("modal-close-btn")
    ) {
        const modal = document.getElementById(modalId);
        if (!modal) return;

        const video = modal.querySelector("video");

        modal.style.display = "none";
        if (video) {
            video.pause();
        }
        
        clearTimeout(mouseTimeout);
        if (modal._mouseMoveHandler) {
            modal.removeEventListener("mousemove", modal._mouseMoveHandler);
            modal.removeEventListener("touchstart", modal._mouseMoveHandler);
        }
        modal.classList.remove("hide-controls");
    }
}

function toggleVideo(event, modalId) {
    if (event) event.stopPropagation();
    
    const modal = document.getElementById(modalId);
    if (!modal) return;

    const video = modal.querySelector("video");
    if (!video) return;

    if (video.paused || modal.hasAttribute("data-pause")) {
        modal.setAttribute("data-playing", "");
        modal.removeAttribute("data-pause");
        video.play();
        resetControlTimer(modalId);
    } else {
        modal.setAttribute("data-pause", "");
        modal.removeAttribute("data-playing");
        video.pause();
        
        clearTimeout(mouseTimeout);
        modal.classList.remove("hide-controls");
    }
}