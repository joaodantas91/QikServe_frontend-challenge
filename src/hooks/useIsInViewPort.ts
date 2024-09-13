import { useEffect, useState, useCallback, MutableRefObject } from 'react';

function useIsInViewport (refs: MutableRefObject<(HTMLDivElement | null)[]>): boolean[] {
  const [isInViewport, setIsInViewport] = useState<boolean[]>(
    Array(refs.current.length).fill(false)
  );

  const checkIsInViewport = useCallback(() => {
    let updatedInViewport: boolean[] = Array(refs.current.length).fill(false);

    for (let index = 0; index < refs.current.length; index++) {
      if (refs.current[index]) {
        const rect = refs.current[index]!.getBoundingClientRect();

        const isInViewport = (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
        if (index > 0 && index < refs.current.length - 1 && !isInViewport && updatedInViewport.every(item => !item)) {
          updatedInViewport[0] = true;
        }

        updatedInViewport[index] = isInViewport;

        if (index > 0 && isInViewport) {
          updatedInViewport = updatedInViewport.fill(false, 0, index)
        }
      }

    }

    setIsInViewport(updatedInViewport);
  }, [refs]);

  useEffect(() => {
    checkIsInViewport(); // Check on mount
    window.addEventListener('scroll', checkIsInViewport);
    window.addEventListener('resize', checkIsInViewport);

    return () => {
      window.removeEventListener('scroll', checkIsInViewport);
      window.removeEventListener('resize', checkIsInViewport);
    };
  }, [refs, checkIsInViewport]);

  return isInViewport;
}

export default useIsInViewport;