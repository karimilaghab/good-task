import React, { Component } from "react";
import { connect } from "react-redux";
import Currency from "react-currency-formatter";
import { ICartState } from "./reducers/states.interface";
import { IProduct } from "../data/Data.interfaces";
import { History } from "history";

interface IRecipeOwnProps {
  history: History;
}

class Recipe extends Component<IRecipeStates & IRecipeOwnProps> {
  public render() {
    return (
      <div>
        <ul className="list-unstyled">
          <li className="collection-item">
            <b>
              Total: <Currency quantity={this.props.total} currency="AUD" />
            </b>
          </li>
        </ul>

        <div>
          <div className="py-5">
            <div className="checkout">
              <button
                className="waves-effect waves-light btn"
                onClick={this.goToHome}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private goToHome = () => {
    this.props.history.push("/");
  };
}

const mapStateToProps = (state: ICartState) => {
  return {
    addedItems: state.addedItems,
    total: state.total
  };
};

interface IRecipeStates {
  addedItems: (IProduct & {
    quantity?: number | undefined;
  })[];
  total: number;
}

// export default connect<
//   IRecipeStates,
//   IRecipeOwnProps,
//   ICartState
// >(
//   mapStateToProps,
// )(Recipe);

export default connect(mapStateToProps)(Recipe);
