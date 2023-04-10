interface AnotherButtonProps {
    onClick: () => void
}

const AnotherButton = ({onClick}: AnotherButtonProps) => <button onClick={onClick}>Another federated button</button>

export default AnotherButton