// merge sort using recursion
export const mergeSortAnimations = array => {
  const animations = [];
  if (array.length <= 1) return array;
  const auxArray = array.slice();
  mergeSort(array, 0, array.length - 1, auxArray, animations);
  return animations;
};

const mergeSort = (array, startIndex, endIndex, auxArray, animations) => {
  if (startIndex === endIndex) return;
  const middleIndex = Math.floor((startIndex + endIndex) / 2);
  mergeSort(auxArray, startIndex, middleIndex, array, animations);
  mergeSort(auxArray, middleIndex + 1, endIndex, array, animations);
  merge(array, startIndex, middleIndex, endIndex, auxArray, animations);
};

const merge = (
  array,
  startIndex,
  middleIndex,
  endIndex,
  auxArray,
  animations
) => {
  let k = startIndex,
    i = startIndex,
    j = middleIndex + 1;
  while (i <= middleIndex && j <= endIndex) {
    animations.push([i, j]);
    if (auxArray[i] <= auxArray[j]) {
      animations.push([k, auxArray[i]]);
      array[k++] = auxArray[i++];
    } else {
      animations.push([k, auxArray[j]]);
      array[k++] = auxArray[j++];
    }
  }
  while (i <= middleIndex) {
    animations.push([i, i]);
    animations.push([k, auxArray[i]]);
    array[k++] = auxArray[i++];
  }
  while (j <= endIndex) {
    animations.push([j, j]);
    animations.push([k, auxArray[j]]);
    array[k++] = auxArray[j++];
  }
};
