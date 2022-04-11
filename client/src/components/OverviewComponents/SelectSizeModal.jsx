import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactDom from 'react-dom';
import { MdClose } from 'react-icons/md';

import {ColumnContainer, RowContainer, AlignmentWrapper, Theme, MainHeader} from '../../styles/Boxes.jsx'
import {Title, Header2, Text} from '../../styles/Headers.jsx';
import Button from '../../styles/Buttons.jsx'




const SizeModalBackground = styled(ColumnContainer)`
  justify-content: flex-start;
  align-items: center;
  background: #FAFAFA;
  position: absolute;
  border-radius: 12px;
  top: ${(props) => props.selectSizePosition.y}px;
  left: ${(props) => props.selectSizePosition.x-215}px;
  z-index: 222;
  opacity: ${props => props.isRender ? 1 : 0};
  transition: opacity 0.6s linear;

`
const SizeModalWrapper = styled(AlignmentWrapper)`
  opacity: 1;
  display: flex;
  justify-content: flex-start;
  position: relative;
  flex-direction: column;
`

const SizeModalHeader = styled(Header2)`
  border-top: none;
  border-right: none;
  border-left: none;
`
const SizeContainer = styled(ColumnContainer)`
  row-gap: 10px;
  padding: 20px;
`
const SizeButton = styled(Button)`
  padding:0 0 0 0;
  margin: 0 0 0 0;
  border-radius: 12px;
  &:hover {
  transition-duration: .3s;
  transform: scale(1.05);
  };
`
const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  width: 32px;
  height: 32px;
  padding: 0;
`;


const SelectSizeModal = ({openSizeModal, setOpenSizeModal, selectSizeRef, skus, settingSku}) => {
  // var skus_ids = Object.keys(props.selectedStyle.skus)
  // var {skus} = props.selectedStyle
  const modalRef = useRef();
  const [selectSizePosition, setSelectSizePosition] = useState(null)
  const [isRender, setIsRender] = useState(false)
  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setOpenSizeModal(false)
    }
  }

  useEffect(() => {
    setIsRender(prev => true)
    // console.log(selectSizeRef.current.getBoundingClientRect())
    setSelectSizePosition(selectSizeRef.current.getBoundingClientRect())
    return function cleanup () {
      console.log('cleanup')
    }
  }, [selectSizeRef])



  return ReactDom.createPortal(
    <div>
      {openSizeModal ?
      <SizeModalBackground
        isRender = {isRender}
        border = {true}
        ref = {modalRef}
        onClick = {closeModal}
        selectSizePosition = {selectSizePosition}
        >
        <SizeModalWrapper>
          <SizeModalHeader
            primary = {true}
            border = {true}
            >Please select a size
                <CloseModalButton
                aria-label='Close modal'
                onClick={() => setOpenSizeModal(prev => false)}
              />
          </SizeModalHeader>
          <SizeContainer>
            {Object.keys(skus).map((sku, index) => {
              if (skus[sku].quantity > 0) {
                return <SizeButton
                key = {sku}
                value = {sku}
                onClick = {(e) => {settingSku(e.target.value); setOpenSizeModal(prev => false)}}
                > Size - {skus[sku].size}
              </SizeButton>
              }})}
          </SizeContainer>
        </SizeModalWrapper>
      </SizeModalBackground> : null}
    </div>, document.getElementById('portal')
  )
}

SelectSizeModal.propTypes = {
  openSizeModal: PropTypes.bool,
  setOpenSizeModal: PropTypes.func,
}

export default SelectSizeModal