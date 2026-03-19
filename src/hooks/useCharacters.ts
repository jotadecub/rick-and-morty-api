import { useState, useEffect } from "react";
import type { Character, ApiResponse } from "@/types/rickandmorty";

export function useCharacters() {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                setLoading(true);

                // la api permite filtrar por nombre directamente
                const url = `https://rickandmortyapi.com/api/character?page=${page}&name=${search}`;
                const res = await fetch(url);

                // Si no encuentra resultados devuelve 404, lo manejamos aquí
                if (!res.ok) {
                    setCharacters([]);
                    setTotalPages(1);
                    return;
                }

                const data: ApiResponse<Character> = await res.json();
                setCharacters(data.results);
                setTotalPages (data.info.pages);
            } catch {
                setError('Erorr al cargar los personajes.');
            } finally{
                setLoading(false);
            }
        };

        fetchCharacters();
    }, [search, page]) // se vuelve a ejecutar cuando cambia la busqueda

    // Al buscar, volvemos a la pagina 1
    const handleSearch = (value: string) => {
        setSearch(value);
        setPage(1);
    };

    return {
        characters, loading, error,
        search, handleSearch,
        page, setPage, totalPages,
    };
}