// Liste des connexions pour garder une trace de tous les clients connectés
const connections = [];

// Fonction pour effectuer des opérations mathématiques
function performCalculation(data) {
  const { operation, values } = data;

  let result;
  switch (operation) {
    case "multiply":
      result = values[0] * values[1];
      break;
    case "square":
      result = values[0] * values[0];
      break;
    default:
      result = null;
  }

  return result;
}

// Gestionnaire de connexion pour chaque nouveau client
self.onconnect = function (e) {
  // Obtenir le port de communication pour ce client
  const port = e.ports[0];

  // Ajouter ce port à la liste des connexions
  connections.push(port);

  // Définir le gestionnaire de message pour ce port
  port.onmessage = function (e) {
    const data = e.data;
    const result = performCalculation(data);

    // Envoyer le résultat au client qui a fait la demande
    port.postMessage({
      operation: data.operation,
      result: result,
    });
  };

  // Démarrer le port (nécessaire pour certains navigateurs)
  port.start();
};
