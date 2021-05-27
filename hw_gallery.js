import imgItem from "./gallery-items.js";

const galleryContainer = document.querySelector('ul.js-gallery');
const cardsMarkup = createImgCardsMarkup(imgItem);

galleryContainer.insertAdjacentHTML('beforeend', cardsMarkup);

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

const imagesEl = document.querySelectorAll('.gallery__image');
const modalContentEl = document.querySelector('.lightbox__image');
const modalEl = document.querySelector('.lightbox');
const closeModalEl = document.querySelector('.lightbox__button');

console.log(closeModalEl);