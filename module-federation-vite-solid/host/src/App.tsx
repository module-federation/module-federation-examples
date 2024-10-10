import { lazy, Suspense } from 'solid-js';
import Counter from './components/Counter';
import './App.css'

export default () => {
	const Remote = lazy(
		// @ts-ignore
		async () => import('remote/remote-app'),
	);

	console.log('Host here');

	return (
		<>
			<div class="host">
				<div class="card">
					<div class="icon">
						<svg
							enable-background="new 0 0 512 512"
							height="512px"
							id="Layer_1"
							version="1.1"
							viewBox="0 0 512 512"
							width="512px"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M316.01,199.02L256.134,14.817L196.239,199.02H1.134l158.102,113.324L98.53,496.487l157.604-114.232  l157.585,114.232l-60.687-184.143L511.134,199.02H316.01z M335.084,318.257l42.407,128.63L267.22,366.963l-11.086-8.033  l-11.086,8.033l-110.291,79.923l42.408-128.63l4.353-13.18l-11.289-8.08L59.903,217.909h136.336h13.724l4.242-13.051l41.929-128.957  l41.91,128.957l4.242,13.051h13.724h136.336l-110.327,79.088l-11.27,8.08L335.084,318.257z"
								fill="#37404D"
							/>
						</svg>
					</div>
					<div class="title">I'm the host app</div>
					<Counter />
				</div>
			</div>

			<Suspense fallback="loading...">
				<Remote />
			</Suspense>
		</>
	);
};
