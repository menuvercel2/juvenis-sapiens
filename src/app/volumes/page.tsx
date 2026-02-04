
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, BookOpen, Download, Loader2 } from 'lucide-react';
import { volumeService } from '@/lib/volumeService';
import type { Volume } from '@/types/database';

export default function VolumesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedYear, setSelectedYear] = useState('all');
    const [volumes, setVolumes] = useState<Volume[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadVolumes = async () => {
            try {
                const data = await volumeService.getAll(true);
                setVolumes(data);
            } catch (error) {
                console.error('Error loading volumes:', error);
            } finally {
                setLoading(false);
            }
        };
        loadVolumes();
    }, []);

    const years = ['all', ...Array.from(new Set(volumes.map(v => v.year)))].sort((a, b) => b.localeCompare(a));

    const filteredVolumes = volumes.filter(vol => {
        const matchesSearch = vol.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vol.number.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesYear = selectedYear === 'all' || vol.year === selectedYear;
        return matchesSearch && matchesYear;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-green-50 py-16">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Archivo de Volúmenes
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Explora nuestra colección completa de publicaciones académicas
                    </p>
                </div>

                {/* Search & Filters */}
                <div className="mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                            type="text"
                            placeholder="Buscar por título o número..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 bg-white border-green-200 text-gray-900 placeholder:text-gray-400"
                        />
                    </div>

                    <div className="flex gap-2 flex-wrap justify-center">
                        {years.map(year => (
                            <Button
                                key={year}
                                variant={selectedYear === year ? 'default' : 'outline'}
                                onClick={() => setSelectedYear(year)}
                                className={selectedYear === year ? 'bg-green-600 text-white hover:bg-green-700' : 'border-green-300 text-gray-700 hover:bg-green-50'}
                            >
                                {year === 'all' ? 'Todos' : year}
                            </Button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-10 h-10 animate-spin text-green-600" />
                    </div>
                ) : (
                    <>
                        {/* Results count */}
                        <div className="mb-6 text-gray-600 text-sm">
                            Mostrando {filteredVolumes.length} de {volumes.length} volúmenes
                        </div>

                        {/* Volumes Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredVolumes.map(volume => (
                                <Card key={volume.id} className="bg-white border-green-200 hover:border-green-400 transition-all group">
                                    <CardHeader className="p-0">
                                        <div className="aspect-[2/3] bg-gradient-to-br from-green-100 to-green-50 rounded-t-lg overflow-hidden border-b-2 border-green-200">
                                            {volume.cover_url ? (
                                                <img src={volume.cover_url} alt={volume.title} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-green-700 font-mono text-xs p-4 text-center">
                                                    {volume.number}
                                                </div>
                                            )}
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-4 space-y-3">
                                        <div>
                                            <Badge variant="secondary" className="mb-2 bg-green-100 text-green-700">
                                                {volume.year}
                                            </Badge>
                                            <h3 className="font-bold text-gray-900 group-hover:text-green-600 transition-colors line-clamp-2">
                                                {volume.title}
                                            </h3>
                                            <p className="text-sm text-gray-500 mt-1">{volume.number}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            {volume.pdf_url && (
                                                <Link href={volume.pdf_url} target="_blank" className="flex-1">
                                                    <Button size="sm" className="w-full bg-green-600 hover:bg-green-700 text-white">
                                                        <BookOpen className="w-4 h-4 mr-1" />
                                                        Leer
                                                    </Button>
                                                </Link>
                                            )}
                                            {volume.pdf_url && (
                                                <a href={volume.pdf_url} download>
                                                    <Button size="sm" variant="outline" className="border-green-300 text-green-700 hover:bg-green-50">
                                                        <Download className="w-4 h-4" />
                                                    </Button>
                                                </a>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {filteredVolumes.length === 0 && (
                            <div className="text-center py-20">
                                <p className="text-gray-500 text-lg">No se encontraron volúmenes con los criterios seleccionados</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
