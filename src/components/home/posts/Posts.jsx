import React from "react";
import classes from "./Posts.module.scss";
import PostsFilter from "./PostsFilter";
import Post from "./Post";
import { context } from "../../../store/main-context";
import { API_QUERIES, PAGE_COUNT } from "../../../config";
import PaginationControl from "../pagination/PaginationControl";
import unsavedHeartUrl from "../../../assets/img/unsaved-heart.svg";

const Posts = function () {
  const ctx = React.useContext(context);
  // const [posts, setPosts] = React.useState([]);

  const getPosts = async function (postsString) {
    const allPosts = await ctx.getPosts(API_QUERIES[postsString]);
    ctx.dispatch({ type: ctx.actions.posts, payload: allPosts });
    ctx.dispatch({ type: ctx.actions.activeOption, payload: postsString });
  };

  React.useEffect(() => {
    getPosts(ctx.state.showPosts);
  }, [ctx.state.showPosts]);

  // Dynamically rendering posts from state.posts if ctx.state.activePage === "all" else state.faves.
  const postsToRender = ctx.state[
    `${ctx.state.activePage === "all" ? "posts" : "faves"}`
  ]
    .map((post) => (
      <Post
        key={post.objectID}
        createdAt={post.created_at}
        author={post.author}
        title={post.story_title}
        postObject={post}
      />
    ))
    .slice(0, PAGE_COUNT);

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.posts}>
          {/* If selected page is faves, won't render <PostsFilter> */}
          {ctx.state.activePage === "all" ? <PostsFilter /> : ""}
          {/* If no faves, render no faves message */}
          {postsToRender.length < 1 && ctx.state.activePage === "faves" ? (
            <div className={classes["no-fave"]}>
              <p>
                No faves here! Click{" "}
                <span>
                  <img src={unsavedHeartUrl} />
                </span>{" "}
                to add your faves.
              </p>
            </div>
          ) : (
            postsToRender
          )}
          <PaginationControl />
        </div>
      </div>
    </div>
  );
};

export default Posts;
