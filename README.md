# React/Django Meme App - Frontend README

## Table of Contents

- Overview
- Quick Links
- Installation
- Project Structure
- API Functions
- From External Meme API
- From Backend API
- State Management
- Tailwind CSS
- Contributors
- Overview

This React frontend is a part of a meme-sharing platform where users can create memes using a meme generator, post them, and comment on them. The frontend interacts with both an external meme API and a Django backend.

### Quick Links

[Deployed Frontend App](Netlify link goes here)
[Deployed Backend App](https://you-and-meme-backend-6abb25257062.herokuapp.com)
[Backend Repo](https://github.com/DanSinensky/you_and_meme_backend)

Installation

Clone the repository

```
git clone <repository_url>
```

Install npm packages

```
npm install
```

Start the React development server

```
npm start
```

### Project Structure

- src/api/api.js: Houses the API functions that interact with the backend and external meme API
- src/components/: Contains all the React components for the application
  API Functions

#### From External Meme API

- getMemes(): Fetches a list of available memes
- getMeme(id): Fetches a single meme (Note: This function might be re-evaluated based on the API's capabilities)
- createMeme(meme): Generates a new meme

#### From Backend API

- getCommentsByPost(memeId): Fetches comments for a specific post
- getPostsByUser(userId): Fetches posts made by a specific user
- getAllPosts(): Fetches all posts
- deletePost(id): Deletes a post by its ID

### State Management

- We are using React's built-in useState and useEffect for managing the component state and side-effects, respectively.

### Tailwind CSS

- Tailwind CSS is used for styling the application. For example, in the DetailPage component, Tailwind CSS classes are used to set width and height, and enable scrolling when the content overflows.

### Contributors

- Contributors to this project include: <br>
  [Alan Malpartida](Alan's LinkedIn) | [Danish Mansoor](https://www.linkedin.com/in/danishhhm/) | [Kyle Harris](https://www.linkedin.com/in/kyleharris007/) | [Dan Sinensky](https://www.linkedin.com/in/dansinensky/) | [Manfred Joa](https://www.linkedin.com/in/manfredjoa/) | [Rebekah Gomez](https://www.linkedin.com/in/rebekah-gomez/) |
- Please reach out to us via LinkedIn
