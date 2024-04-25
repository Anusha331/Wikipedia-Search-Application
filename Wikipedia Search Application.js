let searchInputEle = document.getElementById("searchInput");
let searchResultsEle = document.getElementById("searchResults");
let spinnerEle = document.getElementById("spinner");

function createAndAppendSearchResult(result) {
    let {
        link,
        title,
        description
    } = result;
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");
    searchResultsEle.appendChild(resultItemEl);

    let titleEl = document.createElement("a");
    titleEl.href = link; //link to go
    titleEl.target = "_blank"; //open link in new tab(target(attribute))
    titleEl.textContent = title;
    titleEl.classList.add("result-title");
    resultItemEl.appendChild(titleEl);

    let titleBreak = document.createElement("br");
    resultItemEl.appendChild(titleBreak);

    let urlEl = document.createElement("a");
    urlEl.classList.add("result-url");
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.textContent = link;
    resultItemEl.appendChild(urlEl);

    let linkBreak = document.createElement("br");
    resultItemEl.appendChild(linkBreak);

    let descriptionEle = document.createElement("p");
    descriptionEle.textContent = description;
    descriptionEle.classList.add("link-description");
    resultItemEl.appendChild(descriptionEle);
}

function displayResults(searchResults) {
    spinnerEle.classList.toggle("d-none");
    for (let result of searchResults) {
        createAndAppendSearchResult(result);
    }
}

function searchWikipedia(event) {

    if (event.key === "Enter") {
        spinnerEle.classList.toggle("d-none");
        searchResultsEle.textContent = "";
        let searchInput = searchInputEle.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {

                return response.json();
            })
            .then(function(jsonData) {

                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            });
    }
}
searchInputEle.addEventListener("keydown", searchWikipedia);