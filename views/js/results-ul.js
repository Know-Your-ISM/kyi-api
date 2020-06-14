let blank_image = "/views/kyi_logo_2.png";

const loadResults = (results) => {
    clearResults();
    scrollToTop();
    if (results.length <= 0) {
        showAlert('No results to show! <br /> Try shortening your keyword.');
    }
    else {
        let i = 0;
        
        results.forEach(result => {
            i += 1;
            insertResult(result, i);
        });
    }
}

const clearResults = () => {
    $resultsUl.innerHTML = "";
}

const insertResult = (result, i) => {
    let { State, City, Course, Department, Name, Sex, House } = result;
    let li = document.createElement('li');
    let card = document.createElement('div');
    let picture = document.createElement('picture');
    let img = document.createElement('img');
    let card_text = document.createElement('div');
    let h4 = document.createElement('h4');
    let place = document.createElement('h5');
    let branch = document.createElement('h5');

    li.setAttribute("class", "results-li");
    li.setAttribute("id", i);

    card.setAttribute("class", "card");
    card_text.setAttribute("class", "card_text");

    h4.innerHTML = `${result.Name.toUpperCase()} <small><i>${Sex === "M" ? "MALE" : Sex === "F" ? "FEMALE" : "Unspecified"} | ${House.toUpperCase()}</i></small>`;
    // h6.innerHTML = `${Sex === "M" ? "MALE" : Sex === "F" ? "FEMALE" : "Unspecified"} | ${House.toUpperCase()}`;
    place.textContent = `${City ? City : "CITY"}, ${State ? State : "STATE"}`;
    branch.textContent = `${Course ? Course.toUpperCase() : "BTECH"} | ${Department ? Department : "DEPARTMENT"}`;

    card_text.appendChild(h4);
    card_text.appendChild(place);
    card_text.appendChild(branch);

    img.src = `https://kyi.herokuapp.com/api/students/avatar/${result._id}`;
    img.onerror = () => {
        img.onerror = "";
        img.src = blank_image;
    }
    img.alt = "No photo available.";

    picture.setAttribute("class", "picture");
    picture.appendChild(img);

    card.appendChild(picture);
    card.appendChild(card_text);

    li.appendChild(card);

    $resultsUl.appendChild(li);
}