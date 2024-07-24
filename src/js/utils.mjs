//import {jwtDecode} from "jwt-decode";

// wrapper for querySelector...returns matching element
export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) { return JSON.parse(localStorage.getItem(key));}

// save data to local storage
export function setLocalStorage(key, data) { localStorage.setItem(key, JSON.stringify(data));}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// Returns parameters from URL
export function getParam(param) {
  const
    queryString = window.location.search,
    urlParams = new URLSearchParams(queryString),
    product = urlParams.get(param);
  return product;
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = true) {

  if (clear) { parentElement.innerHTML = " "; }
  const htmlStrings = list.map(templateFn); //map method breaking out the array
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export async function renderWithTemplate(
  templateFn,
  parentElement,
  data,
  callback,
  position = "afterbegin",
  clear = true) {

  if (clear) { parentElement.innerHTML = " "; }
  const htmlString = await templateFn(data);
  parentElement.insertAdjacentHTML(position, htmlString);
  if (callback) { callback(data); }
}

function loadTemplate(path) {
  // wait what?  we are returning a new function? 
  // this is called currying and can be very helpful.
  return async function () {
    const res = await fetch(path);
    if (res.ok) {
      const html = await res.text();
      return html;
    }
  };
} 

export function loadHeaderFooter() {
  const
    headerTemplateFn = loadTemplate("../parts/header.html"),
    headerEl = qs("#main-header");
  renderWithTemplate(headerTemplateFn, headerEl);

  const
    footerTemplateFn = loadTemplate("../parts/footer.html"),
    footerEl = qs("#main-footer");
  renderWithTemplate(footerTemplateFn, footerEl);
}
