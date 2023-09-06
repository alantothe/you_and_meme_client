# React/Django Meme App - Frontend README

## Table of Contents

- What do you meme? This social media app is fun for everyone! Scroll through hundreds of memes and add your unique comments to them. Or create an account, upload your own meme, and get your friends to like and comment. Who can come up with the most original meme? You or me? It's You & Meme!

### Quick Links

- [You & Meme deployed app](https://youandmeme.netlify.app)
- [Backend Repo](https://github.com/DanSinensky/you_and_meme_backend)

### Technologies Used

- React
- Django
- PostgreSQL
- Material Tailwind CSS
- Redux

### Installation

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

#### Routes

| Resource | Method | Endpoint                               | Description                              |
| -------- | ------ | -------------------------------------- | ---------------------------------------- |
| Comments | POST   | `/comments/`                           | Write a comment                          |
|          | DELETE | `/comments/{id}/`                      | Delete a comment                         |
| Meme     | GET    | `/memes/`                              | Get all memes                            |
|          | GET    | `/memes/{id}/`                         | Get one meme template                    |
| Posts    | GET    | `/posts/`                              | Get all posts                            |
|          | PUT    | `/posts/{id}`                          | Update Posts by Likes                    |
|          | DELETE | `/posts/{id}/`                         | Delete a post                            |
|          | GET    | `/posts/{id}/`                         | Get post by ID                           |
|          | POST   | `/posts/`                              | Generate meme / create a post            |
| User     | POST   | `/user/login/`                         | User Login                               |
|          | POST   | `/user/signup/`                        | Register new user                        |
|          | GET    | `/users/{id}/`                         | Get user by ID                           |
|          | GET    | `/users/{id}/`                         | Get user's posts                         |
|          | PUT    | `/users/{id}/add_to_liked_posts/`      | Adds the post's id to user's liked posts |
|          | DELETE | `/users/{id}/remove_from_liked_posts/` | Remove a like                            |
|          | PUT    | `/users/{id}/update_username/`         | Update username                          |
|          | PUT    | `/users/${id}/update_password/`        | Update password                          |
|          | PUT    | `/users/${id}/`                        | Update email                             |

### State Management

- We are using React's built-in useState and useEffect for managing the component state and side-effects, respectively.

### Material Tailwind CSS

- Material Tailwind CSS is used for styling the application. It is a UI kit that is built on top of Tailwind CSS and Material UI. It provides a set of React components that are styled using Tailwind CSS classes. It also provides a set of Tailwind CSS classes that can be used to style any custom components.
  [More on Material Tailwind here](https://www.material-tailwind.com)

### Contributors

- Contributors to this project include: <br>
  [Kyle Harris](https://www.linkedin.com/in/kyleharris007/) | [Dan Sinensky](https://www.linkedin.com/in/dansinensky/) | [Rebekah Gomez](https://www.linkedin.com/in/rebekah-gomez/) | [Manfred Joa](https://www.linkedin.com/in/manfredjoa/) | [Danish Mansoor](https://www.linkedin.com/in/danishhhm/) | [Alan Malpartida](https://github.com/alantothe)
- Please reach out to us via LinkedIn
