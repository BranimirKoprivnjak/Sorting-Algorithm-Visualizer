import { PRIMARY_COLOR, QUINARY_COLOR } from '../config/config';
import { bubbleSortOpt } from '../algorithms/bubbleSort';
import { Animation } from '../models/model';

import { resetColor, comparison, beetweenAnimations } from './helpers';

export const bubbleSortAnimation = (
  array: number[],
  animationSpeed: number
) => {
  const animations: Animation[] = bubbleSortOpt(array);
  console.log(animations);
  const bars = document.getElementsByClassName('Chart_bar__1o6z0');
  let timer = 0;
  for (let i = 0; i < animations.length; i++) {
    const animationType = animations[i].type;
    if (animationType !== 'flag') {
      const [valueOne, valueTwo] = animations[i].value;
      const [indexOne, heightOne] = valueOne;
      const [indexTwo, heightTwo] = valueTwo;
      const barOne = bars[indexOne] as HTMLElement;
      const barTwo = bars[indexTwo] as HTMLElement;
      const barOneStyle = barOne.style;
      const barTwoStyle = barTwo.style;

      const prevIndex = i - 1;
      if (i !== 0 && animations[prevIndex].type === 'flag') timer++;

      if (i !== 0 && animations[prevIndex].type === 'swap') timer++;

      if (animationType === 'comparison')
        timer = comparison(timer, barOneStyle, barTwoStyle, animationSpeed);

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
      // mark everything after flag as sorted
      const [valueOne] = animations[i].value;
      const [flag] = valueOne;
      for (let i = flag; i < array.length; i++) {
        if (i === 1) {
          setTimeout(() => {
            const bar = bars[0] as HTMLElement;
            bar.style.backgroundColor = QUINARY_COLOR;
          }, timer * animationSpeed);
        }
        const bar = bars[i] as HTMLElement;
        setTimeout(() => {
          bar.style.backgroundColor = QUINARY_COLOR;
        }, timer * animationSpeed);
      }
    }
  }
  // after sorting, reset color back to green
  timer = resetColor(timer, array, bars, animationSpeed);
  return [array, timer];
};
