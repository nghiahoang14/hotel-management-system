export interface RoomType {
  _id:string
  name: string;
  slug:string;
  description:string;
  price:number;
  size:string;
  bed:string;
  view:string;
  maxPeople:number;
  maxAdults?:number;
  maxChildren?:number;
  amenities:string[];
  images:string[];
  available?:number;
}
