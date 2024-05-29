const axios = require('axios');
const serverUrl: string = "http://localhost:3000";


class DataFetcher {

    async fetchData(route: string) {
        const url = serverUrl + route;
        try {
            const start = performance.now();
            const response = await axios.get(url);
            const end = performance.now();
            console.log(`Запит до ${route} зайняв ${end - start} мс`);
            return response.data;
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                console.error(`Error fetching data from ${route}:`, error.response?.data || error.message);
                throw new Error(`Error fetching data from ${route}: ${error.response?.data || error.message}`);
            } else {
                throw new Error(`Unexpected error: ${error}`);
            }
        }
    }

    fetchProducts() {
        return this.fetchData('/products');
    }

    async addToWishlist(productId: number, token: string) {
        const url = serverUrl + "/like";
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        };

        try {
            const response = await axios.post(url, { productId }, axiosConfig);
            console.log('Лайк успішно додано:', response.data);
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                console.error('Помилка при додаванні лайка:', error.response?.data?.error || error.message);
            } else {
                console.error('Unexpected error:', error);
            }
        }
    }

    async getLikes(token: string) {
        const url = serverUrl + "/user_likes";
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        };

        try {
            const response = await axios.get(url, axiosConfig);
            return response.data;
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                console.error('Помилка при отриманні лайків:', error.response?.data?.error || error.message);
            } else {
                console.error('Unexpected error:', error);
            }
            throw error;
        }
    }

    async addToCart(productId: number, quantity: number, size: string, price: number, sale: number, image: string, token: string) {
        const url = serverUrl + "/basket/cart";
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

        try {
            const response = await axios.post(url, requestData, axiosConfig);
            console.log('Товар успішно додано до кошика:', response.data);
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                console.error('Помилка при додаванні товару до кошика:', error.response?.data?.error || error.message);
            } else {
                console.error('Unexpected error:', error);
            }
        }
    }

    async removeFromCart(token: string, productId: number) {
        const url = serverUrl + "/basket/cart";
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            data: {
                productId
            }
        };

        try {
            const response = await axios.delete(url, axiosConfig);
            console.log('Товар успішно видалено з кошика:', response.data);
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                console.error('Помилка при видаленні товару з кошика:', error.response?.data?.error || error.message);
            } else {
                console.error('Unexpected error:', error);
            }
        }
    }

    async getUserCart(token: string) {
        const url = serverUrl + "/basket/user_cart";
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        };

        try {
            const response = await axios.get(url, axiosConfig);
            return response.data;
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                console.error('Помилка при отриманні товарів:', error.response?.data?.error || error.message);
            } else {
                console.error('Unexpected error:', error);
            }
            throw error;
        }
    }

    async fetchProductById(productId: number) {
        const url = serverUrl + `/product/${productId}`;
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                console.error(`Помилка при отриманні даних для товару з ID ${productId}:`, error.response?.data || error.message);
                throw new Error(`Помилка при отриманні даних для товару з ID ${productId}: ${error.response?.data || error.message}`);
            } else {
                throw new Error(`Unexpected error: ${error}`);
            }
        }
    }

    async login(formData: { email: string, password: string }) {
        try {
            const response = await axios.post(`${serverUrl}/auth/login/`, {
                username: formData.email,
                password: formData.password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response;
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                console.error('Помилка при вході:', error.response?.data?.error || error.message);
            } else {
                console.error('Unexpected error:', error);
            }
            throw error;
        }
    }

    async register(formData: { email: string, password: string }) {
        try {
            const response = await axios.post(`${serverUrl}/auth/register/`, {
                username: formData.email,
                password: formData.password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response;
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                console.error('Помилка при реєстрації:', error.response?.data?.error || error.message);
            } else {
                console.error('Unexpected error:', error);
            }
            throw error;
        }
    }

    async sendMail(message: string, subject: string) {
        try {
            const response = await axios.post(`${serverUrl}/email/send-email`, {
                message,
                subject,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response;
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                console.error('Помилка при відправці пошти:', error.response?.data?.error || error.message);
            } else {
                console.error('Unexpected error:', error);
            }
            throw error;
        }
    }

    async admin(token: string) {
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        };
        try {
            const response = await axios.get(`${serverUrl}/admin`, axiosConfig);
            return response.data;
        } catch (error: any) {
            return { status: 500 };
        }
    }

    async getAdminUsers(token: string) {
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        };
        try {
            const response = await axios.get(`${serverUrl}/admin/users`, axiosConfig);
            return response.data;
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                console.error('Помилка при отриманні даних користувачів адміністратора:', error.response?.data?.error || error.message);
            } else {
                console.error('Unexpected error:', error);
            }
            throw error;
        }
    }

    async addProduct(token: string, productData: FormData) {
        const url = `${serverUrl}/admin/products`;
        const axiosConfig = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': token
            }
        };

        try {
            const response = await axios.post(url, productData, axiosConfig);
            return response.data;
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                console.error('Помилка при додаванні товару:', error.response?.data?.error || error.message);
            } else {
                console.error('Unexpected error:', error);
            }
            throw error;
        }
    }

    async updateProduct(token: string, productId: number, productData: FormData) {
        const url = `${serverUrl}/admin/products/${productId}`;
        const axiosConfig = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': token
            }
        };

        try {
            const response = await axios.put(url, productData, axiosConfig);
            return response.data;
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                console.error('Помилка при оновленні товару:', error.response?.data?.error || error.message);
            } else {
                console.error('Unexpected error:', error);
            }
            throw error;
        }
    }

    async deleteProduct(token: string, productId: number) {
        const url = `${serverUrl}/admin/products/${productId}`;
        const axiosConfig = {
            headers: {
                'Authorization': token
            }
        };

        try {
            const response = await axios.delete(url, axiosConfig);
            return response.data;
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                console.error('Помилка при видаленні товару:', error.response?.data?.error || error.message);
            } else {
                console.error('Unexpected error:', error);
            }
            throw error;
        }
    }

    async placeOrder(orderData: any) {
        const storedToken = localStorage.getItem("token");
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': storedToken || ''
            }
        };

        try {
            const response = await axios.post(`${serverUrl}/basket/place-order`, orderData, axiosConfig);
            return response.data;
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                console.error('Помилка при розміщенні замовлення:', error.response?.data?.error || error.message);
            } else {
                console.error('Unexpected error:', error);
            }
            throw error;
        }
    }

    async getOrders(token: string) {
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        };
        try {
            const response = await axios.get(`${serverUrl}/orders`, axiosConfig);
            return response.data;
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                console.error('Помилка при отриманні замовлень:', error.response?.data?.error || error.message);
            } else {
                console.error('Unexpected error:', error);
            }
            throw error;
        }
    }

    async updateOrderStatus(orderId: number, status: string, token: string) {
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        };
        try {
            const response = await axios.put(`${serverUrl}/orders/${orderId}/status`, { status }, axiosConfig);
            return response.data;
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                console.error('Помилка при оновленні статусу замовлення:', error.response?.data?.error || error.message);
            } else {
                console.error('Unexpected error:', error);
            }
            throw error;
        }
    }

    async deleteOrder(orderId: number, token: string) {
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        };
        try {
            const response = await axios.delete(`${serverUrl}/orders/${orderId}`, axiosConfig);
            return response.data;
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                console.error('Помилка при видаленні замовлення:', error.response?.data?.error || error.message);
            } else {
                console.error('Unexpected error:', error);
            }
            throw error;
        }
    }
}

export default DataFetcher;
