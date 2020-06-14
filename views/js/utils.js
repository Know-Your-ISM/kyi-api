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
    state.lastAlert = $alerts.innerHTML;
    $alerts.innerHTML = text;
    state.currentAlert = $alerts.innerHTML;
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
    let params = {};
    let input = $searchBar.value;
    let pageNumber = page || 1;

    admnoRegex.test(input) ?
        params.admno = input : input !== "" ?
            params.name = input : null;

    let filters = [ $branch, $house, $state, $club, $course ];
    filters.forEach(filter => {
        if (filter["value"] !== "") params[filter.name] = filter.value;
    });

    if (Object.keys(params).length !== 0) {
        params.admno ? showAlert("Searching for admission number.") : showAlert("Searching for name.");
        params.limit = pageNumber * 15 + 1;
        params.skip = (pageNumber - 1) * 15;

        let students = await fetchResults(params);

        if (students.count > 15) startPaginators();
        else stopPaginators();

        state.page = pageNumber;

        showAlert(`${students.count} ${students.count > 1 ? `results` : `result`} in ${students._queryTime}ms.`);

        return students.students.slice(0, 15);
    } else {
        showAlert("Provide at least one search parameter!");
        setTimeout(() => {
            showAlert("");
        }, 2000);
        return null;
    }
}

const startPaginationListeners = () => {
    $nextPage.addEventListener("click", async (ev) => {
        ev.preventDefault();
        await submitQuery(state.page + 1);
    });

    $previousPage.addEventListener("click", async (ev) => {
        ev.preventDefault();
        if (state.page !== 1) await submitQuery(state.page - 1);
    });

    $firstPage.addEventListener("click", async (ev) => {
        ev.preventDefault();
        await submitQuery(1);
    });
}

const stopPaginationListeners = () => {
    $nextPage.removeEventListener("click", async (ev) => {
        ev.preventDefault();
        await submitQuery(state.page + 1);
    });

    $previousPage.removeEventListener("click", async (ev) => {
        ev.preventDefault();
        if (state.page !== 1) await submitQuery(state.page - 1);
    });

    $firstPage.removeEventListener("click", async (ev) => {
        ev.preventDefault();
        await submitQuery(1);
    });
}

const scrollToTop = () => {
    document.documentElement.scrollTop = 0;
}

const ifMobileCloseSidebar = () => {
    if (state.screenWidth < 800) {
        $sidebar.style.display = "none";
        $sidebarContent.style.display = "none";
        $right.style.display = "block";
        state.filters = "closed";
    }
}

const runSubmit = async (ev) => {
    ev.preventDefault();
    toggleForm("disable");
    launchLoader();
    let results = await submitQuery(1);
    loadResults(results);
    toggleForm("enable");
    ifMobileCloseSidebar();
    closeLoader();
}

const toggleForm = (to) => {
    if (to === "disable") {
        $searchBar.readOnly = true;
        $searchSubmit.readOnly = true;
        $searchClear.readOnly = true;
        $logo.readOnly = true;
    } else if (to === "enable") {
        $searchBar.readOnly = false;
        $searchSubmit.readOnly = false;
        $searchClear.readOnly = false;
        $logo.readOnly = false;
    }
}

const toggleColorScheme = () => {
    if (state.scheme === 'light') {
        showAlert("Switching to dark...");
        $moonIcon.classList.remove("fa-moon-o");
        $moonIcon.classList.add("fa-sun-o");
        state.scheme = 'dark';
        showAlert("");
    } else if (state.scheme === 'dark') {
        showAlert("Switching to light...");
        $moonIcon.classList.remove("fa-sun-o");
        $moonIcon.classList.add("fa-moon-o");
        state.scheme = 'light';
    }
}