import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CharacterCard } from '@/components/rickandmorty/CharacterCard';
import { EpisodeCard } from '@/components/rickandmorty/EpisodeCard';
import { SkeletonCard } from '@/components/rickandmorty/SkeletonCard';
import { useCharacters } from '@/hooks/useCharacters';
import { useEpisodes } from '@/hooks/useEpisodes';

// Tabs disponibles
type Tab = 'characters' | 'episodes';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('characters');

  const {
    characters, loading: loadingChars, error: errorChars,
    search, handleSearch,
    page, setPage, totalPages,
  } = useCharacters();

  const { episodes, loading: loadingEps, error: errorEps } = useEpisodes();

  return (
    <div className="min-h-screen bg-background">

      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-2xl font-bold tracking-tight">
            🛸 Rick and Morty
          </h1>

          {/* Tabs */}
          <div className="flex gap-2">
            <Button
              variant={activeTab === 'characters' ? 'default' : 'outline'}
              onClick={() => setActiveTab('characters')}
            >
              Personajes
            </Button>
            <Button
              variant={activeTab === 'episodes' ? 'default' : 'outline'}
              onClick={() => setActiveTab('episodes')}
            >
              Episodios
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-6">

        {/* Buscador — solo visible en personajes */}
        {activeTab === 'characters' && (
          <Input
            placeholder="Buscar personaje..."
            value={search}
            onChange={e => handleSearch(e.target.value)}
            className="max-w-sm"
          />
        )}

        {/* ── PERSONAJES ── */}
        {activeTab === 'characters' && (
          <>
            {errorChars && (
              <p className="text-center text-muted-foreground py-12">
                No se encontraron personajes con ese nombre.
              </p>
            )}

            {/* Grid de skeletons mientras carga */}
            {loadingChars && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({ length: 20 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            )}

            {/* Grid de personajes */}
            {!loadingChars && !errorChars && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {characters.map(character => (
                  <CharacterCard key={character.id} character={character} />
                ))}
              </div>
            )}

            {/* Paginación */}
            {!loadingChars && !errorChars && (
              <div className="flex items-center justify-center gap-4 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setPage(p => p - 1)}
                  disabled={page === 1}
                >
                  ← Anterior
                </Button>

                <span className="text-sm text-muted-foreground">
                  Página {page} de {totalPages}
                </span>

                <Button
                  variant="outline"
                  onClick={() => setPage(p => p + 1)}
                  disabled={page === totalPages}
                >
                  Siguiente →
                </Button>
              </div>
            )}
          </>
        )}

        {/* ── EPISODIOS ── */}
        {activeTab === 'episodes' && (
          <>
            {errorEps && (
              <p className="text-center text-muted-foreground py-12">
                Error al cargar los episodios.
              </p>
            )}

            {loadingEps && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {Array.from({ length: 20 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            )}

            {!loadingEps && !errorEps && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {episodes.map(episode => (
                  <EpisodeCard key={episode.id} episode={episode} />
                ))}
              </div>
            )}
          </>
        )}

      </main>
    </div>
  );
}