<h1 align="center"> 
   Within Means
</h1>
   <h4 align="center"> 
 An online platform for small business owners/entrepreneurs to swap their skill set in return for another utilizing the concept of bartering. </h4>
 <h3 align="center">React, Node.js, Express, MongoDB, Styled-Components</h3>
 
 <h3 align="center"> <strong>Demo:</strong> https://withinmeans.netlify.app/ </h3>
 

 ![within-means-ui](https://user-images.githubusercontent.com/66086002/122539708-cace1880-d01f-11eb-9648-0d25fcae3caf.png)

 
 ## Setup instructions
 
1. Fork the repository
2. Clone the repository
3. Open a terminal and change directories into server by typing `cd server`, then run `yarn install` to install dependencies. Run `yarn dev` to start the server.
4. Open another terminal and change directories into client by typing `cd client`, then run `yarn install` to install dependencies. Run `yarn start` to start the client.
5. Head to https://localhost:3000 to view my project!

## What has been implemented in this project

### Home

- A search bar to search for a query
- Prepopulated search tags under the search bar to help the user make a search
- Recent postings of users who recently updated their status
- Explore by categories:
  Design
  Marketing
  Coding
  Editing
  Writing
- If you are not logged in yet, you will have a introduction to what the project is about with a call to action for sign up.

<img width="1435" alt="Screen Shot 2021-06-15 at 21 06 42" src="https://user-images.githubusercontent.com/66086002/122119442-1c5c8480-ce21-11eb-8ab5-71b5177ec23e.png">
<img width="1150" alt="Screen Shot 2021-06-15 at 21 11 49" src="https://user-images.githubusercontent.com/66086002/122119015-a22c0000-ce20-11eb-9d14-d2a4821ced1a.png">
<img width="1420" alt="Screen Shot 2021-06-15 at 21 36 46" src="https://user-images.githubusercontent.com/66086002/122120114-e966c080-ce21-11eb-90bd-0e9c36bc8bf1.png">
<img width="1422" alt="Screen Shot 2021-06-15 at 21 36 53" src="https://user-images.githubusercontent.com/66086002/122120123-eb308400-ce21-11eb-855c-f5faf5ca4077.png">
<img width="1431" alt="Screen Shot 2021-06-15 at 21 37 21" src="https://user-images.githubusercontent.com/66086002/122120130-ecfa4780-ce21-11eb-88cf-442e68b42b7e.png">

### Dropdown Menu

<img width="172" alt="Screen Shot 2021-06-15 at 21 38 13" src="https://user-images.githubusercontent.com/66086002/122120176-000d1780-ce22-11eb-8d24-799afda1cd62.png">

### Login & Sign Up

- Log In and Sign up with Google and the local way.
- Bcrypt encryption

<img width="1426" alt="Screen Shot 2021-06-15 at 21 13 54" src="https://user-images.githubusercontent.com/66086002/122119128-bff96500-ce20-11eb-80c8-7eec0ad7dfa9.png">

### Edit your profile

User can edit their profile and update their status.

The status is used to update what the user is seeking.

The user can list their skills, have a bio, post their website, and their title

<img width="1428" alt="Screen Shot 2021-06-15 at 21 12 52" src="https://user-images.githubusercontent.com/66086002/122119158-c5ef4600-ce20-11eb-945d-1804c3388e4a.png">

### Messaging

User can send messages to eachother to send offers and delete messages from their inbox.

<img width="1428" alt="Screen Shot 2021-06-15 at 21 26 15" src="https://user-images.githubusercontent.com/66086002/122119220-d69fbc00-ce20-11eb-8142-b60ef798f1ae.png">
<img width="1430" alt="Screen Shot 2021-06-15 at 21 27 26" src="https://user-images.githubusercontent.com/66086002/122119201-d1427180-ce20-11eb-8dde-2eec8f528042.png">
<img width="1433" alt="Screen Shot 2021-06-15 at 21 27 42" src="https://user-images.githubusercontent.com/66086002/122119209-d30c3500-ce20-11eb-9906-c5b1a4a46d83.png">

### Search

The search function is implemented on the homepage and as well in the navigation bar.

<img width="1431" alt="Screen Shot 2021-06-15 at 21 12 16" src="https://user-images.githubusercontent.com/66086002/122119266-e28b7e00-ce20-11eb-93b8-adced555fe63.png">
<img width="1430" alt="Screen Shot 2021-06-15 at 21 13 15" src="https://user-images.githubusercontent.com/66086002/122119307-f0410380-ce20-11eb-9ce7-15e168a5e785.png">

### Save users to your favorites

Users can save their favorite users to a list to come back to later.

<img width="1424" alt="Screen Shot 2021-06-15 at 21 13 37" src="https://user-images.githubusercontent.com/66086002/122119280-e7503200-ce20-11eb-932d-5427a590e184.png">

## Dependencies used in the backend

```json
      "dependencies": {
        "bcrypt": "^5.0.1",
        "body-parser": "^1.19.0",
        "dotenv": "^10.0.0",
        "express": "^4.17.1",
        "file-system": "^1.2.2",
        "google-auth-library": "^7.1.1",
        "moment": "^2.29.1",
        "mongodb": "^3.6.8",
        "morgan": "^1.10.0",
        "nodemon": "^2.0.7",
        "uuidv4": "^6.2.8"
      }
```

## Dependencies used in the frontend

```json
  "dependencies": {
   "@testing-library/jest-dom": "^5.11.4",
   "@testing-library/react": "^11.1.0",
   "@testing-library/user-event": "^12.1.10",
   "i": "^0.3.6",
   "moment": "^2.29.1",
   "npm": "^7.14.0",
   "react": "^17.0.2",
   "react-dom": "^17.0.2",
   "react-google-login": "^5.2.2",
   "react-icons": "^4.2.0",
   "react-router-dom": "^5.2.0",
   "react-scripts": "^4.0.3",
   "styled-components": "^5.3.0",
   "web-vitals": "^1.0.1"
 }
```
