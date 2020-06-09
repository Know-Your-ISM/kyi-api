window.onload = () => {
    $searchBar.focus();
}

window.addEventListener("offline", (ev) => {
    ev.preventDefault();
    $overlay.style.display = 'block';
    $overlayText.innerHTML = 'You are offline';
    window.addEventListener("online", (e) => {
        $overlay.style.display = 'none';
        $overlayText.innerHTML = 'Back online.';
        location.reload();
    });
});

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