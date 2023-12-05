import csv from "csvtojson";

const csvExample = {
  showInfo: "",
  previousEpisodeTitle:
    "9 - Mastering the Art of Communication: Tailoring Messages for Impact with The Deep Dive Lab's Jacintha Kurniawan",
  previousEpisodeBody:
    "Your host, Glen Poulos, talks with the Innovation Podcast Host and Producer of The Deep Dive Lab, Jacintha Kurniawan. Jacintha's journey began in Australia, where she worked as a business development manager before deciding to pursue an MBA in Canada. At Simon Fraser University, where Jacintha pursued her MBA, there was no specialization. Instead, students learned about various aspects of business management, including analytics, marketing, finance, and economics. This broad-based approach provided her with a comprehensive understanding of business management. Jacintha believes that AI will impact every industry and emphasizes the need for ethical AI development. She uses AI tools for editing her podcast and optimizing marketing strategies. She also mentioned the usefulness of ChatGPT for summarizing information and the importance of prompt engineering to get the desired value from AI tools. Jacintha loves news and data aggregators because they summarize all the information for her. She recommends newsletters like Neuron AI and Daily Brew, which provide summaries of the latest updates in various fields like AI, business, tech, and design. Jacintha's approach to life planning was inspired by the book \"Designing Your Life.\" She created a manifestation board, dividing her life into four categories: career, love, health, and personal growth. She emphasizes that planning is not about sticking to a rigid plan, but rather about organizing and categorizing thoughts and understanding priorities. To learn more about Jacintha's work, click HERE and HERE. Check out Jacintha's podcast, The Deep Dive Lab, HERE. Think you'd be a great guest on the show? Apply HERE. Want to learn more about Glen's work? Check out his website at https://glennpoulos.com.",
  recentEpisodeTitles:
    "10 - The Importance of Operational Excellence and Lean Six Sigma with Venture Management Consultants' John Murphy",
  recentEpisodeBody:
    "Your host, Glen Poulos, talks with the Founder and Owner of Venture Management Consultants, John Murphy. John specializes in teaching operational excellence, which includes lean and Six Sigma methodologies. For those unfamiliar, lean focuses on eliminating waste in businesses, while Six Sigma optimizes and perfects processes. By combining these two approaches, businesses can achieve flow, harmony, and balance in their operations. John believes that ignorance is the main obstacle to operational excellence. Many businesses are unaware of Lean and Six Sigma principles and tend to complicate things instead of simplifying them. This often leads to a loss of focus on customer needs and value. John helps businesses overcome these challenges by using data collection, process mapping, and root cause analysis to reveal inefficiencies and waste. The process of implementing Lean and Six Sigma starts with a two-day workshop where the tools and methodologies are taught. John also helps companies change their cultures, which he defines as the way things are done within an organization. This includes not only attitudes and behaviors but also systems, structures, and policies. To learn more about John's work, click HERE and HERE. Check out John's books HERE. Think you'd be a great guest on the show? Apply HERE. Want to learn more about Glen's work? Check out his website at https://glennpoulos.com.",
};

export const readCsv = async (file: File[]) => {
  if (file?.[0]) {
    const result = await new Promise((resolve) => {
      const reader = new FileReader();

      reader.onload = async (e) => {
        const data = e?.target?.result;

        if (data) {
          let idx = 0;
          const result: Record<string, any>[] = await csv()
            .preFileLine((fileLineString) => {
              const firstLine = !idx;
              idx += 1;
              if (firstLine) {
                // use columns array instead of column names from form
                return "previousEpisodeTitle,previousEpisodeBody,recentEpisodeTitles,recentEpisodeBody,showInfo";
              }

              return fileLineString;
            })
            .fromString(data as string);

          const filteredResult = result
            .filter((row) => {
              if (!Object.values(row).filter((o) => o).length) {
                return false;
              }
              return true;
            })
            .map(async (each) => {
              return {
                showInfo: each.showInfo,
                previousEpisodeTitle: each.previousEpisodeTitle,
                previousEpisodeBody: each.previousEpisodeBody,
                recentEpisodeTitles: each.recentEpisodeTitles,
                recentEpisodeBody: each.recentEpisodeBody,
              };
            });

          const promFilteredResult = await Promise.all(filteredResult);

          resolve(promFilteredResult);
        }
      };

      reader.readAsText(file[0]);
    });

    return result as Array<typeof csvExample>;
  }
};
