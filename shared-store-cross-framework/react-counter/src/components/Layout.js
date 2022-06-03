import styled from 'styled-components';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  .icon {
    height: 20px;
  }

  .caption {
    display: flex;
    gap: 8px;
    align-items: center;
  }
`;

export default Layout;
