
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight, Loader2 } from 'lucide-react';
import { newsService } from '@/lib/newsService';
import type { News } from '@/types/database';
import Link from 'next/link';

export default function NewsPage() {
    const [filter, setFilter] = useState<'all' | 'event' | 'call' | 'news'>('all');
    const [allNews, setAllNews] = useState<News[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadNews = async () => {
            try {
                const data = await newsService.getAll(true);
                setAllNews(data);
            } catch (error) {
                console.error('Error loading news:', error);
            } finally {
                setLoading(false);
            }
        };
        loadNews();
    }, []);

    const filteredNews = filter === 'all'
        ? allNews
        : allNews.filter(item => {
            if (filter === 'event') return item.category === 'Evento';
            if (filter === 'call') return item.category === 'Convocatoria';
            if (filter === 'news') return item.category === 'Lanzamiento';
            return true;
        });

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-green-50 py-16">
            <div className="container mx-auto px-4 max-w-5xl">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Noticias y Novedades
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Mantente al día con las últimas actualizaciones, eventos y convocatorias
                    </p>
                </div>

                {/* Filters */}
                <div className="flex gap-3 mb-10 justify-center flex-wrap">
                    <Button
                        variant={filter === 'all' ? 'default' : 'outline'}
                        onClick={() => setFilter('all')}
                        className={filter === 'all' ? 'bg-green-600 text-white hover:bg-green-700' : 'border-green-300 text-gray-700 hover:bg-green-50'}
                    >
                        Todas
                    </Button>
                    <Button
                        variant={filter === 'event' ? 'default' : 'outline'}
                        onClick={() => setFilter('event')}
                        className={filter === 'event' ? 'bg-green-600 text-white hover:bg-green-700' : 'border-green-300 text-gray-700 hover:bg-green-50'}
                    >
                        Eventos
                    </Button>
                    <Button
                        variant={filter === 'call' ? 'default' : 'outline'}
                        onClick={() => setFilter('call')}
                        className={filter === 'call' ? 'bg-green-600 text-white hover:bg-green-700' : 'border-green-300 text-gray-700 hover:bg-green-50'}
                    >
                        Convocatorias
                    </Button>
                    <Button
                        variant={filter === 'news' ? 'default' : 'outline'}
                        onClick={() => setFilter('news')}
                        className={filter === 'news' ? 'bg-green-600 text-white hover:bg-green-700' : 'border-green-300 text-gray-700 hover:bg-green-50'}
                    >
                        Lanzamientos
                    </Button>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-10 h-10 animate-spin text-green-600" />
                    </div>
                ) : (
                    <div className="space-y-6">
                        {filteredNews.map((item) => (
                            <Card key={item.id} className="bg-white border-green-200 hover:border-green-400 transition-all group">
                                <CardHeader className="pb-3">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                                        <Badge variant="secondary" className="bg-green-100 text-green-700 w-fit">
                                            {item.category}
                                        </Badge>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Calendar className="w-4 h-4 mr-2" />
                                            {item.published_date ? new Date(item.published_date).toLocaleDateString() : 'Reciente'}
                                        </div>
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                                        {item.title}
                                    </h2>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-gray-600 leading-relaxed">
                                        {item.extract || (item.content ? item.content.substring(0, 200) + '...' : '')}
                                    </p>
                                    <Button variant="link" className="p-0 h-auto text-green-600 hover:text-green-700">
                                        Leer más <ArrowRight className="ml-2 w-4 h-4" />
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}

                        {filteredNews.length === 0 && (
                            <div className="text-center py-20">
                                <p className="text-gray-500 text-lg">No hay noticias en esta categoría</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
