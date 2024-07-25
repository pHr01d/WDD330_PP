import {qs, renderListWithTemplate} from "./utils.mjs";
import {getMoviesByCategory} from "./dbm.mjs";

function movieListTemplate(data) {
  return `<li class="movie-card">
  <div class="card__title">${data.title}</div>
  <div class="card__rating">${data.rating}</div>
  <div class="card__runtime">${data.runtime}</div>
  <div class="card__location">${data.location}.${data.disc}</div>
  <div class="card__type">${data.type}</div>
  <div class="card__genre">${data.genre}</div>
  <div class="card_like">${data.likable}</div>
  <div class="card_cmt">${data.comment}</div>
  </li><hr>`;
}

export default async function movieList(selector, category) {
  const el = qs(selector);
  let movies = await getMoviesByCategory(category);
  renderListWithTemplate(movieListTemplate, el, movies);
}