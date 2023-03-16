const Hapi = require('@hapi/hapi');

// Create a new server instance
const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});

// In-memory storage for contacts
const contacts = [
  {
    "id": "1",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890"
  }
];

// Route for creating a new contact
server.route({
    method: 'POST',
    path: '/contacts',
    handler: (request, h) => {
        const newContact = request.payload;
        contacts.push(newContact);
        return h.response(newContact).code(201);
    }
});

// Route for getting a list of all contacts
server.route({
    method: 'GET',
    path: '/contacts',
    handler: (request, h) => {
        return h.response(contacts).code(200);
    }
});

// Route for deleting a contact by ID
server.route({
    method: 'DELETE',
    path: '/contacts/{id}',
    handler: (request, h) => {
        const id = request.params.id;
        const index = contacts.findIndex((c) => c.id === id);
        if (index >= 0) {
            const deletedContact = contacts.splice(index, 1)[0];
            return h.response(deletedContact).code(200);
        } else {
            return h.response().code(404);
        }
    }
});

// Start the server
async function start() {
    try {
        await server.start();
        console.log('Server running at:', server.info.uri);
    } catch (err) {
        console.error(err);
    }
}

start();