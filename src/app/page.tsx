'use client'

import { useRouter } from "next/navigation";

const Home = () => {

	
	const router = useRouter();

	return (

		<div>
			
			<h1> Is there anybody going to listen to my story </h1>
			
			<button onClick={() => router.push("/albums")}> Buscar albums </button>
			<button onClick={() => router.push("/favourites")}> Mis favoritos </button>
			
		</div>
	)
}


export default Home;
