import { Animation } from '../models/model';

export const quickSortAnimations = (array: number[]) => {
  const animations: Animation[] = [];
  if (array.length <= 1) return animations;
  quickSort(array, 0, array.length - 1, animations);
  return animations;
};

const quickSort = (
  array: number[],
  startIndex: number,
  endIndex: number,
  animations: Animation[]
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
  animations: Animation[]
) => {
  const middle = Math.floor((startIndex + endIndex) / 2);
  const pivot = array[middle];
  animations.push({ type: 'pivot', value: [[middle], [pivot]] });
  let i = startIndex,
    j = endIndex;
  while (i <= j) {
    while (array[i] < pivot) {
      // comparison
      animations.push({
        type: 'comparison',
        value: [[i], [j]],
      });
      i++;
    }
    while (array[j] > pivot) {
      // comparison
      animations.push({
        type: 'comparison',
        value: [[i], [j]],
      });
      j--;
    }
    // if we want to skip swap of the same element
    if (i === j) {
      animations.push({ type: 'comparison', value: [[i], [j]] });
      i++;
      j--;
    }
    if (i < j) {
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
      // comparison
      animations.push({ type: 'comparison', value: [[i], [j]] });
      // swap
      animations.push({
        type: 'swap',
        value: [
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
