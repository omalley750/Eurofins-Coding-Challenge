export interface Bike {
  reference: string;
  manufacturer: string;
  model: string;
  category: string;
  price: number;
  colour: string;
  weight: number;
  imageUrl: string;
  inFavourites?: boolean;
}