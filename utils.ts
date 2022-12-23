import { Option } from "./components/Select";

export function canFitBellow<T extends HTMLElement>(el: T): boolean {
  if(!el) return false;

  const parent = el.parentElement;
  const distanceFromBottom = document.body.offsetHeight - (parent.offsetTop + parent.offsetHeight);
  const elHeight = el.offsetHeight;
  console.log({elHeight})
  console.log({distanceFromBottom})
  
  return elHeight < distanceFromBottom;
}

export function findNextIndexForGivenChar(currentIndex: number, char: string, options: Option[]): number {
  let filteredOptions = options.slice(currentIndex + 1).filter(opt => opt.label.toLowerCase().startsWith(char.toLocaleLowerCase()));
  if(!filteredOptions.length) {
    filteredOptions = options.filter(opt => opt.label.toLowerCase().startsWith(char.toLocaleLowerCase()));
  }
  const nextOption = filteredOptions[0];
  const nextHoverIndex = options.indexOf(nextOption);

  return nextHoverIndex;
}