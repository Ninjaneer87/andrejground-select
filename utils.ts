import { Option } from "./components/Select";

export function canFitBellow<T extends HTMLElement>(el: T): boolean {
  if(!el) return false;

  const parent = el.parentElement;
  const distanceFromBottom = window.innerHeight - (parent.offsetTop + parent.offsetHeight);
  const elHeight = el.offsetHeight;
  return elHeight < distanceFromBottom;
}

export function findNextIdxOnGivenKey(currentIdx: number, key: string, arr: Option[]): number {
  let filteredOptions = arr.slice(currentIdx + 1).filter(opt => opt.label.toLowerCase().startsWith(key.toLocaleLowerCase()));
  if(!filteredOptions.length) {
    filteredOptions = arr.filter(opt => opt.label.toLowerCase().startsWith(key.toLocaleLowerCase()));
  }
  const nextOption = filteredOptions[0];
  const nextHoverIdx = arr.indexOf(nextOption);

  return nextHoverIdx;
}