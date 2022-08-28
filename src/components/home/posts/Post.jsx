import React from "react";
import classes from "./Post.module.scss";
import Card from "../../../UI/Card";
import clockIconUrl from "../../../assets/img/clock.svg";
import savedHeartIconUrl from "../../../assets/img/saved-heart.svg";
import unsavedHeartIconUrl from "../../../assets/img/unsaved-heart.svg";
import { DATE_STYLE, TIME_STYLE, WORDS_PER_POST } from "../../../config";
import { context } from "../../../store/main-context";

const Post = function (props) {
  const ctx = React.useContext(context);
  const creationTime = new Date(props.createdAt);

  const intl = new Intl.DateTimeFormat(navigator.language, {
    ...DATE_STYLE,
    ...TIME_STYLE,
  }).format(creationTime);

  // Hours difference between post date and now.
  const elapsedHours = Math.ceil(
    (new Date() - new Date(creationTime)) / 3_600_000
  );

  const dateTimeToRender =
    elapsedHours <= 24 && elapsedHours > -1
      ? `${elapsedHours} hour${elapsedHours === 1 ? "" : "s"} ago`
      : intl;

  // Only n words per post, if words > 10 then + "..."
  const titleWords = props.title.split(" ");
  const shortenedTitle = `${titleWords.slice(0, WORDS_PER_POST).join(" ")}${
    titleWords.length > WORDS_PER_POST ? "..." : ""
  }`;

  // This function iterates over props.postObject (entire post object received from API) and in each iteration checks if the post.objectID matches ant objectID in the faves saved in state. It returns true if a match was found, if not then it returns false.
  const postIsFave = function (post) {
    return ctx.state.faves.some(
      (currentPost) => currentPost.objectID === post.objectID
    );
  };

  const handleSavePost = function (e) {
    if (postIsFave(props.postObject)) {
      const postIndexToRemoveFromFaves = ctx.state.faves.findIndex(
        (currentElement) =>
          currentElement.objectID === props.postObject.objectID
      );

      ctx.dispatch({
        type: ctx.actions.updateFaves,
        payload: ctx.state.faves.filter(
          (_, i) => i !== postIndexToRemoveFromFaves
        ),
      });
    } else ctx.savePost(e, props.postObject);
  };

  return (
    <Card className={classes.post}>
      <div className={classes.content}>
        <div className={classes.date}>
          <img src={clockIconUrl} />
          <p>{`${dateTimeToRender} by ${props.author}`}</p>
        </div>
        <p>{shortenedTitle}</p>
      </div>
      <div className={classes.fav}>
        {/* When a click happens on the <img> handleSavePost will call ctx.savePost which modifies the state. Then when conponent re-evaluation occurs, postIsFave will be executed and will find a match, which in turn will swap the heart image. */}
        <img
          src={
            postIsFave(props.postObject)
              ? savedHeartIconUrl
              : unsavedHeartIconUrl
          }
          alt="Heart"
          onClick={handleSavePost}
        />
      </div>
    </Card>
  );
};

export default Post;
