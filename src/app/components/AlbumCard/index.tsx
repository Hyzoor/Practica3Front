import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAlbumById} from "@/lib/albums";
import { Album } from "@/types";

const AlbumCard = (params: { idAlbum?: number }) => {

	const idAlbum = params.idAlbum;
	const router = useRouter();
	const [album, setAlbum] = useState<Album | null>(null);
	const [error, setError] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {

		setLoading(true);
		console.log(idAlbum)
		if (!album && idAlbum) {
			getAlbumById(idAlbum)
				.then((e) => {setAlbum(e); setError("")})
				.catch((e) => setError(e.message))
				.finally(() => setLoading(false))
		}

	}, [idAlbum]);


	return (

		<div className="album-card" onClick={() => 

			router.push("albums/" + album?.collectionId)}>

			{!error && !loading &&
				
				<>
					<h1>{album?.collectionName}</h1>
					<h2>{album?.artistName}</h2>
					{album?.artworkUrl100 && <img src={album?.artworkUrl100} />}
					<button> Agregar a favoritos </button>
				</>
			}


			{error && <h3>Error: {error}</h3>}
			{loading && album && <h2>Loading...</h2>}

		</div >
	)
}


export default AlbumCard;
