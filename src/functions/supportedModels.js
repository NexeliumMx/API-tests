const { app } = require('@azure/functions');
const fs = require('fs');
const path = require('path');

app.http('supportedModels', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        // Read and parse the JSON file
        const filePath = path.join(__dirname, './models.json');
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        // Check if the request method is GET
        if (request.method === 'GET') {
            return {
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            };
        }

        // If method is not GET, return a message
        return { body: "This endpoint only supports GET requests for retrieving data." };
    }
});
