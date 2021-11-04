import { Animation } from '../models/model';

export const heapSort = (array: number[]) => {
  const n = array.length;
  const animations: Animation[] = [];
  for (let i = Math.floor(n / 2 - 1); i >= 0; i--) {
    maxHeapify(array, n, i, animations);
  }
  for (let i = n - 1; i > 0; i--) {
    let temp = array[0];
    array[0] = array[i];
    array[i] = temp;
    animations.push({
      type: 'swap',
      value: [
        [0, array[0]],
        [i, temp],
      ],
    });
    maxHeapify(array, i, 0, animations);
  }
  return animations;
};

const maxHeapify = (
  array: number[],
  n: number,
  i: number,
  animations: Animation[]
) => {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  if (left < n && array[left] > array[largest]) {
    animations.push({ type: 'comparison', value: [[left], [largest]] });
    largest = left;
  }
  if (right < n && array[right] > array[largest]) {
    animations.push({ type: 'comparison', value: [[right], [largest]] });
    largest = right;
  }
  if (largest !== i) {
    let temp = array[i];
    array[i] = array[largest];
    array[largest] = temp;
    // comparison
    // animations.push({ type: 'comparison', value: [[largest], [i]] });
    // swap
    animations.push({
      type: 'swap',
      value: [
        [largest, temp],
        [i, array[i]],
      ],
    });
    maxHeapify(array, n, largest, animations);
  }
};
