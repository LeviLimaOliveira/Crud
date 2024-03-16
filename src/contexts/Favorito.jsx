import { createContext } from "react";
import {useState, useContext} from 'react'


export const FavoritoContext = createContext();
FavoritoContext.displayName = 'Favorito'

export default function FavoritoProvider({children}) {
    const [favorito, setFavorito] = useState([]);
    return(
        <FavoritoContext.Provider value={{favorito, setFavorito}}>
            {children}
        </FavoritoContext.Provider>
    )
}

export function useFavoritoContext() {
    const {favorito, setFavorito} = useContext(FavoritoContext)

    function adicionarFavorito(novoFavorito) {
        const favoritoRepetido = favorito.some((fav) => fav.id === novoFavorito.id)

        let novaLista = [...favorito]

        if(!favoritoRepetido) {
            novaLista.push(novoFavorito)
            return setFavorito(novaLista)
        }

        novaLista = favorito.filter((fav) => fav.id !== novoFavorito.id)
        return setFavorito(novaLista)
    }
    return{
        favorito,
        adicionarFavorito
    }
}