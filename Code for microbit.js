// To display a welcome message of "You're awesome ^-^" on the LCD screen and a heart icon on the micro:bit LED display
function Start () {
    start = true
    I2C_LCD1602.LcdInit(0)
    I2C_LCD1602.ShowString("You're awesome", 0, 0)
    I2C_LCD1602.ShowString("^_^", 0, 22)
    music.play(music.builtinPlayableSoundEffect(soundExpression.giggle), music.PlaybackMode.UntilDone)
    basic.showIcon(IconNames.Heart)
    basic.pause(2000)
    SwitchFace()
}
// To display the message of "Hey, stay hydrated" on the LCD screen and a smiley face on the micro:bit LED display
function ButtonA () {
    basic.showIcon(IconNames.Fabulous)
    I2C_LCD1602.clear()
    I2C_LCD1602.ShowString("Hey, stay", 0, 0)
    I2C_LCD1602.ShowString("hydrated", 0, 22)
    music._playDefaultBackground(music.builtInPlayableMelody(Melodies.PowerUp), music.PlaybackMode.UntilDone)
    basic.pause(500)
    off = false
    SwitchFace()
}
// To display the message of "Bye, take care" on the LCD screen and a sleepy face on the micro:bit LED display
function ButtonB () {
    basic.showIcon(IconNames.Asleep)
    I2C_LCD1602.clear()
    I2C_LCD1602.ShowString("Bye, take care", 0, 0)
    music._playDefaultBackground(music.builtInPlayableMelody(Melodies.PowerDown), music.PlaybackMode.UntilDone)
    basic.pause(5000)
    basic.clearScreen()
    I2C_LCD1602.clear()
    off = true
    return
}

// To display a Happy face when light is detetced and a sleepy face when light isn't detetced on the micro:bit LED  
function SwitchFace () {
    switch (state) {
        case 0:  // No light is detected - Sound is played and a sleepy face is displayed on the micro:bit LED display
            basic.showIcon(IconNames.Asleep)
            I2C_LCD1602.clear()
            I2C_LCD1602.ShowString("Bye, take care", 0, 0)
            music.playSoundEffect(music.builtinSoundEffect(soundExpression.slide), SoundExpressionPlayMode.UntilDone)
            break;
        case 1: //Light is detected- play a different sound and a Happy face on the micro:bit LED display 
            basic.showIcon(IconNames.Happy)
            I2C_LCD1602.clear()
            I2C_LCD1602.ShowString("Hey, stay", 0, 0)
            I2C_LCD1602.ShowString("hydrated", 0, 22)
            music.playSoundEffect(music.builtinSoundEffect(soundExpression.happy), SoundExpressionPlayMode.UntilDone)
            break
    }
}
let lightLevel = 0  // Light level to detetc when there is light
let motionDetected = 0 // Motion sensor value to detetc motion
let offTimer = 0
let off = false 
let start = false
let maxLight = 1

// 0 = idle, 1 = lightHappy, 2 = lightSad
let state = 1

let strip2 = neopixel.create(DigitalPin.P2, 8, NeoPixelMode.RGB)
let offTime = 100

// Main Function
basic.forever(function () {
    // On Startup
    if (!(start)) {
        Start()
    }
    input.onButtonPressed(Button.A, () => { ButtonA() })


// If device is off
    if (off) {
        basic.pause(100)
        offTimer += 1
        if (offTimer >= offTime) {
            off = false
            offTimer = 0
            SwitchFace()
        }
        return
    }
    input.onButtonPressed(Button.B, () => { ButtonB() })

// Motion Part - where the motion sensor detetcs motion
    motionDetected = pins.digitalReadPin(DigitalPin.P0)
    if (motionDetected == 1) {
        for (let i = 0; i <= 360; i++) {
            for (let j = 0; j <= 7; j++) {
                strip2.setPixelColor(j, neopixel.hsl(i + j * 45, 100, 50))
                strip2.show()
            }
        }
        motionDetected = 0
    } else {
        strip2.clear()
        strip2.show()
    }
    // Light Part= where the motion sensor will activate the LED lights for some time when motion is detected 
    lightLevel = input.lightLevel()
    if (lightLevel > maxLight && state != 1) {
        state = 1
        SwitchFace()
    } else if (lightLevel <= maxLight && state != 0) {
        state = 0
        SwitchFace()
    }
})