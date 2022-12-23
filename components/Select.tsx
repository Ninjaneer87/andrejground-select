import * as React from 'react';
import { useMounted } from '../hooks/useMounted';
import { findNextIdxOnGivenKey } from '../utils';
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
  const rootRef = React.useRef<HTMLDivElement>(null);
  const [hoverIdx, setHoverIdx] = React.useState(0);
  const hoverRef = React.useRef<HTMLLIElement>(null);

  const selectOption = (option: Option) => {
    option !== value && onChange(option);
    setOpen(false);
  };

  React.useEffect(() => {
    open ? mount() : unmount(200);
    if(open) {
      const selectedIndex = options.indexOf(value);
      const newIndex = selectedIndex >= 0 ?  selectedIndex : 0;
      setHoverIdx(newIndex);
    }
  }, [open, mount, unmount]);

  const keyHandler: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    switch (e.code) {
      case 'Enter':
      case 'Space': {
        setOpen((prev) => !prev);
        if (open && hoverIdx !== undefined)
          selectOption(options[hoverIdx]);
        break;
      }

      case 'ArrowUp':
      case 'ArrowDown': {
        if (!open) {
          setOpen(true);
          break;
        }

        const nextHoverIdx = hoverIdx + (e.code === 'ArrowDown' ? 1 : -1);
        if (nextHoverIdx >= 0 && nextHoverIdx < options.length) {
          setHoverIdx(nextHoverIdx);
          setTimeout(() => hoverRef.current?.scrollIntoView({ block: 'nearest' }), 0);
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
        const nextHoverIdx = findNextIdxOnGivenKey(hoverIdx, e.key, options)
        if(nextHoverIdx >= 0) {
          setHoverIdx(nextHoverIdx);
          setTimeout(() => hoverRef.current?.scrollIntoView({ block: 'nearest' }), 0);
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
      <span className={classes.value}>
        {value?.label || 'Select option...'}
      </span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onChange(undefined);
        }}
        onKeyDown={e => e.stopPropagation()}
        disabled={!value}
        className={`
          ${classes['clear-btn']} 
          ${value ? 'blur-in' : 'blur-out'}
        `}
      >
        &times;
      </button>
      <div className={classes.divider} />
      <div
        className={`
          ${classes.caret} 
          ${open ? classes['caret--open'] : ''} 
        `}
      />

      {mounted ? (
        <SelectOptions
          options={options}
          open={open}
          value={value}
          selectOption={selectOption}
          hoverIdx={hoverIdx}
          setHoverIdx={setHoverIdx}
          ref={hoverRef}
        />
      ) : null}
    </div>
  );
};

export default Select;
