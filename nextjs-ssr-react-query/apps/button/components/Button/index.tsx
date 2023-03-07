import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 8px 16px;
  font-size: 1rem;
  font-weight: 700;
  color: white;
  background-color: #2e80fa;
  border-radius: 0.25rem;
`;

export type ButtonProps = React.HTMLAttributes<HTMLButtonElement>;

export function Button({ children, ...rest }: ButtonProps) {
  return <StyledButton {...rest}>{children}</StyledButton>;
}

export default Button;
