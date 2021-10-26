export const bubbleSortUnopt = (array: number[]) => {
  const animations: number[][] = [];
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      // O(nˇˇn) but last iteration is useless coz index is out of range
      if (array[j] > array[j + 1]) {
        let first = array[j];
        array[j] = array[j + 1];
        array[j + 1] = first;
      }
    }
  }
  return animations;
};

export const bubbleSortOpt = (array: number[]) => {
  const animations = [];
  let n = array.length;
  while (n > 1) {
    let lastSwap = 0;
    for (let i = 1; i < n; i++) {
      if (array[i] < array[i - 1]) {
        animations.push([i - 1, array[i]]);
        animations.push([i, array[i - 1]]);
        let first = array[i - 1];
        array[i - 1] = array[i];
        array[i] = first;
        lastSwap = i;
      }
    }
    n = lastSwap;
  }
  return animations;
};
