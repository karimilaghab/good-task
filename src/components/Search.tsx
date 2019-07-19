import React from "react";

interface ISearchProps {
  mySearch?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  myOrder?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function Search(props: ISearchProps) {
  return (
    <div className="row pt-3">
      <div className="input-field col s4">
        <i className="material-icons prefix">youtube_searched_for</i>
        <input id="icon_prefix" type="text" onChange={props.mySearch} />
        <label htmlFor="icon_prefix">Search</label>
      </div>
      <div className="input-field col s4">
        <select onChange={props.myOrder} style={{ display: "block" }}>
          <option value="score">Recommended</option>
          <option value="price_asc">Lower Price</option>
          <option value="price_desc">Higher Price</option>
          <option value="recently">Recently</option>
        </select>
      </div>
    </div>
  );
}
