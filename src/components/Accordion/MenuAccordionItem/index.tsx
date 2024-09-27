import { MenuItem } from "@/types/restaurantMenu"
import classes from "./styles.module.css"
import { useContext, useEffect, useState } from "react";
import { ModalContext } from "@/context/ModalManagerContext";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Lazyimage } from "@/components/LazyImage";

type MenuAccordionItemProps = {
  menuItem: MenuItem;
  price: string;
}

export function MenuAccordionItem ({ menuItem, price }: MenuAccordionItemProps) {
  const context = useContext(ModalContext);
  const basket = useSelector((state: RootState) => state.basket);
  const { detail, status, error } = useSelector.withTypes<RootState>()((state: RootState) => state.restaurant);



  const [itemsInBasket, setItemsInBasket] = useState<number>(0);

  useEffect(() => {
    setItemsInBasket(basket.items.filter(item => item.id === menuItem.id)[0]?.quantity || 0)
  }, [basket, menuItem.id])

  return (
    <button
      className={classes["accordion-item--wrapper"]}
      onClick={() => context?.setMenuItemModal({ content: menuItem, isOpen: true })}
    >
      <div>
        <h5 className={classes["accordion-item--title"]}>
          {itemsInBasket > 0 && <span>{itemsInBasket}</span>}
          {menuItem.name}
        </h5>
        <p className={classes["accordion-item--description"]}>
          {menuItem.description}
        </p>
        <strong>
          {price}</strong>
      </div>

      <Lazyimage src={menuItem.images[0].image} status={status} />

    </button >
  )
}