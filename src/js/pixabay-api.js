import axios from "axios";


const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '50342866-da1b32c712fb25d761b3cb22e';

export async function getImagesByQuery(query, page) {
    const params = {
        key: API_KEY,
        q: query,
        page: page,
        per_page: 15,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true
        
    }
    
    try {
        const response = await axios.get(BASE_URL, { params });
        return response.data;
    } catch(error) {
            console.error('Error fetching images:', error);
            throw error;
        };

    
}
