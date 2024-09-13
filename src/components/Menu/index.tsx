import { useSelector } from 'react-redux';
import classes from './styles.module.css';
import { RootState } from '@/store/store';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Accordion } from '@/components/Accordion';
import { MenuAccordionItem } from '@/components/Accordion/MenuAccordionItem';
import { formatCurrency } from '@/utils/formatCurrency';
import useIsInViewport from '@/hooks/useIsInViewPort';
export function Menu () {
  const { menu, detail } = useSelector.withTypes<RootState>()((state: RootState) => state.restaurant);

  const refs: MutableRefObject<(HTMLDivElement | null)[]> = useRef([]);

  const setRef = (index: number) => (element: HTMLDivElement | null) => {
    refs.current[index] = element;
  };

  const [isSticky, setIsSticky] = useState(false);
  const stickyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (stickyRef.current) {
        setIsSticky(window.scrollY - 82 >= stickyRef.current.getBoundingClientRect().top + window.scrollY);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToIndex = (index: number) => {
    if (refs.current[index]) {
      const yOffset = -62;
      const y = refs.current[index].getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };
  const isInViewport = useIsInViewport(refs);


  return (
    <div className={classes.wrapper}>
      <div
        className={`${classes["scroll-box"]} mb-3 ${isSticky ? classes["is-sticky"] : ""}`} ref={stickyRef}
      >
        {menu?.sections.map((section, index) => (
          <button
            key={section.id}
            type='button'
            onClick={() => scrollToIndex(index)}
            className={`${classes["section-button"]} ${isInViewport[index] ? classes.active : ""}`}
          >
            <img src={section.images[0].image} className={classes["section-button__img"]} />
            <span>
              {section.name}
            </span>

          </button>
        ))}
      </div>

      {detail && menu?.sections.map((section, index) => (
        <div key={section.id} ref={setRef(index)}>
          <Accordion title={section.name}>
            {section.items.map(item => (
              <MenuAccordionItem key={item.id} menuItem={item} price={formatCurrency(item.price, detail.locale, detail.ccy)} />
            ))}
          </Accordion>

        </div>
      ))}
    </div>
  );
}