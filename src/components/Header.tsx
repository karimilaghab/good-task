import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Currency from "react-currency-formatter";
import { ICartState } from "./reducers/states.interface";

interface IHeadersStateToProps {
  use3: number;
}

class Header extends Component<IHeadersStateToProps> {
  render() {
    return (
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper black">
            <ul className="left">
              <li>
                <Link to="/">
                  <b>Home</b>
                </Link>
              </li>
            </ul>
            <ul className="right">
              <li>
                <Link to="/cart">
                  <span className="myiclass">
                    <i className="material-icons">shopping_cart</i>
                  </span>
                  <span className="badge red text-white mr-2">
                    total:{" "}
                    <Currency quantity={this.props.use3} currency="AUD" />
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state: ICartState) => {
  return {
    use3: state.total
  };
};

export default connect(mapStateToProps)(Header);
