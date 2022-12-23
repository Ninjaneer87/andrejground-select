import * as React from 'react';
import useBoxPosition from '../hooks/useBoxPosition';
import { useSyncRefs } from '../hooks/useSyncRefs';
import { canFitBellow } from '../utils';
import { Option } from './Select';
import classes from './SelectOptions.module.scss';

type Props = {
  open: boolean;
  options: Option[];
  value?: Option;
  selectOption: (option: Option) => void;
  hoverIdx: number;
  setHoverIdx: (index: number) => void;
};

const SelectOptions = React.forwardRef<HTMLLIElement, Props>(
  (
    { open, options, value, selectOption, hoverIdx, setHoverIdx },
    hoverRef
  ) => {
    const { boxRef, boxPosition } = useBoxPosition<HTMLLIElement, number>(hoverIdx);
    const selectedRef = React.useRef<HTMLLIElement>(null);
    const rootRef = React.useRef<HTMLUListElement>(null);
    const hoverActiveRef = useSyncRefs(hoverRef, boxRef);
    const hoverActiveSelectedRef = useSyncRefs(hoverRef, boxRef, selectedRef);
    const [fitsBellow, setFitsBellow] = React.useState(true);

    React.useEffect(() => {
      if (open) {
        setFitsBellow(canFitBellow<HTMLUListElement>(rootRef.current));
        selectedRef.current?.scrollIntoView({ block: 'center' });
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
            onMouseEnter={() => setHoverIdx(i)}
            {...(option === value && { ref: selectedRef })}
            {...(i === hoverIdx && { ref: hoverActiveRef })}
            {...(i === hoverIdx && option === value && { ref: hoverActiveSelectedRef })}
            className={`
              ${classes.option} 
              ${option === value ? classes['option--selected'] : ''}
            `}
          >
            {option.label}
          </li>
        ))}
      </ul>
    );
  }
);

export default SelectOptions;
