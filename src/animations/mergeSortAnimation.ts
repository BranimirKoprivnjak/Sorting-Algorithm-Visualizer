import {
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  TERTIARY_COLOR,
  QUINARY_COLOR,
} from '../config/config';
import { mergeSortAnimations } from '../algorithms/mergeSort';
import { Animation } from '../models/model';

export const mergeSortAnimation = (array: number[], animationSpeed: number) => {
  const animations: Animation[] = mergeSortAnimations(array);
  const bars = document.getElementsByClassName('Chart_bar__1o6z0');
  let timer = 0;
  let check = false;
  for (let i = 0; i < animations.length; i++) {
    const animationType = animations[i].type;

    if (i !== 0 && animations[i - 1].type === 'swap') timer++;

    if (animationType === 'flag') check = true;
    if (animationType === 'comparison') {
      const [valueOne, valueTwo] = animations[i].value;
      const [indexOne] = valueOne;
      const [indexTwo] = valueTwo;
      const barOne = bars[indexOne] as HTMLElement;
      const barTwo = bars[indexTwo] as HTMLElement;
      const barOneStyle = barOne.style;
      const barTwoStyle = barTwo.style;
      setTimeout(() => {
        barOneStyle.backgroundColor = SECONDARY_COLOR;
        barTwoStyle.backgroundColor = SECONDARY_COLOR;
      }, timer * animationSpeed);
      timer++;
      setTimeout(() => {
        barOneStyle.backgroundColor = PRIMARY_COLOR;
        barTwoStyle.backgroundColor = PRIMARY_COLOR;
      }, timer * animationSpeed);
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
      //timer++;
    }
    if (check) {
      const [valueOne, valueTwo] = animations[i].value;
      const [index] = valueOne;
      const [height] = valueTwo;
      const bar = bars[index] as HTMLElement;
      const barStyle = bar.style;
      setTimeout(() => {
        barStyle.backgroundColor = QUINARY_COLOR;
      }, timer * animationSpeed);
      timer++;
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
