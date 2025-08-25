import os
import re
import eel
from engine.command import speak
from engine.config import ASSISTANT_NAME
import pywhatkit as kit

@eel.expose
def playAssistantSound():
    pass


def openCommand(query):
    query = query.replace(ASSISTANT_NAME, "")
    query = query.replace("open", "")
    query.lower()

    if query != "":
        speak("Opening " + query)
        os.system('start ' + query)
    else:
        speak("Not Found")

def PlayYoutube(query):
    search_term = extract_yt_search_term(query)
    speak("Playing " + search_term + " on YouTube")
    kit.playonyt(search_term)

def extract_yt_search_term(command):
    # Define a regular expression pattern to capture the song name
    pattern = r'play\s+(.*?)\s+on\s+youtube'
    #Use re.search to find the match in the command
    match = re.search(pattern, command, re.IGNORECASE)
    #If a match is found, return the extracted song name; otherwise, return None
    return match.group(1) if match else None