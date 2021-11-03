export interface heapAnimation {
  type: string;
  position: number[][];
}

export const heapSort = (array: number[]) => {
  const n = array.length;
  const animations: heapAnimation[] = [];
  for (let i = Math.floor(n / 2 - 1); i >= 0; i--) {
    maxHeapify(array, n, i, animations);
  }
  for (let i = n - 1; i > 0; i--) {
    // animations.push([0, array[i]]);
    // animations.push([i, array[0]]);
    let temp = array[0];
    array[0] = array[i];
    array[i] = temp;
    animations.push({
      type: 'swap',
      position: [
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
  animations: heapAnimation[]
) => {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  if (left < n && array[left] > array[largest]) {
    animations.push({ type: 'comparison', position: [[left], [largest]] });
    largest = left;
  }
  if (right < n && array[right] > array[largest]) {
    animations.push({ type: 'comparison', position: [[right], [largest]] });
    largest = right;
  }
  if (largest !== i) {
    let temp = array[i];
    array[i] = array[largest];
    array[largest] = temp;
    // animations.push([i, array[i]]);
    // animations.push([largest, temp]);
    animations.push({
      type: 'swap',
      position: [
        [largest, temp],
        [i, array[i]],
      ],
    });
    maxHeapify(array, n, largest, animations);
  }
};
