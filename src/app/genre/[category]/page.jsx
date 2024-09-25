"use client";

import Heading from "@/components/Heading";
import Layout from "@/components/Layout";
import PlaylistList from "@/components/PlaylistList";
import { customGet } from "@/utils/customGet";
import { isAuthenticated } from "@/utils/isAuthenticated";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function CategoryPlaylists({ params }) {
  const { category } = params; // Obtiene la categoría de los parámetros
  const [capitalizedCategory, setCapitalizedCategory] = useState("");
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      const session = getSession();
      if (isAuthenticated(session)) {
        const response = customGet(
          `https://api.spotify.com/v1/browse/categories/${category}/playlists?country=IN&limit=50`,
          session
        );
        setPlaylists(response.playlists);
        const categoryName = category.toString().split("_").join(" ");
        const afterName = categoryName
          .split(" ")
          .map((i) => i[0].toUpperCase() + i.slice(1))
          .join(" ");
        setCapitalizedCategory(afterName);
      } else {
        window.location.href = "/login"; // Redirige si no está autenticado
      }
    };
    fetchData();
  }, [category]);

  return (
    <Layout title={`Spotify - ${capitalizedCategory}`}>
      <Heading text={capitalizedCategory} className="capitalize" />
      <PlaylistList playlists={playlists?.items} />
    </Layout>
  );
}
