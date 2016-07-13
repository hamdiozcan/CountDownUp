/**********************************************************************************************
* Hamdi OZCAN - ozcan.com
* Count Up/CountDown
**********************************************************************************************/

function Counter(initDate, id, today){
    this.counterDate = new Date(initDate);
    this.countainer = document.getElementById(id);
    this.numOfDays = 365;
    this.borrowed = 0, this.years = 0, this.months = 0, this.days = 0;
    this.hours = 0, this.minutes = 0, this.seconds = 0;
    this.today = new Date(today);
    this.updateNumOfDays();
    this.updateCounter();
}

Counter.prototype.updateNumOfDays=function(){

    var currYear = this.today.getFullYear();
    if ( (currYear % 4 == 0 && currYear % 100 != 0 ) || currYear % 400 == 0 ) {
        this.numOfDays = 366;
		}
    var self = this;
    setTimeout(function(){self.updateNumOfDays();}, (new Date((currYear+1), 1, 2) - this.today));
}

Counter.prototype.dayofyear=function(date){
	var diff = Math.floor((date - new Date(date.getFullYear(), 0, 0))/86400000);
	if ( (date.getFullYear() % 4 == 0 && date.getFullYear() % 100 != 0 ) || date.getFullYear() % 400 == 0 ) {
        diff = diff -1;
		}
	return(diff); 
}

Counter.prototype.datePartDiff=function(then, now, MAX){
    var diff = now - then - this.borrowed;
    this.borrowed = 0;
    if ( diff > -1 ) return diff;
    this.borrowed = 1;
    return (MAX + diff);
}

Counter.prototype.calculate=function(){
    var futureDate = this.counterDate > this.today? this.counterDate : this.today;
    var pastDate = this.counterDate == futureDate? this.today : this.counterDate;
    this.seconds = this.datePartDiff(pastDate.getSeconds(), futureDate.getSeconds(), 60);
    this.minutes = this.datePartDiff(pastDate.getMinutes(), futureDate.getMinutes(), 60);
    this.hours = this.datePartDiff(pastDate.getHours(), futureDate.getHours(), 24);
    this.days = this.datePartDiff(this.dayofyear(pastDate), this.dayofyear(futureDate), this.numOfDays);
    this.years = this.datePartDiff(pastDate.getFullYear(), futureDate.getFullYear(), 0);
    this.today.setSeconds(this.today.getSeconds()+1);
}

Counter.prototype.addLeadingZero=function(value){
    return value < 10 ? ("0" + value) : value;
}

Counter.prototype.addUnit=function(value, unit, bit){
    return value == 0 && bit == 1 ? "" : value + unit;
}

Counter.prototype.formatTime=function(){
    this.seconds = this.addLeadingZero(this.seconds);
    this.minutes = this.addLeadingZero(this.minutes);
    this.hours = this.addLeadingZero(this.hours);
    this.days = this.addUnit(this.days, " day, ",1);
    this.years = this.addUnit(this.years, " year, ",1);
    this.seconds = this.counterDate > this.today? this.addUnit(this.seconds, " hour remaining ...") : this.addUnit(this.seconds, " hour passed ...");
}

Counter.prototype.updateCounter=function(){
    this.calculate();
    this.formatTime();
    this.countainer.innerHTML = this.years +
        this.days +
        this.hours + ":" +
        this.minutes + ":" +
        this.seconds ;
    var self = this;
    setTimeout(function(){self.updateCounter();}, 1000);
}

window.onload=function(){  }
