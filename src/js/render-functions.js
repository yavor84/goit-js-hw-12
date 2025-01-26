// Функція рендерить HTML розмітку
export const createGalleryCardTemplate = cardInfo => {
  return `
  <li class="gallery-item">
  <a class="gallery-link" href="${cardInfo.largeImageURL}">
    <img class="gallery-image" src="${cardInfo.webformatURL}" data-url="${cardInfo.largeImageURL}" alt="${cardInfo.tags}" />

    <ul class="img-description">
      <li class="description-item">
        <p class="description-text">Likes<span>${cardInfo.likes}</span></p>
      </li>
      <li class="description-item">
        <p class="description-text">Views<span>${cardInfo.views}</span></p>
      </li>
      <li class="description-item">
        <p class="description-text">Comments<span>${cardInfo.comments}</span></p>
      </li>
      <li class="description-item">
        <p class="description-text">Downloads<span>${cardInfo.downloads}</span></p>
      </li>
    </ul>
  </a>
</li>
`;
};
