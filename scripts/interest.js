import axios from 'axios';

class Interest {
    constructor(token) {  // Constructor
        this._token = token;
        this._defaultConfig = {
            headers: {  
                Authorization: `Bearer ${this._token}`, 
            },
        };
    }

    async getInterests() {
        try {
            const response = await axios.get(`/api/get-interests`, this._defaultConfig);
            return response.data;

        } catch (error) {
            console.error('An error occurred while fetching the interests:', error);
            throw error;
        }
    }
}

export default Interest;
