'use client'

import { TwitterTweetEmbed } from "react-twitter-embed";

const Twitter = () => {
  return (
    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
      <TwitterTweetEmbed tweetId="1901558657181229298" />
      <TwitterTweetEmbed tweetId="1900430835326582836" />
      <TwitterTweetEmbed tweetId="1883145291693539344" />
    </div>
  );
};

export default Twitter;