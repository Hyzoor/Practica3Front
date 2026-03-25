'use client'

import { getAlbumsByArtistName } from "@/lib/albums";
import { Album } from "@/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AlbumCard from "../components/AlbumCard";

import "./styles.css"


const searchAlbumsPage = () => {

	const router = useRouter();

	const [albums, setAlbums] = useState<Album[]>([])
	const [allAlbums, setAllAlbums] = useState<Album[]>([])


	// He intentado realizar una paginacion usando la api de itunes con el parametro limit y offset 
	// pero no funciona en todos los endpoints correctamente, resulta que la api no tiene paginacion 
	// como tal por eso este arreglo algo cutre, ya que obtengo todos en la primera llamada 

	const [page, setPage] = useState<number>(0);
	const limitPerPage = 10;

	const [name, setName] = useState<string>("");
	const [finalName, setFinalName] = useState<string>("");
	const [error, setError] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(true);

	const fetchAlbumsByArtist = async (artist: string) => {

		setLoading(true);
		await getAlbumsByArtistName(artist)
			.then((e) => { setAllAlbums(e); setError("") })
			.catch((e) => setError(e.message))
			.finally(() => setLoading(false))

	}

	const updateAlbumsPage = () => {
		const start = page * limitPerPage;
		const end = start + limitPerPage;
		setAlbums(allAlbums.slice(start, end));
	};

	useEffect(() => {
		updateAlbumsPage();
	}, [allAlbums, page])

	useEffect(() => {
		setPage(0);
		fetchAlbumsByArtist(finalName);
	}, [finalName])


	return (
		<div className="main-container">

			<h1> Busca tu artista favoriko nene </h1>
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
					return <AlbumCard
						key={e.collectionId}
						idAlbum={e.collectionId}
						showAddToFav={true} />;
				})}

			</div>

		</div>

	)
}



export default searchAlbumsPage;
