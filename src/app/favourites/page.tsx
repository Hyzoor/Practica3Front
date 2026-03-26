'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLista } from "@/context/MusicContext";
import { getAlbumById } from "@/lib/albums";
import type { Album } from "@/types";
import AlbumCard from "../components/AlbumCard";



const FavouritesAlbumsPage = () => {

	const router = useRouter();

	const { lista } = useLista();

	const [page, setPage] = useState<number>(0);
	const limitPerPage = 9;

	const [albums, setAlbums] = useState<Album[]>([])
	const [error, setError] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(true);

	const fetchAlbumsPage = async () => {

		const start = page * limitPerPage;
		const end = start + limitPerPage;
		const ids = lista.slice(start, end);

		setLoading(true);

		await Promise.all(ids.map((id) => getAlbumById(Number(id))))
			.then((e) => { setAlbums(e); setError(""); })
			.catch((e) => setError(e.message))
			.finally(() => setLoading(false))

	}

	useEffect(() => {

		fetchAlbumsPage();

	}, [page, lista])


	return (
		<div className="main-container">

			<h1> Albumes favorikos mas cukitos </h1>

			<div className="search-container">
				<button onClick={() => router.push("/")}> Home </button>
			</div>

			<div className="pagination-container">
				{page > 0 && (
					<button onClick={() => setPage(page - 1)}>Anterior</button>
				)}
				{(page + 1) * limitPerPage < lista.length && (
					<button onClick={() => setPage(page + 1)}>Siguiente</button>
				)}
			</div>


			{loading && <h2>Loading...</h2>}
			{error && <h3>Error: {error}</h3>}

			<div className="album-cards-container">

				{albums && !loading && albums.map((e) => {
					return <AlbumCard
						key={e.collectionId}
						idAlbum={e.collectionId}
						showRemoveFromFav={true}
					/>;
				})}


			</div>

		</div>

	)
}

export default FavouritesAlbumsPage;






