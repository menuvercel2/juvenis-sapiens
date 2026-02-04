
'use client';

import { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, ImageIcon, X, Loader2 } from 'lucide-react';
import { storageService } from '@/lib/storageService';
import type { News, NewsFormData } from '@/types/database';

interface NewsDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    news?: News | null;
    onSave: (data: NewsFormData) => Promise<void>;
}

export function NewsDialog({ open, onOpenChange, news, onSave }: NewsDialogProps) {
    const [formData, setFormData] = useState<NewsFormData>({
        title: news?.title || '',
        category: news?.category || 'Lanzamiento',
        extract: news?.extract || '',
        content: news?.content || '',
        image_url: news?.image_url || '',
        published_date: news?.published_date || new Date().toISOString().split('T')[0],
        status: news?.status || 'draft',
    });

    const [uploadingImage, setUploadingImage] = useState(false);
    const [loading, setLoading] = useState(false);

    const imageInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadingImage(true);

        try {
            const timestamp = Date.now();
            const sanitizedTitle = formData.title.substring(0, 20).replace(/[^a-z0-9]/gi, '-').toLowerCase();
            const extension = file.name.split('.').pop();
            const fileName = `news-${sanitizedTitle}-${timestamp}.${extension}`;

            const publicUrl = await storageService.uploadFile('news', fileName, file);

            setFormData(prev => ({
                ...prev,
                image_url: publicUrl
            }));
        } catch (error) {
            console.error(`Error uploading image:`, error);
            alert(`Error al subir la imagen. Revisa la consola.`);
        } finally {
            setUploadingImage(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSave(formData);
            onOpenChange(false);
        } catch (error) {
            console.error('Error saving news:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
                <DialogHeader>
                    <DialogTitle className="text-gray-900">
                        {news ? 'Editar Noticia' : 'Nueva Noticia'}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title" className="text-gray-700 font-semibold">Título *</Label>
                        <Input
                            id="title"
                            required
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Convocatoria Abierta Vol. 16"
                            className="bg-white border-green-200 text-gray-900"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="category" className="text-gray-700">Categoría *</Label>
                            <Select
                                value={formData.category}
                                onValueChange={(value) => setFormData({ ...formData, category: value })}
                            >
                                <SelectTrigger className="bg-white border-green-200 text-gray-900">
                                    <SelectValue placeholder="Selecciona categoría" />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                    <SelectItem value="Lanzamiento">Lanzamiento</SelectItem>
                                    <SelectItem value="Evento">Evento</SelectItem>
                                    <SelectItem value="Convocatoria">Convocatoria</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="status" className="text-gray-700">Estado *</Label>
                            <Select
                                value={formData.status}
                                onValueChange={(value: 'draft' | 'published') => setFormData({ ...formData, status: value })}
                            >
                                <SelectTrigger className="bg-white border-green-200 text-gray-900">
                                    <SelectValue placeholder="Selecciona estado" />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                    <SelectItem value="draft">Borrador</SelectItem>
                                    <SelectItem value="published">Publicado</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="published_date" className="text-gray-700 font-semibold">Fecha de Publicación</Label>
                        <Input
                            id="published_date"
                            type="date"
                            value={formData.published_date}
                            onChange={(e) => setFormData({ ...formData, published_date: e.target.value })}
                            className="bg-white border-green-200 text-gray-900"
                        />
                    </div>

                    {/* Image Upload */}
                    <div className="space-y-3">
                        <Label className="text-gray-700 font-semibold flex items-center gap-2">
                            <ImageIcon className="w-4 h-4" /> Imagen Destacada
                        </Label>
                        <div className="border-2 border-dashed border-green-200 rounded-lg p-6 flex flex-col items-center justify-center bg-green-50/30 hover:bg-green-50 transition-colors">
                            {formData.image_url ? (
                                <div className="relative group w-full max-w-[300px] aspect-video">
                                    <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover rounded shadow" />
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, image_url: '' })}
                                        className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1.5 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ) : (
                                <div className="text-center">
                                    {uploadingImage ? (
                                        <Loader2 className="w-10 h-10 animate-spin text-green-600 mx-auto" />
                                    ) : (
                                        <>
                                            <Upload className="w-10 h-10 text-green-400 mx-auto mb-3" />
                                            <p className="text-sm text-gray-500 mb-3">Recomendado: 1200x630px</p>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                className="border-green-300 text-green-700 bg-white"
                                                onClick={() => imageInputRef.current?.click()}
                                            >
                                                Subir Imagen
                                            </Button>
                                        </>
                                    )}
                                </div>
                            )}
                            <input
                                type="file"
                                ref={imageInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={handleFileUpload}
                            />
                        </div>
                        <Input
                            value={formData.image_url}
                            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                            placeholder="O pega la URL de la imagen aquí"
                            className="text-xs bg-white border-green-100 h-8"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="extract" className="text-gray-700 font-semibold">Extracto</Label>
                        <Textarea
                            id="extract"
                            rows={3}
                            value={formData.extract}
                            onChange={(e) => setFormData({ ...formData, extract: e.target.value })}
                            placeholder="Breve descripción de la noticia..."
                            className="bg-white border-green-200 text-gray-900 resize-none"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="content" className="text-gray-700 font-semibold">Contenido Completo</Label>
                        <Textarea
                            id="content"
                            rows={6}
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            placeholder="Contenido completo de la noticia..."
                            className="bg-white border-green-200 text-gray-900 resize-none"
                        />
                    </div>

                    <DialogFooter className="bg-gray-50 -mx-6 -mb-6 p-6 rounded-b-lg border-t border-green-100">
                        <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} className="text-gray-500 hover:text-gray-700">
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={loading || uploadingImage} className="bg-green-600 hover:bg-green-700 text-white min-w-[120px]">
                            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                            {news ? 'Actualizar' : 'Publicar'} Noticia
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
