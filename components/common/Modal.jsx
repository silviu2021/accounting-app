import { useState } from "react";
import styled from "styled-components";
import CloseIcon from "../../icons/close.svg?react";

const StyledModal = styled.div`
  background-color: black;
  height: 100vh;
  overflow-y: scroll;
  width: 320px;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 99;
  border-left: 1px solid #fff;
  padding-left: 10px;
  @media (max-width: 320px) {
    width: 100%;
    border-left: none;
    padding-left: 0px;
  }

  .close {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    &:hover {
      color: gray;
    }
  }
  .title {
    margin: 10px 50px 10px 0px;
    font-size: 20px;
    font-weight: bold;
  }
  .contnet{
    margin-right: 10px;
    margin-top: 20px;
  }
`;

export default ({ children, title, isOpen, handleClose }) => {
  return (
    <StyledModal style={{ display: `${isOpen ? "block" : "none"}` }}>
      <div className="close" onClick={handleClose}>
        <CloseIcon />
      </div>
      <div className="title">{title}</div>
      <div className="contnet">{children}</div>
    </StyledModal>
  );
};
