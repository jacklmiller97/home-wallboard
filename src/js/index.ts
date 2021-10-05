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
		data  : `<div style="display: flex; justify-content:center;"><iframe src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=America%2FNew_York&amp;src=aDYxY3E0NWw2ZnF0OXB0cnFrN25nZG1hcWNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&amp;color=%23009688&amp;color=%23009688&amp;mode=MONTH&amp;showTitle=0&amp;showNav=1&amp;showDate=1&amp;showPrint=0&amp;showTabs=0&amp;showCalendars=0&amp;showTz=0" style="border:solid 1px #777" width="90%" height="500" frameborder="0" scrolling="no"></iframe></div>`,
		row    : "1",
		column : "1 / -1",
	},
	{
		type : "WeatherWidget",
		data : `<div style="display: flex; justify-content: center; padding: 1rem 0;"><a class="weatherwidget-io" style="width: 90%" href="https://forecast7.com/en/27d75n82d63/saint-petersburg/?unit=us" data-label_1="ST. PETERSBURG" data-label_2="WEATHER" data-font="Roboto" data-icons="Climacons Animated" data-textcolor="#ffffff" >ST. PETERSBURG WEATHER</a> </div>`,
		row : "2",
		column : "1 / 2",
	},
	{
		type : "WeatherWidget",
		data : `<div style="display: flex; justify-content: center; padding: 1rem 0;"><a class="weatherwidget-io" style="width: 90%" href="https://forecast7.com/en/39d68n75d75/newark/?unit=us" data-label_1="NEWARK" data-label_2="WEATHER" data-font="Roboto" data-icons="Climacons Animated" data-textcolor="#ffffff" >NEWARK WEATHER</a></div>`,
		row : "2",
		column : "2 / 3",
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

	function renderWeather(d:any,s:any,id:any){
		var js,
		fjs    = d.getElementsByTagName(s)[0],
		js     = d.createElement(s);

		js.id  = id;
		js.src = 'https://weatherwidget.io/js/widget.min.js';
		fjs.parentNode.insertBefore(js,fjs);
	};

	renderWeather(document,'script','weatherwidget-io');

	setTimeout(renderWidgets, 1000 * 60 * 10);
}

function alert(content : string) {
	const alert   = `<div class="alert" data-right data-down>${content}</div>`;
	let element = (new DOMParser).parseFromString(alert, "text/html");

	if (!element || !element.body.firstChild){
		return;
	}

	const node = element.body.firstChild;

	document.body.append(node);
}

function animateAlerts() {
	const alerts = document.querySelectorAll('.alert');

	alerts.forEach((alert) => {
		const alertElement = alert as HTMLElement;
		const boundingBox  = alertElement.getBoundingClientRect();
		let   newLeft      = boundingBox.left;
		let   newTop       = boundingBox.top;

		if (boundingBox.top < 0) {
			alertElement.removeAttribute('data-up')
			alertElement.setAttribute('data-down', '');
		}

		if (boundingBox.left < 0) {
			alertElement.removeAttribute('data-left')
			alertElement.setAttribute('data-right', '');
		}

		if (boundingBox.right > (window.innerWidth || document.documentElement.clientWidth)) {
			alertElement.removeAttribute('data-right')
			alertElement.setAttribute('data-left', '');
		}

		if (boundingBox.bottom > (window.innerHeight || document.documentElement.clientHeight)) {
			alertElement.removeAttribute('data-down')
			alertElement.setAttribute('data-up', '');
		}

		if (alertElement.hasAttribute('data-right')) {
			newLeft += 3;
		}
		else if (alertElement.hasAttribute('data-left')) {
			newLeft -= 5;
		}

		if (alertElement.hasAttribute('data-down')) {
			newTop += 2;
		}
		else if (alertElement.hasAttribute('data-up')) {
			newTop -= 6;
		}

		alertElement.style.left = `${newLeft}px`;
		alertElement.style.top  = `${newTop}px`;
	});

	setTimeout(animateAlerts, 10);
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
	animateAlerts();
});