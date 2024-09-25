import { customGet } from "@/utils/customGet";
import { getServerSession } from "next-auth";

export default async function handler(
  req,
  res
) {
  const query = req.query?.q;
  const session = await getServerSession({ req });

  const searchResults = await customGet(
    `https://api.spotify.com/v1/search?q=${query}&market=from_token&type=album,track,artist,playlist&limit=50`,
    session
  );
  console.log('searchResults in server', searchResults)
  res.status(200).json(searchResults);
}