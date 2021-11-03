export interface quickAnimation {
  type: string;
  position: number[][];
}

export const quickSortAnimations = (array: number[]) => {
  const animations: quickAnimation[] = [];
  if (array.length <= 1) return animations;
  quickSort(array, 0, array.length - 1, animations);
  return animations;
};

const quickSort = (
  array: number[],
  startIndex: number,
  endIndex: number,
  animations: quickAnimation[]
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
  animations: quickAnimation[]
) => {
  const middle = Math.floor((startIndex + endIndex) / 2);
  //animations.push({ type: 'pivot', position: [[middle]] });
  const pivot = array[middle];
  let i = startIndex,
    j = endIndex;
  while (i <= j) {
    while (array[i] < pivot) {
      // comparison
      animations.push({
        type: 'comparison',
        position: [[i], [j]],
      });
      i++;
    }
    while (array[j] > pivot) {
      // comparison
      animations.push({
        type: 'comparison',
        position: [[i], [j]],
      });
      j--;
    }
    if (i <= j) {
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
      // swap
      animations.push({
        type: 'swap',
        position: [
          [i, array[i]],
          [j, temp],
        ],
      });
      i++;
      j--;
    }
  }
  return i;
};
