
 # Image Processing Worker

This project sets up a worker that processes tasks in a queue and validates image URLs. It uses the **BullMQ** library for queue management, **MongoDB** for task storage, and **Axios** for making HTTP requests to validate image URLs.


## Installation and run the server 

1. Clone the repository:

   ```bash
   git clone https://github.com/nilmadhab0504/catalogus
   cd catalogus
   npm install
   npm run dev
   node worker.mjs
   ```

