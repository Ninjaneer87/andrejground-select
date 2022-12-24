import { Option } from './components/Select';

export function canFitBellow(rootEl: HTMLElement, el: HTMLElement): boolean {
  if (!el) return false;

  const elHeight = el.offsetHeight;
  const distanceFromBottom = document.body.offsetHeight - (rootEl.offsetTop + rootEl.offsetHeight);

  return elHeight < distanceFromBottom;
}

export function findNextIndexForGivenChar(
  currentIndex: number,
  char: string,
  options: Option[]
): number {
  const charFilter = (opt: Option) => opt.label.toLowerCase().startsWith(char.toLowerCase());

  let filteredOptions = options.slice(currentIndex + 1).filter(charFilter)
  if (!filteredOptions.length) {
    filteredOptions = options.filter(charFilter)
  }
  const nextOption = filteredOptions[0];
  const nextHoverIndex = options.indexOf(nextOption);

  return nextHoverIndex;
}
