import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactDom from 'react-dom';

import {ColumnContainer, RowContainer, AlignmentWrapper, Theme, MainHeader} from '../../styles/Boxes.jsx'
import {Title, Header3} from '../../styles/Headers.jsx';
import Button from '../../styles/Buttons.jsx'
import {CloseModalButton} from '../../styles/Icons.jsx'


const SizeModalBackground = styled(ColumnContainer)`
  justify-content: flex-start;
  align-items: center;
  background: #FAFAFA;
  position: absolute;
  border-radius: 12px;
  top: ${(props) => window.scrollY + props.selectSizePosition.y}px;
  left: ${(props) => window.scrollX + props.selectSizePosition.x - 245}px;
  z-index: 222;
  @keyframes fadein {
    from { opacity: 0; }
    to { opacity: 1; }
  };
  animation: fadein .3s linear;

`
const SizeModalWrapper = styled(AlignmentWrapper)`
  opacity: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  column-gap:15px;

`

const SizeModalHeader = styled(Header3)`
  border-top: none;
  border-right: none;
  border-left: none;
  font-size: 18px;
`
const SizeContainer = styled(ColumnContainer)`
  row-gap: 10px;
  padding: 20px;
`
const SizeButton = styled(Button)`
  padding:0 0 0 0;
  margin: 0 0 0 0;
  border-radius: 12px;
  width:50%;
  &:hover {
  transition-duration: .3s;
  transform: scale(1.05);
};
  font-size:14px;
  font-weight:600;
  height:32px;
`

const SelectSizeModal = ({openSizeModal, setOpenSizeModal, selectSizeRef, skus, settingSku, cartButtonRef}) => {


  const [selectSizePosition, setSelectSizePosition] = useState(null)
  const [ourPosition, setOurPosition] = useState(null)
  const modalRef = useRef();
  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setOpenSizeModal(false)
    }
  }



  useEffect(() => {

    const handleResize = () => {
      setOpenSizeModal(false)
    }
    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleResize)
    setSelectSizePosition(selectSizeRef.current.getBoundingClientRect())
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleResize)


    }
  }, [modalRef, selectSizeRef])


  return ReactDom.createPortal(

    <div>
      {selectSizePosition ?  <SizeModalBackground
        // isRender = {isRender}
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
            </SizeButton>}})}
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