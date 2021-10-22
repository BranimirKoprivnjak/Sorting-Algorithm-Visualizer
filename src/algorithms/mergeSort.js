// merge sort using recursion
export const mergeSort = array => {
  if (array.length <= 1) return array;

  const middle = Math.floor(array.length / 2);

  const leftHalf = array.slice(0, middle);
  const rightHalf = array.slice(middle);

  return merge(mergeSort(leftHalf), mergeSort(rightHalf));
};

const merge = (leftHalf, rightHalf) => {
  let resultArray = [],
    leftIndex = 0,
    rightIndex = 0;

  while (leftIndex < leftHalf.length && rightIndex < rightHalf.length) {
    if (leftHalf[leftIndex] < rightHalf[rightIndex])
      resultArray.push(leftHalf[leftIndex++]);
    else resultArray.push(rightHalf[rightIndex++]);
  }

  return resultArray
    .concat(leftHalf.slice(leftIndex))
    .concat(rightHalf.slice(rightIndex));
};
