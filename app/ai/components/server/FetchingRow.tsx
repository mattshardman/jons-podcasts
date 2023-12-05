"use client";

import React from "react";

export const Fallback = () => {
  return (
    <tr>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0 capitalize">
        Loading...
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300 capitalize"></td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300 capitalize"></td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300 capitalize"></td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300 capitalize"></td>
    </tr>
  );
};

type Props = {
  input: PodcastRow;
};

type PodcastRow = {
  showInfo: string;
  previousEpisodeTitle: string;
  previousEpisodeBody: string;
  recentEpisodeTitles: string;
  recentEpisodeBody: string;
};

type ResultRow = {
  hostName: string;
  current: {
    guest: string;
    keywords: string[];
  };
  previous: {
    guest: string;
    keywords: string[];
  };
  original: PodcastRow;
};

export function FetchingRow({ input }: Props) {
  const [data, setData] = React.useState<ResultRow[]>();

  const fetchData = async (input: PodcastRow) => {
    const res = await fetch("/api/ai", {
      method: "POST",
      body: JSON.stringify(input),
    });

    const json = await res.json();
    setData(json);
  };

  React.useEffect(() => {
    if (input.showInfo) {
      console.log("calling");

      fetchData(input);
    }
  }, [input]);

  if (!data) {
    return <tr>Loading...</tr>;
  }

  const podcast = data?.[0];

  return (
    <tr>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0 capitalize">
        {podcast.hostName.toLowerCase().includes("unknown")
          ? ""
          : podcast.hostName}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300 capitalize">
        {podcast.current.guest}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300 capitalize">
        {typeof podcast.current.keywords === "string"
          ? podcast?.current?.keywords
          : podcast?.current?.keywords?.join(", ")}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300 capitalize">
        {podcast.previous.guest}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300 capitalize">
        {typeof podcast.previous.keywords === "string"
          ? podcast?.previous?.keywords
          : podcast?.previous?.keywords?.join(", ")}
      </td>

      {/* original  */}
      <td className="w-48 truncate whitespace-nowrap px-3 py-4 text-sm text-gray-300 capitalize">
        {podcast.original.recentEpisodeTitles.slice(0, 50)}
      </td>
      <td className="w-48 truncate whitespace-nowrap px-3 py-4 text-sm text-gray-300 capitalize">
        {podcast.original.recentEpisodeBody.slice(0, 50)}
      </td>
      <td className="w-48 truncate whitespace- px-3 py-4 text-sm text-gray-300 capitalize">
        {podcast.original.previousEpisodeTitle.slice(0, 50)}
      </td>
      <td className="w-48 truncate whitespace-nowrap px-3 py-4 text-sm text-gray-300 capitalize">
        {podcast.original.previousEpisodeBody.slice(0, 50)}
      </td>
      <td className="w-48 truncate whitespace-nowrap px-3 py-4 text-sm text-gray-300 capitalize">
        {podcast.original.showInfo.slice(0, 50)}
      </td>
    </tr>
  );
}
