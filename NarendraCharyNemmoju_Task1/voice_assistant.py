import speech_recognition as sr
import pyttsx3
import datetime
import webbrowser


# Initialize speech engine and recognizer
engine = pyttsx3.init()
recognizer = sr.Recognizer()


def speak(text):
    """Convert text to speech."""
    print("Assistant:", text)
    engine.say(text)
    engine.runAndWait()


def listen():
    """Listen to the user's voice and convert it to text."""
    with sr.Microphone() as source:
        print("\nListening...")
        recognizer.adjust_for_ambient_noise(source, duration=1)

        try:
            audio = recognizer.listen(source, timeout=5, phrase_time_limit=8)
            command = recognizer.recognize_google(audio)
            print("You:", command)
            return command.lower()

        except sr.WaitTimeoutError:
            speak("I did not hear anything. Please try again.")
        except sr.UnknownValueError:
            speak("Sorry, I could not understand your voice.")
        except sr.RequestError:
            speak("Sorry, the speech recognition service is unavailable.")
        except Exception as error:
            print("Error:", error)
            speak("Something went wrong.")

    return ""


def main():
    speak("Hello! I am your voice assistant.")
    speak("You can say hello, ask for the time or date, or search the web.")

    while True:
        command = listen()

        if not command:
            continue

        # Greeting
        if "hello" in command or "hi" in command:
            speak("Hello! How can I help you?")

        # Time
        elif "time" in command:
            current_time = datetime.datetime.now().strftime("%I:%M %p")
            speak(f"The current time is {current_time}.")

        # Date
        elif "date" in command:
            current_date = datetime.datetime.now().strftime("%A, %d %B %Y")
            speak(f"Today's date is {current_date}.")

        # Web search
        elif "search" in command:
            topic = command.replace("search", "", 1).strip()

            if topic:
                speak(f"Searching the web for {topic}.")
                webbrowser.open(
                    "https://www.google.com/search?q=" + topic.replace(" ", "+")
                )
            else:
                speak("Please tell me what you want me to search for.")

        # Exit
        elif "exit" in command or "quit" in command or "stop" in command:
            speak("Goodbye! Have a nice day.")
            break

        else:
            speak("Sorry, I don't understand that command.")


if __name__ == "__main__":
    main()