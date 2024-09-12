import { useSelector } from 'react-redux';
import classes from './styles.module.css';
import { RootState } from '@/store/store';

export function Banner () {
  const { detail } = useSelector.withTypes<RootState>()((state: RootState) => state.restaurant);
  return (
    <picture className={classes.picture}>
      {/* <source media="(min-width: 1024px)" srcSet="" /> */}
      <img className={classes.img} src={detail?.webSettings.bannerImage} alt="Burguer's banner" />
    </picture>
  )
}