import imgItem from "./gallery-items.js";

const refs = {
    modalContentEl: document.querySelector('.lightbox__image'),
    modalEl: document.querySelector('.lightbox.js-lightbox'),
    galleryContainer: document.querySelector('ul.js-gallery'),
    closeModalEl: document.querySelector('button[data-action="close-lightbox"]'),
    onOverlayClick: document.querySelector('div.lightbox__overlay'),
}

refs.galleryContainer.insertAdjacentHTML('beforeend', createImgCardsMarkup(imgItem));
refs.galleryContainer.addEventListener('click', onImgContainerClick);
refs.closeModalEl.addEventListener('click', onModalClose);
refs.onOverlayClick.addEventListener('click', onModalCloseToClickOverlay)

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
    
    window.addEventListener('keydown', onModalCloseToClickEscape);
};

function onModalClose() {
    refs.modalEl.classList.remove('is-open');
    refs.modalContentEl.src = '';
    refs.modalContentEl.alt = '';
    window.removeEventListener('keydown', onModalCloseToClickEscape);
};

function onModalCloseToClickOverlay(event) {
    if ((event.currentTarget === event.target)) {
        onModalClose();
    };
}
/*
Вариант:
window.addEventListener('click', (e) => {
    if (e.target === document.querySelector('div.lightbox__overlay')) {
        onModalClose();
    }
});
*/

function onModalCloseToClickEscape(event) {
    const ESC_CODE = 'Escape';
    if (event.code === ESC_CODE) {
        onModalClose();
    }
}
/*
Вариант:
window.addEventListener('keydown', (e) => {
    if (e.code === 'Escape') {
        onModalClose()
    }    
});
undefined:1 GET https://anurov-prihodko.github.io/goit-js-hw-08-gallery/undefined 404
*/

// refs.closeModalEl.removeEventListener('click', onModalClose);

const images = document.querySelectorAll('.gallery__image');
const arrayImages = [];

images.forEach(el => {
    arrayImages.push(el.getAttribute('data-source'));
});

document.addEventListener('keydown', (e) => {
    let newIndex;
    const currentId = arrayImages.indexOf(refs.modalContentEl.src);
    if (e.key === 'ArrowLeft') {
        newIndex = currentId - 1;
        if (newIndex === -1) {
            newIndex = arrayImages.length - 1;
        }
    } else if (e.key === 'ArrowRight') {
                newIndex = currentId + 1;
            if (newIndex === arrayImages.length) {
                newIndex = 0;
            }
    }
    refs.modalContentEl.src = arrayImages[newIndex];
});

