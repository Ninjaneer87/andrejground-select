import * as React from 'react';
import useBoxPosition from '../hooks/useBoxPosition';
import { useSyncRefs } from '../hooks/useSyncRefs';
import { Option } from '../types/option.type';
import { canFitBellow } from '../utils';
import classes from './Options.module.scss';

type Props = {
  open: boolean;
  options: Option[];
  selected?: Option;
  selectedMulti?: Option[];
  selectOption: (option: Option) => void;
  hoveredIndex: number;
  setHoveredIndex: (index: number) => void;
  rootEl: HTMLElement;
};

const Options = React.forwardRef<HTMLLIElement, Props>(
  (
    {
      open,
      options,
      selected,
      selectedMulti,
      selectOption,
      hoveredIndex,
      setHoveredIndex,
      rootEl,
    },
    hoveredRef
  ) => {
    const { boxRef, boxPosition } = useBoxPosition<HTMLLIElement, number>(hoveredIndex);
    const listRef = React.useRef<HTMLUListElement>(null);
    const syncBoxHoveredRefs = useSyncRefs(boxRef, hoveredRef);
    const [fitsBellow, setFitsBellow] = React.useState(true);

    React.useEffect(() => {
      if (open && listRef.current) {
        setFitsBellow(canFitBellow<HTMLElement, HTMLUListElement>(rootEl, listRef.current));
        boxRef.current?.scrollIntoView({ block: 'nearest' });
      }
    }, [open, boxRef, rootEl]);

    return (
      <ul
        ref={listRef}
        className={`
          ${classes.options} 
          ${classes[`options--${fitsBellow ? 'bellow' : 'above'}`]}
          ${open ? 'blur-in' : 'blur-out'}
        `}
        style={boxPosition}
      >
        {options.map((option, i) => (
          <li
            key={option.value}
            onClick={(e) => {
              e.stopPropagation();
              selectOption(option);
            }}
            onMouseEnter={() => setHoveredIndex(i)}
            {...(i === hoveredIndex && { ref: syncBoxHoveredRefs })}
            className={`
              ${classes.option} 
              ${option === selected ? classes['option--selected'] : ''}
              ${selectedMulti && selectedMulti.includes(option) ? classes['option--selected'] : ''}
            `}
          >
            {option.label}
          </li>
        ))}
      </ul>
    );
  }
);

export default Options;
