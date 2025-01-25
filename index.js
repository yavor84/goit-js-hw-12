import{i as l,S as u}from"./assets/vendor-BrddEoy-.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();const m=t=>`
  <li class="gallery-item">
  <a class="gallery-link" href="${t.largeImageURL}">
    <img class="gallery-image" src="${t.webformatURL}" data-url="${t.largeImageURL}" alt="${t.tags}" />

    <ul class="img-description">
      <li class="description-item">
        <p class="description-text">Likes<span>${t.likes}</span></p>
      </li>
      <li class="description-item">
        <p class="description-text">Views<span>${t.views}</span></p>
      </li>
      <li class="description-item">
        <p class="description-text">Comments<span>${t.comments}</span></p>
      </li>
      <li class="description-item">
        <p class="description-text">Downloads<span>${t.downloads}</span></p>
      </li>
    </ul>
  </a>
</li>
`,y=t=>{const i=new URLSearchParams({key:"48220073-404265a89831343dc3c8e49cf",q:t,image_type:"photo",orientation:"horizontal",safesearch:!0});return fetch(`https://pixabay.com/api/?${i}`).then(s=>{if(!s.ok)throw new Error(s.status);return s.json()})},p=document.querySelector(".search-form"),n=document.querySelector(".gallery"),c=document.querySelector(".loader"),d=t=>{t.preventDefault();const i=t.currentTarget.elements.user_query.value.trim();if(i===""){l.error({title:"Error",message:"The search field cannot be empty. Please enter a search term!",position:"topRight"});return}c.style.display="block",y(i).then(s=>{if(s.hits.length===0){l.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),n.innerHTML="";return}const o=s.hits.map(e=>m(e)).join("");n.innerHTML=o,new u(".gallery .gallery-link",{captions:!0,captionsData:"alt",captionDelay:250})}).catch(s=>{console.log(s),l.error({title:"Error",message:"Sorry, an error has occurred. Please try again!",position:"topRight"})}).finally(()=>{c.style.display="none",p.reset()})};p.addEventListener("submit",d);
//# sourceMappingURL=index.js.map
