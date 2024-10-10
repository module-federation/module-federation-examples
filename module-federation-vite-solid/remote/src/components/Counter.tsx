import { createSignal } from "solid-js";

export default () => {
	const [count, setCount] = createSignal(0);
	return (
		<button
			style={{
				border: '0 solid #e2e8f0',
				"margin-top": '10px',
				"background-color": 'rgb(246, 179, 82)',
				"border-radius": '.25rem',
				"font-weight": '700',
				padding: '.5rem 1rem .5rem 1rem',
				color: 'rgb(24, 24, 24)',
			}}
			onClick={() => setCount(count() + 1)}
		>
			Remote counter: {count()}
		</button>
	);
};
