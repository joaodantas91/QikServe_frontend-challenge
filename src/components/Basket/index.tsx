// BasketComponent.tsx
import { addItem, BasketItem, removeItem } from '@/store/basketSlice';
import { RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import classes from './styles.module.css';
import { formatCurrency } from '@/utils/formatCurrency';

export function Basket () {
  const dispatch = useDispatch();
  const basket = useSelector((state: RootState) => state.basket);
  const { detail, detailStatus } = useSelector.withTypes<RootState>()((state: RootState) => state.restaurant);

  const handleAddItem = (item: BasketItem) => {
    dispatch(addItem({ ...item, quantity: 1 }));
  };

  const handleRemoveItem = (id: number) => {
    dispatch(removeItem(id));
  };


  if (detailStatus === "idle" || detailStatus === "pending") return <></>;

  return (
    <div className={classes["basket"]}>
      <h1 className={classes["basket-title"]}>Carrinho</h1>
      <div className={classes["basket-item-wrapper"]}>
        {
          basket.items.map(item => {
            const price = (() => {
              if (item.selectedModifier !== undefined) {
                return item.selectedModifier.price
              }

              return item.price
            })()

            return (
              <div key={item.id} className={classes["basket-item"]} >
                <div>
                  <h5 className={classes["basket-item__name"]} >{item.name} </h5>

                  {item.selectedModifier &&
                    <p className={classes["basket-item__modifier"]} >{item.selectedModifier?.name}</p>
                  }

                  <div className={classes["basket-item__quantity"]}>
                    <button onClick={() => handleRemoveItem(item.id)}> - </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleAddItem(item)}> + </button>
                  </div>
                </div>
                <h5 className={classes["basket-item__price"]}>{formatCurrency(price, detail!.locale, detail!.ccy)}</h5>
              </div>
            )
          })
        }
      </div>
      <div className={classes["basket-footer"]}>
        <h4>Sub total <span>{ }</span></h4>
        <h3>Total: <strong>{formatCurrency(basket.totalAmount, detail!.locale, detail!.ccy)}</strong></h3>
      </div>

    </div>
  );
};