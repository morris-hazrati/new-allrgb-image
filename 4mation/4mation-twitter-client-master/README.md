# 4mation-twitter-client

This application is made up of Front-end React app, and a Back-end (server-side) Node.js app. 
Node.js app acts as middleware between the React app and the twitter API to avoid the CORS issues and errors.

The node.js makes use of fetch() to communicate with the twitter API's and returns the fetched data in JSON format.

## After Cloning
To get the packages installed after cloning it to the desktop run ```npm install``` in the root folder of the clone, in the server folder, and in the client folder.

To start this application after cloning it to your desktop, in the root folder, execute ```npm start``` command which will run both, the front-end and the back-end apps ```concurrently```.

The Front-end app runs on port 3000, while the Back-end app runs on port 3001.
