/* Element event listeners */

$searchSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    submitQuery();
});

$logo.addEventListener("click", (e) => {
    $sidebar.style.display = "block";
    $sidebar.style.top = "80px";
    $sidebar.style.width = "100vw";
    $sidebarContent.style.display = "block";
    $sidebarContent.style.top = "80px";
    $sidebarContent.style.width = "100vw";
});

$searchBar.addEventListener("focus", (e) => {
    window.addEventListener("keydown", async (ev) => {
        if (ev.key === "Enter") {
            ev.preventDefault();
            submitQuery();
        }
    });
});

$clearFilters.addEventListener('click', (e) => {
    document.querySelectorAll(".none-selected").forEach((val) => {
        val.selected = "selected";
    });
});

$searchClear.addEventListener("click", (e) => {
    $searchBar.value="";
});

$backToTop.addEventListener("click", (e) => {
    e.preventDefault();
    scrollToTop();
});