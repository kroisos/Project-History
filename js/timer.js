"use strict"

var Timer = {
	Delta: 0,
	PrevTimeStamp: null
}

function TimerUpdate(TimeStamp) {
	if (Timer.PrevTimeStamp !== null) {
		Timer.Delta = TimeStamp - Timer.PrevTimeStamp
	}
	Timer.PrevTimeStamp = TimeStamp
}
