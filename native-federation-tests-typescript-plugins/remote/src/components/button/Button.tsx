interface ButtonProps {
    onClick: () => void
}

const Button = ({onClick}: ButtonProps) => <button onClick={onClick}>Federated button</button>

export default Button