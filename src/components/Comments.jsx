import React from "react";
// import Avatar, { genConfig } from "react-nice-avatar";

function Comments({ props }) {
  // const config = genConfig("hi@dapi.to");
  console.log(props);
  return (
    <div>
      <h1>Comments</h1>
      {/* <Avatar style={{ width: "8rem", height: "8rem" }} {...config} /> */}
    </div>
  );
}

export default Comments;
