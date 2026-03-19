import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import type { Character } from "@/types/rickandmorty";

// Colores del badge segun el estado del personaje
const statusConfig = {
    Alive: { label: 'Vivo', className: 'bg-green-500 hover:bg-green-600'},
    Dead: { label: 'Muerto', className: 'bg-red-500 hover:bg-red-600'},
    unknown: { label: 'Desconocido', className: 'bg-gray-500 hover:bg-gray-600'},
};

interface Props {
    character: Character;
}

export function CharacterCard({ character }: Props) {
    const status = statusConfig[character.status];

    return (
        <Card className="overflow-hiden hover:shadow-lg transition-shadow duration-300">
            <div className="relative">
                <img
                    src={character.image}
                    alt={character.name}
                    className="w-full h-48 object-cover"
                />

                {/* Badge de estado encima de la imagen */}
                <Badge className={`absolute top-2 right-2 ${status.className}`}>
                    {status.label}
                </Badge>
            </div>

            <CardContent className="p-4 space-y-2">
                <h3 className="font-bold text-lg leading-tight">{character.name}</h3>
                <div className="text-sm text-muted-foreground space-y-1">
                    <p><span className="font-medium text-foreground">Especie:</span>{character.species}</p>
                    <p><span className="font-medium text-foreground">Origen:</span>{character.origin.name}</p>
                    <p><span className="font-medium text-foreground">Ubicacion:</span>{character.location.name}</p>
                </div>

                {/* Cantidad de episodios en los que aparece */}
                <p className="text-sm text-muted-foreground pt-1"> 
                    Aparece en {character.episode.length} episodio{character.episode.length !== 1 ? 's' : ''}
                </p>
            </CardContent>
        </Card>
    )
}