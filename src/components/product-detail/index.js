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

class ProductDetail extends Component {

  constructor() {
    super();

    this.state = {}
  }

  render() {
    let price = this.props.product.price;

    if (this.props.product.price) {
      price = parseFloat(this.props.product.price).toFixed(2);
    }

    return (
      <div id="product-detail">
        <Container className="content nomargin" key={this.props.product.id}>
          <Row className='name'>
            <Col xs={11}>
              {this.props.product.name}
            </Col>
            <Col className='pull-left price' xs={1}>
              {(() => {
                if (price) {
                  return <span>{price}&euro;</span>
                }
              })()}
            </Col>
          </Row>
          <Row className='description'>
            <Col xs={12}>
              {this.props.product.description}
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

ProductDetail.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    price: PropTypes.number.isRequired
  })
};

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps)(ProductDetail);
