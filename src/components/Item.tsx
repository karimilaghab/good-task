import React, { Component } from "react";
import Currency from "react-currency-formatter";

export interface IItemProps {
  id: number;
  name: string;
  img: string;
  price: number;
  description: string;
  dispatch: (id: number) => void;
}

export default class Item extends Component<IItemProps> {
  public render() {
    const { id, name, img, price, description } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col s4 offset-s1 m6 l4" key={id}>
            <div className="card" key={id}>
              <div className="card-image">
                <img src={img} alt={name} />
              </div>

              <div className="card-body">
                <span className="green-text font-weight-bold center">
                  {name}
                </span>
                <div className="card-text">
                  <p>{description}</p>
                </div>

                <div className="card-action">
                  <span
                    className="btn-floating halfway-fab waves-effect"
                    onClick={this.dispatch}
                  >
                    <i className="material-icons">pan_tool</i>
                  </span>

                  <p>
                    <b>
                      Price: <Currency quantity={price} currency="AUD" />
                    </b>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  private dispatch = () => {
    debugger;
    this.props.dispatch(this.props.id);
  };
}
