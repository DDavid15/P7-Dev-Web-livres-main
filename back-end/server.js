const http = require('http');
const app = require('./app');
require('dotenv').config();

// Fonction pour normaliser le port
const normalizePort = (val) => {
  const port = parseInt(val, 10);
  return isNaN(port) ? val : port >= 0 ? port : false;
};

const port = normalizePort(process.env.PORT || 4000);
app.set('port', port);

// Création du serveur
const server = http.createServer(app);

// Gestionnaire d’erreurs
const errorHandler = (error) => {
  console.trace('Stack de errorHandler');
  if (error.syscall !== 'listen') throw error;

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges.`);
      process.exit(1);
    case 'EADDRINUSE':
      console.error(`${bind} is already in use.`);
      process.exit(1);
    default:
      throw error;
  }
};

// Événements du serveur
server.on('error', errorHandler);

server.on('listening', () => {
  console.log(`Server is running on port ${port}`);
});

// Démarrage du serveur
server.listen(port);
