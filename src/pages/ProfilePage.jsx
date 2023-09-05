import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPostsByUser, getUserById } from "../api/users.js";
import ProfilePostDetail from "../components/ProfilePostDetail.jsx";
import { Avatar, Typography } from "@material-tailwind/react";

function ProfilePage({ userToken }) {
  const { profileId } = useParams();
  const [userObject, setUserObject] = useState({});
  const [allPosts, setAllPosts] = useState([]);
  const [user, setUser] = useState({});
  const [firstColumn, setFirstColumn] = useState([]);
  const [secondColumn, setSecondColumn] = useState([]);
  const [thirdColumn, setThirdColumn] = useState([]);

  useEffect(() => {
    fetchUser();
    getPosts();
  }, []);

  useEffect(() => {
    firstArray();
    secondArray();
    thirdArray();
  }, [allPosts]);

  const fetchUser = async () => {
    const fetchedUser = await getUserById(profileId);
    setUser(fetchedUser);
  };

  const getPosts = async () => {
    const fetchedUserObject = await getPostsByUser(profileId);
    setUserObject(fetchedUserObject);
    setAllPosts(sortPosts(fetchedUserObject.posts));
  };

  const sortPosts = (posts) => {
    const sortedPosts = posts.sort((a, b) => {
      return new Date(b.created) - new Date(a.created);
    });
    return sortedPosts;
  };

  const firstArray = () => {
    let n = 0;
    const indexes = [];
    const array = [];

    while (n <= allPosts.length - 1) {
      indexes.push(n);
      n += 3;
    }

    indexes.forEach((index) => {
      array.push(allPosts[index]);
    });
    setFirstColumn(array);
  };

  const secondArray = () => {
    let n = 1;
    const indexes = [];
    const array = [];

    while (n <= allPosts.length - 1) {
      indexes.push(n);
      n += 3;
    }

    indexes.forEach((index) => {
      array.push(allPosts[index]);
    });
    setSecondColumn(array);
  };

  const thirdArray = () => {
    let n = 2;
    const indexes = [];
    const array = [];

    while (n <= allPosts.length - 1) {
      indexes.push(n);
      n += 3;
    }

    indexes.forEach((index) => {
      array.push(allPosts[index]);
    });
    setThirdColumn(array);
  };

  return (
    <div className="flex flex-col items-center text-yellow-400 bg-meme-dark-gray">
      <div
        className="flex items-center w-screen"
        style={{
          background: "rgb(30, 30, 30)",
        }}
      >
        <div className="flex items-center" style={{ marginLeft: "37vw" }}>
          {user.avatar ? (
            <Avatar
              className="border-x border-y border-yellow-400"
              src={user.avatar}
              round={true}
              size="40"
            />
          ) : null}

          <Typography className="text-5xl my-4 ml-4">
            {user.user_string}
          </Typography>
        </div>
      </div>
      {/* <p>a bio</p> */}
      <div className="flex flex-col justify-center md:flex-row">
        <div className="flex flex-col">
          {firstColumn.map((post, index) => (
            <ProfilePostDetail
              allPosts={post}
              key={index}
              userToken={userToken}
            />
          ))}
        </div>
        <div className="flex flex-col">
          {secondColumn.map((post, index) => (
            <ProfilePostDetail
              allPosts={post}
              key={index}
              userToken={userToken}
            />
          ))}
        </div>
        <div className="flex flex-col">
          {thirdColumn.map((post, index) => (
            <ProfilePostDetail
              allPosts={post}
              key={index}
              userToken={userToken}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
