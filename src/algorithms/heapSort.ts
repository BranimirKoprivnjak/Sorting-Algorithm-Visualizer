export const heapSort = (array: number[]) => {
  const n = array.length;
  const animations: number[][] = [];
  for (let i = Math.floor(n / 2 - 1); i >= 0; i--)
    maxHeapify(array, n, i, animations);
  for (let i = n - 1; i >= 0; i--) {
    animations.push([0, array[i]]);
    animations.push([i, array[0]]);
    let temp = array[0];
    array[0] = array[i];
    array[i] = temp;
    maxHeapify(array, i, 0, animations);
  }
  return animations;
};

const maxHeapify = (
  array: number[],
  n: number,
  i: number,
  animations: number[][]
) => {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  if (left < n && array[left] > array[largest]) largest = left;
  if (right < n && array[right] > array[largest]) largest = right;
  if (largest !== i) {
    // animations.push([0, array[i]]);
    // animations.push([i, array[0]]);
    let temp = array[i];
    array[i] = array[largest];
    array[largest] = temp;
    maxHeapify(array, n, largest, animations);
  }
};
