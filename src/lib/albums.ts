import { api } from "./axios";



export const getAlbumsByArtistName = async (artist: string) => {
	const response = await api.get(`search?term=${artist}&entity=album`);
	return response.data.results;
}


export const getAlbumById = async (id: number) => {
	const response = await api.get(`lookup?id=${id}`)
	return response.data.results[0]
}
