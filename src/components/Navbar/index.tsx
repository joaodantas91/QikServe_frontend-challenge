import classes from './styles.module.css';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import HamburguerIcon from '../../assets/icons/hamburguer-icon.svg'

export function Navbar () {
  const lg = useMediaQuery("(min-width: 1024px)");
  return (
    <header className={classes.header}>

      <div className="container">


        <nav className={classes.nav}>
          {
            !lg && <div></div>
          }

          <ul className={classes.ul}>
            <li><a className={classes.selected}>Menu</a></li>
            {
              lg && (
                <>
                  <li><a>Entrar</a></li>
                  <li><a>Contato</a></li>
                </>
              )
            }

          </ul>
          {
            !lg && (
              <button
                className={classes.button}
                aria-label="Toggle navigation menu"
              >
                <img src={HamburguerIcon} aria-hidden="true" alt="Hamburguer Icon" />
              </button>
            )
          }

        </nav>
      </div>
    </header>

  )
}