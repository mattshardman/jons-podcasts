import type { NextApiRequest, NextApiResponse } from "next";

// founded:gte:1517270400,founded:lte:1589932800

interface GetPodcastsArgs {
  id: string;
  anyIn: "any" | "in";
  page: string;
  dateFrom: string;
  dateTo: string;
  country: string;
  query?: string;
}

const getPodcasts = async ({
  id,
  anyIn = "in",
  page,
  dateFrom,
  dateTo,
  country,
  query = "",
}: GetPodcastsArgs) => {
  try {
    let url = `https://api.rephonic.com/api/search/podcasts/?page=${page}&per_page=100&filters=active:is:true,languages:any:en,founded:gte:${dateFrom},founded:lte:${dateTo}`;

    if (id) {
      url = url + `,categories:${anyIn}:${id}`;
    }

    if (country && country !== "all") {
      url = url + `&countries:in:${country}`;
    }

    if (query) {
      url = url + `&query=${query}`;
    }

    console.log("url", url);

    const result = await fetch(url, {
      method: "GET",
      headers: new Headers({
        "X-Rephonic-Api-Key": process.env.NEXT_PUBLIC_API_KEY as string,
      }),
    });

    return result.json();
  } catch (err) {
    console.log(err);
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id, anyIn, page, dateFrom, dateTo, country, query } =
      req.query as Record<string, string>;

    const podcasts = await getPodcasts({
      id,
      query,
      anyIn: anyIn as "any" | "in",
      page,
      dateFrom,
      dateTo,
      country,
    });

    res.status(200).json(podcasts);
  } catch (err) {
    console.log("error---->", err);
  }
}
