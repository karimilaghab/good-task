import React, { Component } from "react";
import { connect } from "react-redux";
import { addToCart } from "./actions/cartActions";
import Search from "./Search";
import Item from "./Item";
import { ICartState } from "./reducers/states.interface";
import { Action, Dispatch } from "redux";
import { ECartActions } from "./actions/actions.enums";
import { IProduct } from "../data/Data.interfaces";

enum EHomeSortBy {
  price_desc = "price_desc",
  price_asc = "price_asc",
  recently = "recently",
  score = "score"
}
class Home extends Component<
  IHomeDispatchProps & IHomeStatesToProps,
  {
    data: IProduct[];
    searchText: string;
    sortBy: EHomeSortBy;
  }
> {
  constructor(props: IHomeDispatchProps & IHomeStatesToProps) {
    super(props);
    this.state = {
      data: [],
      searchText: "",
      sortBy: EHomeSortBy.score
    };
  }

  public componentDidMount() {
    this.setState({
      data: this.props.use1
    });
  }

  public render() {
    let data: IProduct[] = this.state.data;
    if (this.state.searchText) {
      data = data.filter(e => {
        return (
          e._source.charities
            .map(charity => charity.name)
            .join(" and ")
            .toLowerCase()
            .indexOf(this.state.searchText.toLowerCase()) !== -1
        );
      });
    }
    switch (this.state.sortBy) {
      case EHomeSortBy.price_asc:
        data = data.sort((a, b) => a._source.giftprice - b._source.giftprice);
        break;
      case EHomeSortBy.price_desc:
        data = data.sort((a, b) => b._source.giftprice - a._source.giftprice);
        break;
      case EHomeSortBy.recently:
        data = data.sort(
          (a, b) =>
            new Date(b._source["@timestamp"]).getTime() -
            new Date(a._source["@timestamp"]).getTime()
        );
        break;
      default:
        data = data.sort((a, b) => b._score - a._score);
        break;
    }

    const itemList = data.map((item, index) => {
      return (
        <div key={index}>
          <Item
            id={item._source.id}
            img={item._source.image}
            price={item._source.giftprice}
            name={item._source.charities
              .map(charity => charity.name)
              .join(" and ")}
            description={item._source.description}
            dispatch={this.handleClick}
          />
        </div>
      );
    });

    return (
      <div className="container">
        <Search mySearch={this.mySearch} myOrder={this.myOrder} />
        <div className="row">
          <div className="box">{itemList}</div>
        </div>
      </div>
    );
  }

  private handleClick = (id: number) => {
    this.props.addToCart(id);
  };

  private mySearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchText: e.target.value });
  };

  private myOrder = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ sortBy: e.currentTarget.value as EHomeSortBy });
  };
}

interface IHomeStatesToProps {
  use1: IProduct[];
}

const mapStateToProps = (state: ICartState) => {
  return {
    use1: state.items
  };
};

interface IHomeDispatchProps {
  addToCart: (id: number) => void;
}

const mapDispatchToProps = (dispatch: Dispatch<Action<ECartActions>>) => {
  return {
    addToCart: (id: number) => {
      dispatch(addToCart(id));
    }
  };
};

export default connect<IHomeStatesToProps, IHomeDispatchProps, {}, ICartState>(
  mapStateToProps,
  mapDispatchToProps
)(Home);
