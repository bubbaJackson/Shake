# Shake
This is a script using hammer js to give adaptive parameters for some basic touch events to people with shaky hands.

I've added a layer to the jQuery version of Hammer.js to allow the browser to store the values of 'suspected' tap events and redefine the thresholds in future events if the average value is greater than the currently defined (default) thresholds. The idea at this stage is to develop consequent thresholds for the other events, put the script into a broswer plugin for Firefox, and test it on mobile devices to collect data, and see if the usability of touch devices is better for people suffering from tremors in their hands. 

I thankful for any feedback, comments, constructive criticism, or help! 
