import { MenuItem } from '@/types/restaurantMenu';
import React, { createContext, useState, ReactNode, Dispatch } from 'react';

type ModalState = {
  isOpen: true
  content: MenuItem
} | {
  isOpen: false
}

// Define the context type
interface ModalContextType {
  setMenuItemModal: Dispatch<React.SetStateAction<ModalState | null>>
  MenuItemModal: ModalState | null;
}

// Create the context
export const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Provider component
interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [MenuItemModal, setMenuItemModal] = useState<ModalState | null>(null);

  return (
    <ModalContext.Provider
      value={{
        MenuItemModal,
        setMenuItemModal
      }}>
      {children}
    </ModalContext.Provider>
  );
};

