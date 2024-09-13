// basketSlice.ts
import { MenuItem, MenuItemModifier } from '@/types/restaurantMenu';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface BasketItem extends MenuItem {
  quantity: number;
  selectedModifier?: MenuItemModifier["items"][number]
}

export interface BasketState {
  items: BasketItem[];
  totalAmount: number;

}


const initialState: BasketState = {
  items: [],
  totalAmount: 0,
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<BasketItem>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }

      if (action.payload.selectedModifier) {
        state.totalAmount += action.payload.selectedModifier.price * action.payload.quantity;
      } else {
        state.totalAmount += action.payload.price * action.payload.quantity;
      }

    },
    removeItem: (state, action: PayloadAction<number>) => {
      const existingItem = state.items.find(item => item.id === action.payload);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
          state.totalAmount -= existingItem.price;
        } else {
          state.totalAmount -= existingItem.price;
          state.items = state.items.filter(item => item.id !== action.payload);
        }
      }
    },
    clearBasket: (state) => {
      state.items = [];
      state.totalAmount = 0;
    },
  },
});

export const { addItem, removeItem, clearBasket } = basketSlice.actions;

export default basketSlice.reducer;