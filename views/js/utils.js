/* Utils functions. */

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

const startPaginators = () => {
    $pagination.style.display = "flex";
    startPaginationListeners();
}

const stopPaginators = () => {
    $pagination.style.display = "none";
    stopPaginationListeners();
}

const submitQuery = async (page) => {
    if ($searchBar.value !== "") {
        launchLoader();
        let params = {};
        let input = $searchBar.value;
        let pageNumber = page || 1;

        admnoRegex.test(input) ?
        params.admno = $searchBar.value : 
        params.name = $searchBar.value;

        params.admno ? showAlert("Searching for admission number.") : showAlert("Searching for name.");

        if ($branch.value !== "") params.branch = $branch.value;
        if ($house.value !== "") params.house = $house.value;
        if ($state.value !== "") params.state = $state.value;
        if ($club.value !== "") params.club = $club.value;
        if ($course.value !== "") params.course = $course.value;
        params.limit = pageNumber * 15 + 1;
        params.skip = (pageNumber - 1) * 15;

        let students = await fetchResults(params);

        if (students.count > 15) startPaginators();
        else stopPaginators();

        currentPage = pageNumber;

        loadResults(students.students.slice(0, 15));

        showAlert(`${students.count} ${students.count > 1 ? `results` : `result`} in ${students._queryTime/1000}s.`);

        closeLoader();
    } else {
        showAlert("You can't leave the search bar empty!");
        setTimeout(() => {
            showAlert("");
        }, 3000);
    }
}

const startPaginationListeners = () => {
    $nextPage.addEventListener("click", (ev) => {
        ev.preventDefault();
        submitQuery(currentPage + 1);
    });

    $previousPage.addEventListener("click", (ev) => {
        ev.preventDefault();
        if (currentPage !== 1) submitQuery(currentPage - 1);
    });

    $firstPage.addEventListener("click", (ev) => {
        ev.preventDefault();
        submitQuery(1);
    });
}

const stopPaginationListeners = () => {
    $nextPage.removeEventListener("click", (ev) => {
        ev.preventDefault();
        submitQuery(currentPage + 1);
    });

    $previousPage.removeEventListener("click", (ev) => {
        ev.preventDefault();
        if (currentPage !== 1) submitQuery(currentPage - 1);
    });

    $firstPage.removeEventListener("click", (ev) => {
        ev.preventDefault();
        submitQuery(1);
    });
}

const scrollToTop = () => {
    document.documentElement.scrollTop = 0;
}