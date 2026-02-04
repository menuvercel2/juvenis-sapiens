
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    BookOpen,
    Newspaper,
    BarChart3,
    Users,
    LogOut,
    Plus,
    Edit,
    Trash2,
    Loader2
} from 'lucide-react';
import { authService } from '@/lib/authService';
import { volumeService } from '@/lib/volumeService';
import { newsService } from '@/lib/newsService';
import { VolumeDialog } from '@/components/admin/VolumeDialog';
import { NewsDialog } from '@/components/admin/NewsDialog';
import type { Volume, News, VolumeFormData, NewsFormData } from '@/types/database';

export default function AdminPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'dashboard' | 'volumes' | 'news'>('dashboard');
    const [loading, setLoading] = useState(true);
    const [volumes, setVolumes] = useState<Volume[]>([]);
    const [news, setNews] = useState<News[]>([]);

    // Dialog states
    const [volumeDialogOpen, setVolumeDialogOpen] = useState(false);
    const [newsDialogOpen, setNewsDialogOpen] = useState(false);
    const [selectedVolume, setSelectedVolume] = useState<Volume | null>(null);
    const [selectedNews, setSelectedNews] = useState<News | null>(null);

    // Check authentication
    useEffect(() => {
        checkAuth();
    }, []);

    // Load data
    useEffect(() => {
        if (activeTab === 'volumes' || activeTab === 'dashboard') {
            loadVolumes();
        }
        if (activeTab === 'news' || activeTab === 'dashboard') {
            loadNews();
        }
    }, [activeTab]);

    const checkAuth = async () => {
        try {
            const isAdmin = await authService.isAdmin();
            if (!isAdmin) {
                router.push('/login');
            }
        } catch (error) {
            console.error('Auth error:', error);
            router.push('/login');
        } finally {
            setLoading(false);
        }
    };

    const loadVolumes = async () => {
        try {
            const data = await volumeService.getAll();
            setVolumes(data);
        } catch (error) {
            console.error('Error loading volumes:', error);
        }
    };

    const loadNews = async () => {
        try {
            const data = await newsService.getAll();
            setNews(data);
        } catch (error) {
            console.error('Error loading news:', error);
        }
    };

    const handleLogout = async () => {
        try {
            await authService.signOut();
            router.push('/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    // Volume handlers
    const handleCreateVolume = () => {
        setSelectedVolume(null);
        setVolumeDialogOpen(true);
    };

    const handleEditVolume = (volume: Volume) => {
        setSelectedVolume(volume);
        setVolumeDialogOpen(true);
    };

    const handleSaveVolume = async (data: VolumeFormData) => {
        try {
            if (selectedVolume) {
                await volumeService.update(selectedVolume.id, data);
            } else {
                await volumeService.create(data);
            }
            await loadVolumes();
        } catch (error) {
            console.error('Error saving volume:', error);
            throw error;
        }
    };

    const handleDeleteVolume = async (id: string) => {
        if (!confirm('¿Estás seguro de eliminar este volumen?')) return;

        try {
            await volumeService.delete(id);
            await loadVolumes();
        } catch (error) {
            console.error('Error deleting volume:', error);
        }
    };

    // News handlers
    const handleCreateNews = () => {
        setSelectedNews(null);
        setNewsDialogOpen(true);
    };

    const handleEditNews = (newsItem: News) => {
        setSelectedNews(newsItem);
        setNewsDialogOpen(true);
    };

    const handleSaveNews = async (data: NewsFormData) => {
        try {
            if (selectedNews) {
                await newsService.update(selectedNews.id, data);
            } else {
                await newsService.create(data);
            }
            await loadNews();
        } catch (error) {
            console.error('Error saving news:', error);
            throw error;
        }
    };

    const handleDeleteNews = async (id: string) => {
        if (!confirm('¿Estás seguro de eliminar esta noticia?')) return;

        try {
            await newsService.delete(id);
            await loadNews();
        } catch (error) {
            console.error('Error deleting news:', error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-white to-green-50 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-green-600" />
            </div>
        );
    }

    const stats = {
        totalVolumes: volumes.length,
        publishedVolumes: volumes.filter(v => v.published).length,
        totalNews: news.length,
        publishedNews: news.filter(n => n.status === 'published').length,
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-green-50">
            {/* Header */}
            <div className="bg-white border-b border-green-200 shadow-sm">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Panel de Administración</h1>
                        <p className="text-gray-600 text-sm">Juvenis Sapiens</p>
                    </div>
                    <Button variant="outline" onClick={handleLogout} className="border-green-300 text-gray-700 hover:bg-green-50">
                        <LogOut className="w-4 h-4 mr-2" />
                        Cerrar Sesión
                    </Button>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Navigation Tabs */}
                <div className="flex gap-2 mb-8 flex-wrap">
                    <Button
                        variant={activeTab === 'dashboard' ? 'default' : 'outline'}
                        onClick={() => setActiveTab('dashboard')}
                        className={activeTab === 'dashboard' ? 'bg-green-600 text-white hover:bg-green-700' : 'border-green-300 text-gray-700 hover:bg-green-50'}
                    >
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Dashboard
                    </Button>
                    <Button
                        variant={activeTab === 'volumes' ? 'default' : 'outline'}
                        onClick={() => setActiveTab('volumes')}
                        className={activeTab === 'volumes' ? 'bg-green-600 text-white hover:bg-green-700' : 'border-green-300 text-gray-700 hover:bg-green-50'}
                    >
                        <BookOpen className="w-4 h-4 mr-2" />
                        Volúmenes ({volumes.length})
                    </Button>
                    <Button
                        variant={activeTab === 'news' ? 'default' : 'outline'}
                        onClick={() => setActiveTab('news')}
                        className={activeTab === 'news' ? 'bg-green-600 text-white hover:bg-green-700' : 'border-green-300 text-gray-700 hover:bg-green-50'}
                    >
                        <Newspaper className="w-4 h-4 mr-2" />
                        Noticias ({news.length})
                    </Button>
                </div>

                {/* Dashboard View */}
                {activeTab === 'dashboard' && (
                    <div className="space-y-8">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <Card className="bg-white border-green-200">
                                <CardContent className="pt-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-600 text-sm">Total Volúmenes</p>
                                            <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalVolumes}</p>
                                            <p className="text-xs text-green-600 mt-1">{stats.publishedVolumes} publicados</p>
                                        </div>
                                        <BookOpen className="w-10 h-10 text-green-600" />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-white border-green-200">
                                <CardContent className="pt-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-600 text-sm">Noticias</p>
                                            <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalNews}</p>
                                            <p className="text-xs text-green-600 mt-1">{stats.publishedNews} publicadas</p>
                                        </div>
                                        <Newspaper className="w-10 h-10 text-green-600" />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-white border-green-200">
                                <CardContent className="pt-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-600 text-sm">Borradores</p>
                                            <p className="text-3xl font-bold text-gray-900 mt-1">
                                                {volumes.filter(v => !v.published).length + news.filter(n => n.status === 'draft').length}
                                            </p>
                                        </div>
                                        <Users className="w-10 h-10 text-green-600" />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-white border-green-200">
                                <CardContent className="pt-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-600 text-sm">Publicados</p>
                                            <p className="text-3xl font-bold text-gray-900 mt-1">
                                                {stats.publishedVolumes + stats.publishedNews}
                                            </p>
                                        </div>
                                        <BarChart3 className="w-10 h-10 text-green-600" />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Recent Activity */}
                        <div className="grid lg:grid-cols-2 gap-6">
                            <Card className="bg-white border-green-200">
                                <CardHeader>
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-xl font-bold text-gray-900">Volúmenes Recientes</h3>
                                        <Button size="sm" onClick={handleCreateVolume} className="bg-green-600 hover:bg-green-700 text-white">
                                            <Plus className="w-4 h-4 mr-1" />
                                            Nuevo
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {volumes.slice(0, 5).map(vol => (
                                        <div key={vol.id} className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-100">
                                            <div>
                                                <p className="font-medium text-gray-900">{vol.number}</p>
                                                <p className="text-sm text-gray-600 line-clamp-1">{vol.title}</p>
                                            </div>
                                            <span className={`text-xs px-2 py-1 rounded border ${vol.published
                                                    ? 'bg-green-100 text-green-700 border-green-200'
                                                    : 'bg-yellow-100 text-yellow-700 border-yellow-200'
                                                }`}>
                                                {vol.published ? 'Publicado' : 'Borrador'}
                                            </span>
                                        </div>
                                    ))}
                                    {volumes.length === 0 && (
                                        <p className="text-gray-500 text-center py-4">No hay volúmenes aún</p>
                                    )}
                                </CardContent>
                            </Card>

                            <Card className="bg-white border-green-200">
                                <CardHeader>
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-xl font-bold text-gray-900">Noticias Recientes</h3>
                                        <Button size="sm" onClick={handleCreateNews} className="bg-green-600 hover:bg-green-700 text-white">
                                            <Plus className="w-4 h-4 mr-1" />
                                            Nueva
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {news.slice(0, 5).map(newsItem => (
                                        <div key={newsItem.id} className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-100">
                                            <div>
                                                <p className="font-medium text-gray-900 line-clamp-1">{newsItem.title}</p>
                                                <p className="text-sm text-gray-600">{newsItem.category}</p>
                                            </div>
                                            <span className={`text-xs px-2 py-1 rounded border ${newsItem.status === 'published'
                                                    ? 'bg-green-100 text-green-700 border-green-200'
                                                    : 'bg-yellow-100 text-yellow-700 border-yellow-200'
                                                }`}>
                                                {newsItem.status === 'published' ? 'Publicado' : 'Borrador'}
                                            </span>
                                        </div>
                                    ))}
                                    {news.length === 0 && (
                                        <p className="text-gray-500 text-center py-4">No hay noticias aún</p>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )}

                {/* Volumes Management */}
                {activeTab === 'volumes' && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-gray-900">Gestión de Volúmenes</h2>
                            <Button onClick={handleCreateVolume} className="bg-green-600 hover:bg-green-700 text-white">
                                <Plus className="w-4 h-4 mr-2" />
                                Nuevo Volumen
                            </Button>
                        </div>

                        <Card className="bg-white border-green-200">
                            <CardContent className="p-0">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="border-b border-green-200 bg-green-50">
                                            <tr>
                                                <th className="text-left p-4 text-gray-700 font-medium">Número</th>
                                                <th className="text-left p-4 text-gray-700 font-medium">Título</th>
                                                <th className="text-left p-4 text-gray-700 font-medium">Año</th>
                                                <th className="text-left p-4 text-gray-700 font-medium">Estado</th>
                                                <th className="text-right p-4 text-gray-700 font-medium">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {volumes.map(vol => (
                                                <tr key={vol.id} className="border-b border-green-100 hover:bg-green-50/50">
                                                    <td className="p-4 text-gray-900 font-medium">{vol.number}</td>
                                                    <td className="p-4 text-gray-900">{vol.title}</td>
                                                    <td className="p-4 text-gray-600">{vol.year}</td>
                                                    <td className="p-4">
                                                        <span className={`text-xs px-2 py-1 rounded border ${vol.published
                                                                ? 'bg-green-100 text-green-700 border-green-200'
                                                                : 'bg-yellow-100 text-yellow-700 border-yellow-200'
                                                            }`}>
                                                            {vol.published ? 'Publicado' : 'Borrador'}
                                                        </span>
                                                    </td>
                                                    <td className="p-4">
                                                        <div className="flex gap-2 justify-end">
                                                            <Button size="sm" variant="outline" onClick={() => handleEditVolume(vol)} className="border-green-300 text-gray-700 hover:bg-green-50">
                                                                <Edit className="w-4 h-4" />
                                                            </Button>
                                                            <Button size="sm" variant="outline" onClick={() => handleDeleteVolume(vol.id)} className="border-red-300 text-red-600 hover:bg-red-50">
                                                                <Trash2 className="w-4 h-4" />
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    {volumes.length === 0 && (
                                        <div className="text-center py-12">
                                            <p className="text-gray-500">No hay volúmenes aún. Crea el primero!</p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* News Management */}
                {activeTab === 'news' && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-gray-900">Gestión de Noticias</h2>
                            <Button onClick={handleCreateNews} className="bg-green-600 hover:bg-green-700 text-white">
                                <Plus className="w-4 h-4 mr-2" />
                                Nueva Noticia
                            </Button>
                        </div>

                        <Card className="bg-white border-green-200">
                            <CardContent className="p-0">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="border-b border-green-200 bg-green-50">
                                            <tr>
                                                <th className="text-left p-4 text-gray-700 font-medium">Título</th>
                                                <th className="text-left p-4 text-gray-700 font-medium">Categoría</th>
                                                <th className="text-left p-4 text-gray-700 font-medium">Fecha</th>
                                                <th className="text-left p-4 text-gray-700 font-medium">Estado</th>
                                                <th className="text-right p-4 text-gray-700 font-medium">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {news.map(newsItem => (
                                                <tr key={newsItem.id} className="border-b border-green-100 hover:bg-green-50/50">
                                                    <td className="p-4 text-gray-900">{newsItem.title}</td>
                                                    <td className="p-4 text-gray-600">{newsItem.category}</td>
                                                    <td className="p-4 text-gray-600">
                                                        {newsItem.published_date ? new Date(newsItem.published_date).toLocaleDateString() : '-'}
                                                    </td>
                                                    <td className="p-4">
                                                        <span className={`text-xs px-2 py-1 rounded border ${newsItem.status === 'published'
                                                                ? 'bg-green-100 text-green-700 border-green-200'
                                                                : 'bg-yellow-100 text-yellow-700 border-yellow-200'
                                                            }`}>
                                                            {newsItem.status === 'published' ? 'Publicado' : 'Borrador'}
                                                        </span>
                                                    </td>
                                                    <td className="p-4">
                                                        <div className="flex gap-2 justify-end">
                                                            <Button size="sm" variant="outline" onClick={() => handleEditNews(newsItem)} className="border-green-300 text-gray-700 hover:bg-green-50">
                                                                <Edit className="w-4 h-4" />
                                                            </Button>
                                                            <Button size="sm" variant="outline" onClick={() => handleDeleteNews(newsItem.id)} className="border-red-300 text-red-600 hover:bg-red-50">
                                                                <Trash2 className="w-4 h-4" />
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    {news.length === 0 && (
                                        <div className="text-center py-12">
                                            <p className="text-gray-500">No hay noticias aún. Crea la primera!</p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>

            {/* Dialogs */}
            <VolumeDialog
                open={volumeDialogOpen}
                onOpenChange={setVolumeDialogOpen}
                volume={selectedVolume}
                onSave={handleSaveVolume}
            />

            <NewsDialog
                open={newsDialogOpen}
                onOpenChange={setNewsDialogOpen}
                news={selectedNews}
                onSave={handleSaveNews}
            />
        </div>
    );
}
