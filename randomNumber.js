function RandomGetal(MaxValue) {
    return Math.floor(Math.random()*(MaxValue+1));
}

function randomIntFromInterval(min,max) {
	//http://stackoverflow.com/questions/4959975/generate-random-value-between-two-numbers-in-javascript
    return Math.floor(Math.random()*(max-min+1)+min);
}

alert(RandomGetal(10)); //random number between 0 and 10
alert(randomIntFromInterval(12,25)); //random number between 12 and 25