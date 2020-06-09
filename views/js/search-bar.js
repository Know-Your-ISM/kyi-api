/* Overlay */
let $overlay = document.querySelector("#overlay");
let $loaderWrap = document.querySelector("#loader-wrap");

/* Search Header */
let $searchBar = document.querySelector("#search-bar");
let $searchSubmit = document.querySelector("#search-submit-btn");
let $searchClear = document.querySelector("#search-clear-btn");
let $alerts = document.querySelector("#alerts");

/* Filters */
let $branch = document.querySelector("#branch");
let $state = document.querySelector("#state");
let $house = document.querySelector("#house");
let $club = document.querySelector("#club");
let $clearFilters = document.querySelector("#clear_filters");

const admnoRegex = /\d\d\D\D/gi;

const launchLoader = () => {
    $overlay.style.display = 'block';
    $loaderWrap.style.display = 'flex';
}

const closeLoader = () => {
    $overlay.style.display = 'none';
    $loaderWrap.style.display = 'none';
}

const showAlert = (text) => {
    $alerts.innerHTML = text;
}

const submitQuery = async () => {
    if ($searchBar.value !== "") {
        launchLoader();
        let params = {};
        let input = $searchBar.value;

        admnoRegex.test(input) ?
        params.admno = $searchBar.value : 
        params.name = $searchBar.value;

        params.admno ? showAlert("Searching for admission number.") : showAlert("Searching for name.");

        if ($branch.value !== "") params.branch = $branch.value;
        if ($house.value !== "") params.house = $house.value;
        if ($state.value !== "") params.state = $state.value;
        if ($club.value !== "") params.club = $club.value;

        let students = await fetchResults(params);
        loadResults(students.students);
        showAlert(`${students.count} ${students.count > 1 ? `results` : `result`} in ${students._queryTime/1000}s.`);
        closeLoader();
    } else {
        showAlert("You can't leave the search bar empty!");
        setTimeout(() => {
            showAlert("");
        }, 3000);
    }
}

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