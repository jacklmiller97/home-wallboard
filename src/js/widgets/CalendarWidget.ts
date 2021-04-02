import { Widget } from './Widget';

export class CalendarWidget extends Widget {
	private embed:string;

	constructor(row:string, column:string, embed:string) {
		super(row, column);

		this.embed = embed;
	}

	display() {
		return super.display(this.embed);
	}
}