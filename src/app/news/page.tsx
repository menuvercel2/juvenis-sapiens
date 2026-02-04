
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight } from 'lucide-react';

export default function NewsPage() {
    const [filter, setFilter] = useState<'all' | 'event' | 'call' | 'news'>('all');

    const allNews = [
        {
            id: 1,
            title: 'Convocatoria Abierta Vol. 16',
            date: '15 Ene 2026',
            category: 'Convocatoria',
            type: 'call' as const,
            excerpt: 'Invitamos a investigadores a enviar sus manuscritos sobre "Tecnología y Sociedad" para nuestra próxima edición especial.',
            content: 'Contenido completo de la convocatoria...'
        },
        {
            id: 2,
            title: 'Simposio Internacional 2026',
            date: '20 Feb 2026',
            category: 'Evento',
            type: 'event' as const,
            excerpt: 'Únete a nosotros en el simposio anual donde presentaremos los hallazgos más relevantes del último año.',
            content: 'Detalles del simposio...'
        },
        {
            id: 3,
            title: 'Nueva Indexación en Scopus',
            date: '10 Feb 2026',
            category: 'Lanzamiento',
            type: 'news' as const,
            excerpt: 'Celebramos nuestra inclusión en el índice de Scopus, un hito importante para la visibilidad de nuestros autores.',
            content: 'Información sobre la indexación...'
        },
        {
            id: 4,
            title: 'Publicación Vol. 15 No. 2',
            date: '5 Dic 2025',
            category: 'Lanzamiento',
            type: 'news' as const,
            excerpt: 'Ya está disponible nuestro último volumen dedicado a la inteligencia artificial y la ética.',
            content: 'Detalles del volumen...'
        },
        {
            id: 5,
            title: 'Taller de Metodología de Investigación',
            date: '15 Mar 2026',
            category: 'Evento',
            type: 'event' as const,
            excerpt: 'Workshop gratuito para investigadores emergentes sobre metodologías cualitativas y cuantitativas.',
            content: 'Información del taller...'
        },
    ];

    const filteredNews = filter === 'all' ? allNews : allNews.filter(item => item.type === filter);

    return (
        <div className="min-h-screen bg-slate-950 py-16">
            <div className="container mx-auto px-4 max-w-5xl">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Noticias y Novedades
                    </h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        Mantente al día con las últimas actualizaciones, eventos y convocatorias
                    </p>
                </div>

                {/* Filters */}
                <div className="flex gap-3 mb-10 justify-center flex-wrap">
                    <Button
                        variant={filter === 'all' ? 'default' : 'outline'}
                        onClick={() => setFilter('all')}
                        className={filter === 'all' ? 'bg-amber-500 text-black hover:bg-amber-400' : 'border-slate-700 hover:bg-slate-800'}
                    >
                        Todas
                    </Button>
                    <Button
                        variant={filter === 'event' ? 'default' : 'outline'}
                        onClick={() => setFilter('event')}
                        className={filter === 'event' ? 'bg-amber-500 text-black hover:bg-amber-400' : 'border-slate-700 hover:bg-slate-800'}
                    >
                        Eventos
                    </Button>
                    <Button
                        variant={filter === 'call' ? 'default' : 'outline'}
                        onClick={() => setFilter('call')}
                        className={filter === 'call' ? 'bg-amber-500 text-black hover:bg-amber-400' : 'border-slate-700 hover:bg-slate-800'}
                    >
                        Convocatorias
                    </Button>
                    <Button
                        variant={filter === 'news' ? 'default' : 'outline'}
                        onClick={() => setFilter('news')}
                        className={filter === 'news' ? 'bg-amber-500 text-black hover:bg-amber-400' : 'border-slate-700 hover:bg-slate-800'}
                    >
                        Lanzamientos
                    </Button>
                </div>

                {/* News List */}
                <div className="space-y-6">
                    {filteredNews.map((item) => (
                        <Card key={item.id} className="bg-slate-900 border-slate-800 hover:border-amber-500/30 transition-all group">
                            <CardHeader className="pb-3">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                                    <Badge variant="secondary" className="bg-slate-800 text-slate-300 w-fit">
                                        {item.category}
                                    </Badge>
                                    <div className="flex items-center text-sm text-slate-500">
                                        <Calendar className="w-4 h-4 mr-2" />
                                        {item.date}
                                    </div>
                                </div>
                                <h2 className="text-2xl font-bold text-white group-hover:text-amber-500 transition-colors">
                                    {item.title}
                                </h2>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-slate-400 leading-relaxed">
                                    {item.excerpt}
                                </p>
                                <Button variant="link" className="p-0 h-auto text-amber-500 hover:text-amber-400">
                                    Leer más <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {filteredNews.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-slate-500 text-lg">No hay noticias en esta categoría</p>
                    </div>
                )}
            </div>
        </div>
    );
}
