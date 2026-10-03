import socket
from datetime import datetime

HOST = "127.0.0.1"
PORT = 5000

server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server_socket.bind((HOST, PORT))
server_socket.listen(1)

print("=== Chat Server ===")
print(f"Server started on {HOST}:{PORT}")
print("Waiting for a client to connect...")

conn, address = server_socket.accept()

print(f"Client connected: {address}")
print("Type 'exit' to close the chat.\n")

while True:
    try:
        message = conn.recv(1024).decode()

        if not message:
            print("Client disconnected.")
            break

        current_time = datetime.now().strftime("%H:%M:%S")
        print(f"[{current_time}] Client: {message}")

        if message.lower() == "exit":
            print("Chat ended.")
            break

        reply = input("You: ")

        if reply.lower() == "exit":
            conn.send(reply.encode())
            print("Chat ended.")
            break

        conn.send(reply.encode())

    except ConnectionResetError:
        print("Client disconnected unexpectedly.")
        break

conn.close()
server_socket.close()
print("Server closed.")
