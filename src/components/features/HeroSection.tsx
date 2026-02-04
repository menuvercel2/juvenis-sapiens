
import { BookOpen, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function HeroSection() {
    // Mock latest volume
    const latestVolume = {
        number: 'Vol. 15, No. 2',
        date: 'Diciembre 2025',
        title: 'Avances en Inteligencia Artificial y Ética',
        coverUrl: 'https://placehold.co/400x600/1e293b/amber?text=Vol+15', // Placeholder
        description: 'Este volumen explora las implicaciones éticas de la IA generativa en la educación superior y la investigación científica.'
    };

    const recentVolumes = [
        { id: 1, number: 'Vol. 15, No. 1', cover: 'https://placehold.co/300x450/1e293b/ccc?text=V15-1' },
        { id: 2, number: 'Vol. 14, No. 2', cover: 'https://placehold.co/300x450/1e293b/ccc?text=V14-2' },
        { id: 3, number: 'Vol. 14, No. 1', cover: 'https://placehold.co/300x450/1e293b/ccc?text=V14-1' },
    ];

    return (
        <section className="relative py-20 overflow-hidden">
            {/* Background with abstract shapes */}
            <div className="absolute inset-0 bg-slate-950 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row gap-12 items-center">

                    {/* Main Content */}
                    <div className="flex-1 space-y-6 text-center lg:text-left">
                        <span className="inline-block px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-sm font-semibold tracking-wider">
                            ÚLTIMO LANZAMIENTO
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                            {latestVolume.title}
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto lg:mx-0">
                            {latestVolume.description}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Button size="lg" className="gap-2 bg-amber-500 hover:bg-amber-400 text-black">
                                <BookOpen className="w-5 h-5" />
                                Leer en línea
                            </Button>
                            <Button size="lg" variant="outline" className="gap-2 border-slate-700 hover:bg-slate-800">
                                <Download className="w-5 h-5" />
                                Descargar PDF
                            </Button>
                        </div>
                        <p className="text-sm text-slate-500 font-medium pt-2">
                            {latestVolume.number} • Publicado el {latestVolume.date}
                        </p>
                    </div>

                    {/* Visuals */}
                    <div className="flex-1 flex gap-6 items-center justify-center lg:justify-end">
                        {/* Main Cover */}
                        <div className="relative group perspective-1000">
                            <div className="w-[280px] h-[400px] bg-slate-800 rounded-lg shadow-2xl relative z-20 transform transition-transform group-hover:rotate-y-6 rotate-y-3 duration-500 flex items-center justify-center overflow-hidden border border-slate-700">
                                <span className="text-slate-500 text-lg font-bold">Cover Image</span>
                                {/* Replace with actual Image component */}
                                {/* <Image src={latestVolume.coverUrl} alt="Cover" fill className="object-cover" /> */}
                            </div>
                            {/* Decorative pile */}
                            <div className="absolute top-4 -right-4 w-[280px] h-[400px] bg-slate-800/50 rounded-lg border border-slate-700/50 -z-10 rotate-6"></div>
                        </div>
                    </div>
                </div>

                {/* Thumbnail Grid */}
                <div className="mt-20">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-2xl font-bold text-white">Volúmenes Recientes</h3>
                        <Link href="/volumes" className="text-amber-500 hover:text-amber-400 text-sm font-medium">Ver todos &rarr;</Link>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {recentVolumes.map(vol => (
                            <div key={vol.id} className="group cursor-pointer">
                                <div className="aspect-[2/3] bg-slate-900 rounded-md border border-slate-800 overflow-hidden mb-3 group-hover:border-amber-500/50 transition-colors">
                                    {/* Placeholder for thumb */}
                                    <div className="w-full h-full flex items-center justify-center text-slate-600 font-mono text-xs p-4 text-center">
                                        {vol.number}
                                    </div>
                                </div>
                                <p className="text-sm font-medium text-slate-300 group-hover:text-amber-500 transition-colors">{vol.number}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
