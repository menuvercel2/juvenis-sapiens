
import { BookOpen, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Volume } from '@/types/database';

interface HeroSectionProps {
    latestVolume: Volume | null;
    recentVolumes: Volume[];
}

export function HeroSection({ latestVolume, recentVolumes }: HeroSectionProps) {
    if (!latestVolume) {
        return (
            <section className="py-20 text-center bg-green-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold text-gray-800">Cargando contenido...</h2>
                </div>
            </section>
        );
    }

    return (
        <section className="relative py-20 overflow-hidden bg-gradient-to-br from-green-50 to-white">
            {/* Background with abstract shapes */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-green-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row gap-12 items-center">

                    {/* Main Content */}
                    <div className="flex-1 space-y-6 text-center lg:text-left">
                        <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold tracking-wider">
                            ÚLTIMO LANZAMIENTO
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-green-700 to-green-600 bg-clip-text text-transparent">
                            {latestVolume.title}
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0">
                            {latestVolume.content || "Explora nuestra última edición dedicada a los avances más recientes de la ciencia y la cultura."}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            {latestVolume.pdf_url && (
                                <Link href={latestVolume.pdf_url} target="_blank">
                                    <Button size="lg" className="gap-2 bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto">
                                        <BookOpen className="w-5 h-5" />
                                        Leer en línea
                                    </Button>
                                </Link>
                            )}
                            {latestVolume.pdf_url && (
                                <a href={latestVolume.pdf_url} download>
                                    <Button size="lg" variant="outline" className="gap-2 border-green-600 text-green-700 hover:bg-green-50 w-full sm:w-auto">
                                        <Download className="w-5 h-5" />
                                        Descargar PDF
                                    </Button>
                                </a>
                            )}
                        </div>
                        <p className="text-sm text-gray-500 font-medium pt-2">
                            {latestVolume.number} • Año {latestVolume.year}
                        </p>
                    </div>

                    {/* Visuals */}
                    <div className="flex-1 flex gap-6 items-center justify-center lg:justify-end">
                        {/* Main Cover */}
                        <div className="relative group perspective-1000 w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[380px]">
                            <div className="aspect-[2/3] bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-2xl relative z-20 transform transition-transform group-hover:rotate-y-6 rotate-y-3 duration-500 flex items-center justify-center overflow-hidden border-2 border-green-700">
                                {latestVolume.cover_url ? (
                                    <img src={latestVolume.cover_url} alt={latestVolume.title} className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-white text-lg font-bold text-center px-4">{latestVolume.number}</span>
                                )}
                            </div>
                            {/* Decorative pile */}
                            <div className="absolute top-4 -right-4 w-full h-full bg-green-400/50 rounded-lg border-2 border-green-600/50 -z-10 rotate-6"></div>
                        </div>
                    </div>
                </div>

                {/* Thumbnail Grid */}
                {recentVolumes.length > 0 && (
                    <div className="mt-20">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-2xl font-bold text-gray-900">Volúmenes Recientes</h3>
                            <Link href="/volumes" className="text-green-600 hover:text-green-700 text-sm font-medium">Ver todos &rarr;</Link>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {recentVolumes.map(vol => (
                                <div key={vol.id} className="group cursor-pointer">
                                    <div className="aspect-[2/3] bg-gradient-to-br from-green-100 to-green-50 rounded-md border-2 border-green-200 overflow-hidden mb-3 group-hover:border-green-500 transition-colors shadow-sm">
                                        {vol.cover_url ? (
                                            <img src={vol.cover_url} alt={vol.title} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-green-700 font-mono text-xs p-4 text-center">
                                                {vol.number}
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-sm font-medium text-gray-700 group-hover:text-green-600 transition-colors">{vol.number}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
