import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { getImagesByQuery } from './js/pixabay-api.js';
import { createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton} from './js/render-functions.js'


const form = document.querySelector('.form');
const input = form.elements['search-text'];
const loadMoreBtn = document.querySelector('.load-more-btn');


let query;
let page = 0;
let maxPage = 0;
const perPage = 15;

form.addEventListener('submit', async e => {
    e.preventDefault();
  query = input.value.trim();
    page = 1;
    
    if (!query) {
        iziToast.warning({ message: 'Please enter a search term.' })
        return; 
    }

    clearGallery();
    showLoader();
    try { 
        const data = await getImagesByQuery(query, page);
        
        if (data.hits.length === 0) {
            hideLoadMoreButton();
                iziToast.error({
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                    position: 'topRight',
                    timeout: 3000,
                });
                return;
        }
        
       
        createGallery(data.hits);
        
        maxPage = Math.ceil(data.totalHits / perPage);
        
    if (maxPage > page) {
        showLoadMoreButton();
       
    } else {
        hideLoadMoreButton();
    };

    if (page === maxPage) {
        iziToast.success({
            message: 'We`re sorry, but you`ve reached the end of search results.',
            position: "topRight",
            timeout: 3000,
        });
    };
        } catch (error) {
                iziToast.error({ message: 'Something went wrong. Please try again later.', })
            }
        finally {
            hideLoader();
    };

    
    
    console.log(maxPage);
   

    
    
    e.target.reset();
        
});



loadMoreBtn.addEventListener('click', async (e) => {
    page += 1;
   
   showLoader();
    try { 
        const data = await getImagesByQuery(query, page);
       
            if (data.hits.length === 0) {
                iziToast.error({
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                    position: 'topRight',
                    timeout: 3000,
                });
                return;
            }
            
        createGallery(data.hits);

        if (maxPage > page) {
            showLoadMoreButton();
            
        } else {
            hideLoadMoreButton();
        };
    
        if (page === maxPage) {
            iziToast.success({
                message: 'We`re sorry, but you`ve reached the end of search results.',
                position: "topRight",
                timeout: 3000,
            });
        };
        
        const card = document.querySelector('.gallery-item');
        if (card) {
            const cardHeight = card.getBoundingClientRect().height;
            window.scrollBy({
                top: cardHeight * 2,
                behavior: 'smooth'
            });
        }
        } catch (error) {
                iziToast.error({ message: 'Something went wrong. Please try again later.', })
            }
        finally {
            hideLoader();
    };
    

        
    
})




