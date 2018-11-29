/**
 * Lunatech
 *
 * Description: Container Component that shows the products list.
 *
 * Created by manueldupont on 2018-11-22
 */


import React, {Component} from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import Container from 'react-bootstrap/lib/Container';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import cx from 'classnames';
import {addToCart, removeFromCart} from "../../actions/cart";

class ProductDetail extends Component {

  constructor() {
    super();

    this.state = {}
  }

  /**
   * Click Handle on a product row to add to cart this product.
   *
   * @param productId {String}: The product ID to remove.
   */
  onBtnAddToCart() {
    const {dispatch} = this.props;

    dispatch(addToCart(this.props.product));
  }

  /**
   * Click Handle on a product row to remove to cart this product.
   *
   * @param productId {String}: The product ID to remove.
   */
  onBtnRemoveFromCart() {
    const {dispatch} = this.props;

    dispatch(removeFromCart(this.props.product.id));
  }

  render() {
    let price = this.props.product.price;

    if (this.props.product.price) {
      price = parseFloat(this.props.product.price).toFixed(2);
    }

    return (
      <div id="product-detail" className={cx((this.props.added) ? 'added' : '')}>
        <Container className={cx('content', 'nomargin')} key={this.props.product.id}>
          <Row>
            <Col xs={10}>
              <Row className='name'>
                <Col xs={11}>
                  {this.props.product.name}
                </Col>
              </Row>
              <Row className='description'>
                <Col xs={12}>
                  {this.props.product.description}
                </Col>
              </Row>
            </Col>
            <Col className='price' xs={1}>
              {(() => {
                if (price) {
                  return <span>{price}&euro;</span>
                }
              })()}
            </Col>
            <Col className='btnAddToCart' xs={1}>
              {(() => {
                if (price) {
                  if (this.props.added) {
                    return <Button onClick={this.onBtnRemoveFromCart.bind(this, this.props.product.id)}>Remove</Button>
                  } else {
                    return <Button onClick={this.onBtnAddToCart.bind(this, this.props.product.id)}>Buy</Button>
                  }
                }
              })()}
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}


ProductDetail.defaultProps = {
  product: {},
  added: false
};

ProductDetail.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    price: PropTypes.number.isRequired
  }),
  added: PropTypes.bool
};

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps)(ProductDetail);
