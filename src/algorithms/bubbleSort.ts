import { Animation } from '../models/model';

export const bubbleSortUnopt = (array: number[]) => {
  const animations: Animation[] = [];
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      // O(nˇˇn) but last iteration is useless coz index is out of range
      if (array[j] > array[j + 1]) {
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  }
  return animations;
};

export const bubbleSortOpt = (array: number[]) => {
  const animations = [];
  let n = array.length;
  while (n > 1) {
    // keeping track of last position on which swap occured
    let lastSwap = 0;
    for (let i = 1; i < n; i++) {
      // comparison
      animations.push({ type: 'comparison', value: [[i - 1], [i]] });
      if (array[i] < array[i - 1]) {
        let temp = array[i - 1];
        array[i - 1] = array[i];
        array[i] = temp;
        lastSwap = i;
        // swap
        animations.push({
          type: 'swap',
          value: [
            [i - 1, array[i - 1]],
            [i, temp],
          ],
        });
      }
    }
    n = lastSwap;
    // everything after and including n is sorted
    animations.push({ type: 'flag', value: [[n]] });
  }
  return animations;
};
