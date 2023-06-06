const urlBackend = 'http://192.168.0.145:8080/api';

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
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const jsonData = await response.json();
        return {
          data: jsonData,
          status: response.status,
        };
      } else {
        return {
          data: null,
          status: response.status,
        };
      }
    } else {
      throw new Error('Request falhou');
    }
  } catch (error) {
    throw new Error(error);
  }
}

      

}

export default new ApiService();