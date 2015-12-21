// GLOBAL VARIABLES & OBJECTS
var circle = $("#circle"),

	// Do I need to target the parent element?
	suspect = $("div"),
	
	link = $("a").parent(),
	carousel = $(".carousel"),
	//event = $(event),
	average = function (total,events) {
		return total/events;
	},
	touch = {
		distance : 0,
		velocity : 0,
		deltaTime : 0,
		center : 0,
		touches : 0,
		threshold : 0
	},
	
	intendedTap = {
		distance : 0,
		velocity : 0,
		deltaTime : 0,
		center : 0,
		taps : 0,
		threshold: 0
	},
	
	intendedSwipe = {
		distance : 0,
		velocity : 0,
		deltaTime : 0,
		center : 0,
		swipes : 0
	};

// INIT HAMMER
link.hammer();
link.on("tap" "swipe" "scroll", function( event ){
	
	// Detect gesture parameters
	//console.log(event.gesture);
	
	// Run main functions
	detect(event);
	reSet(event);
});

// To detect what the intended target of the event likely was
function detect(ev) {
	var intended = "";
	var target = $(ev.target);
	//var newDistance = ev.distance;

	// if (target.has(link)) {
	if (target = $("a")) {
		intended = "tap";
		intendedTap.distance += ev.gesture.distance;
		intendedTap.deltaTime += ev.gesture.deltaTime;
		intendedTap.taps ++;
	} else if (ev.target in carousel) {
		intended = "swipe";
		intendedSwipe.distance += ev.distance;
		intendedSwipe.swipes ++;
	} else {
		intended = ev.type;
		touch.distance += ev.distance;
		touch.touches ++;
	}

};

// TO RECALIBRATE THE THRESHOLDS BASED ON THE VALUES of the event
function reSet(ev) {
    if (intendedTap.distance > 0) {
    	var distance = parseInt(intendedTap.distance);
    	var eventX = parseInt(intendedTap.taps);
    	var newAverage = distance / eventX;
    	//console.log(distance, eventX, newAverage);
    	link.data('hammer').get('tap').set({threshold:newAverage});
    	console.log(link.data('hammer').get('tap').options.threshold);
    	//link.css("width",newAverage*2).css("height",newAverage*2);
    } if (intendedTap.deltaTime > 0) {
    	var totalTime = parseInt(intendedTap.deltaTime);
    	var eventX = parseInt(intendedTap.taps);
    	var newAverage = totalTime / eventX;
    	console.log(totalTime, newAverage);
    	if (newAverage > 250) {
    		console.log(totalTime, eventX, newAverage);
    		link.data('hammer').get('tap').set({time:newAverage});
    		console.log(link.data('hammer').get('tap').options.time);
    	};
    };
};