
export interface Litter {
  _id?: { type: string };
  petname: { type: String };
  breed: { type: String };
  request: { type: String };
  adoptStatus: { type: String };
  weight: { type: String };
  price: { type: Number };
  birthdate: { type: Date };
  location: [Number];
  image?:{type: string}
}



















