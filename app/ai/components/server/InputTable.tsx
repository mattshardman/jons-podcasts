import { readCsv } from "../client/utils";

export function InputTable({ data }: { data: Awaited<ReturnType<typeof readCsv>> }) {
  return (
    <div className="bg-gray-900">
      <div className="mx-auto">
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
