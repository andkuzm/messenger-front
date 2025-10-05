# What is it
This is a pet project, a frontend part of a simple messenger with the most basic messenger functionalities implemented so far:

- Authorization  
- Chat creation with another user  
- Joining of other users into the existing chat  
- Messenging in said chats


>The project is currently incomplete.


# running
## preconditions
Node.js>=22.16.0  
npm>=11.4.1  

Running the backend (https://github.com/andkuzm/messenger) is expected to be accessible for the frontend to function properly. By default, it is assumed to be running on localhost:8080; if another port or host is used, `VITE_API_URL=http://localhost:8080` should be changed accordingly in the .env file in the root of the frontend.
## building
After preconditions are met, `npm run dev` should correctly launch the frontend
