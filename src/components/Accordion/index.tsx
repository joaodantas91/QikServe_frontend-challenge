import { ReactNode, useRef, useState } from "react";
import classes from './styles.module.css';

interface AccordionProps {
  title: string;
  children: ReactNode;
}

export function Accordion ({ title, children }: AccordionProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(true);

  const toggleAccordion = () => {
    if (contentRef.current) {
      if (isOpen) {
        contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
        setTimeout(() => {
          contentRef.current!.style.height = '0';
        }, 0)
      } else {
        contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
      }

      setIsOpen(prev => !prev);
    }
  };

  return (
    <div className={classes.wrapper}>
      <h4>
        <button
          type="button"
          className={classes["accordion-button"]}
          onClick={toggleAccordion}
          aria-expanded={isOpen}
          aria-controls={`accordion-content-${title}`}
          id={`accordion-header-${title}`}
        >
          {title}
          <svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.41414 16C5.02361 16.3905 4.39045 16.3905 3.99992 16C3.6094 15.6095 3.6094 14.9763 3.99993 14.5858L11.2928 7.29289C11.6833 6.90237 12.3165 6.90237 12.707 7.29289L19.9999 14.5858C20.3904 14.9763 20.3904 15.6095 19.9999 16C19.6094 16.3905 18.9762 16.3905 18.5857 16L12.707 10.1213C12.3165 9.7308 11.6833 9.7308 11.2928 10.1213L5.41414 16Z"
              fill="#4F372F"
            />
          </svg>
        </button>
      </h4>
      <div
        ref={contentRef}
        id={`accordion-content-${title}`}
        role="region"
        aria-labelledby={`accordion-header-${title}`}
        className={`${classes["accordion-content"]} ${isOpen ? classes.open : ""}`}
      >
        {children}
      </div>
    </div>
  );
}