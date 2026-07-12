import { Double, ObjectId } from 'mongodb';

export interface InventoryItems {
  _id: ObjectId;
  name: string;
  price: Double;
  quantity: number;
}

