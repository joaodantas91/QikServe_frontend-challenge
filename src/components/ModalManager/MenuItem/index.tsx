
import { MenuItemModifier, MenuItem as MenuItemType } from "@/types/restaurantMenu";
import classes from './styles.module.css';
import { useContext, useState } from "react";
import { ModalContext } from "@/context/ModalManagerContext";
import CloseIcon from '@/assets/icons/close.svg'
import { useDispatch, useSelector } from "react-redux";
import { addItem, BasketItem } from "@/store/basketSlice";
import { formatCurrency } from "@/utils/formatCurrency";
import { RootState } from "@/store/store";

type MenuItemProps = {
  item: MenuItemType
}

export function MenuItem ({ item }: MenuItemProps) {
  const [selectedModifier, setSelectedModifier] = useState<MenuItemModifier["items"][number] | null>(null);
  const [quantity, setQuantity] = useState(1);

  const context = useContext(ModalContext);
  const dispatch = useDispatch();
  const { detail } = useSelector.withTypes<RootState>()((state: RootState) => state.restaurant);

  const handleChangeModifier = (item: MenuItemModifier["items"][number]) => {
    setSelectedModifier(item);
  };

  const handleAddItem = (item: BasketItem) => {

    if (selectedModifier === null && item.modifiers && item.modifiers.length > 0) return;

    if (selectedModifier === null) {
      dispatch(addItem({
        ...item
      }));
    } else {
      dispatch(addItem({
        ...item,
        selectedModifier
      }));
    }


  };

  function handleDecreaseQuantity () {
    setQuantity(prev => prev > 1 ? prev - 1 : prev)
  }

  function handleIncreaseQuantity () {
    setQuantity(prev => prev + 1)
  }

  const price = (() => {
    if (selectedModifier !== null) {
      return selectedModifier.price
    }

    return item.price
  })()

  return (
    <div className={classes["menu-item"]}>
      <header className={classes["menu-item__header"]}>
        <button onClick={() => context?.setMenuItemModal({ isOpen: false })} className={classes["menu-item__close-button"]}>
          <img src={CloseIcon} alt="Close Icon" />
        </button>
        {item?.images?.[0].image.length > 0 &&
          <img src={item?.images?.[0].image} alt="" />
        }


        <div>
          <h4>{item.name}</h4>
          <p>{item.description}</p>
        </div>
      </header>
      {item.modifiers && item.modifiers.length > 0 && (
        <div className={classes["menu-item__modifiers"]}>
          {item.modifiers?.map(modifier => (
            <ul>
              {modifier.items.map(item => (
                <li key={item.id} className={classes["menu-item__modifier"]}>
                  <label>
                    <div>
                      <h5>{item.name}</h5>
                      <p>{formatCurrency(item.price, detail!.locale, detail!.ccy)}</p>
                    </div>
                    <div className={classes["menu-item__radio-wrapper"]}>
                      <input
                        type="radio"
                        name="modifier"
                        value={item.id}
                        checked={selectedModifier?.id === item.id}
                        onChange={() => handleChangeModifier(item)}
                      />
                      <span></span>
                    </div>
                  </label>
                </li>
              )
              )}
            </ul>
          ))}
        </div>
      )}

      <div className={classes["menu-item__footer"]}>
        <div className={classes["menu-item__quantity"]}>
          <button onClick={() => handleDecreaseQuantity()} disabled={quantity <= 1}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="4" fill="none" viewBox="0 0 18 4"
            >
              <path fill="#1E1E1E" d="M0 0H18V4H0z"></path>
              <rect width="18" height="3" y="0.455" fill="#5F5F5F" rx="1.5"></rect>
            </svg>
          </button>
          <span>{quantity}</span>
          <button onClick={() => handleIncreaseQuantity()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 18 18" >
              <g clipPath="url(#clip0_254_80)">
                <path
                  fill="#fff"
                  fillRule="evenodd"
                  d="M7.5 16.5a1.5 1.5 0 003 0v-6h6a1.5 1.5 0 000-3h-6v-6a1.5 1.5 0 10-3 0v6h-6a1.5 1.5 0 100 3h6v6z"
                  clipRule="evenodd"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_254_80">
                  <path fill="#fff" d="M0 0H18V18H0z"></path>
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
        <button className="button-rounded"
          disabled={item.modifiers && item.modifiers.length > 0 && selectedModifier === null}
          onClick={() => {
            handleAddItem({ ...item, quantity })
            context?.setMenuItemModal({ isOpen: false })
          }}>

          Add to Order • {formatCurrency((price * quantity), detail!.locale, detail!.ccy)}
        </button>
      </div>
    </div>
  );
}