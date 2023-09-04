import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPostsByUser, getUserById } from "../api/users.js";
import ProfilePostDetail from "../components/ProfilePostDetail.jsx";
import { Avatar, Typography } from "@material-tailwind/react";

function ProfilePage() {
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
    <div
      className="flex flex-col items-center text-yellow-400"
      style={{ background: "rgb(45, 45, 45)" }}
    >
      <div className="flex items-center">
        <Avatar src={user.avatar} round={true} size="40" />
        <Typography className="text-6xl my-4 ml-4">
          {user.user_string}
        </Typography>
      </div>
      <p>a bio</p>
      {/* <div className="flex justify-center"> */}
      <div className="flex justify-center">
        <div className="flex flex-col">
          {firstColumn.map((post, index) => (
            <ProfilePostDetail allPosts={post} key={index} />
          ))}
        </div>
        <div className="flex flex-col">
          {secondColumn.map((post, index) => (
            <ProfilePostDetail allPosts={post} key={index} />
          ))}
        </div>
        <div className="flex flex-col">
          {thirdColumn.map((post, index) => (
            <ProfilePostDetail allPosts={post} key={index} />
          ))}
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}

export default ProfilePage;
