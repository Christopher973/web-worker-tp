function pow_3(nb) {
  let result = 0;
  console.log("Worker: début de pow_3 avec nb =", nb);
  try {
    for (let i = 0; i < nb; i++) {
      for (let j = 0; j < nb; j++) {
        for (let k = 0; k < nb; k++) {
          result++;
        }
      }
    }
    console.log("Worker: fin de pow_3, résultat =", result);
    return result;
  } catch (e) {
    console.error("Worker: erreur dans pow_3", e);
    return 0;
  }
}

self.addEventListener("message", function (e) {
  console.log("Worker: message reçu", e.data);
  const number = parseInt(e.data);

  if (isNaN(number)) {
    console.error("Worker: valeur non numérique reçue", e.data);
    self.postMessage({
      error: "Valeur non numérique",
      duration: 0,
    });
    return;
  }

  console.log("Worker: début du calcul pour", number);
  const startTime = performance.now();
  const result = pow_3(number);
  const endTime = performance.now();
  const duration = endTime - startTime;
  console.log("Worker: calcul terminé en", duration, "ms");

  self.postMessage({
    result: result,
    duration: duration,
  });
});
