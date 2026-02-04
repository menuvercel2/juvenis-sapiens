
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
    BookOpen,
    Newspaper,
    BarChart3,
    Users,
    LogOut,
    Plus,
    Edit,
    Trash2
} from 'lucide-react';

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState<'dashboard' | 'volumes' | 'news'>('dashboard');

    // Mock data
    const stats = {
        totalVolumes: 42,
        totalNews: 28,
        monthlyViews: 15420,
        downloads: 3240
    };

    const recentVolumes = [
        { id: 1, title: 'Vol. 15, No. 2', status: 'Publicado', date: '2025-12-01' },
        { id: 2, title: 'Vol. 15, No. 1', status: 'Publicado', date: '2025-06-01' },
    ];

    const recentNews = [
        { id: 1, title: 'Convocatoria Vol. 16', status: 'Publicado', date: '2026-01-15' },
        { id: 2, title: 'Simposio 2026', status: 'Borrador', date: '2026-01-20' },
    ];

    return (
        <div className="min-h-screen bg-slate-950">
            {/* Header */}
            <div className="bg-slate-900 border-b border-slate-800">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Panel de Administración</h1>
                        <p className="text-slate-400 text-sm">Juvenis Sapiens</p>
                    </div>
                    <Button variant="outline" className="border-slate-700 hover:bg-slate-800">
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
                        className={activeTab === 'dashboard' ? 'bg-amber-500 text-black hover:bg-amber-400' : 'border-slate-700 hover:bg-slate-800'}
                    >
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Dashboard
                    </Button>
                    <Button
                        variant={activeTab === 'volumes' ? 'default' : 'outline'}
                        onClick={() => setActiveTab('volumes')}
                        className={activeTab === 'volumes' ? 'bg-amber-500 text-black hover:bg-amber-400' : 'border-slate-700 hover:bg-slate-800'}
                    >
                        <BookOpen className="w-4 h-4 mr-2" />
                        Volúmenes
                    </Button>
                    <Button
                        variant={activeTab === 'news' ? 'default' : 'outline'}
                        onClick={() => setActiveTab('news')}
                        className={activeTab === 'news' ? 'bg-amber-500 text-black hover:bg-amber-400' : 'border-slate-700 hover:bg-slate-800'}
                    >
                        <Newspaper className="w-4 h-4 mr-2" />
                        Noticias
                    </Button>
                </div>

                {/* Dashboard View */}
                {activeTab === 'dashboard' && (
                    <div className="space-y-8">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <Card className="bg-slate-900 border-slate-800">
                                <CardContent className="pt-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-slate-400 text-sm">Total Volúmenes</p>
                                            <p className="text-3xl font-bold text-white mt-1">{stats.totalVolumes}</p>
                                        </div>
                                        <BookOpen className="w-10 h-10 text-amber-500" />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-slate-900 border-slate-800">
                                <CardContent className="pt-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-slate-400 text-sm">Noticias</p>
                                            <p className="text-3xl font-bold text-white mt-1">{stats.totalNews}</p>
                                        </div>
                                        <Newspaper className="w-10 h-10 text-amber-500" />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-slate-900 border-slate-800">
                                <CardContent className="pt-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-slate-400 text-sm">Vistas (mes)</p>
                                            <p className="text-3xl font-bold text-white mt-1">{stats.monthlyViews.toLocaleString()}</p>
                                        </div>
                                        <Users className="w-10 h-10 text-amber-500" />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-slate-900 border-slate-800">
                                <CardContent className="pt-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-slate-400 text-sm">Descargas</p>
                                            <p className="text-3xl font-bold text-white mt-1">{stats.downloads.toLocaleString()}</p>
                                        </div>
                                        <BarChart3 className="w-10 h-10 text-amber-500" />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Recent Activity */}
                        <div className="grid lg:grid-cols-2 gap-6">
                            <Card className="bg-slate-900 border-slate-800">
                                <CardHeader>
                                    <h3 className="text-xl font-bold text-white">Volúmenes Recientes</h3>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {recentVolumes.map(vol => (
                                        <div key={vol.id} className="flex justify-between items-center p-3 bg-slate-800 rounded-lg">
                                            <div>
                                                <p className="font-medium text-white">{vol.title}</p>
                                                <p className="text-sm text-slate-400">{vol.date}</p>
                                            </div>
                                            <span className="text-xs px-2 py-1 bg-green-500/10 text-green-400 rounded">
                                                {vol.status}
                                            </span>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            <Card className="bg-slate-900 border-slate-800">
                                <CardHeader>
                                    <h3 className="text-xl font-bold text-white">Noticias Recientes</h3>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {recentNews.map(news => (
                                        <div key={news.id} className="flex justify-between items-center p-3 bg-slate-800 rounded-lg">
                                            <div>
                                                <p className="font-medium text-white">{news.title}</p>
                                                <p className="text-sm text-slate-400">{news.date}</p>
                                            </div>
                                            <span className={`text-xs px-2 py-1 rounded ${news.status === 'Publicado'
                                                    ? 'bg-green-500/10 text-green-400'
                                                    : 'bg-yellow-500/10 text-yellow-400'
                                                }`}>
                                                {news.status}
                                            </span>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )}

                {/* Volumes Management */}
                {activeTab === 'volumes' && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-white">Gestión de Volúmenes</h2>
                            <Button className="bg-amber-500 hover:bg-amber-400 text-black">
                                <Plus className="w-4 h-4 mr-2" />
                                Nuevo Volumen
                            </Button>
                        </div>

                        <Card className="bg-slate-900 border-slate-800">
                            <CardContent className="p-0">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="border-b border-slate-800">
                                            <tr>
                                                <th className="text-left p-4 text-slate-400 font-medium">Título</th>
                                                <th className="text-left p-4 text-slate-400 font-medium">Estado</th>
                                                <th className="text-left p-4 text-slate-400 font-medium">Fecha</th>
                                                <th className="text-right p-4 text-slate-400 font-medium">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {recentVolumes.map(vol => (
                                                <tr key={vol.id} className="border-b border-slate-800 hover:bg-slate-800/50">
                                                    <td className="p-4 text-white">{vol.title}</td>
                                                    <td className="p-4">
                                                        <span className="text-xs px-2 py-1 bg-green-500/10 text-green-400 rounded">
                                                            {vol.status}
                                                        </span>
                                                    </td>
                                                    <td className="p-4 text-slate-400">{vol.date}</td>
                                                    <td className="p-4">
                                                        <div className="flex gap-2 justify-end">
                                                            <Button size="sm" variant="outline" className="border-slate-700">
                                                                <Edit className="w-4 h-4" />
                                                            </Button>
                                                            <Button size="sm" variant="outline" className="border-slate-700 hover:border-red-500 hover:text-red-500">
                                                                <Trash2 className="w-4 h-4" />
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* News Management */}
                {activeTab === 'news' && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-white">Gestión de Noticias</h2>
                            <Button className="bg-amber-500 hover:bg-amber-400 text-black">
                                <Plus className="w-4 h-4 mr-2" />
                                Nueva Noticia
                            </Button>
                        </div>

                        <Card className="bg-slate-900 border-slate-800">
                            <CardContent className="p-0">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="border-b border-slate-800">
                                            <tr>
                                                <th className="text-left p-4 text-slate-400 font-medium">Título</th>
                                                <th className="text-left p-4 text-slate-400 font-medium">Estado</th>
                                                <th className="text-left p-4 text-slate-400 font-medium">Fecha</th>
                                                <th className="text-right p-4 text-slate-400 font-medium">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {recentNews.map(news => (
                                                <tr key={news.id} className="border-b border-slate-800 hover:bg-slate-800/50">
                                                    <td className="p-4 text-white">{news.title}</td>
                                                    <td className="p-4">
                                                        <span className={`text-xs px-2 py-1 rounded ${news.status === 'Publicado'
                                                                ? 'bg-green-500/10 text-green-400'
                                                                : 'bg-yellow-500/10 text-yellow-400'
                                                            }`}>
                                                            {news.status}
                                                        </span>
                                                    </td>
                                                    <td className="p-4 text-slate-400">{news.date}</td>
                                                    <td className="p-4">
                                                        <div className="flex gap-2 justify-end">
                                                            <Button size="sm" variant="outline" className="border-slate-700">
                                                                <Edit className="w-4 h-4" />
                                                            </Button>
                                                            <Button size="sm" variant="outline" className="border-slate-700 hover:border-red-500 hover:text-red-500">
                                                                <Trash2 className="w-4 h-4" />
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
}
