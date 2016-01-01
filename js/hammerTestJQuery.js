// GLOBAL VARIABLES & OBJECTS - Initially I started with a defined object for testing but expanded to all <a> tags in order to target anything with a link as a potential button press. This seems like the only way to go via Hammer

var link = $("a"),
	body = $('body'),
	carousel = $(".carousel"),
	//tapThreshold = link.data("hammer").get("tap").options.threshold,

	average = function(total,events) {
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
body.hammer();
body.on("tap swipe hold", link, function(ev) {
	// Detect gesture parameters
	//console.log(ev.gesture);
	
	// Run main functions
	detect(ev);
	reSet(ev);
});

// To detect what the intended target of the event likely was
function detect(ev) {
	// Variables
	var intended = "";
	var target = $(ev.target);

	// Where is a swipe likely? For example a carousel class, where if there is a significant increase in the ev.gesture.distance then assume that this is a swipe, if not, is the target a link, else it is what it is.
	if ( (ev.target in carousel) && (ev.gesture.distance > (tapThreshold * 2)) ) {
		intended = "swipe";
		intendedSwipe.distance += ev.gesture.distance;
		intendedSwipe.deltaTime += ev.gesture.deltaTime;
		intendedSwipe.swipes ++;
	} 
	// if (target = $("a"))
	else {
		intended = "tap";
		intendedTap.distance += ev.gesture.distance;
		intendedTap.deltaTime += ev.gesture.deltaTime;
		intendedTap.taps ++;
	} 
	/*
	else {
		intended = ev.type;
		touch.distance += ev.distance;
		touch.touches ++;
	}
	*/
};

// TO RECALIBRATE THE THRESHOLDS BASED ON THE VALUES of the event
function reSet(ev) {
    if (intendedTap.distance > 0) {
    	var distance = parseInt(intendedTap.distance);
    	var eventX = parseInt(intendedTap.taps);
    	var newAverage = distance / eventX;
    	// console.log(distance, eventX, newAverage);

    	//If the new values > default values
    	if (newAverage > 2) {
    		body.data('hammer').get('tap').set({threshold:newAverage});
    		console.log("New tap threshold: " + body.data('hammer').get('tap').options.threshold);
    		//link.css("width",newAverage*2).css("height",newAverage*2);
    	}
    	
    } if (intendedTap.deltaTime > 0) {
    	var totalTime = parseInt(intendedTap.deltaTime);
    	var eventX = parseInt(intendedTap.taps);
    	var newAverage = totalTime / eventX;
    	//console.log(totalTime, newAverage);

    	//If the new values > default values
    	if (newAverage > 250) {
    		//console.log(totalTime, eventX, newAverage);
    		body.data('hammer').get('tap').set({time:newAverage});
    		console.log("New time threshold: " + body.data('hammer').get('tap').options.time);
    	};
    };
};