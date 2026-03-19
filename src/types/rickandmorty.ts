// Personaje de Rick And Morty
export interface Character {
    id: number;
    name: string;
    status: 'Alive' | 'Dead' | 'unknown';
    species: string;
    gender: string;
    origin: {
        name: string;
    };
    location: {
        name: string;
    };
    image: string;
    episode: string[]; // lista de episodios en los que aparece
}

// Episodio
export interface Episode {
    id: number;
    name: string;
    air_date: string;
    episode: string; // formato S01E01
    characters: string[]; // Lista de URLS de personajes
}

// La API devuelve siempre esta estructura con paginacion
export interface ApiResponse<T> {
    info: {
        count: number;
        pages: number;
        next: string | null;
        prev: string | null;
    };
    results: T[];
}