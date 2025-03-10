function pow_3(nb: number) {
  let result = 0;
  try {
    for (let i = 0; i < nb; i++) {
      for (let j = 0; j < nb; j++) {
        for (let k = 0; k < nb; k++) {
          result++;
        }
      }
    }
    return result;
  } catch (e) {
    console.error(e);
    return 0;
  }
}

self.addEventListener("message", function (e) {
  const number = e.data;
  const startTime = performance.now();
  const result = pow_3(number);
  const endTime = performance.now();
  const duration = endTime - startTime;

  self.postMessage({
    result: result,
    duration: duration,
  });
});
