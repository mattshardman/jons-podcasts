import { readCsv } from "../client/utils";
import { FetchingRow } from "./FetchingRow";

export function ResultsTable({
  data,
}: {
  data: Awaited<ReturnType<typeof readCsv>>;
}) {
  console.log('data--->', data);
  return (
    <div className="text-white">
      <div className="bg-gray-900">
        <div className="mx-auto">
          <div className="bg-gray-900 py-10">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <h1 className="text-base font-semibold leading-6 text-white">
                    Podcast Summaries
                  </h1>
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
                          {/* <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0"
                          >
                            Previous Guest
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                          >
                            Previous Keywords
                          </th> */}
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                          >
                            Previous Episode
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                          >
                            Current Episode
                          </th>
                          {/* <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                          >
                            Current Keywords
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                          >
                           Current Guest
                          </th> */}
                          {/* <th
                            scope="col"
                            className="w-48 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0"
                          >
                            Current Title (Original)
                          </th>
                          <th
                            scope="col"
                            className="w-48 px-3 py-3.5 text-left text-sm font-semibold text-white"
                          >
                            Current Description (Original)
                          </th>
                          <th
                            scope="col"
                            className="w-48 px-3 py-3.5 text-left text-sm font-semibold text-white"
                          >
                            Previous Title (Original)
                          </th>
                          <th
                            scope="col"
                            className="w-48 px-3 py-3.5 text-left text-sm font-semibold text-white"
                          >
                            Previous Description (Original)
                          </th>
                          <th
                            scope="col"
                            className="w-48 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0"
                          >
                            Host or Show Info (Original)
                          </th> */}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800">
                        {data?.map((item) => {
                          return (
                            // <Suspense
                            //   key={item.recentEpisodeTitles}
                            //   fallback={<Fallback />}
                            // >
                            <FetchingRow
                              key={item.recentEpisodeTitles}
                              input={item}
                            />
                            // </Suspense>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
