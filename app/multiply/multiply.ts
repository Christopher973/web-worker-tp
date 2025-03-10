// app/multiply/multiply.ts
export function setupMultiplyWorker(
  num1Input: HTMLInputElement,
  num2Input: HTMLInputElement,
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

  // Fonction pour effectuer la multiplication
  const performMultiplication = () => {
    const num1 = parseFloat(num1Input.value) || 0;
    const num2 = parseFloat(num2Input.value) || 0;

    // Envoyer les données au worker
    worker.port.postMessage({
      operation: "multiply",
      values: [num1, num2],
    });
  };

  // Ajouter des écouteurs d'événements aux champs de saisie
  num1Input.addEventListener("input", performMultiplication);
  num2Input.addEventListener("input", performMultiplication);

  // Configurer le gestionnaire de message pour recevoir les résultats
  worker.port.onmessage = function (e) {
    const data = e.data;
    if (data.operation === "multiply") {
      resultElement.textContent = `Résultat: ${data.result}`;
    }
  };

  // Démarrer le port (nécessaire pour certains navigateurs)
  worker.port.start();

  // Effectuer un calcul initial
  performMultiplication();
}
