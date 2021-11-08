import {
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  TERTIARY_COLOR,
  QUINARY_COLOR,
} from '../config/config';
import { bubbleSortOpt } from '../algorithms/bubbleSort';
import { Animation } from '../models/model';

export const bubbleSortAnimation = (
  array: number[],
  animationSpeed: number
) => {
  const animations: Animation[] = bubbleSortOpt(array);
  const bars = document.getElementsByClassName('Chart_bar__1o6z0');
  let timer = 0;
  for (let i = 0; i < animations.length; i++) {
    if (animations[i].type !== 'lastSwap') {
      const [valueOne, valueTwo] = animations[i].value;
      const [indexOne, heightOne] = valueOne;
      const [indexTwo, heightTwo] = valueTwo;
      const animationType = animations[i].type;
      const barOne = bars[indexOne] as HTMLElement;
      const barTwo = bars[indexTwo] as HTMLElement;
      const barOneStyle = barOne.style;
      const barTwoStyle = barTwo.style;

      if (i !== 0 && animations[i - 1].type === 'lastSwap') timer++;

      if (i !== 0 && animations[i - 1].type === 'swap') timer++;

      if (animationType === 'comparison') {
        setTimeout(() => {
          barOneStyle.backgroundColor = SECONDARY_COLOR;
          barTwoStyle.backgroundColor = SECONDARY_COLOR;
        }, timer * animationSpeed);
        timer++;
      }

      setTimeout(() => {
        barOneStyle.backgroundColor =
          animationType === 'swap' ? TERTIARY_COLOR : PRIMARY_COLOR;
        barTwoStyle.backgroundColor =
          animationType === 'swap' ? TERTIARY_COLOR : PRIMARY_COLOR;
      }, timer * animationSpeed);

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
        // timer++;
      }
    } else {
      const [valueOne] = animations[i].value;
      const [lastSwap] = valueOne;
      for (let i = lastSwap; i < array.length; i++) {
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
        // timer++;

        // if lastSwap === 1, paint 1st and 2nd element
      }
    }
  }
  timer++;
  for (let i = 0; i < array.length; i++) {
    setTimeout(() => {
      const bar = bars[i] as HTMLElement;
      bar.style.backgroundColor = PRIMARY_COLOR;
    }, timer * animationSpeed);
  }
  return [array, timer];
};
