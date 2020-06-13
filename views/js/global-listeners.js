/* Global event listeners. */
window.onload = () => {
    $searchBar.focus();
}

window.addEventListener("offline", (ev) => {
    ev.preventDefault();
    state.online = false;
    $overlay.style.display = 'block';
    $overlayText.innerHTML = 'You are offline';
    window.addEventListener("online", (e) => {
        $overlay.style.display = 'none';
        $overlayText.innerHTML = 'Back online.';
        // location.reload();
    });
});