/* Element event listeners */

// $searchSubmit.addEventListener('click', async (e) => {
//     e.preventDefault();
//     await submitQuery();
// });

$logo.addEventListener("click", (e) => {
    if (state.screenWidth < 800) {
        $sidebar.style.display = "block";
        $sidebar.style.top = "80px";
        $sidebar.style.width = "100vw";
        $sidebarContent.style.display = "block";
        $sidebarContent.style.top = "80px";
        $sidebarContent.style.width = "100vw";
    }
});

// $searchBar.addEventListener("focus", (e) => {
//     window.addEventListener("keydown", async (ev) => {
//         if (ev.key === "Enter") {
//             ev.preventDefault();
//             await submitQuery();
//         }
//     });
// });

$searchDark.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("clicked.");
    toggleColorScheme();
});

$searchForm.addEventListener("submit", runSubmit);

$clearFilters.addEventListener('click', (e) => {
    document.querySelectorAll(".none-selected").forEach((val) => {
        val.selected = "selected";
    });
});

$searchClear.addEventListener("click", (e) => {
    e.preventDefault();
    $searchBar.value="";
});

$backToTop.addEventListener("click", (e) => {
    e.preventDefault();
    scrollToTop();
});