import OpenAI from "openai";

const openai = new OpenAI({
  // apiKey: "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",
  apiKey: "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",
});

type Args = {
  showInfo: string;
  previousEpisodeTitle: string;
  previousEpisodeBody: string;
  recentEpisodeTitles: string;
  recentEpisodeBody: string;
};

export async function fetchData(input: Args) {
  const chatResult = [input].map(async (podcast) => {
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "user",
            content: `${podcast.showInfo} find the host name from this and return the json { hostName: 'host name' }. If no result found, or the host is not mentioned or it is unknown return { hostName: '' }`,
          },
        ],
        model: "gpt-3.5-turbo-1106",
        response_format: { type: "json_object" },
      });
      const completion1 = await openai.chat.completions.create({
        messages: [
          {
            role: "user",
            content: `${podcast.recentEpisodeTitles} ${podcast.recentEpisodeBody} find the guest name and provide 3 key words to describe this podcast episode. Return it in json format: { guest: 'guest name', keywords: ['word1', 'word2', 'word3'] } limit the key words to only 3 key words. If no result found, for guests return "". If no results found for keywords return an empty array`,
          },
        ],
        model: "gpt-3.5-turbo-1106",
        response_format: { type: "json_object" },
      });

      const completion2 = await openai.chat.completions.create({
        messages: [
          {
            role: "user",
            content: `${podcast.previousEpisodeTitle} ${podcast.previousEpisodeBody} find the guest name and provide 3 key words to describe this podcast episode. Return it in json format: { guest: 'guest name', keywords: ['word1', 'word2', 'word3'] } limit the key words to only 3 key words. If no result found, for guests return: "". If no results found for keywords return an empty array`,
          },
        ],
        model: "gpt-3.5-turbo-1106",
        response_format: { type: "json_object" },
      });

      return {
        hostName:
          JSON.parse(
            completion.choices[0].message.content || "{ hostName: '' }"
          )?.hostName || "",
        current: JSON.parse(completion1.choices[0].message.content || "{}"),
        previous: JSON.parse(completion2.choices[0].message.content || "{}"),
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
      };
    }
  });
  return Promise.all(chatResult);
}
