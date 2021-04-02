import { Widget } from './Widget';

export class WeatherWidget extends Widget {
	private text:string;

	constructor(row:string, column:string, text:string) {
		super(row, column);
		this.text = text;
	}

	display() {
		return super.display(this.text);
	}
}