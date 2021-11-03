import { mergeSortAnimations } from '../algorithms/mergeSort';
import { mergeAnimation } from '../algorithms/mergeSort';

export const mergeSortAnimation = (array: number[], animationSpeed: number) => {
  const animations: mergeAnimation[] = mergeSortAnimations(array);
  console.log(animations);

  let timer: number = 0;
  const bars = document.getElementsByClassName('Chart_bar__1o6z0');
  for (let i = 0; i < animations.length; i++) {
    if (animations[i].type === 'comparison') {
      const barOne = bars[animations[i].position[0][0]] as HTMLElement;
      const barTwo = bars[animations[i].position[1][0]] as HTMLElement;
      setTimeout(() => {
        barOne.style.backgroundColor = 'blue';
        barTwo.style.backgroundColor = 'blue';
      }, timer * animationSpeed);
      timer++;
      setTimeout(() => {
        barOne.style.backgroundColor = '#008060';
        barTwo.style.backgroundColor = '#008060';
      }, timer * animationSpeed);
    }
    if (animations[i].type === 'swap') {
      const bar = bars[animations[i].position[0][0]] as HTMLElement;
      setTimeout(() => {
        bar.style.backgroundColor = 'red';
      }, timer * animationSpeed);
      timer++;
      setTimeout(() => {
        bar.style.height = `${animations[i].position[1][0] * 0.7}px`;
        bar.innerHTML =
          array.length <= 20 ? `${animations[i].position[1][0]}` : '';
      }, timer * animationSpeed);
      timer++;
      setTimeout(() => {
        bar.style.backgroundColor = '#008060';
      }, timer * animationSpeed);
      timer++;
    }
  }

  // for (let i = 0; i < animations.length; i++) {
  //   const bars = document.getElementsByClassName('Chart_bar__1o6z0');
  //   const bar = bars[animations[i].position[0]] as HTMLElement;
  //   if (animations[i].type === 'divide') {
  //     setTimeout(() => {
  //       bar.style.backgroundColor = 'purple';
  //       setTimeout(() => (bar.style.backgroundColor = 'aquamarine'), i * 15);
  //     }, i * animationSpeed);
  //   }
  // }
};
