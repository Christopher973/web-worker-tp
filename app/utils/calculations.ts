export function pow_3(nb: number): number {
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
