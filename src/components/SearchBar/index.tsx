import SearchIcon from '../../assets/icons/search-icon.svg'
import { HTMLProps } from "react";
import classes from './styles.module.css';


export function SearchBar ({ className, ...props }: HTMLProps<HTMLDivElement>) {
  return (
    <div {...props} className={`${className} ${classes.wrapper}`}>

      <input type="text" className={classes.input} />
      <button aria-label="Search" className={classes.button} type='button'>
        <img src={SearchIcon} alt="search icon" />
      </button>
    </div>
  )
}