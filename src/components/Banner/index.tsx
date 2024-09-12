import { useSelector } from 'react-redux';
import classes from './styles.module.css';
import { RootState } from '../../store/store';
import { useEffect } from 'react';

export function Banner () {
  const { detail, menu } = useSelector.withTypes<RootState>()((state: RootState) => state.restaurant);
  useEffect(() => {

    console.log(menu)
  }, [menu])
  return (
    <picture className={classes.picture}>
      {/* <source media="(min-width: 1024px)" srcSet="" /> */}
      <img className={classes.img} src={detail?.webSettings.bannerImage} alt="Burguer's banner" />
    </picture>
  )
}