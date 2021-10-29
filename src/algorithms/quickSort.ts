export const quickSortAnimations = (array: number[]) => {
  const animations: number[][] = [];
  if (array.length <= 1) return animations;
  quickSort(array, 0, array.length - 1, animations);
  return animations;
};

const quickSort = (
  array: number[],
  startIndex: number,
  endIndex: number,
  animations: number[][]
) => {
  let index,
    i = startIndex,
    j = endIndex;
  index = partition(array, i, j, animations);
  if (i < index - 1) quickSort(array, i, index - 1, animations);
  if (index < j) quickSort(array, index, j, animations);
  return array;
};

const partition = (
  array: number[],
  startIndex: number,
  endIndex: number,
  animations: number[][]
) => {
  const pivot = array[Math.floor((startIndex + endIndex) / 2)];
  let i = startIndex,
    j = endIndex;
  while (i <= j) {
    while (array[i] < pivot) i++;
    while (array[j] > pivot) j--;
    if (i <= j) {
      animations.push([i, array[j]]);
      animations.push([j, array[i]]);
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
      i++;
      j--;
    }
  }
  return i;
};
