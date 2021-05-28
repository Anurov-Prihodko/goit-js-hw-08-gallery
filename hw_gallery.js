import imgItem from "./gallery-items.js";

const refs = {
    modalContentEl: document.querySelector('.lightbox__image'),
    modalEl: document.querySelector('.lightbox.js-lightbox'),
    galleryContainer: document.querySelector('ul.js-gallery'),
    closeModalEl: document.querySelector('button[data-action="close-lightbox"]'),
}

refs.galleryContainer.insertAdjacentHTML('beforeend', createImgCardsMarkup(imgItem));
refs.galleryContainer.addEventListener('click', onImgContainerClick);
refs.closeModalEl.addEventListener('click', onModalClose);


function createImgCardsMarkup(imgItem) {
    return imgItem.map(({preview, original, description}) => {
        return `
<li class="gallery__item">
    <a
        class="gallery__link"
        href="${original}"
    >
        <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
        />
    </a>
</li>
    `
    }).join('');
};

function onImgContainerClick(evt) {
    evt.preventDefault()
    const isImgSwachEL = evt.target.classList.contains('gallery__image');
    
    if (!isImgSwachEL) {
        return;
    }
    refs.modalEl.classList.add('is-open');

    const imgEl = evt.target; 
    refs.modalContentEl.src = imgEl.dataset.source;
    refs.modalContentEl.alt = imgEl.alt;
    
};

function onModalClose() {
    refs.modalEl.classList.remove('is-open');
      //  refs.closeModalEl.removeEventListener('click', onModalClose); 
};

function onModalCloseToo(e) {
     if (e.code === 'Escape') {
        onModalClose()
    }
    else if (e.target === document.querySelector('div.lightbox__overlay')) {
        onModalClose();
    }
};

window.addEventListener('keydown', (e) => {
    if (e.code === 'Escape') {
        onModalClose()
    }    
});

window.addEventListener('click', (e) => {
    if (e.target === document.querySelector('div.lightbox__overlay')) {
        onModalClose();
    }
});

document.addEventListener('keydown', (e) => {
    let newIndex;
    // newIndex = refs.modalContentEl.src;
    
    const currentId = newIndex.indexOf(refs.modalContentEl.src);
    if (e.key === 'ArrowLeft') {
        if (currentId > -1) {
            newIndex = currentId - 1;
            if (newIndex === -1) {
                newIndex = newIndex.length - 1;
            }
        }
    }

    console.log(currentId);
});


// const test = refs.modalContentEl.src;

// test.map(e => {
//     let arrayImages = [];
//     e.target.push(refs.modalContentEl.src)
//     return arrayImages
// });
//  console.log(arrayImages);