'use client'

import { getAlbumsByArtistName } from "@/lib/albums";
import { Album } from "@/types";
import { useEffect, useState } from "react";
import AlbumCard from "../components/AlbumCard";



const searchAlbumsPage = () => {

	const [name, setName] = useState<string>("");
	const [finalName, setFinalName] = useState<string>("");
	const [error, setError] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(true);
	const [albums, setAlbums] = useState<Album[]>([])

	const fetchAlbumsByArtist = async (artist: string) => {

		setLoading(true);
		await getAlbumsByArtistName(artist)
			.then((e) => { setAlbums(e); setError("") })
			.catch((e) => setError(e.message))
			.finally(() => setLoading(false))

	}

	useEffect(() => {

		if (!finalName) {
			return;
		}

		fetchAlbumsByArtist(finalName);
	}, [finalName])



	return (
		<div className="main-container">

			<div className="search-container">
				<input
					value={name}
					onChange={(e) => {
						setName(e.target.value);
					}}
					onKeyDown={(e) => { if (e.key == "Enter") setFinalName(name) }}
				/>


			</div>

			{loading && finalName && <h2>Loading...</h2>}
			{error && <h3>Error: {error}</h3>}

			<div className="album-cards-container">

				{albums && !loading && albums.map((e) =>{
					return <AlbumCard key={e.collectionId} idAlbum={e.collectionId} />;

				})} 

			</div>

		</div>

	)
}



export default searchAlbumsPage;
