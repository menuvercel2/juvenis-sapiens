
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';

export function NewsSection() {
    const news = [
        {
            id: 1,
            title: 'Convocatoria Abierta Vol. 16',
            date: '15 Ene 2026',
            category: 'Convocatoria',
            excerpt: 'Invitamos a investigadores a enviar sus manuscritos sobre "Tecnología y Sociedad" para nuestra próxima edición especial.',
            type: 'call'
        },
        {
            id: 2,
            title: 'Simposio Internacional 2026',
            date: '20 Feb 2026',
            category: 'Evento',
            excerpt: 'Únete a nosotros en el simposio anual donde presentaremos los hallazgos más relevantes del último año.',
            type: 'event'
        },
        {
            id: 3,
            title: 'Nueva Indexación en Scopus',
            date: '10 Feb 2026',
            category: 'Lanzamiento',
            excerpt: 'Celebramos nuestra inclusión en el índice de Scopus, un hito importante para la visibilidad de nuestros autores.',
            type: 'news'
        },
    ];

    return (
        <section className="py-20 bg-slate-950">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <span className="text-amber-500 font-semibold tracking-wide text-sm uppercase">Actualidad</span>
                        <h2 className="text-3xl font-bold text-white mt-2">Noticias y Novedades</h2>
                    </div>
                    <Link href="/news" className="hidden md:block">
                        <Button variant="ghost" className="text-slate-400 hover:text-white">
                            Ver todas <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {news.map((item) => (
                        <Card key={item.id} className="bg-slate-900 border-slate-800 hover:border-amber-500/30 transition-all hover:shadow-lg hover:shadow-amber-900/10 group">
                            <CardHeader className="pb-3">
                                <div className="flex justify-between items-center mb-3">
                                    <Badge variant={item.type === 'event' ? 'secondary' : 'default'} className="bg-slate-800 text-slate-300 hover:bg-slate-700">
                                        {item.category}
                                    </Badge>
                                    <div className="flex items-center text-xs text-slate-500">
                                        <Calendar className="w-3 h-3 mr-1" />
                                        {item.date}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-slate-200 group-hover:text-amber-500 transition-colors line-clamp-2">
                                    {item.title}
                                </h3>
                            </CardHeader>
                            <CardContent>
                                <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                                    {item.excerpt}
                                </p>
                            </CardContent>
                            <CardFooter>
                                <Button variant="link" className="p-0 h-auto text-amber-500 hover:text-amber-400">
                                    Leer más &rarr;
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                <div className="mt-8 md:hidden text-center">
                    <Link href="/news">
                        <Button variant="outline" className="w-full">Ver todas las noticias</Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
