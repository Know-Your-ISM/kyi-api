let blank_image = "/views/profile_blank.png";

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
    let li = document.createElement('li');
    let card = document.createElement('div');
    let picture = document.createElement('picture');
    let source = document.createElement('source');
    let img = document.createElement('img');
    let card_text = document.createElement('div');
    let h4 = document.createElement('h4');
    let h5 = document.createElement('h5');
    let p = document.createElement('p');

    li.setAttribute("class", "results-li");
    li.setAttribute("id", i);

    card.setAttribute("class", "card");
    card_text.setAttribute("class", "card_text");

    h4.textContent = result.Name.toUpperCase();
    p.textContent = result.Sex === "M" ? "Male" : "Female";
    h5.textContent = `${result.Course !== "" ? result.Course.toUpperCase() : "BTECH"} | ${result.House}`;

    card_text.appendChild(h4);
    card_text.appendChild(h5);
    card_text.appendChild(p);

    source.media = "";
    source.srcset = "";

    img.src = blank_image;
    img.alt = "No photo available.";

    picture.appendChild(source);
    picture.appendChild(img);

    card.appendChild(picture);
    card.appendChild(card_text);

    li.appendChild(card);

    $resultsUl.appendChild(li);
}