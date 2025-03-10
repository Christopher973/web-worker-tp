// app/square/square.ts
export function setupSquareWorker(
  numInput: HTMLInputElement,
  resultElement: HTMLElement
): void {
  // Vérifier si le navigateur supporte les Shared Workers
  if (typeof SharedWorker === "undefined") {
    resultElement.textContent =
      "Votre navigateur ne supporte pas les Shared Workers";
    return;
  }

  // Créer une instance du Shared Worker
  const worker = new SharedWorker("/workers/sharedWorker.js");

  // Fonction pour calculer le carré
  const performSquare = () => {
    const num = parseFloat(numInput.value) || 0;

    // Envoyer les données au worker
    worker.port.postMessage({
      operation: "square",
      values: [num],
    });
  };

  // Ajouter un écouteur d'événement au champ de saisie
  numInput.addEventListener("input", performSquare);

  // Configurer le gestionnaire de message pour recevoir les résultats
  worker.port.onmessage = function (e) {
    const data = e.data;
    if (data.operation === "square") {
      resultElement.textContent = `Résultat: ${data.result}`;
    }
  };

  // Démarrer le port (nécessaire pour certains navigateurs)
  worker.port.start();

  // Effectuer un calcul initial
  performSquare();
}
