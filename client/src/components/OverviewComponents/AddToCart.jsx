import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';
import {Axios} from "../../AxiosConfig.js"
import SelectSizeModal from './SelectSizeModal.jsx'
import {Select} from '../../styles/Forms.jsx';
import Button from '../../styles/Buttons.jsx';
import {Title, Wrapper, Header2, Header3, Header4, Text} from '../../styles/Headers.jsx'
import {CartContainer, RowContainer, ColumnContainer} from './OverviewStyles.jsx';

const SizeSelect = styled(Select)`
width: 180px;
height: 60px;
background: #FAFAFA;
border: 2px solid #AFA9A9;
box-sizing: border-box;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
font-size: 16px;
`
const QuantitySelect = styled(SizeSelect)`
`
const AddtoCartButton = styled.button`
width: 217px;
height: 63px;
background:${(props) => props.hover ? `#ededed` : `#ccc`} ;
border: 1px solid #ccc;
padding: 10px;
margin: 10px;
border-radius: 3px;
cursor: pointer;
`;

const AddtoCartText = styled.option`
  font-size: 24px;
`
const StyleQuantityCartContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: space-around;
`
const StyleQuantityContainer = styled.div`
display: flex;
flex-direction: row
justify-content: space-around;
`

const AddToCart = (props) => {
  var skus_ids = Object.keys(props.selectedStyle.skus)
  var {skus} = props.selectedStyle
  const [currentSku, setSku] = useState('Select Size')
  const [quantity, setQuantity] = useState('Select Quantity')
  const [stock , setStock] = useState(false)
  const [hover, setHover] = useState(false)
  const [openSizeModal, setOpenSizeModal] = useState(false)
  const selectSizeRef = useRef()

  var thereIsStock = skus_ids.some(sku => {
    return skus[sku].quantity > 0
  })

  useEffect(() => {
    setStock(thereIsStock ? thereIsStock : thereIsStock)
  })
  const postCart = () => {
    console.log('im here')
    setOpenSizeModal(currentSku !== 'Select Size' ? false : true)
    if (!openSizeModal) {
      Axios.post("/cart", {sku_id: currentSku})
      .then(result => {
        console.log (result)
      })
      .catch(err => {
        console.log(err)
      })
    }
  }


  const test = () => {
    console.log(document.getElementById("selectSize"))
    document.getElementById("selectSize")
    // document.getElementById("selectSize").dispatchEvent(new MouseEvent('mousedown'));
  }
  const runThis = () => {
    var dropdown = document.getElementById('selectSize');
    showDropdown(dropdown);
};

  const showDropdown = (element) => {
    var event;
    event = document.createEvent('MouseEvents');
    console.log(event)

    event.initMouseEvent('mousedown', true, true, window);
    element.dispatchEvent(event);
  };



  return (
    <StyleQuantityCartContainer>
        <StyleQuantityContainer>
            <SizeSelect value = {currentSku}
              id = "selectSize"
              ref = {selectSizeRef}
              disabled = {!stock}
              onChange = {(e) => {setSku(e.target.value); setQuantity('1')}}>
              {stock ? <option>Select Size</option> : <option>Currently out of stock</option>}
              {stock ? skus_ids.map(sku => {
                if (skus[sku].quantity > 0) {
                  return <option
                  key = {sku}
                  value = {sku}
                  > Size - {skus[sku].size}</option>
                }
              }) : null}
            </SizeSelect>

            <QuantitySelect
              disabled = {!stock}
              onChange = {(e) => {setQuantity(e.target.value)}}
              value = {quantity}>
              {!(skus[currentSku]) ? <option>Select Quantity</option> : [...Array(skus[currentSku].quantity).keys()].map(x => {
                if (x !== 0 && x <= 15) {
                  return <option key = {x}>{x}</option>
                }})}
            </ QuantitySelect>
        </StyleQuantityContainer>
            {stock? <AddtoCartButton
            onClick = {() => (postCart())}
            hover = {hover}
            onMouseEnter = {() => {setHover(!hover)}}
            onMouseLeave = {() => {setHover(!hover)}}
            >Add to Cart</AddtoCartButton> : <div><Text>OUT OF STOCK</Text></div>}
        <SelectSizeModal
          setOpenSizeModal = {setOpenSizeModal}
          openSizeModal = {openSizeModal}/>
    </StyleQuantityCartContainer>
  );
};

AddToCart.propTypes = {
  selectedStyle: PropTypes.object,
}

export default AddToCart;