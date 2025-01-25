export const fetchPhotosByQuery = searchedQuery => {
  const searchParams = new URLSearchParams({
    key: '48220073-404265a89831343dc3c8e49cf',
    q: searchedQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });
  return fetch(`https://pixabay.com/api/?${searchParams}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};
