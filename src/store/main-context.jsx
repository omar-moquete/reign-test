import React from "react";
import { API_QUERIES } from "../config";
const actions = {
  activeOption: "ACTIVE_OPTION",
  activePage: "ACTIVE_PAGE",
  posts: "POSTS",
  showPosts: "SHOW_POSTS",
  newFave: "NEW_FAVE",
  updateFaves: "UPDATE_FAVES",
};
const reducer = function (latestState, dispatchedAction) {
  switch (dispatchedAction.type) {
    case actions.activeOption:
      return {
        ...latestState,
        activeOption: dispatchedAction.payload,
      };

    case actions.activePage:
      localStorage.setItem("activePage", dispatchedAction.payload);

      return {
        ...latestState,
        activePage: dispatchedAction.payload,
      };
    case actions.posts:
      return {
        ...latestState,
        posts: dispatchedAction.payload,
      };
    case actions.showPosts:
      localStorage.setItem("showPosts", dispatchedAction.payload);
      return {
        ...latestState,
        showPosts: dispatchedAction.payload,
      };
    case actions.newFave:
      return {
        ...latestState,
        faves: [...latestState.faves, dispatchedAction.payload],
      };
    case actions.updateFaves:
      localStorage.setItem("faves", JSON.stringify(dispatchedAction.payload));
      return {
        ...latestState,
        faves: dispatchedAction.payload,
      };

    default:
      return latestState;
  }
};

const initialState = {
  activeOption: "all",
  activePage: localStorage.getItem("activePage") || "all",
  posts: [],
  showPosts: localStorage.getItem("showPosts") || "all",
  faves: JSON.parse(localStorage.getItem("faves")) || [],
};
export const context = React.createContext();

export const ContextProvider = function (props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  // Filter logic
  const [dropdownIsActive, setDropdownIsActive] = React.useState(false);
  const [dropdownIsHidden, setDropdownIsHidden] = React.useState(true);

  const handleDropdown = function () {
    if (dropdownIsHidden === true) {
      // To open first unhide then animate
      setDropdownIsHidden((state) => !state);
      // Ensure dropdown is not hidden before animation starts.
      setTimeout(() => setDropdownIsActive((state) => !state), 0);
    } else {
      // To close first animate then unhide
      setDropdownIsActive((state) => !state);
      setTimeout(() => setDropdownIsHidden((state) => !state), 200);
    }
  };

  // This ref is used to handle outside of component click event (to close the filter)
  const filterRef = React.useRef();
  const closeDropdown = function (e) {
    if (e.target !== filterRef.current && dropdownIsHidden) return;
    handleDropdown();
  };

  const validatePost = function (post) {
    if (
      post.story_title?.trim() &&
      post.created_at?.trim() &&
      post.author?.trim()
    )
      return true;
    else false;
  };
  const getPosts = async function (query) {
    try {
      const allPosts = await (await fetch(query)).json();
      // Validates that each post object has the neccesary information
      const validPosts = allPosts.hits.filter((post) => {
        return validatePost(post) ? post : false;
      });
      return validPosts;
    } catch (error) {
      console.log(error);
    }
  };

  const savePost = function (e, postObject) {
    const prevFaves = JSON.parse(localStorage.getItem("faves")) || [];

    prevFaves.push(postObject);
    localStorage.setItem("faves", JSON.stringify(prevFaves));

    dispatch({ type: actions.newFave, payload: postObject });
  };

  return (
    <context.Provider
      value={{
        state,
        dispatch,
        actions,
        dropdownIsActive,
        dropdownIsHidden,
        handleDropdown,
        closeDropdown,
        filterRef,
        getPosts,
        savePost,
      }}
    >
      {props.children}
    </context.Provider>
  );
};
