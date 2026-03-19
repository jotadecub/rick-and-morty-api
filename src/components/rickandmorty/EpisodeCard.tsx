import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Episode } from '@/types/rickandmorty';

interface Props {
  episode: Episode;
}

export function EpisodeCard({ episode }: Props) {
    return (
        <Card className='hover:shadow-lg transition-shadow duration-300'>
            <CardContent className='p-4 space-y-3'>
                <div className='flex items-start justify-between gap-2'>
                    <h3 className='font-bold leading-tigth'>{episode.name}</h3>

                    {/* Codigo del episodio: S01E01 */}
                    <Badge variant="outline" className='shrink-0'>
                        {episode.episode}
                    </Badge>
                </div>

                <p className='text-sm text-muted-foreground'>{episode.air_date}</p>

                <p className='text-sm text-muted-foreground'>
                    {episode.characters.length} personaje{episode.characters.length !== 1 ? 's' : ''}
                </p>
            </CardContent>
        </Card>
    )
}