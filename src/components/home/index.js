/**
 * Lunatech
 *
 * Description: Container Component that shows the products list.
 *
 * Created by manueldupont on 2018-11-22
 */


import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import ProductDetail from '../product-detail';
import {connect} from "react-redux";
import {Nav, Navbar, NavbarBrand, NavbarToggle, NavItem, Pagination, Badge} from 'react-bootstrap';
import {fetchProducts} from "../../actions/products";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons'

import Jumbotron from 'react-bootstrap/lib/Jumbotron';

class Home extends Component {

  constructor() {
    super();

    this.state = {
      page: 1
    }
  }

  onHandlePageClick(page) {
    const {dispatch} = this.props;

    dispatch(fetchProducts(page - 1));
    this.setState({page: page});
  }

  isProductAdded(id) {
    let found = this.props.cart.filter(product => product.id === id);

    return found.length === 1;
  }

  render() {
    return (
      <div id="home">
        <Jumbotron>
          <h1>
            Welcome to LunaTech <span style={{color: 'red', fontWeight: 'bold'}}>E-Shop</span>
          </h1>
          <p>
            <small>LunaTech is proud to introduce you to its brand new E-Shop. Feel free to buy everything you want,
              it's not for real :)
            </small>
          </p>
        </Jumbotron>
        <Navbar>
          <Nav>
            <NavItem eventKey={1} href="#/cart">
              <div className='shopping-cart-label'>Shopping Cart
                <FontAwesomeIcon icon={faShoppingCart}/>
                {this.props.cart && this.props.cart.length &&
                <Badge>{this.props.cart.length}</Badge>
                }
              </div>
            </NavItem>
          </Nav>
        </Navbar>
        {this.props.products && this.props.products.length && this.props.products.map(
          (product, index) => {
            return (
              <div key={index} className="content">
                <ProductDetail product={product} added={this.isProductAdded(product.id)}/>
              </div>
            )
          })
        }
        <Pagination>
          <Pagination.First onClick={this.onHandlePageClick.bind(this, 1)}/>
          <Pagination.Prev disabled={this.state.page === 1}
                           onClick={this.onHandlePageClick.bind(this, this.state.page - 1)}/>
          {this.props.products && this.props.products.length && this.props.products.map((product, index) => {
            if (this.state.page - 3 <= index && index < this.state.page + 2) {
              return <Pagination.Item
                key={index}
                active={(index + 1) === this.state.page}
                onClick={this.onHandlePageClick.bind(this, index + 1)}>{index + 1}</Pagination.Item>
            }
          })
          }

          {/*<Pagination.Item>{10}</Pagination.Item>*/}
          {/*<Pagination.Item>{11}</Pagination.Item>*/}
          {/*<Pagination.Item active>{12}</Pagination.Item>*/}
          {/*<Pagination.Item>{13}</Pagination.Item>*/}
          {/*<Pagination.Item disabled>{14}</Pagination.Item>*/}

          {/*<Pagination.Ellipsis />*/}
          {/*<Pagination.Item>{20}</Pagination.Item>*/}
          <Pagination.Next onClick={this.onHandlePageClick.bind(this, this.state.page + 1)}/>
        </Pagination>
      </div>
    )
  }
}

Home.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      price: PropTypes.number
    })),
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired
    }))
};

function mapStateToProps(state) {
  return {
    products: state.products,
    cart: state.cart
  }
}

export default connect(mapStateToProps)(Home);
