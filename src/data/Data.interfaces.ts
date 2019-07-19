export interface IProduct {
  _index: string;
  _type: string;
  _id: string;
  _score: number;
  _source: IDataSource;
}

export interface IDataSource {
  "@version": string;
  publishedon: string;
  charities: ICharity[];
  donatedamount: number;
  type: string;
  slug: string;
  "@timestamp": string;
  giftprice: number;
  gifttype: string;
  title: string;
  modifiedon: string;
  donationscount: number;
  id: number;
  description: string;
  matchedamount: number;
  image: string;
  causes: ICause[];
  giftid: string;
  createdon: string;
}

export interface ICause {
  name: string;
}

export interface ICharity {
  id: string;
  name: string;
  image: string;
}
