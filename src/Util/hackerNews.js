import axios from "axios";

class HackerNews {
  constructor() {
    this.url = "https://hacker-news.firebaseio.com/v0/";
  }

  /**
   * Fetches Ids of new stories from Hacker News API.
   * @returns - array
   */
  fetchNewStoriesIds = async () => {
    const url = `${this.url}newstories.json`;
    try {
      const response = await axios.get(url);
      const ids = response.data;
      return ids;
    } catch (error) {
      return [];
    }
  };

  /**
   * Fetches a single article from Hacker News API.
   * @param {*} id - Id of the article to be fetched
   * @returns - object
   */
  fetchSingleStory = async (id) => {
    const url = `${this.url}item/${id}.json`;
    try {
      const response = await axios.get(url);
      response.data.lastPublished = this.getWhenPublished(response.data.time);
      return response.data;
    } catch (error) {
      return;
    }
  };

  /**
   * Fetches multiple stories from hacker news API.
   * @param {*} ids - array containing story ids.
   * @returns - array containing stories.
   */
  fetchStories = async (ids) => {
    const output = [];
    for (let id of ids) {
      const storyInfo = await this.fetchSingleStory(id);
      if (storyInfo.title) {
        output.push(storyInfo);
      }
    }
    return output;
  };

  /**
   * Generates difference in current time - time when story was published in minutes.
   * @param {*} timestamp - story timestamp
   * @returns number
   */
  getWhenPublished = (timestamp) => {
    const currentTime = new Date().getTime();
    const storyTime = new Date(timestamp * 1000).getTime();
    const differenceInMinutes = (currentTime - storyTime) / (1000 * 60);
    return Math.round(differenceInMinutes, 0);
  };
}

export default HackerNews;
