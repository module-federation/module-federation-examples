import styled from 'styled-components';

const Layout = styled.div`
  display: flex;
  justify-content: space-around;
  height: 100%;
  align-items: center;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

export default Layout;
