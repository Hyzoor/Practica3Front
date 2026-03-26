'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLista } from "@/context/MusicContext";
import AlbumCard from "../components/AlbumCard";



const FavouritesAlbumsPage = () => {

	const router = useRouter();

	const { lista } = useLista();

	const [page, setPage] = useState<number>(0);
	const limitPerPage = 9;

	const [albumsInPage, setAlbumsInPage] = useState<string[]>([])

	useEffect(() => {

		const start = page * limitPerPage;
		const end = start + limitPerPage;
		setAlbumsInPage(lista.slice(start, end));

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


			<div className="album-cards-container">

				{albumsInPage && albumsInPage.map((id) => {
					return <AlbumCard
						key={id}
						idAlbum={Number(id)}
						showRemoveFromFav={true}
					/>;
				})}


			</div>

		</div>

	)
}

export default FavouritesAlbumsPage;






