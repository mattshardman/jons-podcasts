"use client";

import React from "react";
import { DragAndDrop } from "../../app/ai/components/client/dragdrop";
import { readCsv } from "./components/readCsv";

const exampleJson = [
  {
    hostName: "",
    current: {
      guest: "John Murphy",
      keywords: ["operational excellence", "Lean", "Six Sigma"],
    },
    previous: {
      guest: "Jacintha Kurniawan",
      keywords: ["Communication", "AI", "Life planning"],
    },
  },
];

type Response = {
  status: "success" | "error";
  result: typeof exampleJson | null;
};

const getResponse = async (input: Record<string, string>[]) => {
  const result = await fetch("/api/openai", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (result.ok === false) {
    return {
      status: "error" as const,
      result: null,
    };
  }

  const json = await result.json();

  return {
    status: "success" as const,
    result: json as typeof exampleJson,
  };
};

function InputTable({ data }: { data: Awaited<ReturnType<typeof readCsv>> }) {
  return (
    <div className="bg-gray-900">
      <div className="mx-auto max-w-7xl">
        <div className="bg-gray-900 py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-base font-semibold leading-6 text-white">
                  Podcast Input
                </h1>
                {/* <p className="mt-2 text-sm text-gray-300">
                  A list of all the users in your account including their name,
                  title, email and role.
                </p> */}
              </div>
              <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                {/* <button
                  type="button"
                  className="block rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  Download
                </button> */}
              </div>
            </div>
            <div className="mt-8 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0"
                        >
                          Current Title
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                        >
                          Current Description
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                        >
                          Previous Title
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                        >
                          Previous Description
                        </th>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0"
                        >
                          Host or Show Info
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {data?.map((podcast, i) => (
                        <tr key={i}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0 capitalize">
                            {podcast.recentEpisodeTitles.slice(0, 50)}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300 capitalize">
                            {podcast.recentEpisodeBody.slice(0, 50)}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300 capitalize">
                            {podcast.previousEpisodeTitle.slice(0, 50)}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300 capitalize">
                            {podcast.previousEpisodeBody.slice(0, 50)}
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0 capitalize">
                            {podcast.showInfo.slice(0, 50)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResultTable({ data }: { data: typeof exampleJson }) {
  return (
    <div className="bg-gray-900">
      <div className="mx-auto max-w-7xl">
        <div className="bg-gray-900 py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-base font-semibold leading-6 text-white">
                  Podcast Summaries
                </h1>
                {/* <p className="mt-2 text-sm text-gray-300">
                  A list of all the users in your account including their name,
                  title, email and role.
                </p> */}
              </div>
              <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                <button
                  type="button"
                  className="block rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  Download
                </button>
              </div>
            </div>
            <div className="mt-8 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                      <tr>
                      <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0"
                        >
                          Host Name
                        </th>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0"
                        >
                          Current Guest
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                        >
                          Current Keywords
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                        >
                          Previous Guest
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                        >
                          Previous Keyword
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {data.map((podcast, i) => (
                        <tr key={i}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0 capitalize">
                            {podcast.hostName.includes("Unknown") ? "" : podcast.hostName}
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
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function* chunks(arr: any[], n: number) {
  for (let i = 0; i < arr.length; i += n) {
    yield arr.slice(i, i + n);
  }
}

export function AI() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [csv, setCsv] = React.useState<Awaited<ReturnType<typeof readCsv>>>();
  const [data, setData] = React.useState<Response["result"]>();
  const onDrop = async (input: File[]) => {
    setLoading(true);
    const result = await readCsv(input);
    setCsv(result);
    if (result) {
      const response = await getResponse(result);
      setData(response.result);
      // const resultChunks = Array.from(chunks(result, 5));
      // resultChunks.forEach(async (chunk) => {
      //   const response = await getResponse(chunk);
      //   setData((prev) => {
      //     console.log('getting data--->', response)
      //     if (prev && response.status === "success") {
      //       return [...prev, ...response.result];
      //     }

      //     return response.result;
      //   });
      // });
    }
    setLoading(false);
  };

  if (error) {
    return <div className="p-16 text-white">Error</div>;
  }

  if (data) {
    return (
      <div className="space-y-6">
        <InputTable data={csv} />
        <hr />
        <ResultTable data={data} />
        {loading && <div className="p-16 text-white">Loading...</div>}
      </div>
    );
  }

  if (csv && loading) {
    return (
      <div className="space-y-6">
        <InputTable data={csv} />
        <hr />
        <div className="p-16 text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-16">
      <DragAndDrop title="Upload CSV" setData={onDrop} />
    </div>
  );
}
