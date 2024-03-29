"use client";

import { useMemo, useState, ChangeEventHandler } from "react";
import { MultiSelect } from "react-multi-select-component";
import { CSVLink } from "react-csv";
import Image from "next/image";

export interface Podcast {
  id: string;
  publisher: PublisherOrCountry;
  founded: string;
  name: string;
  short_name: string;
  description: string;
  artwork_url: string;
  artwork_thumbnail_url: string;
  web_url: string;
  feed_url: string;
  itunes_id: number;
  language: string;
  format?: null;
  active: boolean;
  deleted: boolean;
  genres?: string[] | null;
  num_episodes: number;
  email: string;
  frequency: string;
  social_reach: number;
  engagement: number;
  gender_skew?: null;
  country: PublisherOrCountry;
  identifiers: Identifiers;
  est_weekly_downloads: number;
  raw_downloads_per_episode: number;
  downloads_per_episode?: number[] | null;
}
export interface PublisherOrCountry {
  id: string;
  name: string;
}
export interface Identifiers {
  itunes: number;
  apple: number;
  spotify: string;
  castbox: number;
  podchaser: number;
  tpa?: null;
  podaddict: number;
  playerfm?: null;
  tunein: string;
  podbean: string;
  audible: string;
  podrepublic: number;
}

interface GetPodcastsArgs {
  id: string;
  query: string;
  anyIn: "any" | "in";
  page: number;
  dateFrom: number;
  dateTo: number;
  country: string;
}

const getPodcasts = async ({
  id,
  query,
  anyIn,
  page,
  dateFrom,
  dateTo,
  country,
}: GetPodcastsArgs) => {
  try {
    const result = await fetch(
      `/api/fetch-podcasts?id=${id}&anyIn=${anyIn}&page=${page}&dateFrom=${dateFrom}&dateTo=${dateTo}&country=${country}&query=${query}`,
      {
        method: "GET",
      }
    );

    return result.json();
  } catch (err) {
    console.log(err);
  }
};

type Props = {
  cats?: Option[];
  countries?: Option[];
};

type Option = {
  id: string;
  label: string;
};

function subtractWeeks(numOfWeeks: number, date = new Date()) {
  date.setDate(date.getDate() - numOfWeeks * 7);

  return date.toLocaleDateString("en-CA");
}

const dateFromInit = subtractWeeks(1);
const dateToInit = subtractWeeks(0);

export const Home = ({ cats, countries }: Props) => {
  const [page, setPage] = useState(1);

  const [loadingState, setLoadingState] = useState<"init" | "loading" | "done">(
    "init"
  );

  const [anyInState, setAnyInState] = useState<"any" | "in">("in");

  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<any>([]);
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [dateFrom, setDateFrom] = useState(dateFromInit);
  const [dateTo, setDateTo] = useState(dateToInit);

  const [data, setData] = useState<{ count: number; podcasts: Podcast[] }>();

  const categories = useMemo(() => {
    return (
      cats?.map((option) => ({
        label: option.label,
        value: option.id,
      })) || []
    );
  }, [cats]);

  const onQueryChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setQuery(e.target.value);
  };

  const onCountryChange: ChangeEventHandler<HTMLSelectElement> = async (e) => {
    setSelectedCountry(e.target.value);
  };

  const onDateFromChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const timestamp = e.target.value;
    setDateFrom(timestamp);
  };

  const onDateToChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const timestamp = e.target.value;
    setDateTo(timestamp);
  };

  const search = async () => {
    const ids = selectedCategory.map((item: any) => item.value).join("-");
    if (selectedCategory) {
      setLoadingState("loading");
      const result = await getPodcasts({
        id: ids,
        query,
        anyIn: anyInState,
        page,
        dateFrom: Math.floor(new Date(dateFrom).getTime() / 1000),
        dateTo: Math.floor(new Date(dateTo).getTime() / 1000),
        country: selectedCountry,
      });

      setData(result);
      setLoadingState("done");
    }
  };

  const loadMore = async () => {
    const ids = selectedCategory.map((item: any) => item.value).join("-");
    if (selectedCategory) {
      setLoadingState("loading");
      const result = await getPodcasts({
        id: ids,
        query,
        anyIn: anyInState,
        page: page + 1,
        dateFrom: Math.floor(new Date(dateFrom).getTime() / 1000),
        dateTo: Math.floor(new Date(dateTo).getTime() / 1000),
        country: selectedCountry,
      });

      if (result?.podcasts?.length) {
        setData((prev) => {
          return {
            count: prev?.count || 0,
            podcasts: [...(prev?.podcasts || []), ...result.podcasts],
          };
        });
      }

      setLoadingState("done");
    }

    setPage((prev) => {
      const newPage = prev + 1;

      return newPage;
    });
  };

  const formattedData = useMemo(() => {
    const downloadData = data?.podcasts?.map((podcast) => ({
      id: podcast.id,
      publisher: podcast.publisher?.name,
      name: podcast.name,
      founded: new Date(podcast.founded).toDateString(),
      description: podcast?.description,
      artwork_thumbnail_url: podcast.artwork_thumbnail_url,
      web_url: podcast.web_url,
      feed_url: podcast.feed_url,
      itunes_id: podcast.itunes_id,
      language: podcast.language,
      email: podcast.email,
      country: podcast.country?.name,
      episodes: podcast.num_episodes,
      genres: podcast.genres,
    }));
    return downloadData || [];
  }, [data]);

  const downloadData = useMemo(() => {
    return formattedData.map((podcast) => ({
      ...podcast,
      itunes_id: `https://geo.itunes.apple.com/us/podcast/${podcast.itunes_id}?mt=2`,
    }));
  }, [formattedData]);

  return (
    <section className="py-6 px-32 max--w-full">
      <div className="flex items-end space-x-4 py-6 max-w-full">
        <div>
          <label
            htmlFor="query"
            className="block text-sm font-medium text-gray-700"
          >
            Query
          </label>
          <input
            className="mt-1 w-60 block h-10 rounded border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 "
            type="text"
            value={query}
            onChange={onQueryChange}
            placeholder="Name or description contains..."
          />
        </div>
        <div>
          <label
            htmlFor="categories"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <MultiSelect
            className="mt-1 w-60"
            options={categories}
            value={selectedCategory}
            onChange={setSelectedCategory}
            labelledBy="Select"
          />
        </div>

        <fieldset>
          <legend className="block text-sm font-medium text-gray-700">
            Select and/or:
          </legend>

          <div className="flex space-x-2 items-center">
            <input
              className="pr-2"
              type="radio"
              id="any"
              name="anyIn"
              value="any"
              checked={anyInState === "any"}
              onChange={() => setAnyInState("any")}
            />
            <label htmlFor="any">or</label>
          </div>

          <div className="flex space-x-2 items-center">
            <input
              className="pr-2"
              type="radio"
              id="in"
              name="andIn"
              value="in"
              checked={anyInState === "in"}
              onChange={() => setAnyInState("in")}
            />
            <label htmlFor="in">and</label>
          </div>
        </fieldset>

        <div className="w-32">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Country
          </label>
          <select
            id="category"
            name="category"
            className="mt-1 block w-full rounded border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            defaultValue="all"
            onChange={onCountryChange}
          >
            {countries?.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="w-32">
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
            Date Founded From
          </label>
          <div className="mt-1">
            <input
              type="date"
              name="date"
              id="date"
              className="block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              defaultValue={dateFromInit}
              onChange={onDateFromChange}
            />
          </div>
        </div>

        <div className="w-32">
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
            Date Founded To
          </label>
          <div className="mt-1">
            <input
              type="date"
              name="date"
              id="date"
              className="block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              defaultValue={dateToInit}
              onChange={onDateToChange}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={search}
          className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {loadingState === "loading" ? "Loading..." : "Search"}
        </button>

        <CSVLink data={downloadData} filename="podcasts">
          <button className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Download
          </button>
        </CSVLink>
      </div>
      <div>
        {!data?.podcasts?.length && loadingState === "done" && (
          <div>No results</div>
        )}
      </div>
      {!!data?.count && (
        <>
          <div className="flex">
            <div>
              <strong>Number of results:</strong> {data?.count}
            </div>
            <div className="pl-32">
              <strong>Showing:</strong> 1 to {data?.podcasts?.length}
            </div>
          </div>
          <div className="max-w-full mt-6">
            <div className="overflow-scroll shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="max-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50 min-w-full">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900"
                    >
                      Image
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 "
                    >
                      Country
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 "
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Founded
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Number of episodes
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Categories
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Feed Url
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Web Url
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {formattedData?.map((podcast, personIdx) => (
                    <tr
                      key={podcast.id}
                      className={personIdx % 2 === 0 ? undefined : "bg-gray-50"}
                    >
                      <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-gray-900">
                        <img
                          src={podcast.artwork_thumbnail_url}
                          alt="photo of podcast"
                          className="h-10 w-10"
                        />
                      </td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                        {podcast.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {podcast.country}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {podcast.email}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {podcast.founded}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {podcast.episodes}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {podcast.genres?.join(", ")}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <a href={podcast.feed_url} className="text-blue-600">
                          {podcast?.feed_url?.slice(0, 50)}...
                        </a>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <a href={podcast.web_url} className="text-blue-600">
                          {podcast?.web_url?.slice(0, 50)}...
                        </a>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500" title={podcast?.description}>
                        {podcast?.description?.slice(0, 100)}...
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="w-full flex justify-center py-6">
              <button
                type="button"
                onClick={loadMore}
                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {loadingState === "loading" ? "Loading..." : "Load more"}
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
};
