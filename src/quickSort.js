function swap(animations, array, indexA, indexB) {
    [array[indexA], array[indexB]] = [array[indexB], array[indexA]];
    animations.push([indexA, indexB]);
  }

export function getQuickSortAnimations(array) {
  const animations = [];
  let auxiliaryArray = array.slice();
  doQuickSort(animations, auxiliaryArray, 0, auxiliaryArray.length - 1);
  console.log(animations);
  return animations
}

export function quickSortPartition(animations, auxiliaryArray, start, end) {
  var pivotValue = auxiliaryArray[end];
  var pivotIndex = start;
  for (let i = start; i < auxiliaryArray.length; i++) {
    if (auxiliaryArray[i] < pivotValue) {
      swap(animations, auxiliaryArray, i, pivotIndex);
      pivotIndex++
    }
  }
  swap(animations, auxiliaryArray, pivotIndex, end);
  return pivotIndex;
}

export function doQuickSort(animations, auxiliaryArray, start, end) {
  if (start >= end) {
    return auxiliaryArray;
  } else {
    let index = quickSortPartition(animations, auxiliaryArray, start, end);
    doQuickSort(animations, auxiliaryArray, start, index - 1);
    doQuickSort(animations, auxiliaryArray, index + 1, end);
  }
}