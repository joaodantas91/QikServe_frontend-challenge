import { MenuItem } from "@/types/restaurantMenu"
import classes from "./styles.module.css"

type MenuAccordionItemProps = {
  menuItem: MenuItem;
  price: string;
}

export function MenuAccordionItem ({ menuItem, price }: MenuAccordionItemProps) {

  return (
    <div className={classes["accordion-item--wrapper"]}>
      <div>
        <h5 className={classes["accordion-item--title"]}>{menuItem.name}</h5>
        <p className={classes["accordion-item--description"]}>
          {menuItem.description}
        </p>
        <strong>
          {price}</strong>
      </div>
      {menuItem.images?.length > 0 && menuItem.images[0].image &&
        <img src={menuItem.images[0].image} />
      }
    </div >
  )
}