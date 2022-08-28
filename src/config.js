export const PAGE_COUNT = 9;
export const API_QUERIES = {
  all: "https://hn.algolia.com/api/v1/search_by_date?query=angular&query=reactjs&query=vuejs&page=0",
  angular: "https://hn.algolia.com/api/v1/search_by_date?query=angular&page=0",
  reactjs: "https://hn.algolia.com/api/v1/search_by_date?query=reactjs&page=0",
  vuejs: "https://hn.algolia.com/api/v1/search_by_date?query=vuejs&page=0",
};

export const DATE_STYLE = { dateStyle: "long" };
export const TIME_STYLE = { timeStyle: "short" };
export const WORDS_PER_POST = 10;
