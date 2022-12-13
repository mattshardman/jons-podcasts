"use client";

import { useState, ChangeEventHandler } from "react";

import styles from "./Home.module.css";

const getPodcasts = async (id: string, date: number) => {
  try {
    const result = await fetch(
      `https://api.rephonic.com/api/search/podcasts/?filters=active:is:true,languages:any:en,categories:in:${id},founded:gte:${date}`,
      {
        method: "GET",
        headers: new Headers({
          "X-Rephonic-Api-Key": process.env.API_KEY as string,
        }),
      }
    );

    return result.json();
  } catch (err) {
    console.log(err);
  }
};

type Props = {
  options?: {
    id: string;
    label: string;
  }[];
};

export const Home = ({ options }: Props) => {
  const [loading, setLoading] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [founded, setFounded] = useState(() =>
    Math.floor(new Date().getTime() / 1000)
  );

  const [data, setData] = useState<any>();

  const onChange: ChangeEventHandler<HTMLSelectElement> = async (e) => {
    setSelectedCategory(e.target.value);
  };

  const onDateChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const timestamp = Math.floor(new Date(e.target.value).getTime() / 1000);
    setFounded(timestamp);
  };

  const search = async () => {
    if (selectedCategory) {
      setLoading(true);
      const result = await getPodcasts(selectedCategory, founded);
      setData(result);
      setLoading(false);
    }
  };

  return (
    <section className="py-6 px-96">
      <div className="flex space-x-4 py-6">
        <div>
          <label className="flex space-x-4 items-center">
            <p>Category</p>
            <select
              className="border border-black rounded-md px-2 py-2"
              name="Categories"
              id="categories"
              onChange={onChange}
            >
              {options?.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label className="flex space-x-4 items-center">
            <p>Date</p>
            <input
              className="border border-black rounded-md px-2 py-2"
              type="date"
              onChange={onDateChange}
            />
          </label>
        </div>
        <button
          className="border border-black rounded-md px-6 py-2"
          onClick={search}
        >
          {!loading ? "Search" : "Loading...."}
        </button>
      </div>
      <div>{!data?.podcasts?.length && <div>No results</div>}</div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Founded</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {data?.podcasts?.map((podcast: any) => (
              <tr key={podcast.name}>
                <td>{podcast.name}</td>
                <td>{new Date(podcast.founded).toDateString()}</td>
                <td>{podcast.description.slice(0, 100)}...</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
