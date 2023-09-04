// import { useState, useEffect, createElement } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   getUserById,
//   addUserLikedPosts,
//   removeUserLikedPosts,
// } from "../api/users.js";
// import { updatePostByLikes, deletePost } from "../api/posts.js";
// import { Typography } from "@material-tailwind/react";
// import {
//   HeartIcon,
//   ChatBubbleOvalLeftEllipsisIcon,
//   PaperAirplaneIcon,
//   EllipsisHorizontalIcon,
// } from "@heroicons/react/24/outline";
// import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
// import "./styles.css";
// import { addUserLike, removeUserLike } from "../redux/features/userSlice.js";

// import { useDispatch, useSelector } from "react-redux";
// import Avatar from "react-avatar";

// import {
//   Button,
//   Dialog,
//   DialogHeader,
//   // DialogBody,
//   DialogFooter,
// } from "@material-tailwind/react";

// function DeletePostPopUp({ owner, deletePostById }) {
//   const [open, setOpen] = useState(false);

//   const handleOpen = () => setOpen(!open);

//   if (!owner) return null;

//   return (
//     <div>
//       <EllipsisHorizontalIcon
//         className="h-7 w-7 mr-4 text-yellow-400 cursor-pointer"
//         strokeWidth={2}
//         onClick={handleOpen}
//       />
//       <Dialog open={open} handler={handleOpen}>
//         <DialogHeader className="flex justify-center">
//           Are you sure you want to delete your post?
//         </DialogHeader>
//         {/* <DialogBody divider>Please Confirm or Cancel</DialogBody> */}
//         <DialogFooter>
//           <Button
//             variant="gradient"
//             color="red"
//             onClick={() => {
//               handleOpen();
//               deletePostById();
//             }}
//           >
//             Confirm
//           </Button>
//           <Button
//             variant="text"
//             color="black"
//             onClick={handleOpen}
//             className="mr-1"
//           >
//             Cancel
//           </Button>
//         </DialogFooter>
//       </Dialog>
//     </div>
//   );
// }

// function ProfilePostDetail({ allPosts }) {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   console.log(allPosts);
//   const [open, setOpen] = useState(false);
//   const toggleIsOpen = () => setOpen((cur) => !cur);

//   const likesArray = useSelector((state) => state.user.likes);
//   console.log(likesArray);

//   const [user, setUser] = useState({});
//   const [likes, setLikes] = useState(0);
//   const [likesToggle, setLikesToggle] = useState();
//   const userId = useSelector((state) => state.user.userId);
//   console.log(user);

//   const mockAvatar =
//     "https://res.cloudinary.com/dzjr3skhe/image/upload/v1693696048/yl6pdqk1fohrh920j5mq.png";

//   // this is  fake but will be real later
//   //user.avatar = "";
//   //{user.avatar} will be placed next to user.user_string
//   //<img src={user.avatar} alt="user avatar" className="w-10 h-10 rounded-full" />

//   useEffect(() => {
//     fetchUser();
//     setLikes(allPosts.likes);
//     // checkLikes();
//   }, []);

//   // function checkLikes() {
//   //   // if (!likesArray) return;
//   //   // else
//   //   if (likesArray.includes(allPosts.id)) {
//   //     setLikesToggle(true);
//   //   } else {
//   //     setLikesToggle(false);
//   //   }
//   // }

//   const fetchUser = async () => {
//     const fetchedUser = await getUserById(allPosts.user);
//     setUser(fetchedUser);
//   };

//   const updateLikes = async () => {
//     if (!userId) {
//       navigate("/sign-in");
//     } else if (likesToggle === false) {
//       await updatePostByLikes(allPosts.id, likes + 1);
//       setLikes(likes + 1);
//       setLikesToggle(true);
//       dispatch(addUserLike(allPosts.id));
//       addToLikedPosts();
//     } else {
//       await updatePostByLikes(allPosts.id, likes - 1);
//       setLikes(likes - 1);
//       setLikesToggle(false);
//       dispatch(removeUserLike(allPosts.id));
//       removeFromLikedPosts();
//     }
//   };

//   const deletePostById = async () => {
//     await deletePost(allPosts.id);
//     window.location.reload();
//   };

//   const addToLikedPosts = async () => {
//     await addUserLikedPosts(userId, allPosts.id);
//   };

//   const removeFromLikedPosts = async () => {
//     await removeUserLikedPosts(userId, allPosts.id);
//   };

//   // const formatTimestamp = (timestamp) => {
//   //   const date = new Date(timestamp);
//   //   const year = date.getFullYear().toString().slice(2);
//   //   const month = date.getMonth();
//   //   const day = date.getDate();
//   //   const hours = date.getHours();
//   //   const minutes = String(date.getMinutes()).padStart(2, "0");

//   //   const months = [
//   //     "January",
//   //     "February",
//   //     "March",
//   //     "April",
//   //     "May",
//   //     "June",
//   //     "July",
//   //     "August",
//   //     "September",
//   //     "October",
//   //     "November",
//   //     "December",
//   //   ];

//   //   if (hours === 0) {
//   //     return `${months[month]} ${day}, ${year} at ${hours + 12}:${minutes}AM`;
//   //   } else if (hours < 12) {
//   //     return `${months[month]} ${day}, ${year} at ${hours}:${minutes}AM`;
//   //   } else if (hours === 12) {
//   //     return `${months[month]} ${day}, ${year} at ${hours}:${minutes}PM`;
//   //   } else {
//   //     return `${months[month]} ${day}, ${year} at ${hours - 12}:${minutes}PM`;
//   //   }
//   // };

//   return (
//     <div className="my-4">
//       <div
//         className="w-80 mx-4 mb-4 mt-2 shadow-lg border-gray-700 border-2 xs:w-screen overflow-hidden"
//         style={{
//           width: "600px",
//           boxShadow:
//             "10px 8px 12px rgba(0, 0, 0, .6), 0px 8px 8px rgba(0, 0, 0, .1)",
//         }}
//       >
//         <div className="flex justify-between items-center pl-2 py-3">
//           <div className="flex items-center">
//             <Avatar src={mockAvatar} round={true} size="40" />
//             <Typography className="font-black pl-2">
//               {user.user_string}
//             </Typography>
//           </div>
//           <DeletePostPopUp
//             owner={userId === allPosts.user}
//             deletePostById={deletePostById}
//           />
//         </div>
//         <div className="flex flex-col items-center m-0 p-0">
//           <img
//             className="m-0 p-0"
//             src={allPosts.meme}
//             style={{
//               width: "600px",
//               height: "auto", // Keep aspect ratio
//               objectFit: "contain",
//             }}
//             onClick={() => {
//               navigate(`/meme-detail-page/${allPosts.id}`);
//             }}
//           />
//         </div>
//         <div className="px-4 flex justify-between items-center">
//           <div className="flex items-center py-5 ">
//             {!likesToggle
//               ? createElement(HeartIcon, {
//                   className: "h-7 w-7 mr-2 text-yellow-400 cursor-pointer",
//                   strokeWidth: 2,
//                   onClick: updateLikes,
//                 })
//               : createElement(HeartIconSolid, {
//                   className: "h-7 w-7 mr-2 text-red-500 cursor-pointer",
//                   strokeWidth: 2,
//                   onClick: updateLikes,
//                 })}
//             {createElement(ChatBubbleOvalLeftEllipsisIcon, {
//               className: "h-7 w-7 mr-2 text-yellow-400 cursor-pointer",
//               strokeWidth: 2,
//               onClick: () => {
//                 navigate(`/meme-detail-page/${allPosts.id}`);
//               },
//             })}
//             {createElement(PaperAirplaneIcon, {
//               className: "h-7 w-7 mr-2 text-yellow-400 cursor-pointer",
//               strokeWidth: 2,
//               onClick: () => {
//                 navigate("/development");
//               },
//             })}
//           </div>
//           {/* <Typography>{formatTimestamp(allPosts.created)}</Typography> */}
//           <Typography className="font-black">
//             {likes} {likes !== 1 ? "likes" : "like"}
//           </Typography>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProfilePostDetail;
