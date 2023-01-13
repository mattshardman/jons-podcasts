import type { NextApiRequest, NextApiResponse } from "next";

// founded:gte:1517270400,founded:lte:1589932800

interface GetPodcastsArgs {
  id: string;
  page: string;
  dateFrom: string;
  dateTo: string;
  country: string;
}

const getPodcasts = async ({
  id,
  page,
  dateFrom,
  dateTo,
  country,
}: GetPodcastsArgs) => {
  try {
    let url = `https://api.rephonic.com/api/search/podcasts/?page=${1}&per_page=100&filters=active:is:true,languages:any:en,categories:in:${id},founded:gte:${dateFrom},founded:lte:${dateTo}`;

    if (country && country !== "all") {
      url = url + `&countries:in:${country}`;
    }

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
    const { id, page, dateFrom, dateTo, country } = req.query as Record<
      string,
      string
    >;

    const podcasts = await getPodcasts({
      id,
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
