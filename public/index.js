$(document).ready(initApp);

function initApp() {
  setCopyrightDate();
  applyHandlers();
}

function setCopyrightDate() {
  const date = new Date();
  const year = date.getFullYear();
  document.getElementById("copyrightDate").innerHTML = year;
}

function applyHandlers() {
  const submitBtnEl = document.getElementById("submitScrape");
  const addRowBtnEl = document.getElementById("addRowBtn");
  submitBtnEl.addEventListener("click", handleScrapeClick);
  addRowBtnEl.addEventListener("click", handleAddNewSelectorRow);
}

function handleRemoveSelectorRow(event) {
  const element = $(this).parent().remove();
}
function handleAddNewSelectorRow() {
  const ul = $(".requestRows > ul");

  const i = document.createElement("i");
  i.setAttribute("class", "fa fa-minus-square");
  i.setAttribute("aria-hidden", "true");

  const a = document.createElement("a");
  a.setAttribute("class", "removeRowBtn");

  const input = document.createElement("input");
  input.setAttribute("class", "txtSelector");
  input.setAttribute("type", "text");
  input.setAttribute("name", "selector");
  input.setAttribute("placeholder", "div.entry > h1");

  const li = document.createElement("li");
  li.setAttribute("class", "requestRow");

  a.addEventListener("click", handleRemoveSelectorRow);
  a.append(i);
  li.append(input);
  li.append(a);
  ul.append(li);
}

function handleScrapeClick() {
  $("#resultsList").empty();
  const url = $("#txtUrl").val();
  const selectorInputs = $(".requestRow input");
  const selectors = new Array();
  for (let i = 0; i < selectorInputs.length; i++) {
    const selector = $(selectorInputs[i]).val();
    selectors.push(selector);
  }
  if (!url) {
    //TO-DO handle error
    return;
  } else if (!selectors?.length) {
    //TO-DO handle error
    return;
  }
  const request = {
    url: url,
    selectors: selectors,
  };
  const handleAjaxResponse = (response, error) => {
    if (response !== null) {
      renderResults(response.results);
    } else if (error) {
      console.log(error.responseJSON?.error);
    }
  };
  getScrapeResponse(request, handleAjaxResponse);
}
function getScrapeResponse(request, callback) {
  $.ajax({
    method: "POST",
    url: "/scrape",
    data: request,
    success: (response) => {
      callback(response);
    },
    error: (error) => {
      callback(null, error);
    },
  });
}

function renderResults(results) {
  const ul = $("#resultsList");
  results.forEach((resultText) => {
    const li = document.createElement("li");

    li.setAttribute("class", "resultRow");
    li.innerHTML = resultText;

    ul.append(li);
  });
}
