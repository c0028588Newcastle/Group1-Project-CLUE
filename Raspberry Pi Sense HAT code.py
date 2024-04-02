from sense_hat import SenseHat
import time

# Initialize Raspbery Pi Sense HAT
sense = SenseHat()

# Define colors for the weather conditions
RED = (255, 0, 0) # Temperatur, humidity and air pressure

# set the message format that is going to be displayed on the Sense Hat LED matrix
def message_setup(temperature, humidity, pressure):
    message = "Temp: {:.1f}C, Humidity: {:.1f}%, Pressure: {:.1f}hPa".format(temperature, humidity, pressure)
    message_with_color = message.replace("Temp", "[T]Temp[/T]").replace("Humidity", "[H]Humidity[/H]").replace("Pressure", "[P]Pressure[/P]")
    return message_with_color

while True:
    # to have the sense HAT to read temperature, Humidity and Pressure sensor
    temperature = sense.get_temperature()
    humidity = sense.get_humidity()
    pressure = sense.get_pressure()

    # to display the message of weather conditions in red
    formatted_message = format_message(temperature, humidity, pressure)

    # Tp slow the scrlling speed when displaying the message of the weather conditions
    sense.show_message(formatted_message, text_colour=RED, back_colour=[0, 0, 0], scroll_speed=0.1)  

    # To wait for few seconds before displaying the message again with the new weather data
    time.sleep(5)