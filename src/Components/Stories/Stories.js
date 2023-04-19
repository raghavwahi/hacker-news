import React, { useCallback, useEffect, useRef, useState } from "react";
import Loader from "../../Layout/Loader/Loader";

import HackerNews from "../../Util/hackerNews";
import Story from "../Story/Story";
import classes from "./Stories.module.css";

const Stories = () => {
  const batchSize = 10;
  const [storyIds, setStoryIds] = useState([]);
  const [stories, setStories] = useState([]);
  const [storiesLoaded, setStoriesLoaded] = useState(false);
  const [currentBatchNumber, setCurrentBatchNumber] = useState(0);

  const observer = useRef();
  const lastStoryElementRef = useCallback(
    (node) => {
      if (!storiesLoaded) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (
          entries[0].isIntersecting &&
          currentBatchNumber < storyIds.length / batchSize
        ) {
          setCurrentBatchNumber((currentBatchNumber) => currentBatchNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [storiesLoaded, currentBatchNumber, storyIds]
  );

  useEffect(() => {
    const fetchStoryIds = async () => {
      setStoriesLoaded(false);
      const hackerNews = new HackerNews();
      setStoryIds([...(await hackerNews.fetchNewStoriesIds())]);
    };
    fetchStoryIds();
  }, []);

  useEffect(() => {
    const fetchStories = async () => {
      setStoriesLoaded(false);
      const hackerNews = new HackerNews();
      const latestStories = await hackerNews.fetchStories(
        storyIds.slice(
          currentBatchNumber * batchSize,
          (currentBatchNumber + 1) * batchSize
        )
      );
      setStories((stories) => {
        return [...stories, ...latestStories];
      });
      setStoriesLoaded(true);
    };

    fetchStories();
  }, [storyIds, currentBatchNumber]);

  const loaderPlaceHolder = [];

  for (let i = 0; i < batchSize; i++) {
    loaderPlaceHolder.push(<Loader key={i} />);
  }

  const list = stories.map((story, index) => {
    if (index === stories.length - 1) {
      return (
        <Story
          ref={lastStoryElementRef}
          key={story.id}
          title={story.title}
          by={story.by}
          lastPublished={story.lastPublished}
          url={story.url}
        />
      );
    } else {
      return (
        <Story
          key={story.id}
          title={story.title}
          by={story.by}
          lastPublished={story.lastPublished}
          url={story.url}
        />
      );
    }
  });

  return (
    <ol className={classes.list}>
      {list}
      {!storiesLoaded && loaderPlaceHolder}
    </ol>
  );
};

export default Stories;
