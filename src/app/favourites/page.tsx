'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { Album } from "@/types";
import "./styles.css"
import { useLista } from "@/context/MusicContext";


const FavouritesAlbumsPage = () => {

	const router = useRouter();
	const {lista, deleteFromList} = useLista();
	
	const [albums, setAlbums] = useState<Album[]>([])
	const [allAlbums, setAllAlbums] = useState<Album[]>([])

	const [page, setPage] = useState<number>(0);
	const limitPerPage = 10;

	const updateAlbumsPage = () => {
		const start = page * limitPerPage;
		const end = start + limitPerPage;
		setAlbums(allAlbums.slice(start, end));
	};

	useEffect(() => {
		updateAlbumsPage();
	}, [allAlbums, page])


	return (
		<div className="main-container">

			<h1> Albumes favorikos mas cukitos </h1>
			<div className="search-container">
				<input
					value={name}
					onChange={(e) => {
						setName(e.target.value);
					}}
					onKeyDown={(e) => { if (e.key == "Enter") setFinalName(name) }}
				/>
				<button onClick={() => router.push("/")}> Home </button>

			</div>

			{loading && <h2>Loading...</h2>}
			{error && <h3>Error: {error}</h3>}

			<div className="pagination-container">
				{page > 0 && (
					<button onClick={() => setPage(page - 1)}>Anterior</button>
				)}
				{(page + 1) * limitPerPage < allAlbums.length && (
					<button onClick={() => setPage(page + 1)}>Siguiente</button>
				)}
			</div>


			<div className="album-cards-container">

				{albums && !loading && albums.map((e) => {
					return <AlbumCard key={e.collectionId} idAlbum={e.collectionId} />;
				})}

			</div>

		</div>

	)
}

export default FavouritesAlbumsPage;






