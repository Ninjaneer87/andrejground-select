import * as React from 'react';
import { useMounted } from '../hooks/useMounted';
import { findNextIndexForGivenChar } from '../utils';
import classes from './Select.module.scss';
import SelectOptions from './SelectOptions';

export type Option = {
  label: string;
  value: string | number;
};

type SelectProps = {
  options: Option[];
  value?: Option;
  onChange: (value: Option | undefined) => void;
};

const Select = ({ value, onChange, options }: SelectProps) => {
  const [open, setOpen] = React.useState(false);
  const { mounted, mount, unmount } = useMounted(false);
  const [hoveredIndex, setHoveredIndex] = React.useState(0);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const hoveredRef = React.useRef<HTMLLIElement>(null);

  const selectOption = (option: Option) => {
    option !== value && onChange(option);
    setOpen(false);
  };

  const clearOption = () => {
    onChange(undefined);
    setTimeout(() => rootRef.current?.focus());
  }

  React.useEffect(() => {
    open ? mount() : unmount(200);
    if(open) setHoveredIndex(Math.max(options.indexOf(value), 0));
  }, [open, mount, unmount]);

  const keyHandler: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    switch (e.code) {
      case 'Enter':
      case 'Space': {
        setOpen((prev) => !prev);
        if (open && hoveredIndex !== undefined)
          selectOption(options[hoveredIndex]);
        break;
      }

      case 'ArrowUp':
      case 'ArrowDown': {
        if (!open) {
          setOpen(true);
          break;
        }

        const nextHoveredIndex = hoveredIndex + (e.code === 'ArrowDown' ? 1 : -1);
        if (nextHoveredIndex >= 0 && nextHoveredIndex < options.length) {
          setHoveredIndex(nextHoveredIndex);
          setTimeout(() => hoveredRef.current?.scrollIntoView({ block: 'nearest' }), 0);
        }
        break;
      }

      case 'Delete': {
        onChange(undefined);
        break;
      }

      case 'Escape': {
        setOpen(false);
        break;
      }

      default: {
        const nextHoveredIndex = findNextIndexForGivenChar(hoveredIndex, e.key, options)
        if(nextHoveredIndex >= 0) {
          setHoveredIndex(nextHoveredIndex);
          setTimeout(() => hoveredRef.current?.scrollIntoView({ block: 'nearest' }), 0);
        }
        break;
      }
    }
  };


  return (
    <div
      ref={rootRef}
      onKeyDown={keyHandler}
      className={classes.root}
      tabIndex={0}
      onClick={() => setOpen((prev) => !prev)}
      onBlur={() => setOpen(false)}
    >
      <span className={classes.value}>{value?.label || 'Select option...'}</span>

      <button
        onClick={(e) => {
          e.stopPropagation();
          clearOption();
        }}
        onKeyDown={e => e.stopPropagation()}
        disabled={!value}
        className={`${classes['clear-btn']} ${value ? 'blur-in' : 'blur-out'}`}
      >
        &times;
      </button>

      <div className={classes.divider} />
      
      <div className={`${classes.caret} ${open ? classes['caret--open'] : ''}`} />

      {mounted ? (
        <SelectOptions
          options={options}
          open={open}
          value={value}
          selectOption={selectOption}
          hoveredIndex={hoveredIndex}
          setHoveredIndex={setHoveredIndex}
          ref={hoveredRef}
        />
      ) : null}
    </div>
  );
};

export default Select;
