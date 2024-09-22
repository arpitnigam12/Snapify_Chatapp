# Snapify Chat App 


## **Project Overview**
Snapify is a dynamic and real-time chat application designed to provide seamless communication between users. It allows individuals to send messages instantly, with updates reflected in real-time for all active users in a chatroom.

The backend of Snapify is built using **Node.js** and **Express**, while **MongoDB** serves as the database, handling user data and message history efficiently. The application leverages **Socket.io** for real-time, bidirectional communication between the server and clients, enabling live chats. 

The frontend is powered by **React**, offering an interactive and responsive user interface. Additional functionalities like user authentication and environment management ensure a secure and customizable experience for developers and users alike.

## **Features**
1. **User Authentication**: 
   - Users can register and log in using secure credentials. Passwords are hashed with **bcrypt** for enhanced security.
   
2. **Real-time Chat Functionality**: 
   - Communication happens in real time using **Socket.io**. All users connected to a room can see messages instantaneously.
   
3. **Private Messaging**: 
   - Users can send direct messages to other users in private chatrooms.
   
4. **Group Chats**: 
   - Create or join group chatrooms where multiple users can communicate simultaneously.
   
5. **Message History**: 
   - Message history is stored using **MongoDB**, allowing users to revisit old conversations when they log back in.
   
6. **Typing Indicator**: 
   - See when other users are typing a message in real time.
   
7. **Online Status**: 
   - Users can see who is online in a chatroom or in a friend list.
   
8. **Responsive Design**: 
   - The user interface is built with **React** to adapt seamlessly across different screen sizes and devices.

9. **Notifications**: 
   - Receive notifications when a new message is received while on a different page or when not actively chatting.

10. **User Profiles**: 
    - Users have personal profiles where they can update their information, add an avatar, and view their chat history.

## **Tech Stack**
- **Backend**: 
  - Node.js
  - Express.js
  - Socket.io (for real-time communication)
  - MongoDB (with Mongoose for database management)

- **Frontend**: 
  - React
  - CSS (for styling)
  - Axios (for API requests)

- **Development Tools**: 
  - Nodemon (for hot reloading)
  - CORS (for cross-origin requests)
  - Bcrypt (for password hashing)
  - dotenv (for environment variable management)

COPY RIGHT BY © 2023 Arpit Nigam
