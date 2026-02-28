export interface Dining {
  _id:string
  title: string;
 subtitle?:string;
  description:string;
  openHours: string[];
  hotline?:string
  image: string[];
  menu?: {
  label: string;
  url: string;
}[];
}
