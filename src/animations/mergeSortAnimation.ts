import { mergeSortAnimations } from '../algorithms/mergeSort';
import { Animation } from '../models/model';

export const mergeSortAnimation = (array: number[], animationSpeed: number) => {
  const animations: Animation[] = mergeSortAnimations(array);
  for (let i = 0; i < animations.length; i++) {
    const bars = document.getElementsByClassName('Chart_bar__1o6z0');
    const bar = bars[animations[i].position[0]] as HTMLElement;
    if (animations[i].type === 'divide') {
      setTimeout(() => {
        bar.style.backgroundColor = 'purple';
        setTimeout(() => (bar.style.backgroundColor = 'aquamarine'), i * 15);
      }, i * animationSpeed);
    }
  }
};
