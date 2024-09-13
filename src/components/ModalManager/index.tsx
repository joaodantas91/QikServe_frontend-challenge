import { useContext } from "react";
import classes from './styles.module.css';
import { MenuItem } from "./MenuItem";
import { ModalContext } from "@/context/ModalManagerContext";

export function ModalManager () {
  const context = useContext(ModalContext);


  return (
    <>
      {
        context?.MenuItemModal?.isOpen &&
        <div className={classes.modal}>
          <div className={classes["modal__overlay"]}>
            <div className={classes["modal__content"]}>
              <MenuItem item={context.MenuItemModal.content} />
            </div>
          </div>
        </div>
      }
    </>
  );
}