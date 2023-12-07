import { NextResponse } from "next/server";

import OpenAI from "openai";

console.log(process.env.OPENAI_API_KEY);

const openai = new OpenAI({
  // apiKey: "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",
  apiKey: process.env.OPENAI_API_KEY,
});

type Args = {
  showInfo: string;
  previousEpisodeTitle: string;
  previousEpisodeBody: string;
  recentEpisodeTitles: string;
  recentEpisodeBody: string;
};

async function fetchData(input: Args) {
  const chatResult = [input].map(async (podcast) => {
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant designed to output JSON. Answer the following question and ignore previous input",
          },
          {
            role: "user",
            content: `Ignore all previous instructions. Here is some text: ${podcast.showInfo}, from it find the host name from this and return the json { hostName: 'host name' }. If no result found, or the host is not mentioned or it is unknown return { hostName: '' }`,
          },
        ],
        model: "gpt-3.5-turbo-1106",
        response_format: { type: "json_object" },
      });
      const completion1 = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant designed to output JSON. Answer the following question and ignore previous input",
          },
          {
            role: "user",
            content: `Ignore all previous instructions.  Here is some text: ${podcast.recentEpisodeTitles} ${podcast.recentEpisodeBody}, from it find the guest name and provide 3 key words to describe this podcast episode. Return it in json format: { guest: 'guest name', keywords: ['word1', 'word2', 'word3'] } limit the key words to only 3 key words. If no result found, for guests return "". If no results found for keywords return an empty array`,
          },
        ],
        model: "gpt-3.5-turbo-1106",
        response_format: { type: "json_object" },
      });

      const completion2 = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant designed to output JSON. Answer the following question and ignore previous input",
          },
          {
            role: "user",
            content: `Ignore all previous instructions. Here is some text: ${podcast.previousEpisodeTitle} ${podcast.previousEpisodeBody}, from it find the guest name and provide 3 key words to describe this podcast episode. Return it in json format: { guest: 'guest name', keywords: ['word1', 'word2', 'word3'] } limit the key words to only 3 key words. If no result found, for guests return: "". If no results found for keywords return an empty array`,
          },
        ],
        model: "gpt-3.5-turbo-1106",
        response_format: { type: "json_object" },
      });

      console.log(
        "host name---------------------------------\n",
        podcast.showInfo,
        completion.choices
      );
      console.log(
        "current result---------------------------------\n",
        podcast.recentEpisodeTitles,
        podcast.recentEpisodeBody,
        completion1.choices
      );
      console.log(
        "previous result---------------------------------\n",
        podcast.previousEpisodeTitle,
        podcast.previousEpisodeBody,
        completion2.choices
      );

      return {
        hostName:
          JSON.parse(
            completion.choices[0].message.content || "{ hostName: '' }"
          )?.hostName || "",
        current: JSON.parse(completion1.choices[0].message.content || "{}"),
        previous: JSON.parse(completion2.choices[0].message.content || "{}"),
        original: input,
      };
    } catch (err) {
      console.log("error--->", err);
      return {
        current: {
          guest: "",
          keywords: [""],
        },
        previous: {
          guest: "",
          keywords: [""],
        },
        original: input,
      };
    }
  });
  return Promise.all(chatResult);
}

export async function POST(request: Request) {
  const input = await request.json();
  const data = await fetchData(input);

  return NextResponse.json(data);
}
