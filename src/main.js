import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { createGalleryCardTemplate } from './js/render-functions';
import { fetchPhotosByQuery } from './js/pixabay-api';

const searchFormEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const loaderEl = document.querySelector('.loader');

const onSearchFormSubmit = event => {
  event.preventDefault();
  const searchedQuery = event.currentTarget.elements.user_query.value.trim();
  if (searchedQuery === '') {
    iziToast.error({
      title: 'Error',
      message: 'The search field cannot be empty. Please enter a search term!',
      position: 'topRight',
    });
    return;
  }

  loaderEl.style.display = 'block';

  fetchPhotosByQuery(searchedQuery)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.error({
          title: 'Error',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        galleryEl.innerHTML = '';
        return;
      }

      const galleryTemplate = data.hits
        .map(el => createGalleryCardTemplate(el))
        .join('');
      galleryEl.innerHTML = galleryTemplate;
      new SimpleLightbox('.gallery .gallery-link', {
        captions: true,
        captionsData: 'alt',
        captionDelay: 250,
      });
    })

    .catch(err => {
      console.log(err);
      iziToast.error({
        title: 'Error',
        message: 'Sorry, an error has occurred. Please try again!',
        position: 'topRight',
      });
    })

    .finally(() => {
      loaderEl.style.display = 'none';
      searchFormEl.reset();
    });
};

searchFormEl.addEventListener('submit', onSearchFormSubmit);
