export class Widget{
	public row:string;
	public column:string;

	constructor(row:string, column:string) {
		this.row = row;
		this.column = column;
	}

	display(content:string) {
		return (`
			<div class="widget-container" style="grid-row: ${this.row}; grid-column: ${this.column};">
				${content}
			</div>
		`);
	}
}