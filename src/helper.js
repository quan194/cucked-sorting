function swap(animations, array, indexA, indexB) {
  [array[indexA], array[indexB]] = [array[indexB], array[indexA]];
  animations.push([indexA, indexB]);
}