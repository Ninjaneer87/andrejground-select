import * as React from 'react';
import { useMounted } from '../hooks/useMounted';
import { findNextIndexForGivenChar } from '../utils';
import classes from './Select.module.scss';
import Options from './Options';

export type Option = {
  label: string;
  value: string | number;
};

type Props = {
  options: Option[];
  selected: Option[];
  onChange: (selected: Option[]) => void;
};

const MultiSelect = ({ selected, onChange, options }: Props) => {
  const [open, setOpen] = React.useState(false);
  const { mounted, mount, unmount } = useMounted(false);
  const [hoveredIndex, setHoveredIndex] = React.useState(0);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const hoveredRef = React.useRef<HTMLLIElement>(null);
  
  const selectOption = (option: Option) => {
    selected.includes(option) 
      ? onChange(selected.filter(opt => opt !== option))
      : onChange([...selected, option]);
    setOpen(false);
  };
  
  const clearOptions = () => {
    onChange([]);
    setTimeout(() => rootRef.current?.focus());
  }

  const removeOption = (option: Option) => {
    selectOption(option);
    setTimeout(() => rootRef.current?.focus());
  };

  React.useEffect(() => {
    open ? mount() : unmount(200);
    if(open) setHoveredIndex(Math.max(options.indexOf(selected[0]), 0));
  }, [open, mount, unmount]);
  
  const keyHandler: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    switch (e.code) {
      case 'Enter':
      case 'Space': {
        setOpen((prev) => !prev);
        if (open) selectOption(options[hoveredIndex]);
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
        onChange([]);
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
      <span className={classes['multi-value']}>
        {selected?.length 
          ? selected.map(opt => (
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeOption(opt);
              }}
              onKeyDown={e => e.stopPropagation()}
              className={classes['option-badge']}
            >
              {opt.label}
              <span className={classes['remove-span']}>&times;</span>
            </button> 
          ))
          : 'Select options'}
      </span>

      <button
        onClick={(e) => {
          e.stopPropagation();
          clearOptions();
        }}
        onKeyDown={e => e.stopPropagation()}
        disabled={!selected.length}
        className={`${classes['clear-btn']} ${!!selected.length ? 'blur-in' : 'blur-out'}`}
      >
        &times;
      </button>

      <div className={classes.divider} />
      
      <div className={`${classes.caret} ${open ? classes['caret--open'] : ''}`} />

      {mounted ? (
        <Options
          options={options}
          open={open}
          selectedMulti={selected}
          selectOption={selectOption}
          hoveredIndex={hoveredIndex}
          setHoveredIndex={setHoveredIndex}
          ref={hoveredRef}
        />
      ) : null}
    </div>
  );
};

export default MultiSelect;