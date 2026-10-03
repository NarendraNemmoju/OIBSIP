import socket
from datetime import datetime

HOST = "127.0.0.1"
PORT = 5000

client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

print("=== Chat Client ===")

try:
    client_socket.connect((HOST, PORT))

    print(f"Connected to server at {HOST}:{PORT}")
    print("Type 'exit' to close the chat.\n")

    while True:
        message = input("You: ")

        client_socket.send(message.encode())

        if message.lower() == "exit":
            print("Chat ended.")
            break

        reply = client_socket.recv(1024).decode()

        if not reply:
            print("Server disconnected.")
            break

        current_time = datetime.now().strftime("%H:%M:%S")
        print(f"[{current_time}] Server: {reply}")

        if reply.lower() == "exit":
            print("Chat ended.")
            break

except ConnectionRefusedError:
    print("Error: Could not connect to the server.")
    print("Please make sure the server is running first.")

except ConnectionResetError:
    print("Error: Server disconnected unexpectedly.")

finally:
    client_socket.close()
    print("Client closed.")