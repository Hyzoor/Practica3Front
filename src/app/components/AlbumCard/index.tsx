import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAlbumById } from "@/lib/albums";
import { Album } from "@/types";

import "./styles.css"
import { useLista } from "@/context/MusicContext";

interface AlbumCardParams {
	idAlbum?: number;
	showAddToFav?: boolean;
	showRemoveFromFav?: boolean;
}


const AlbumCard = ({
	idAlbum,
	showAddToFav = false,
	showRemoveFromFav = false
}: AlbumCardParams) => {

	const router = useRouter();
	const [album, setAlbum] = useState<Album | null>(null);
	const [error, setError] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(true);


	const { addToList, deleteFromList } = useLista();

	useEffect(() => {

		setLoading(true);
		console.log(idAlbum)
		if (!album && idAlbum) {
			getAlbumById(idAlbum)
				.then((e) => { setAlbum(e); setError("") })
				.catch((e) => setError(e.message))
				.finally(() => setLoading(false))
		}

	}, [idAlbum]);


	return (

		<div className="album-card">

			{!error && !loading &&

				<>
					<h1>{album?.collectionName}</h1>
					<h2>{album?.artistName}</h2>
					{album?.artworkUrl100 && <img src={album?.artworkUrl100} />}

					<button onClick={() => router.push("albums/" + album?.collectionId)}>
						Ver detalles
					</button>

					{showAddToFav &&
						<button onClick={() => addToList(String(album?.collectionId))}>
							Agregar a favoritos
						</button>
					}

					{showRemoveFromFav &&
						<button onClick={() => deleteFromList(String(album?.collectionId))}>
							Eliminar de favoritos
						</button>
					}
				</>

			}


			{error && <h3>Error: {error}</h3>}
			{loading && <h2>Loading...</h2>}

		</div >
	)
}


export default AlbumCard;
