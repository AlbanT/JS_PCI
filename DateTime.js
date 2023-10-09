alert(now().standard);

function now() {
	var currentTime = new Date()

	var month = currentTime.getMonth() + 1; //getMonth returns 0-11
	var day = currentTime.getDate();
	var year = currentTime.getFullYear(); 

	var hours = currentTime.getHours();
	var minutes = currentTime.getMinutes();
	var seconds = currentTime.getSeconds();

	// pad with a leading 0 to 2 digits when the value is only 1 digit long
	day = day < 10 ? "0" + day : day;
	month = month < 10 ? "0" + month : month;
	seconds = seconds < 10 ? "0" + seconds : seconds;
	minutes = minutes < 10 ? "0" + minutes : minutes;
	hours = hours < 10 ? "0" + hours : hours;

	var year_short = String(year).substring(2,4);

	return {
		 standard: day + "-" + month + "-" + year + " " + hours + ":" + minutes + ":" + seconds,
		 standard_usa: month + "\\" + day + "\\" + year + " " + hours + ":" + minutes + ":" + seconds,
		 iso: year + month + day + "_" + hours + minutes + seconds,
		 iso_date_only: "" + year + month + day,
		 iso_date_only_short_year: "" + year_short + month + day,
		 unix: currentTime.getTime(),
		 year: year,
		 year_short: year_short,
		 month: month,
		 day: day,
		 hours: hours,
		 minutes: minutes,
		 seconds: seconds
	}
}