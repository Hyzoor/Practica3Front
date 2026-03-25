'use client'

import { createContext, ReactNode, useContext, useState } from "react";




type FavouralbumIdusicContextType = {
	lista: string[],
	addToList: (albumId: string) => void,
	deleteFromList: (albumId: string) => void
};

const ListaContext = createContext<FavouralbumIdusicContextType | null>(null);

export const ListaProvider = ({ children }: { children: ReactNode }) => {

	const [lista, setLista] = useState<string[]>([]);

	const addToList = (albumId: string) => {

		if(lista.includes(albumId)){
			return;
		}

		setLista([...lista, albumId]);
	}

	const deleteFromList = (albumId: string) => {
		setLista(lista.filter((x) => x !== albumId));
	}

	return (
		<ListaContext.Provider value={{ lista, addToList, deleteFromList }}>
			{children}
		</ListaContext.Provider>
	)
}


export const useLista = () => {

	const context = useContext(ListaContext);
	if (!context) {
		throw new Error("Estas fuera del proveedor nene");
	}

	return context;
}




