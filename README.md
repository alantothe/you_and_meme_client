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

#### Routes

| Endpoint            | Description                                                 |
| ------------------- | ----------------------------------------------------------- |
| `/`                 | Homepage                                                    |
| `/register`         | Sign-up for new users                                       |
| `/sign-in`          | Sign-in Page                                                |
| `/profile`          | Use Profile Page                                            |
| `/account-settings` | Account Settings Page for one user                          |
| `/meme-selection`   | Shows all memes for user to select to create their own meme |
| `/create-meme/:id`  | Create a meme                                               |
| `/meme/:postID`     | Meme Detail Page - shows one meme w/ corresponding comments |
| `/meme-detail-page` | Meme Detail page - shows one meme w/ correspoding comments  |

### State Management

- We are using React's built-in useState and useEffect for managing the component state and side-effects, respectively.

### Material Tailwind CSS

- Material Tailwind CSS is used for styling the application. It is a UI kit that is built on top of Tailwind CSS and Material UI. It provides a set of React components that are styled using Tailwind CSS classes. It also provides a set of Tailwind CSS classes that can be used to style any custom components.
  [More on Material Tailwind here](https://www.material-tailwind.com)

### Contributors

- Contributors to this project include: <br>
  [Alan Malpartida](Alan's LinkedIn) | [Danish Mansoor](https://www.linkedin.com/in/danishhhm/) | [Kyle Harris](https://www.linkedin.com/in/kyleharris007/) | [Dan Sinensky](https://www.linkedin.com/in/dansinensky/) | [Manfred Joa](https://www.linkedin.com/in/manfredjoa/) | [Rebekah Gomez](https://www.linkedin.com/in/rebekah-gomez/) |
- Please reach out to us via LinkedIn
