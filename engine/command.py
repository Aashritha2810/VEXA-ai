import pyttsx3
import speech_recognition as sr
import eel 

def speak(text):
    engine = pyttsx3.init('sapi5')
    voices= engine.getProperty('voices')
    engine.setProperty('voice', voices[0].id)
    engine.setProperty('rate', 145) 
    engine.setProperty('volume', 1)  # Volume 0-1
    print(voices)
    engine.say(text)
    engine.runAndWait()

@eel.expose 
def takeCommand():
    r= sr.Recognizer()
    with sr.Microphone() as source:
        print("Listening...")
        eel.DisplayMessage("Listening...")
        r.pause_threshold = 1
        r.adjust_for_ambient_noise(source)
        audio = r.listen(source, 10, 6)
    try:
        print("Recognizing...")
        eel.DisplayMessage("Recognizing...")
        query = r.recognize_google(audio, language='en-US')
        print(f"User said: {query}")
        eel.DisplayMessage(query)
        speak(query)
        eel.ShowHood()
    except Exception as e:
        print("Sorry, I didn't catch that.")
        return None
    return query.lower()

