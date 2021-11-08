import {
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  TERTIARY_COLOR,
} from '../config/config';

export const resetColor = (
  timer: number,
  array: number[],
  bars: HTMLCollectionOf<Element>,
  animationSpeed: number
) => {
  timer++;
  for (let i = 0; i < array.length; i++) {
    setTimeout(() => {
      const bar = bars[i] as HTMLElement;
      bar.style.backgroundColor = PRIMARY_COLOR;
    }, timer * animationSpeed);
  }
  return timer;
};

export const comparison = (
  timer: number,
  barOneStyle: CSSStyleDeclaration,
  barTwoStyle: CSSStyleDeclaration,
  animationSpeed: number
) => {
  setTimeout(() => {
    barOneStyle.backgroundColor = SECONDARY_COLOR;
    barTwoStyle.backgroundColor = SECONDARY_COLOR;
  }, timer * animationSpeed);
  timer++;
  return timer;
};

export const beetweenAnimations = (
  timer: number,
  barOneStyle: CSSStyleDeclaration,
  barTwoStyle: CSSStyleDeclaration,
  animationSpeed: number,
  animationType: string,
  isMerge: boolean
) => {
  if (!isMerge)
    setTimeout(() => {
      barOneStyle.backgroundColor =
        animationType === 'swap' ? TERTIARY_COLOR : PRIMARY_COLOR;
      barTwoStyle.backgroundColor =
        animationType === 'swap' ? TERTIARY_COLOR : PRIMARY_COLOR;
    }, timer * animationSpeed);
  if (isMerge)
    setTimeout(() => {
      barOneStyle.backgroundColor = PRIMARY_COLOR;
      barTwoStyle.backgroundColor = PRIMARY_COLOR;
    }, timer * animationSpeed);
};
