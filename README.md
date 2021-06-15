<h1 align="center"> 
   Within Means
</h1>
   <p align="center"> 
 An online platform for small business owners/entrepreneurs to swap their skill set in return for another utilizing the concept of bartering. </p>
 <h3 align="center">React, Node.js, Express, MongoDB, Styled-Components</h3>
 
 <img align="center" width="1435" alt="Screen Shot 2021-06-15 at 21 06 42" src="https://user-images.githubusercontent.com/66086002/122116527-a276cc00-ce1d-11eb-9b14-49483c259752.png">
 
 ## Setup instructions
 
1. Fork the repository
2. Clone the repository
3. Open a terminal and change directories into server by typing `cd server`, then run `yarn install` to install dependencies. Run `yarn dev` to start the server.
4. Open another terminal and change directories into client by typing `cd client`, then run `yarn install` to install dependencies. Run `yarn start` to start the client.
5. Head to https://localhost:3000 to view my project!

## Endpoints

Endpoints have been documented in server/README.md

# What has been implemented in this project

## Home 

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

## Login & Sign Up 

- Log In and Sign up with Google and the local way. 
- Bcrypt encryption

## Edit your profile

User can edit their profile and update their status. 

The status is used to update what the user is seeking. 

The user can list their skills, have a bio, post their website, and their title

## Messaging

User can send messages to eachother to send offers and delete messages from their inbox.

## Search 

The search function is implemented on the homepage and as well in the navigation bar.

## Save users to your favorites

Users can save their favorite users to a list to come back to later.
