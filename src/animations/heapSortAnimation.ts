import { PRIMARY_COLOR, QUINARY_COLOR } from '../config/config';
import { heapSort } from '../algorithms/heapSort';
import { Animation } from '../models/model';

import { resetColor, comparison, beetweenAnimations } from './helpers';

export const heapSortAnimation = (array: number[], animationSpeed: number) => {
  const animations: Animation[] = heapSort(array);
  const bars = document.getElementsByClassName('Chart_bar__1o6z0');
  let timer = 0,
    comparedElementIndex = 0;
  for (let i = 0; i < animations.length; i++) {
    if (animations[i].type !== 'sorted') {
      const [valueOne, valueTwo] = animations[i].value;
      const [indexOne, heightOne] = valueOne;
      const [indexTwo, heightTwo] = valueTwo;
      const animationType = animations[i].type;
      const barOne = bars[indexOne] as HTMLElement;
      const barTwo = bars[indexTwo] as HTMLElement;
      const barOneStyle = barOne.style;
      const barTwoStyle = barTwo.style;

      const prevIndex = i - 1;
      if (i !== 0 && animations[prevIndex].type === 'sorted') timer++;

      if (i !== 0 && animations[prevIndex].type === 'swap') timer++;

      if (comparedElementIndex !== indexOne) {
        comparedElementIndex = indexOne;
        timer = comparison(timer, barOneStyle, barTwoStyle, animationSpeed);
      }

      beetweenAnimations(
        timer,
        barOneStyle,
        barTwoStyle,
        animationSpeed,
        animationType,
        false
      );

      if (animationType === 'swap') {
        timer++;
        setTimeout(() => {
          barOneStyle.height = `${heightOne * 0.7}px`;
          barTwoStyle.height = `${heightTwo * 0.7}px`;
          barOne.innerHTML = array.length <= 20 ? `${heightOne}` : '';
          barTwo.innerHTML = array.length <= 20 ? `${heightTwo}` : '';
        }, timer * animationSpeed);
        timer++;
        setTimeout(() => {
          barOneStyle.backgroundColor = PRIMARY_COLOR;
          barTwoStyle.backgroundColor = PRIMARY_COLOR;
        }, timer * animationSpeed);
      }
    } else {
      // mark removed item from max-heap as sorted
      const [valueOne] = animations[i].value;
      const [sortedIndex] = valueOne;
      setTimeout(() => {
        const bar = bars[sortedIndex] as HTMLElement;
        bar.style.backgroundColor = QUINARY_COLOR;
      }, timer * animationSpeed);
    }
  }
  // at the end, color 1st element as sorted
  setTimeout(() => {
    const bar = bars[0] as HTMLElement;
    bar.style.backgroundColor = QUINARY_COLOR;
  }, timer * animationSpeed);

  // after sorting, reset color back to green
  timer = resetColor(timer, array, bars, animationSpeed);
  return [array, timer];
};
