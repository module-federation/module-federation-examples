import { Component, signal } from '@angular/core';

@Component({
	selector: 'app-remote-counter',
	standalone: true,
	template: `
		<button
			style="
        border: 0 solid #e2e8f0;
        margin-top: 10px;
        backgroundColor: rgb(246, 179, 82);
				borderRadius: .25rem;
				fontWeight: 700;
				padding: .5rem 1rem .5rem 1rem;
				color: rgb(24, 24, 24);
			"
			(click)="increment()"
		>
			Remote counter: {{ count() }}
		</button>
	`,
})
export class CounterComponent {
	count = signal(0);

	increment() {
		this.count.update((value) => ++value);
	}
}
