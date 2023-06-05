const urlBackend = 'http://192.168.15.14:8080/api';

class ApiService {
    async post(endpoint, data, token) {
        const url = `${urlBackend}/${endpoint}`;
        try {
            let headers = {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            };
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data),
            });


            if (response.ok) {
                const jsonData = await response.json();
                return jsonData;
            } else {
                console.log(response)
                throw new Error('Request falhou');
            }
        } catch (error) {
            throw new Error(error);

        }
    }

    async get(endpoint, token) {
        const url = `${urlBackend}/${endpoint}`;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`
                },
            });

            if (response.ok) {
                const jsonData = await response.json();
                return jsonData;
            } else {
                throw new Error('Request falhou');
            }
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default new ApiService();