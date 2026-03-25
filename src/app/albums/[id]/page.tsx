'use client'

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAlbumById } from "@/lib/albums";
import type { Album } from "@/types";


const AlbumPageById = () => {

	const { id } = useParams();

	const router = useRouter();

	const [Album, setAlbum] = useState<Album | null>(null);
	const [error, setError] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
	
		getAlbumById(Number(id))
			
			.then((e) => {setAlbum(e); setError("")})
			.catch((e) => setError(e.message))
			.finally(() => setLoading(false))

	}, [id])


	return (

		<div className="album-info-container">

			<button onClick={router.back}> Tirame patras loquete</button>

			{!Album && loading && <h1>Loading...</h1>}
			{error && <h2> Error: {error} </h2>}

		</div>
	)
}


export default AlbumPageById;






