
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Lock, Mail } from 'lucide-react';
import { authService } from '@/lib/authService';

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Sign in with Supabase
            await authService.signIn(formData.email, formData.password);

            // Check if user is admin
            const isAdmin = await authService.isAdmin();

            if (isAdmin) {
                router.push('/admin');
            } else {
                setError('No tienes permisos de administrador');
                await authService.signOut();
            }
        } catch (err: any) {
            console.error('Login error:', err);
            setError(err.message || 'Error al iniciar sesión. Verifica tus credenciales.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-green-50 flex items-center justify-center py-16 px-4">
            <div className="w-full max-w-md">
                {/* Logo/Brand */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">
                        <span className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">JUVENIS</span>
                        <span className="font-light text-gray-700"> SAPIENS</span>
                    </h1>
                    <p className="text-gray-600">Panel de Administración</p>
                </div>

                <Card className="bg-white border-green-200 shadow-lg">
                    <CardHeader>
                        <h2 className="text-2xl font-bold text-gray-900 text-center">Iniciar Sesión</h2>
                        <p className="text-gray-600 text-sm text-center">Accede al panel de administración</p>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
                                    {error}
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-gray-700">Correo electrónico</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="pl-10 bg-white border-green-200 text-gray-900"
                                        placeholder="admin@juvenissapiens.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-gray-700">Contraseña</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <Input
                                        id="password"
                                        type="password"
                                        required
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className="pl-10 bg-white border-green-200 text-gray-900"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold"
                            >
                                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                            </Button>

                            <div className="text-center">
                                <a href="#" className="text-sm text-green-600 hover:text-green-700">
                                    ¿Olvidaste tu contraseña?
                                </a>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                <p className="text-center text-gray-500 text-sm mt-6">
                    Esta página es solo para administradores autorizados
                </p>
            </div>
        </div>
    );
}
