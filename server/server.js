const axios = require('axios');

const URL = "https://famdy-back.vercel.app";

class DataFetcher {
    constructor() {
        this.serverUrl = URL;
    }

    fetchData(route) {
        const url = URL + route;
        return axios.get(url)
            .then(response => response.data)
            .catch(error => {
                console.error(`Error fetching data from ${route}:`, error);
                throw new Error(`Error fetching data from ${route}`);
            });
    }

    fetchProducts() {
        return this.fetchData('/products');
    }

    addToWishlist(productId, token) {
        const url = URL + "/like";
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        };

        axios.post(url, { productId }, axiosConfig)
            .then(response => {
                console.log('Лайк успешно добавлен:', response.data);
            })
            .catch(error => {
                console.error('Ошибка при добавлении лайка:', error.response.data.error);
            });
    }

    getLikes(token) {
        const url = URL + "/user_likes";
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        };

        return axios.get(url, axiosConfig)
            .then(response => response.data)
            .catch(error => {
                console.error('Ошибка при получении лайков:', error.response.data.error);
                throw error;
            });
    }

    addToCart(productId, quantity, size, price, sale, image, token) {
        const url = URL + "/cart";
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        };

        const requestData = {
            productId,
            quantity,
            size,
            price,
            sale,
            image,
        };


        axios.post(url, requestData, axiosConfig)
            .then(response => {
                console.log('Товар успішно додано до кошика:', response.data);
            })
            .catch(error => {
                console.error('Помилка при додаванні товару до кошика:', error.response.data.error);
            });
    }

    removeFromCart(token, productId) {
        const url = URL + "/cart";
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            data: {
                productId
            }
        };

        axios.delete(url, axiosConfig)
            .then(response => {
                console.log('Товар успішно видалено з кошика:', response.data);
            })
            .catch(error => {
                console.error('Помилка при видаленні товару з кошика:', error.response.data.error);
            });
    }

    getUserCart(token) {
        const url = URL + "/user_cart";
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        };

        return axios.get(url, axiosConfig)
            .then(response => response.data)
            .catch(error => {
                console.error('Ошибка при получении товарів:', error.response.data.error);
                throw error;
            });
    }

    fetchProductById(productId) {
        const url = `${URL}/product/${productId}`;
        return axios.get(url)
            .then(response => response.data)
            .catch(error => {
                console.error(`Error fetching data for product with ID ${productId}:`, error);
                throw new Error(`Error fetching data for product with ID ${productId}`);
            });
    }
}

module.exports = DataFetcher;
