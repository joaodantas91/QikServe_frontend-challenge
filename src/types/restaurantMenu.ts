type MenuItemModifier = {
  id: number;
  name: string;
  minChoices: number;
  maxChoices: number;
  items: {
    id: number;
    name: string;
    price: number;
    maxChoices: number;
    position: number;
    visible: number;
    availabilityType: string;
    qty?: number;
    available: boolean;
  }[];
};

type MenuItemImage = {
  id: number;
  image: string;
};

type MenuItem = {
  id: number;
  name: string;
  description?: string | null;
  alcoholic: number;
  price: number;
  position: number;
  visible: number;
  availabilityType: string;
  sku: string;
  images: MenuItemImage[];
  available: boolean;
  modifiers?: MenuItemModifier[];
};

type SectionImage = {
  id: number;
  image: string;
};

type Section = {
  id: number;
  name: string;
  description?: string | null;
  position: number;
  visible: number;
  images: SectionImage[];
  items: MenuItem[];
};

export type RestaurantMenu = {
  id: number;
  name: string;
  type: string;
  collapse: number;
  sections: Section[];
};
