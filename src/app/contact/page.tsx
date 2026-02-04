
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Mail, MapPin, Phone, Send } from 'lucide-react';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        alert('Mensaje enviado (demo)');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-green-50 py-16">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Contacto
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        ¿Tienes preguntas o deseas colaborar? Estamos aquí para ayudarte
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-10">
                    {/* Contact Form */}
                    <Card className="bg-white border-green-200">
                        <CardHeader>
                            <h2 className="text-2xl font-bold text-gray-900">Envíanos un mensaje</h2>
                            <p className="text-gray-600 text-sm">Responderemos en un plazo de 24-48 horas</p>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-gray-700">Nombre completo</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="bg-white border-green-200 text-gray-900"
                                        placeholder="Juan Pérez"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-gray-700">Correo electrónico</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="bg-white border-green-200 text-gray-900"
                                        placeholder="juan@ejemplo.com"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="subject" className="text-gray-700">Asunto</Label>
                                    <Input
                                        id="subject"
                                        type="text"
                                        required
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        className="bg-white border-green-200 text-gray-900"
                                        placeholder="Consulta sobre publicación"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message" className="text-gray-700">Mensaje</Label>
                                    <Textarea
                                        id="message"
                                        required
                                        rows={6}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="bg-white border-green-200 text-gray-900 resize-none"
                                        placeholder="Escribe tu mensaje aquí..."
                                    />
                                </div>

                                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold">
                                    <Send className="w-4 h-4 mr-2" />
                                    Enviar mensaje
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <Card className="bg-white border-green-200">
                            <CardHeader>
                                <h2 className="text-2xl font-bold text-gray-900">Información de contacto</h2>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                                        <Mail className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                                        <p className="text-gray-600">contacto@juvenissapiens.com</p>
                                        <p className="text-gray-600">editorial@juvenissapiens.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                                        <Phone className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-1">Teléfono</h3>
                                        <p className="text-gray-600">+1 (555) 123-4567</p>
                                        <p className="text-gray-500 text-sm">Lun - Vie: 9:00 AM - 5:00 PM</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                                        <MapPin className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-1">Dirección</h3>
                                        <p className="text-gray-600">Calle Universitaria 123</p>
                                        <p className="text-gray-600">Ciudad del Saber, CP 12345</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-white border-green-200">
                            <CardHeader>
                                <h2 className="text-xl font-bold text-gray-900">Horario de atención</h2>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Lunes - Viernes</span>
                                    <span className="text-gray-900 font-medium">9:00 AM - 5:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Sábado</span>
                                    <span className="text-gray-900 font-medium">10:00 AM - 2:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Domingo</span>
                                    <span className="text-gray-500">Cerrado</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
