import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 5px solid #edebfc;
  border-radius: 30px;
  padding: 0 40px 40px 40px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
    'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';

  &.main {
    height: 100%;
    border: none;
    border-radius: 0;
    padding: 0 0 30px 0;
    gap: 10px;
  }
`;

export default Container;
