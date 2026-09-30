import random
import string

print("=== Random Password Generator ===")

while True:
    try:
        length = int(input("\nEnter password length (minimum 8): "))

        if length < 8:
            print("Error: Password length must be at least 8.")
            continue

        print("\nChoose character types:")
        print("1. Uppercase letters")
        print("2. Lowercase letters")
        print("3. Numbers")
        print("4. Symbols")

        choices = input("Enter choices (e.g., 1234): ")

        valid_choices = set("1234")

        if not choices or not set(choices).issubset(valid_choices):
            print("Error: Please select valid character types.")
            continue

        if len(set(choices)) < 2:
            print("Error: Select at least 2 character types.")
            continue

        characters = ""

        if "1" in choices:
            characters += string.ascii_uppercase

        if "2" in choices:
            characters += string.ascii_lowercase

        if "3" in choices:
            characters += string.digits

        if "4" in choices:
            characters += string.punctuation

        password = "".join(random.choice(characters) for _ in range(length))

        print("\nGenerated Password:", password)

        again = input("\nGenerate another password? (y/n): ").lower()

        if again != "y":
            print("Thank you for using the Password Generator!")
            break

    except ValueError:
        print("Error: Please enter a valid number for the password length.")