# Group1-Project-CLUE

CLUE is a smart plant bot designed to help improve users’ awareness of different environmental conditions ( Temperature, Humidity, and Air Pressure) while promoting a deeper understanding of their well-being and how various weather conditions can affect it. The main target audience is home users, hence individuals interested in monitoring their indoor or outdoor environments to improve their environmental awareness, which can help them plan their daily activities. 

The Raspberry Pi provides power to both micro:bits; hence, the whole device can be switched on using a single cable, which was one of our main goals when designing the physical prototype to ensure ease of use for users, where users can change CLUE’s location easily. 

To acknowledge the user’s presence, CLUE has an HC-SR501 Motion Sensor Module Detector PIR that activates 2 Freenove Neopixel 8 RGB LED Module lights on both sides for a few seconds before they go off again until the motion sensor detects another motion.
There are two micro:bits of V2.2 included in CLUE. One is attached to the 1.8" Colour Display Module for micro:bit (160x128) that displays the weather data that the micro bit sends as a string instead of actual weather data from the Raspberry Pi Sense HAT. The micro bit is also hidden inside the physical prototype. 

The second micro:bit is the top one that displays two facial expressions dependent on the light level: a happy face when light is detected and a sleepy face when there is no light, which indicates the day and night times. Users can manually change the facial expressions for one hour using the buttons provided on the micro:bit A and B, then A would be the happy face, and B would be the sleepy one. 

The LCD display (the middle one, Generic 1602 LCD Screen) is attached to the top micro:bit and displays personalized messages in different cases that depend on the light level detected by the micro:bit and when switched on.

The Sensor HAT's LED matrix display also shows the live weather data. Hence, the user can switch to that side if they don't want the motion sensors, face, and sound to be used. 

Although data isn’t transmitted between the Raspberry Pi and the micro:bit, we still managed to present how CLUE would work as if that process took place. 

We have used Python 3.9 programming language and VScode to program the Raspberry Pi Sense HAT to detect and display humidity, Temperature, and Air Pressure. Javascript to program both micro:bits in the makecode website,  to send the weather data as a string and display it on the 1.8” LCD display, and for the second micro:bit to detect when the device is switched on,  light levels, and control the message displayed on the Generic 1602 LCD Screen. 

