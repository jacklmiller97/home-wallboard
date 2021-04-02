// Widgets
import { TextWidget } from './widgets/TextWidget';
import { CalendarWidget } from './widgets/CalendarWidget';
import { WeatherWidget } from './widgets/WeatherWidget';

// Styles
import '../scss/style.scss';

// Images
import '../img/wallpapers/starry_night.jpg';

interface Widgets {
	type: string,
	data: string,
	row: string,
	column: string,
}

const widgets: Widgets[] = [
	{
		type   : "CalendarWidget",
		data  : `<div style="display: flex; justify-content:center;"><iframe src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=2&amp;bgcolor=%23ffffff&amp;ctz=America%2FNew_York&amp;src=aDYxY3E0NWw2ZnF0OXB0cnFrN25nZG1hcWNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&amp;color=%23009688&amp;color=%23009688&amp;mode=MONTH&amp;showTitle=0&amp;showNav=1&amp;showDate=1&amp;showPrint=0&amp;showTabs=0&amp;showCalendars=0&amp;showTz=0" style="border:solid 1px #777" width="90%" height="500" frameborder="0" scrolling="no"></iframe></div>`,
		row    : "1",
		column : "1 / -1",
	},
	{
		type : "WeatherWidget",
		data : `<a class="weatherwidget-io" href="https://forecast7.com/en/27d75n82d63/saint-petersburg/" data-label_1="ST. PETERSBURG" data-label_2="WEATHER" data-theme="original" >ST. PETERSBURG WEATHER</a>
				<script>
				!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src='https://weatherwidget.io/js/widget.min.js';fjs.parentNode.insertBefore(js,fjs);}}(document,'script','weatherwidget-io-js');
				</script>`,
		row : "2",
		column : "1 / -1",
	}
];

function renderWidgets() {
	if (widgets.length === 0) {
		return;
	}

	const grid = document.querySelector('.widget-grid');

	if (!grid) {
		throw new Error("Could not find Widget Grid");
	}

	grid.innerHTML = "";

	widgets.forEach((widget) => {
		let renderWidget;

		switch(widget.type) {
			case "TextWidget":
				renderWidget = new TextWidget(widget.row, widget.column, "Test");
				break;
			case "CalendarWidget":
				renderWidget = new CalendarWidget(widget.row, widget.column, widget.data);
				break;
			case "WeatherWidget":
				renderWidget = new WeatherWidget(widget.row, widget.column, widget.data);
				break;
			default :
				renderWidget = null;
		}

		if (!renderWidget) {
			throw new Error("Invalid Widget");
		}

		let html = renderWidget.display();
		let doc = (new DOMParser).parseFromString(html, "text/html");

		if (!doc.body.firstChild){
			return;
		}

		grid.append(doc.body.firstChild);
	});

	setTimeout(renderWidgets, 1000 * 60 * 10);
}

function refreshDateTime() {
	const date = new Date();
	const weekdays = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const dayName     = weekdays[date.getDay()];
	const month       = months[date.getMonth()];
	const day         = date.getDate();
	const year        = date.getFullYear();
	const hour        = ((date.getHours() + 11) % 12 + 1);
	const minute      = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
	const meridiem    = date.getHours() >= 12 ? "PM" : "AM";
	const currentTime = hour + ":" + minute + meridiem;

	const dayElement       = document.querySelector('.day');
	const monthYearElement = document.querySelector('.monthyear');
	const timeElement      = document.querySelector('.time');

	if (!dayElement || !monthYearElement || !timeElement) {
		throw new Error("Can't find date elements");
	}

	dayElement.innerHTML = dayName;
	monthYearElement.innerHTML = `${month} ${day}, ${year}`;
	timeElement.innerHTML = currentTime;

	setTimeout(refreshDateTime, 1000);
}

document.addEventListener("DOMContentLoaded", function(event) {
	refreshDateTime();
	renderWidgets();
});