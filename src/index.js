import './sass/index.scss';
const BASE_URL = "https://pixabay.com/api/";
import axios from 'axios';
const gallery = document.querySelector(".gallery");
import Notiflix from 'notiflix';
const form = document.querySelector("form");
let page = 1;
const moreBtn = document.querySelector('.load-more')

let searchName = null;
form.addEventListener("submit", (e) => {
    e.preventDefault();
    moreBtn.classList.toggle("is-hidden");
    gallery.innerHTML = ""
    page = 1;
 if(e.currentTarget.searchQuery.value == "") {
    Notiflix.Notify.warning('Строка пустая. Ввидите слово для поиска');
 }
 else {
    
  searchName = e.currentTarget.searchQuery.value;
  getPhoto(searchName);
  page = 2;
   
 }
 
 
})

moreBtn.addEventListener("click", () => {
   
        getPhoto(searchName);
        page +=1;
    
    
    
})

async function getPhoto(name) {
    let urlPhoto = `${BASE_URL}?key=26520877-3fd7b67c65e333110b622b89f&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
    return await axios.get(urlPhoto).then(response => createBlock(response.data));

}

function createBlock(photos) {
    if(photos.total = 0) {
        Notiflix.Notify.warning("Sorry, there are no images matching your search query. Please try again.");
    }
    else {
        const list = photos.hits.map(photo => 
            `<div class='photo-card'>
            <a href='${photo.largeImageURL}'>
              <img src='${photo.webformatURL}' alt='${photo.tags}}' loading='lazy' />
            </a>
            <div class='info'>
              <p class='info-item'>
                <b>Likes</b>
                ${photo.likes}
              </p>
              <p class='info-item'>
                <b>Views</b>
                ${photo.views}
              </p>
              <p class='info-item'>
                <b>Comments</b>
                ${photo.comments}
              </p>
              <p class='info-item'>
                <b>Downloads</b>
                ${photo.downloads}
              </p>
            </div>
          </div>`
        ).join(""); 
        gallery.insertAdjacentHTML("beforeend", list);
        if(photos.totalHits < (page -1)*40 ) {
            Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
            moreBtn.classList.add("is-hidden");
        }
        else {
        moreBtn.classList.remove("is-hidden");
        }
    }
}
