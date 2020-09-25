import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { colors } from './../../constants'

import { Card, Button } from 'components'

function Modal({ title, children, button, onSubmit, closeModal, ...rest }) {
  const overlay = useRef()

  useEffect(() => {
    console.log(document.body.style.overflow)
    document.body.style.overflow = "hidden"
    return () => document.body.style.overflow = ""
  }, [])

  const handleOverlayClick = e => {
    if (e.target !== overlay.current) return
    closeModal()
  }

  return (
    <Overlay ref={overlay} onClick={handleOverlayClick}>
      <Dialog {...rest}>
        <DialogHeader>
          <h3>{ title }</h3>
          <CloseButton onClick={closeModal}><Close className="fa fa-times" /></CloseButton>
        </DialogHeader>
        <DialogBody>
          { children }
        </DialogBody>
        <DialogFooter>
          <Button color="secondary" onClick={closeModal}> Close </Button>
          <Button color="primary" onClick={() => onSubmit()}>{ button }</Button>
        </DialogFooter>
      </Dialog>
    </Overlay>
  )
}

const Overlay = styled.div`
  z-index: 100;
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.75);

  display: flex;
  justify-content: center;
  align-items: center;
`

const Dialog = styled(Card)`
  z-index: 101;
  padding: 0;
  width: 500px;
  background: white;
  border: none;
`

const DialogHeader = styled.div`
  padding: 15px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgb(237, 240, 242);
  background: rgb(246, 247, 248);
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
`

const DialogBody = styled.div`
  padding: 15px;
  max-height: 60vh;
  overflow-y: scroll;
`

const DialogFooter = styled.div`
  padding: 15px;
  display: flex;
  justify-content: flex-end;
  grid-gap: 10px;
  border-top: 1px solid rgb(237, 240, 242);
  background: rgb(246, 247, 248);
  border-bottom-left-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
`

const CloseButton = styled.button`
  all: unset;
`;

const Close = styled.span`
  padding: 5px;
  height: 26px;
  width: 26px;
  color: ${colors.secondary.hard};
  border-radius: 0.25rem;

  &::before {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &:hover {
    background: ${colors.secondary.soft};
  }
`


export default Modal
