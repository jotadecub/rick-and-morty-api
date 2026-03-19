import { useState, useEffect } from "react";
import type { Episode, ApiResponse } from "@/types/rickandmorty";

export function useEpisodes() {
    const [episodes, setEpisodes] = useState<Episode[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEpisodes = async () => {
            try {
                setLoading(true);
                const res = await fetch('https://rickandmortyapi.com/api/episode');
                const data: ApiResponse<Episode> = await res.json();
                setEpisodes(data.results);
            } catch {
                setError('Error al cargar los episodios.');
            } finally {
                setLoading(false);
            }
        };

        fetchEpisodes();
    }, []);

    return { episodes, loading, error };
}