'use client'

import { Suspense, useEffect, useState } from 'react';
import CardItem from "@/components/CardItem";
import CardItemGrid from "@/components/CardItemGrid";
import Heading from "@/components/Heading";
import Layout from "@/components/Layout";
import { customGet } from "@/utils/customGet";
import { isAuthenticated } from "@/utils/isAuthenticated";
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';

/*function getCategories() {
  const {data: session} = useSession();

  if (!(isAuthenticated(session))) {
    redirect('/login');
  }

  return customGet(
    "https://api.spotify.com/v1/browse/categories?limit=50&country=IN",
    session
  );
} */

export default function Search() {
  const [data, setData] = useState(null)

  const { data: session } = useSession();

  if (!(isAuthenticated(session))) {
    redirect('/login');
  }

  useEffect(() => {
    customGet(
      "https://api.spotify.com/v1/browse/categories?limit=50&country=IN",
      session
    )
      .then((data) => {
        setData(data)
      })
  })
  // const categories = getCategories();

  return (
    <Layout title="Spotify - Search">
      <Heading text="Browse Categories" />

      <Suspense fallback={<div>Loading categories...</div>}>
        <CardItemGrid>
          {data?.categories?.items?.map((category) => (
            <CardItem
              key={category.id}
              altTitle={category.name}
              heading={category.name}
              id={category.id}
              images={category.icons}
              type="genre"
            />
          ))}
        </CardItemGrid>
      </Suspense>
    </Layout>
  );
}