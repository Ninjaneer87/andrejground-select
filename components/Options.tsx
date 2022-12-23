import * as React from 'react';
import useBoxPosition from '../hooks/useBoxPosition';
import { useSyncRefs } from '../hooks/useSyncRefs';
import { canFitBellow } from '../utils';
import { Option } from './Select';
import classes from './Options.module.scss';

type Props = {
  open: boolean;
  options: Option[];
  selected?: Option;
  selectedMulti?: Option[];
  selectOption: (option: Option) => void;
  hoveredIndex: number;
  setHoveredIndex: (index: number) => void;
};

const Options = React.forwardRef<HTMLLIElement, Props>(
  (
    { open, options, selected, selectedMulti, selectOption, hoveredIndex, setHoveredIndex },
    hoveredRef
  ) => {
    const { boxRef, boxPosition } = useBoxPosition<HTMLLIElement, number>(hoveredIndex);
    const rootRef = React.useRef<HTMLUListElement>(null);
    const syncBoxHoveredRefs = useSyncRefs(boxRef, hoveredRef);
    const [fitsBellow, setFitsBellow] = React.useState(true);

    React.useEffect(() => {
      if (open) {
        setFitsBellow(canFitBellow<HTMLUListElement>(rootRef.current));
        boxRef.current?.scrollIntoView({ block: 'center' });
      }
    }, [open]);

    return (
      <ul
        ref={rootRef}
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
