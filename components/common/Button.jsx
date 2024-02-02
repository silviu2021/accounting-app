import styled from "styled-components";

const StyledButton = styled.div`
  border-radius: 5px;
  border: 1px solid white;
  padding: 5px;
  cursor: pointer;
  display: inline-block;
`;

export default ({ children, onClick, className }) => {
  return (
    <StyledButton className={className} onClick={onClick}>
      {children}
    </StyledButton>
  );
};
