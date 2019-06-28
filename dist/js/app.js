$(document).ready(function(){

	const calendar = $('.calendar');

	const language = document.documentElement.lang;

	const countMonth = calendar.data('count-month');
	const countDay = calendar.data('count-day');
	const minDate = calendar.data('min-date');
	const availableDay = calendar.data('available-day');
	const notActiveDays = calendar.data('not-active-days');
	const dateDefault = calendar.data('date-default');

	function showTourDates() {
		const date = $.datepicker.formatDate("dd M yy", $(this).datepicker('getDate'));

		alert(`Выбрана дата: ${date} \r\nПродолжительность тура: ${countDay} дня` );

		const highlight = () => {
			const activeDays = calendar.find('td:not(.ui-datepicker-unselectable)');
			const allActiveDays = activeDays.length;
			const current = activeDays.index($('.ui-datepicker-current-day'));

			activeDays.slice(current, current+countDay).addClass('highlight');			
		}
		setTimeout(highlight, 10);
	};


	function disableDates(date) {

		const currentDay = date.getDay();

		let m = date.getMonth();
		let d = date.getDate();
		const y = date.getFullYear();

		if ( d<10 ) { d = '0' + d };
		if ( m<10 ) {
			 	m = '0' + (m + 1);
			} else {
				m = m + 1;
			};

		const currentDate =  y + '-' + m + '-' + d ;

		const disabledDays = availableDay.split(',')
		.map((n) => {
			if (n === '7') {
				return 0
			} else {
				return Number(n) 
			}
		});

		const disabledDates = notActiveDays.split(',');

		if ($.inArray(currentDate, disabledDates) != -1 ) {
			return [false];
		} else if ($.inArray(currentDay, disabledDays) === -1) {
			return [false]; 
		} else { 
			return [true];
		}
	};

	$.datepicker.setDefaults( $.datepicker.regional[ language ] );

	calendar.datepicker({
		numberOfMonths: countMonth,
		dateFormat: 'yy-mm-dd',
		range: 'period',
		onSelect: showTourDates,
		minDate: new Date(minDate),
		hideIfNoPrevNext: true,
		beforeShowDay: disableDates
	});

	if((dateDefault).length < 1) {
		dateDefault = 0;
	};
	
	calendar.datepicker( "setDate", dateDefault );

});
