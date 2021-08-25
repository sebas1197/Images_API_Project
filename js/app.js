import * as DOM from './dom.js';

var actualPage = 1;


window.onload = () => {
  DOM.form.addEventListener("submit", searchImages);
};

function searchImages(e) {
  e.preventDefault();
  const category = document.querySelector("#category").value;
  const key = "23057447-0380023d6d8b6d2c012548617";
  const URL = `https://pixabay.com/api/?key=${key}&q=${category}&per_page=40&page=${actualPage}`;

  fetch(URL)
    .then((response) => response.json())
        .then((response) => {
            let totalPages = calculateNumberPages(response.totalHits);
            showImages(response.hits, totalPages, e);
        });
}

function calculateNumberPages(total){
    return parseInt(Math.ceil(total / 40));
}

function *createPager(total){
    for(let i = 1; i <= total; i++){
        yield i;
    }
}

function clearHTML() {
    while (DOM.result.firstChild) {
      DOM.result.removeChild(DOM.result.firstChild);
    }
  }

function showImages(images, totalPages, e) {
  clearHTML();
  images.forEach((i) => {
    const { previewURL, likes, views, largeImageURL } = i;

    DOM.result.innerHTML += `
        <div class="w-1/2 md:w-1/3 lg:w-1/4 mb-4 p-3">
            <div class="bg-white ">
                <img class="w-full" src=${previewURL} alt={tags} />
                <div class="p-4">
                    <p class="card-text">${likes} Me Gusta</p>
                    <p class="card-text">${views} Vistas </p>
                    <a href=${largeImageURL} 
                    rel="noopener noreferrer" 
                    target="_blank" class="bg-blue-800 w-full p-1 block mt-5 rounded text-center font-bold uppercase hover:bg-blue-500 text-white">Ver Imagen</a>
                </div>
            </div>
        </div>
        `;
  });

  clearPager();
  printPager(totalPages, e);
}

function clearPager(){
    while(DOM.pages.firstChild){
        DOM.pages.removeChild(pages.firstChild)
    }
}

function printPager(total, e){
    let iterator = createPager(total);

    while(true){
        let {value, done} = iterator.next();

        if(done) return;

        let button = document.createElement('a');
        button.href = '#';
        button.dataset.page = value;
        button.textContent = value;
        button.classList.add('siguiente', 'bg-yellow-400', 'px-4', 'py-1', 'mr-2', 'mx-auto', 'mb-5', 'font-bold', 'rounded');
        
        button.onclick = () => {
            actualPage = value
            searchImages(e);
        };

        pages.appendChild(button);        
    }
}

