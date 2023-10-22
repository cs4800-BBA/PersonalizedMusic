const { app } = require('@azure/functions');
const fetch = require('node-fetch');

app.http('Omdb', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`HTTP function processed request for url "${request.url}"`);

        // Define your OMDB API URL with the API key
        const API_URL = "http://www.omdbapi.com?apikey=b6003d8a";

        try {
            // Make a GET request to the OMDB API
            const response = await fetch(API_URL);
            if (response.ok) {
                const data = await response.json();
                return {
                    body: JSON.stringify(data)
                };
            } else {
                return {
                    status: response.status,
                    body: 'Error calling OMDB API'
                };
            }
        } catch (error) {
            return {
                status: 500,
                body: 'Internal server error'
            };
        }
    }
});