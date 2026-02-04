
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, BookOpen, Download } from 'lucide-react';

export default function VolumesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedYear, setSelectedYear] = useState('all');

    // Mock data
    const volumes = [
        { id: 1, number: 'Vol. 15, No. 2', year: '2025', title: 'Avances en IA y Ética', cover: 'https://placehold.co/300x450/1e293b/amber?text=V15-2' },
        { id: 2, number: 'Vol. 15, No. 1', year: '2025', title: 'Neurociencia Cognitiva', cover: 'https://placehold.co/300x450/1e293b/amber?text=V15-1' },
        { id: 3, number: 'Vol. 14, No. 2', year: '2024', title: 'Cambio Climático', cover: 'https://placehold.co/300x450/1e293b/amber?text=V14-2' },
        { id: 4, number: 'Vol. 14, No. 1', year: '2024', title: 'Filosofía Contemporánea', cover: 'https://placehold.co/300x450/1e293b/amber?text=V14-1' },
        { id: 5, number: 'Vol. 13, No. 2', year: '2023', title: 'Biotecnología Aplicada', cover: 'https://placehold.co/300x450/1e293b/amber?text=V13-2' },
        { id: 6, number: 'Vol. 13, No. 1', year: '2023', title: 'Sociología Digital', cover: 'https://placehold.co/300x450/1e293b/amber?text=V13-1' },
    ];

    const years = ['all', '2025', '2024', '2023'];

    const filteredVolumes = volumes.filter(vol => {
        const matchesSearch = vol.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vol.number.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesYear = selectedYear === 'all' || vol.year === selectedYear;
        return matchesSearch && matchesYear;
    });

    return (
        <div className="min-h-screen bg-slate-950 py-16">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Archivo de Volúmenes
                    </h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        Explora nuestra colección completa de publicaciones académicas
                    </p>
                </div>

                {/* Search & Filters */}
                <div className="mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                        <Input
                            type="text"
                            placeholder="Buscar por título o número..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 bg-slate-900 border-slate-800 text-white placeholder:text-slate-500"
                        />
                    </div>

                    <div className="flex gap-2 flex-wrap justify-center">
                        {years.map(year => (
                            <Button
                                key={year}
                                variant={selectedYear === year ? 'default' : 'outline'}
                                onClick={() => setSelectedYear(year)}
                                className={selectedYear === year ? 'bg-amber-500 text-black hover:bg-amber-400' : 'border-slate-700 hover:bg-slate-800'}
                            >
                                {year === 'all' ? 'Todos' : year}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Results count */}
                <div className="mb-6 text-slate-400 text-sm">
                    Mostrando {filteredVolumes.length} de {volumes.length} volúmenes
                </div>

                {/* Volumes Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredVolumes.map(volume => (
                        <Card key={volume.id} className="bg-slate-900 border-slate-800 hover:border-amber-500/50 transition-all group">
                            <CardHeader className="p-0">
                                <div className="aspect-[2/3] bg-slate-800 rounded-t-lg overflow-hidden border-b border-slate-700">
                                    <div className="w-full h-full flex items-center justify-center text-slate-600 font-mono text-xs p-4 text-center">
                                        {volume.number}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-4 space-y-3">
                                <div>
                                    <Badge variant="secondary" className="mb-2 bg-slate-800 text-slate-300">
                                        {volume.year}
                                    </Badge>
                                    <h3 className="font-bold text-white group-hover:text-amber-500 transition-colors line-clamp-2">
                                        {volume.title}
                                    </h3>
                                    <p className="text-sm text-slate-500 mt-1">{volume.number}</p>
                                </div>
                                <div className="flex gap-2">
                                    <Button size="sm" className="flex-1 bg-amber-500 hover:bg-amber-400 text-black">
                                        <BookOpen className="w-4 h-4 mr-1" />
                                        Leer
                                    </Button>
                                    <Button size="sm" variant="outline" className="border-slate-700 hover:bg-slate-800">
                                        <Download className="w-4 h-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {filteredVolumes.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-slate-500 text-lg">No se encontraron volúmenes con los criterios seleccionados</p>
                    </div>
                )}
            </div>
        </div>
    );
}
