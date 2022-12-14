// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

const getPodcasts = async (id: string, date: number, country: string) => {
  try {
    const result = await fetch(
      `https://api.rephonic.com/api/search/podcasts/?per_page=100&filters=active:is:true,languages:any:en,categories:in:${id},founded:gte:${date},locations:any:${country}`,
      {
        method: "GET",
        headers: new Headers({
          "X-Rephonic-Api-Key": process.env.NEXT_PUBLIC_API_KEY as string,
        }),
      }
    );

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
    const { id, date, country } = req.query;

    const podcasts = await getPodcasts(
      id as string,
      parseInt(date as string),
      country as string
    );

    res.status(200).json(podcasts);
  } catch (err) {
    console.log("error---->", err);
  }
}
