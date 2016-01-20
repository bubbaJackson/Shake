# Shake
This is a script using hammer js to give adaptive parameters for some basic touch events to people with shaky hands.

Initially I redefined the threshholds in jQuery mobile to twice the radius. There's a fork of that on GitHub. But that didn't seem like a solution, so with the help of the hammer.js library I decided to try to create an adaptive parameter which will adjust over time to encompass the users level of tremor.

To do this it will try to detect what a probably target of a tap event would be (for example a link or button tag). Then once registering this, it will detect if the event did not register as what was predicted, and if that's the case it will redefine the threshhold of that event parameter to be equal to a number marginally greater than the average of all the deviations registered. It will also in sucession redefine the other touch events such as swipe, scroll, and hold to encompass this definition.

The idea would be to package this script into a browser plugin, and save the events over time so that the more a user used the browser, the more it would 'learn' about how to cater touch events to that particular person.

I'm not a developer, and so I've taken this as far as I can. My hope is to package this in the near future into a Firefox plugin for it's Android browser and do user testing on different types of users, and with the data I get from that to release the plugin. 

I'm thankful for any feedback, comments, constructive criticism, or help! 
