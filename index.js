import{a as L,i as n,S as b}from"./assets/vendor-Bi0bPHun.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const p of s.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&l(p)}).observe(document,{childList:!0,subtree:!0});function i(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function l(e){if(e.ep)return;e.ep=!0;const s=i(e);fetch(e.href,s)}})();const y=t=>`
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
`,g=(t,r)=>{const i={params:{key:"48220073-404265a89831343dc3c8e49cf",q:t,page:r,per_page:15,image_type:"photo",orientation:"horizontal",safesearch:!0}};return L.get("https://pixabay.com/api/",i)},h=document.querySelector(".search-form"),m=document.querySelector(".gallery"),d=document.querySelector(".loader"),o=document.querySelector(".load-more-btn");let f,a=1,c="",u=0;const E=async t=>{try{if(t.preventDefault(),c=t.currentTarget.elements.user_query.value.trim(),c===""){n.error({title:"Error",message:"The search field cannot be empty. Please enter a search term!",position:"topRight"});return}a=1,d.style.display="block";const{data:r}=await g(c,a);if(u=r.totalHits,r.hits.length===0){n.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),m.innerHTML="",o.classList.add("is-hidden");return}const i=r.hits.map(l=>y(l)).join("");m.innerHTML=i,f=new b(".gallery .gallery-link",{captions:!0,captionsData:"alt",captionDelay:250}),a*15>=u?o.classList.add("is-hidden"):o.classList.remove("is-hidden")}catch(r){console.log(r),n.error({title:"Error",message:"Sorry, an error has occurred. Please try again!",position:"topRight"})}finally{d.style.display="none",h.reset()}},S=async t=>{try{d.style.display="block",a++;const{data:r}=await g(c,a),i=r.hits.map(s=>y(s)).join("");m.insertAdjacentHTML("beforeend",i),f.refresh();const e=document.querySelector(".gallery .gallery-item").getBoundingClientRect().height;window.scrollBy({top:e*2,behavior:"smooth"}),a*15>=u?(o.classList.add("is-hidden"),n.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):o.classList.remove("is-hidden")}catch(r){console.log(r)}finally{d.style.display="none"}};h.addEventListener("submit",E);o.addEventListener("click",S);
//# sourceMappingURL=index.js.map
