import { heapSort } from '../algorithms/heapSort';

export const heapSortAnimation = (array: number[], animationSpeed: number) => {
  const animations: number[][] = heapSort(array);
  console.log(animations);
  for (let i = 0; i < animations.length; i++) {
    const bars = document.getElementsByClassName('Chart_bar__1o6z0');
    const bar = bars[animations[i][0]] as HTMLElement;
    setTimeout(() => {
      bar.style.height = `${animations[i][1] * 0.7}px`;
      bar.innerHTML = array.length <= 20 ? `${animations[i][1]}` : '';
    }, i * animationSpeed);
  }
};
