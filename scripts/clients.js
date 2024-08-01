import axios from 'axios';


class Client {
    constructor(token) { 
        
        this._token = token;
        this._defaultConfig = {
            headers: {  
                Authorization: `Bearer ${this._token}`, 
            },
        };
    }

    async getMyUsers(userId) {
        try {
            const response = await axios.get(`/api/${userId}/my-users`, this._defaultConfig);
            console.log(response.data);
            return response.data;

        } catch (error) {
            console.error('An error occurred while fetching the users:', error);
            throw error;
        }
    }

    async getClientDetails(userId, clientId) {
        try {
            const response = await axios.get(`/api/${userId}/get-my-client/${clientId}`, this._defaultConfig);
            console.log(response.data);
            return response.data;

        } catch (error) {
            console.error('An error occurred while fetching the users:', error);
            throw error;
        }
    }

    async createClient(userId, datas) {
        try {
            let response = await axios.post(`/api/${userId}/create-my-client`, datas, this._defaultConfig);
            return response.data;

        } catch (error) {
            console.error('An error occurred while create the user:', error);
            throw error;
        }
    }

    async updateClient(userId, clientId, datas) {
        try {
            await axios.put(`/api/${userId}/update-my-client/${clientId}`, datas, this._defaultConfig);
            
            return true;

        } catch (error) {
            console.error('An error occurred while fetching the users:', error);
            throw error;
        }
    }

    async deleteClient(userId, clientId) {
        try {
            await axios.delete(`/api/${userId}/delete-my-client/${clientId}`, this._defaultConfig);
            
            return true;

        } catch (error) {
            console.error('An error occurred while fetching the users:', error);
            throw error;
        }
    }
}

export default Client;
