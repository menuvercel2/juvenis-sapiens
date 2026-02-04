
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';
import type { News } from '@/types/database';

interface NewsSectionProps {
    news: News[];
}

export function NewsSection({ news }: NewsSectionProps) {
    if (news.length === 0) return null;

    return (
        <section className="py-20 bg-gradient-to-br from-white to-green-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <span className="text-green-600 font-semibold tracking-wide text-sm uppercase">Actualidad</span>
                        <h2 className="text-3xl font-bold text-gray-900 mt-2">Noticias y Novedades</h2>
                    </div>
                    <Link href="/news" className="hidden md:block">
                        <Button variant="ghost" className="text-gray-600 hover:text-green-600">
                            Ver todas <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {news.map((item) => (
                        <Card key={item.id} className="bg-white border-green-200 hover:border-green-400 transition-all hover:shadow-lg group">
                            <CardHeader className="pb-3">
                                <div className="flex justify-between items-center mb-3">
                                    <Badge variant="default" className="bg-green-100 text-green-700 hover:bg-green-200">
                                        {item.category}
                                    </Badge>
                                    <div className="flex items-center text-xs text-gray-500">
                                        <Calendar className="w-3 h-3 mr-1" />
                                        {item.published_date ? new Date(item.published_date).toLocaleDateString() : 'Reciente'}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors line-clamp-2">
                                    {item.title}
                                </h3>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                                    {item.extract || (item.content ? item.content.substring(0, 150) + '...' : '')}
                                </p>
                            </CardContent>
                            <CardFooter>
                                <Link href={`/news/${item.id}`}>
                                    <Button variant="link" className="p-0 h-auto text-green-600 hover:text-green-700 font-semibold group-hover:translate-x-1 transition-transform">
                                        Leer noticia completa <ArrowRight className="ml-2 w-4 h-4" />
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                <div className="mt-8 md:hidden text-center">
                    <Link href="/news">
                        <Button variant="outline" className="w-full border-green-600 text-green-700 hover:bg-green-50">Ver todas las noticias</Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
