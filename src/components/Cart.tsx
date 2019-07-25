import React, { Component } from "react";
import { connect } from "react-redux";
import Currency from "react-currency-formatter";
import { Link } from "react-router-dom";
import { Action, Dispatch } from "redux";
import {
  removeItem,
  addQuantity,
  subtractQuantity
} from "./actions/cartActions";
import { ICartState } from "./reducers/states.interface";
import { IProduct } from "../data/Data.interfaces";
import { RouterProps } from "react-router";

class Cart extends Component<
  ICartStateToProps & ICartReducerToProps & RouterProps
> {
  public render() {
    const addedItems = this.props.use2.length ? (
      this.props.use2.map((item, index) => {
        return (
          <div className="col s12 text-center" key={index}>
            <li className="collection-item avatar">
              <div className="item-img">
                {item._source.charities.map((charity, chindex) => (
                  <img src={charity.image} alt={charity.name} key={chindex} />
                ))}
              </div>

              <div className="item-desc">
                {item._source.charities.map((charity, chindex) => (
                  <span className="title" key={chindex}>
                    {charity.name}
                  </span>
                ))}

                <p>
                  <b>
                    Price:{" "}
                    <Currency
                      quantity={item._source.giftprice}
                      currency="AUD"
                    />
                  </b>
                </p>
                <p>
                  <b>Quantity: {item.quantity}</b>
                </p>
                <div className="add-remove">
                  <Link to="/cart">
                    <i
                      className="material-icons"
                      data-id={item._id}
                      onClick={this.handleAddQuantity}
                    >
                      arrow_drop_up
                    </i>
                  </Link>
                  <Link to="/cart">
                    <i
                      className="material-icons"
                      data-id={item._id}
                      onClick={this.handleSubtractQuantity}
                    >
                      arrow_drop_down
                    </i>
                  </Link>
                </div>
                <button
                  className="waves-effect waves-light btn-small pink secondary-content setbtn text-lowercase"
                  data-id={item._id}
                  onClick={this.handleRemove}
                >
                  remove
                </button>
              </div>
            </li>
          </div>
        );
      })
    ) : (
      <div className="text-center">
        <p className="">No Item!</p>
      </div>
    );
    return (
      <div className="container my-5">
        <div className="row text-center">
          <div className="col s12 m6 offset-m2 l6">
            <ul className="collection with-header">
              <li className="collection-header teal">
                <p className="text-white text-center text-capitalize h-auto font-weight-bold">
                  Donated Items
                </p>
              </li>
              {addedItems}
            </ul>
          </div>
        </div>
      </div>
    );
  }
  // to remove the item completely
  private handleRemove = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const id = e.currentTarget.getAttribute("data-id");
    if (id) {
      this.props.removeItem(+id);
    }
  };
  // to add the quantity
  private handleAddQuantity = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const id = e.currentTarget.getAttribute("data-id");
    if (id) {
      this.props.addQuantity(+id);
    }
  };
  // to substruct from the quantity
  private handleSubtractQuantity = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const id = e.currentTarget.getAttribute("data-id");
    if (id) {
      this.props.subtractQuantity(+id);
    }
  };
}

interface ICartStateToProps {
  use2: (IProduct & {
    quantity?: number | undefined;
  })[];
}
interface ICartReducerToProps {
  removeItem: (id: number) => void;
  addQuantity: (id: number) => void;
  subtractQuantity: (id: number) => void;
}

const mapStateToProps = (state: ICartState) => {
  return {
    use2: state.addedItems
  };
};
const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
  return {
    removeItem: (id: number) => {
      dispatch(removeItem(id));
    },
    addQuantity: (id: number) => {
      dispatch(addQuantity(id));
    },
    subtractQuantity: (id: number) => {
      dispatch(subtractQuantity(id));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
