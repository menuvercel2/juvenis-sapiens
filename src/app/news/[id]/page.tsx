
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { newsService } from '@/lib/newsService';
import { Volume } from '@/types/database'; // Using Volume just as a placeholder for types if needed, but we have News
import type { News } from '@/types/database';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, ArrowLeft, Loader2, Share2, Tag } from 'lucide-react';
import Link from 'next/link';

export default function NewsDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const [news, setNews] = useState<News | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            if (!id) return;
            try {
                const data = await newsService.getById(id as string);
                setNews(data);
            } catch (error) {
                console.error('Error fetching news detail:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <Loader2 className="w-10 h-10 animate-spin text-green-600" />
            </div>
        );
    }

    if (!news) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Noticia no encontrada</h2>
                <p className="text-gray-600 mb-8">Lo sentimos, la noticia que buscas no existe o ha sido eliminada.</p>
                <Link href="/news">
                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                        Volver a Noticias
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <article className="min-h-screen bg-white pb-20">
            {/* Hero Header */}
            <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden bg-gray-900">
                {news.image_url ? (
                    <img
                        src={news.image_url}
                        alt={news.title}
                        className="w-full h-full object-cover opacity-60"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-green-700 to-emerald-900 opacity-60" />
                )}

                <div className="absolute inset-0 flex items-end">
                    <div className="container mx-auto px-4 pb-12">
                        <div className="max-w-4xl space-y-4">
                            <Badge className="bg-green-500 text-white hover:bg-green-600 border-none px-3 py-1 text-sm">
                                {news.category}
                            </Badge>
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                                {news.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-6 text-white/90 text-sm md:text-base">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-green-400" />
                                    {news.published_date ? new Date(news.published_date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Reciente'}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Tag className="w-5 h-5 text-green-400" />
                                    <span>Juvenis Sapiens Editorial</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 mt-[-40px] relative z-10">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Main Text */}
                    <div className="flex-1 bg-white rounded-xl shadow-xl p-6 md:p-12 border border-green-50">
                        <Link href="/news" className="inline-flex items-center text-green-600 hover:text-green-700 font-medium mb-8 group">
                            <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
                            Regresar a noticias
                        </Link>

                        {news.extract && (
                            <div className="mb-10 p-6 bg-green-50/50 rounded-lg border-l-4 border-green-500 italic text-xl text-gray-700 leading-relaxed font-serif">
                                {news.extract}
                            </div>
                        )}

                        <div className="prose prose-lg prose-green max-w-none text-gray-800 whitespace-pre-wrap leading-relaxed">
                            {news.content || "No hay contenido adicional para esta noticia."}
                        </div>

                        <div className="mt-16 pt-8 border-t border-gray-100 flex items-center justify-between">
                            <div className="flex gap-4">
                                <Button variant="outline" size="sm" className="gap-2 border-green-200 text-gray-600 hover:bg-green-50">
                                    <Share2 className="w-4 h-4" />
                                    Compartir
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar / More News info */}
                    <aside className="lg:w-80 space-y-8">
                        <div className="p-6 bg-green-50 rounded-xl border border-green-100">
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Tag className="w-4 h-4 text-green-600" />
                                Sobre la sección
                            </h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                En Juvenis Sapiens compartimos noticias académicas, eventos científicos y lanzamientos de nuevos volúmenes para mantener informada a la comunidad biológica.
                            </p>
                        </div>

                        <div className="relative rounded-xl overflow-hidden aspect-[3/4] group cursor-pointer border border-green-200 shadow-lg">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                            <img src="/logo.png" alt="Sapiens" className="absolute inset-0 w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700 opacity-40" />
                            <div className="absolute bottom-0 p-6 z-20">
                                <h4 className="text-white font-bold text-lg leading-tight mb-2">¿Quieres publicar con nosotros?</h4>
                                <Link href="/contact" className="text-green-400 text-sm font-bold hover:underline">Contáctanos hoy &rarr;</Link>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </article>
    );
}
