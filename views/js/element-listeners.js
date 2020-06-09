/* Element event listeners */

$searchSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    submitQuery();
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