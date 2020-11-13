import { Users } from "./Users";

export class News{
      id:BigInteger;
	  title:string;
	  description:string;
	  url:string;
	  urlToImage:string;
	  bookmark:Boolean;
	  favourite:Boolean;
	  user:Users;
}