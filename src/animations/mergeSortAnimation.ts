import { PRIMARY_COLOR, TERTIARY_COLOR, QUINARY_COLOR } from '../config/config';
import { mergeSortAnimations } from '../algorithms/mergeSort';
import { Animation } from '../models/model';

import { resetColor, comparison, beetweenAnimations } from './helpers';

export const mergeSortAnimation = (array: number[], animationSpeed: number) => {
  const animations: Animation[] = mergeSortAnimations(array);
  const bars = document.getElementsByClassName('Chart_bar__1o6z0');
  let timer = 0;
  let isLastMerge = false;
  for (let i = 0; i < animations.length; i++) {
    const animationType = animations[i].type;

    const prevIndex = i - 1;
    if (i !== 0 && animations[prevIndex].type === 'swap') timer++;

    if (animationType === 'flag') isLastMerge = true;
    if (animationType === 'comparison') {
      const [valueOne, valueTwo] = animations[i].value;
      const [indexOne] = valueOne;
      const [indexTwo] = valueTwo;
      const barOne = bars[indexOne] as HTMLElement;
      const barTwo = bars[indexTwo] as HTMLElement;
      const barOneStyle = barOne.style;
      const barTwoStyle = barTwo.style;

      timer = comparison(timer, barOneStyle, barTwoStyle, animationSpeed);

      beetweenAnimations(
        timer,
        barOneStyle,
        barTwoStyle,
        animationSpeed,
        animationType,
        true
      );
    }
    if (animationType === 'swap') {
      const [valueOne, valueTwo] = animations[i].value;
      const [index] = valueOne;
      const [height] = valueTwo;
      const bar = bars[index] as HTMLElement;
      const barStyle = bar.style;
      setTimeout(() => {
        barStyle.backgroundColor = TERTIARY_COLOR;
      }, timer * animationSpeed);

      if (parseInt(barStyle.height) !== Math.floor(height * 0.7)) timer++;

      setTimeout(() => {
        barStyle.height = `${height * 0.7}px`;
        bar.innerHTML = array.length <= 20 ? `${height}` : '';
      }, timer * animationSpeed);
      timer++;

      setTimeout(() => {
        barStyle.backgroundColor = PRIMARY_COLOR;
      }, timer * animationSpeed);
    }
    // if its last recursion call aka last merge, mark elements as sorted
    if (isLastMerge) {
      const [valueOne] = animations[i].value;
      const [index] = valueOne;
      const bar = bars[index] as HTMLElement;
      const barStyle = bar.style;
      setTimeout(() => {
        barStyle.backgroundColor = QUINARY_COLOR;
      }, timer * animationSpeed);
      timer++;
    }
  }
  // after sorting, reset color back to green
  timer = resetColor(timer, array, bars, animationSpeed);
  return [array, timer];
};
