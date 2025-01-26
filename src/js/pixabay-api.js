import axios from 'axios';

// Функція виконує запит до API
export const fetchPhotosByQuery = (searchedQuery, currentPage) => {
  const axiosParams = {
    params: {
      key: '48220073-404265a89831343dc3c8e49cf',
      q: searchedQuery,
      page: currentPage,
      per_page: 15,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  };
  return axios.get('https://pixabay.com/api/', axiosParams);
};
