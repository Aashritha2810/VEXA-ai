import pyttsx3

def speak(text):
    engine = pyttsx3.init('sapi5')
    voices= engine.getProperty('voices')
    engine.setProperty('voice', voices[0].id)
    engine.setProperty('rate', 145) 
    engine.setProperty('volume', 1)  # Volume 0-1
    print(voices)
    engine.say(text)
    engine.runAndWait()

speak("I am NOVA")