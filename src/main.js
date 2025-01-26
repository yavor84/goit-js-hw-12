import SimpleLightbox from 'simplelightbox';
import iziToast from 'izitoast';
import { createGalleryCardTemplate } from './js/render-functions';
import { fetchPhotosByQuery } from './js/pixabay-api';

const searchFormEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const loaderEl = document.querySelector('.loader');
const loadMoreBtnEl = document.querySelector('.load-more-btn');

let simpleLightbox;
let page = 1;
let searchedQuery = '';
let totalHits = 0;

// Функція-обробник події на формі пошуку
const onSearchFormSubmit = async event => {
  try {
    event.preventDefault();
    searchedQuery = event.currentTarget.elements.user_query.value.trim();
    if (searchedQuery === '') {
      iziToast.error({
        title: 'Error',
        message:
          'The search field cannot be empty. Please enter a search term!',
        position: 'topRight',
      });
      return;
    }
    page = 1;
    loaderEl.style.display = 'block';

    // Робимо запит на сервер
    const { data } = await fetchPhotosByQuery(searchedQuery, page);
    totalHits = data.totalHits;
    if (data.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      galleryEl.innerHTML = '';
      loadMoreBtnEl.classList.add('is-hidden');
      return;
    }

    // Рендеринг карток
    const galleryTemplate = data.hits
      .map(el => createGalleryCardTemplate(el))
      .join('');
    galleryEl.innerHTML = galleryTemplate;
    simpleLightbox = new SimpleLightbox('.gallery .gallery-link', {
      captions: true,
      captionsData: 'alt',
      captionDelay: 250,
    });
    if (page * 15 >= totalHits) {
      loadMoreBtnEl.classList.add('is-hidden');
    } else {
      loadMoreBtnEl.classList.remove('is-hidden');
    }
  } catch (err) {
    console.log(err);
    iziToast.error({
      title: 'Error',
      message: 'Sorry, an error has occurred. Please try again!',
      position: 'topRight',
    });
  } finally {
    loaderEl.style.display = 'none';
    searchFormEl.reset();
  }
};

// Функція-обробник події на кнопці довантаження
const onLoadMoreBtnClick = async event => {
  try {
    loaderEl.style.display = 'block';
    page++;

    // Робимо запит на довантаження
    const { data } = await fetchPhotosByQuery(searchedQuery, page);

    // Рендеринг карток
    const galleryTemplate = data.hits
      .map(el => createGalleryCardTemplate(el))
      .join('');
    galleryEl.insertAdjacentHTML('beforeend', galleryTemplate);
    simpleLightbox.refresh();

    // Додали скрол
    const galleryItemEl = document.querySelector('.gallery .gallery-item');
    const cardHeight = galleryItemEl.getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    if (page * 15 >= totalHits) {
      loadMoreBtnEl.classList.add('is-hidden');
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      loadMoreBtnEl.classList.remove('is-hidden');
    }
  } catch (err) {
    console.log(err);
  } finally {
    loaderEl.style.display = 'none';
  }
};

searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);
