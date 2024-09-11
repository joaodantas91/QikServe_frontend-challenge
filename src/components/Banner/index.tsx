import classes from './styles.module.css';

export function Banner () {
  return (
    <picture className={classes.picture}>
      {/* <source media="(min-width: 1024px)" srcSet="" /> */}
      <img className={classes.img} src="/images/banner/banner.png" alt="Burguer's banner" />
    </picture>

  )
}