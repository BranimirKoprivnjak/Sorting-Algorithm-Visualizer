import { Animation } from '../models/model';

export const mergeSortAnimations = (array: number[]) => {
  const animations: Animation[] = [];
  if (array.length <= 1) return animations;
  const auxArray = array.slice();
  mergeSort(array, 0, array.length - 1, auxArray, animations);
  return animations;
};

const mergeSort = (
  array: number[],
  startIndex: number,
  endIndex: number,
  auxArray: number[],
  animations: Animation[]
) => {
  if (startIndex === endIndex) return;
  const middleIndex = Math.floor((startIndex + endIndex) / 2);
  mergeSort(auxArray, startIndex, middleIndex, array, animations);
  mergeSort(auxArray, middleIndex + 1, endIndex, array, animations);
  merge(array, startIndex, middleIndex, endIndex, auxArray, animations);
};

const merge = (
  array: number[],
  startIndex: number,
  middleIndex: number,
  endIndex: number,
  auxArray: number[],
  animations: Animation[]
) => {
  let k = startIndex,
    i = startIndex,
    j = middleIndex + 1;
  while (i <= middleIndex && j <= endIndex) {
    animations.push({ type: 'comparison', value: [[i], [j]] });
    if (auxArray[i] <= auxArray[j]) {
      animations.push({ type: 'swap', value: [[k], [auxArray[i]]] });
      array[k++] = auxArray[i++];
    } else {
      animations.push({ type: 'swap', value: [[k], [auxArray[j]]] });
      array[k++] = auxArray[j++];
    }
  }
  while (i <= middleIndex) {
    animations.push({ type: 'comparison', value: [[i], [i]] });
    animations.push({ type: 'swap', value: [[k], [auxArray[i]]] });
    array[k++] = auxArray[i++];
  }
  while (j <= endIndex) {
    animations.push({ type: 'comparison', value: [[j], [j]] });
    animations.push({ type: 'swap', value: [[k], [auxArray[j]]] });
    array[k++] = auxArray[j++];
  }
};
