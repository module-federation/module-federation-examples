interface InnerButtonProps {
    onClick: () => void
}

const InnerButton = ({onClick}: InnerButtonProps) => <button onClick={onClick} />

export default InnerButton