
'use client';

import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Upload, FileText, ImageIcon, X, Loader2 } from 'lucide-react';
import { storageService } from '@/lib/storageService';
import type { Volume, VolumeFormData } from '@/types/database';

interface VolumeDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    volume?: Volume | null;
    onSave: (data: VolumeFormData) => Promise<void>;
}

export function VolumeDialog({ open, onOpenChange, volume, onSave }: VolumeDialogProps) {
    const [formData, setFormData] = useState<VolumeFormData>({
        title: volume?.title || '',
        number: volume?.number || '',
        year: volume?.year || new Date().getFullYear().toString(),
        cover_url: volume?.cover_url || '',
        pdf_url: volume?.pdf_url || '',
        content: volume?.content || '',
        published: volume?.published || false,
    });

    // Actualizar el estado del formulario cuando cambia el volumen (ej. al editar)
    useEffect(() => {
        if (volume) {
            setFormData({
                title: volume.title,
                number: volume.number,
                year: volume.year,
                cover_url: volume.cover_url || '',
                pdf_url: volume.pdf_url || '',
                content: volume.content || '',
                published: volume.published,
            });
        } else {
            setFormData({
                title: '',
                number: '',
                year: new Date().getFullYear().toString(),
                cover_url: '',
                pdf_url: '',
                content: '',
                published: false,
            });
        }
    }, [volume, open]);

    const [uploadingCover, setUploadingCover] = useState(false);
    const [uploadingPdf, setUploadingPdf] = useState(false);
    const [loading, setLoading] = useState(false);

    const coverInputRef = useRef<HTMLInputElement>(null);
    const pdfInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'cover' | 'pdf') => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (type === 'cover') setUploadingCover(true);
        else setUploadingPdf(true);

        try {
            const bucket = type === 'cover' ? 'covers' : 'pdfs';

            // Mejoramos la generación del nombre del archivo
            const timestamp = Date.now();
            const prefix = formData.number
                ? formData.number.replace(/[^a-z0-9]/gi, '-').toLowerCase()
                : 'vol';

            const extension = file.name.split('.').pop();
            // Limpiamos guiones dobles y guiones al inicio/final
            const cleanPrefix = prefix.replace(/-+/g, '-').replace(/^-|-$/g, '');
            const fileName = `${cleanPrefix || 'vol'}-${timestamp}.${extension}`;

            const publicUrl = await storageService.uploadFile(bucket, fileName, file);

            setFormData(prev => ({
                ...prev,
                [type === 'cover' ? 'cover_url' : 'pdf_url']: publicUrl
            }));
        } catch (error) {
            console.error(`Error uploading ${type}:`, error);
            alert(`Error al subir el archivo ${type}. Revisa la consola.`);
        } finally {
            if (type === 'cover') setUploadingCover(false);
            else setUploadingPdf(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSave(formData);
            onOpenChange(false);
        } catch (error) {
            console.error('Error saving volume:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
                <DialogHeader>
                    <DialogTitle className="text-gray-900">
                        {volume ? 'Editar Volumen' : 'Nuevo Volumen'}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="number" className="text-gray-700">Número *</Label>
                            <Input
                                id="number"
                                required
                                value={formData.number}
                                onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                                placeholder="Vol. 15, No. 2"
                                className="bg-white border-green-200 text-gray-900"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="year" className="text-gray-700">Año *</Label>
                            <Input
                                id="year"
                                required
                                value={formData.year}
                                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                placeholder="2025"
                                className="bg-white border-green-200 text-gray-900"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="title" className="text-gray-700">Título *</Label>
                        <Input
                            id="title"
                            required
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Avances en Inteligencia Artificial"
                            className="bg-white border-green-200 text-gray-900"
                        />
                    </div>

                    {/* Upload Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                        {/* Cover Upload */}
                        <div className="space-y-3">
                            <Label className="text-gray-700 font-semibold flex items-center gap-2">
                                <ImageIcon className="w-4 h-4" /> Portada
                            </Label>
                            <div className="border-2 border-dashed border-green-200 rounded-lg p-4 flex flex-col items-center justify-center bg-green-50/30 hover:bg-green-50 transition-colors">
                                {formData.cover_url ? (
                                    <div className="relative group w-full aspect-[2/3] max-w-[120px]">
                                        <img src={formData.cover_url} alt="Preview" className="w-full h-full object-cover rounded shadow" />
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, cover_url: '' })}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        {uploadingCover ? (
                                            <Loader2 className="w-8 h-8 animate-spin text-green-600 mx-auto" />
                                        ) : (
                                            <>
                                                <Upload className="w-8 h-8 text-green-400 mx-auto mb-2" />
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    className="border-green-300 text-green-700"
                                                    onClick={() => coverInputRef.current?.click()}
                                                >
                                                    Elegir Imagen
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                )}
                                <input
                                    type="file"
                                    ref={coverInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) => handleFileUpload(e, 'cover')}
                                />
                            </div>
                            <Input
                                value={formData.cover_url}
                                onChange={(e) => setFormData({ ...formData, cover_url: e.target.value })}
                                placeholder="O pega la URL aquí"
                                className="text-xs bg-white border-green-100 h-8"
                            />
                        </div>

                        {/* PDF Upload */}
                        <div className="space-y-3">
                            <Label className="text-gray-700 font-semibold flex items-center gap-2">
                                <FileText className="w-4 h-4" /> Archivo PDF
                            </Label>
                            <div className="border-2 border-dashed border-green-200 rounded-lg p-4 flex flex-col items-center justify-center bg-green-50/30 hover:bg-green-50 transition-colors">
                                {formData.pdf_url ? (
                                    <div className="text-center w-full">
                                        <div className="bg-green-100 text-green-700 px-3 py-2 rounded flex items-center justify-between gap-2 overflow-hidden">
                                            <span className="text-xs truncate">{formData.pdf_url.split('/').pop()}</span>
                                            <button
                                                type="button"
                                                onClick={() => setFormData({ ...formData, pdf_url: '' })}
                                                className="bg-green-200 hover:bg-green-300 rounded-full p-1"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        {uploadingPdf ? (
                                            <Loader2 className="w-8 h-8 animate-spin text-green-600 mx-auto" />
                                        ) : (
                                            <>
                                                <FileText className="w-8 h-8 text-green-400 mx-auto mb-2" />
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    className="border-green-300 text-green-700"
                                                    onClick={() => pdfInputRef.current?.click()}
                                                >
                                                    Elegir PDF
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                )}
                                <input
                                    type="file"
                                    ref={pdfInputRef}
                                    className="hidden"
                                    accept=".pdf"
                                    onChange={(e) => handleFileUpload(e, 'pdf')}
                                />
                            </div>
                            <Input
                                value={formData.pdf_url}
                                onChange={(e) => setFormData({ ...formData, pdf_url: e.target.value })}
                                placeholder="O pega la URL aquí"
                                className="text-xs bg-white border-green-100 h-8"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="content" className="text-gray-700">Descripción</Label>
                        <Textarea
                            id="content"
                            rows={4}
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            placeholder="Descripción del volumen..."
                            className="bg-white border-green-200 text-gray-900 resize-none"
                        />
                    </div>

                    <div className="flex items-center space-x-2 border-t border-green-100 pt-4">
                        <Switch
                            id="published"
                            checked={formData.published}
                            onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                        />
                        <Label htmlFor="published" className="text-gray-700 font-medium">Publicar inmediatamente</Label>
                    </div>

                    <DialogFooter className="bg-gray-50 -mx-6 -mb-6 p-6 rounded-b-lg border-t border-green-100">
                        <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} className="text-gray-500 hover:text-gray-700">
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={loading || uploadingCover || uploadingPdf} className="bg-green-600 hover:bg-green-700 text-white min-w-[120px]">
                            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                            {volume ? 'Actualizar' : 'Crear'} Volumen
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
