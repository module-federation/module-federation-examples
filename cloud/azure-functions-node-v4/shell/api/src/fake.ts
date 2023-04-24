export default function Fake() {
	return {
		get: () => Promise.resolve(() => {}),
		init: () => {},
	};
}
