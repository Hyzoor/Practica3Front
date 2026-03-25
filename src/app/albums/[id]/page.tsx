'use client'

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAlbumById } from "@/lib/albums";
import type { Album } from "@/types";
import "./styles.css"


const AlbumPageById = () => {

	const { id } = useParams();

	const router = useRouter();

	const [album, setAlbum] = useState<Album | null>(null);
	const [error, setError] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {

		getAlbumById(Number(id))

			.then((e) => { setAlbum(e); setError("") })
			.catch((e) => setError(e.message))
			.finally(() => setLoading(false))

	}, [id])


	return (

		<div className="album-info-container">

			{album &&
				<div className="image-info-container">
					<img src={album.artworkUrl100} />
					<div className="info-text-container">
						<h1> {album.collectionName} </h1>
						<h2> {"Artist: " + album.artistName} </h2>
						<h2> {"Price: " + album.collectionPrice} </h2>
						<h2> {"Tracks: " + album.trackCount} </h2>
						<h2> {"Release date: " + album.releaseDate} </h2>
					</div>
				</div>
			}

			<button onClick={router.back}> Tirame patras loquete</button>

			{loading && <h1>Loading...</h1>}
			{error && <h2> Error: {error} </h2>}

		</div>
	)
}

export default AlbumPageById;






