import {
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  TERTIARY_COLOR,
  QUATERNARY_COLOR,
} from '../config/config';
import { quickSortAnimations } from '../algorithms/quickSort';
import { Animation } from '../models/model';

export const quickSortAnimation = (array: number[], animationSpeed: number) => {
  const animations: Animation[] = quickSortAnimations(array);
  const bars = document.getElementsByClassName('Chart_bar__1o6z0');
  let timer = 0;
  const pivot = { index: 0, height: 0 };
  for (let i = 0; i < animations.length; i++) {
    const [valueOne, valueTwo] = animations[i].value;
    const [indexOne, heightOne] = valueOne;
    const [indexTwo, heightTwo] = valueTwo;
    const animationType = animations[i].type;
    if (animationType === 'pivot') {
      setTimeout(() => {
        if (pivot.height !== 0) {
          const bar = bars[pivot.index] as HTMLElement;
          bar.style.backgroundColor = PRIMARY_COLOR;
        }
        const [pivotIndex, pivotValue] = animations[i].value;
        [pivot.index] = pivotIndex;
        [pivot.height] = pivotValue;
        const pivotBar = bars[pivot.index] as HTMLElement;
        pivotBar.style.backgroundColor = QUATERNARY_COLOR;
      }, timer * animationSpeed);
      timer++;
    } else {
      const barOne = bars[indexOne] as HTMLElement;
      const barTwo = bars[indexTwo] as HTMLElement;
      const barOneStyle = barOne.style;
      const barTwoStyle = barTwo.style;
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
        // add timer if color is red, aka its swap
        setTimeout(() => {
          barOneStyle.height = `${heightOne * 0.7}px`;
          barTwoStyle.height = `${heightTwo * 0.7}px`;
          barOne.innerHTML = array.length <= 20 ? `${heightOne}` : '';
          barTwo.innerHTML = array.length <= 20 ? `${heightTwo}` : '';
        }, timer * animationSpeed);
        timer++;
        setTimeout(() => {
          // if we are comparing same values, any can become pivot
          let check = false;
          if (heightOne === pivot.height) {
            check = true;
            barOneStyle.backgroundColor = QUATERNARY_COLOR;
            pivot.index = indexOne;
          } else {
            barOneStyle.backgroundColor = PRIMARY_COLOR;
          }
          if (heightTwo === pivot.height && !check) {
            barTwoStyle.backgroundColor = QUATERNARY_COLOR;
            pivot.index = indexTwo;
          } else {
            barTwoStyle.backgroundColor = PRIMARY_COLOR;
          }
        }, timer * animationSpeed);
        timer++;
      }
      // if last animation triggers pivot coloring
      if (i === animations.length - 1) {
        setTimeout(() => {
          barOneStyle.backgroundColor = PRIMARY_COLOR;
          barTwoStyle.backgroundColor = PRIMARY_COLOR;
        }, timer * animationSpeed);
        timer++;
      }
    }
  }
  return array;
};