import * as React from "react";

export function useSyncRefs<TType>(
  ...refs: (
    | React.MutableRefObject<TType | null>
    | ((instance: TType) => void)
    | null
  )[]
) {
  let cache = React.useRef(refs);

  React.useEffect(() => {
    cache.current = refs;
  }, [refs]);

  return React.useCallback(
    (value: TType) => {
      for (let ref of cache.current) {
        if (ref == null) {
          // console.log('ref is null');
          continue;
        }
        if (typeof ref === 'function') {
          // console.log('ref is a function. Returning called function');
          ref(value)
        } else {
          // console.log('returning the value: ', value);
          ref.current = value
        };
      }
    },
    [cache]
  );
};