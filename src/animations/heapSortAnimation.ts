import {
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  TERTIARY_COLOR,
} from '../config/config';
import { heapSort } from '../algorithms/heapSort';
import { Animation } from '../models/model';

export const heapSortAnimation = (array: number[], animationSpeed: number) => {
  const animations: Animation[] = heapSort(array);
  const bars = document.getElementsByClassName('Chart_bar__1o6z0');
  let timer = 0,
    check = 0;
  for (let i = 0; i < animations.length; i++) {
    const [valueOne, valueTwo] = animations[i].value;
    const [indexOne, heightOne] = valueOne;
    const [indexTwo, heightTwo] = valueTwo;
    const animationType = animations[i].type;
    const barOne = bars[indexOne] as HTMLElement;
    const barTwo = bars[indexTwo] as HTMLElement;
    const barOneStyle = barOne.style;
    const barTwoStyle = barTwo.style;
    if (check !== indexOne) {
      check = indexOne;
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
      // remove red color, timer++
      setTimeout(() => {
        barOneStyle.backgroundColor = PRIMARY_COLOR;
        barTwoStyle.backgroundColor = PRIMARY_COLOR;
      }, timer * animationSpeed);
      timer++;
    }
  }
  return [array, timer];
};
