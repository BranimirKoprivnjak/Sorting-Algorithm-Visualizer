import { heapSort } from '../algorithms/heapSort';
import { heapAnimation } from '../algorithms/heapSort';

export const heapSortAnimation = (array: number[], animationSpeed: number) => {
  const animations: heapAnimation[] = heapSort(array);
  console.log(animations);
  let timer: number = 0;

  const bars = document.getElementsByClassName('Chart_bar__1o6z0');
  for (let i = 0; i < animations.length; i++) {
    const barOne = bars[animations[i].position[0][0]] as HTMLElement;
    const barTwo = bars[animations[i].position[1][0]] as HTMLElement;
    setTimeout(() => {
      barOne.style.backgroundColor = 'blue';
      barTwo.style.backgroundColor = 'blue';
    }, timer * animationSpeed);
    timer++;
    setTimeout(() => {
      barOne.style.backgroundColor =
        animations[i].type === 'swap' ? 'red' : '#008060';
      barTwo.style.backgroundColor =
        animations[i].type === 'swap' ? 'red' : '#008060';
    }, timer * animationSpeed);
    if (animations[i].type === 'swap') {
      timer++;
      // add timer if color is red, aka its swap
      setTimeout(() => {
        barOne.style.height = `${animations[i].position[0][1] * 0.7}px`;
        barTwo.style.height = `${animations[i].position[1][1] * 0.7}px`;
        barOne.innerHTML =
          array.length <= 20 ? `${animations[i].position[0][1]}` : '';
        barTwo.innerHTML =
          array.length <= 20 ? `${animations[i].position[1][1]}` : '';
      }, timer * animationSpeed);
      timer++;
      // remove red color, timer++
      setTimeout(() => {
        barOne.style.backgroundColor = '#008060';
        barTwo.style.backgroundColor = '#008060';
      }, timer * animationSpeed);
      timer++;
      // sorted bars -> purple color
    }
  }
  // for (let i = 0; i < animations.length; i++) {
  //   const bars = document.getElementsByClassName('Chart_bar__1o6z0');
  //   const bar = bars[animations[i][0]] as HTMLElement;
  //   setTimeout(() => {
  //     bar.style.height = `${animations[i][1] * 0.7}px`;
  //     bar.innerHTML = array.length <= 20 ? `${animations[i][1]}` : '';
  //   }, i * animationSpeed);
  // }
};
