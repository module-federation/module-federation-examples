import styled from 'styled-components';

const Button = styled.button`
  height: 65px;
  width: 65px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background-color: #bce1ff;
  color: #02638e;
  font-size: 40px;
  text-align: center;
  box-shadow: rgb(50 50 93 / 25%) 0px 2px 5px -1px, rgb(0 0 0 / 30%) 0px 1px 3px -1px;
  cursor: pointer;

  & + & {
    margin-left: 8px;
  }
`;

export default Button;
