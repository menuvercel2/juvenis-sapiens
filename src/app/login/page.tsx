
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Lock, Mail } from 'lucide-react';

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
            // TODO: Implement Supabase authentication
            // const { data, error } = await supabase.auth.signInWithPassword({
            //   email: formData.email,
            //   password: formData.password,
            // });

            // For now, demo mode
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Simulate successful login
            if (formData.email && formData.password) {
                router.push('/admin');
            } else {
                setError('Por favor completa todos los campos');
            }
        } catch (err) {
            setError('Error al iniciar sesión. Verifica tus credenciales.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center py-16 px-4">
            <div className="w-full max-w-md">
                {/* Logo/Brand */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">
                        <span className="bg-gradient-to-r from-amber-200 to-yellow-500 bg-clip-text text-transparent">JUVENIS</span>
                        <span className="font-light text-slate-300"> SAPIENS</span>
                    </h1>
                    <p className="text-slate-400">Panel de Administración</p>
                </div>

                <Card className="bg-slate-900 border-slate-800">
                    <CardHeader>
                        <h2 className="text-2xl font-bold text-white text-center">Iniciar Sesión</h2>
                        <p className="text-slate-400 text-sm text-center">Accede al panel de administración</p>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 text-red-400 text-sm">
                                    {error}
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-slate-300">Correo electrónico</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="pl-10 bg-slate-800 border-slate-700 text-white"
                                        placeholder="admin@juvenissapiens.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-slate-300">Contraseña</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                    <Input
                                        id="password"
                                        type="password"
                                        required
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className="pl-10 bg-slate-800 border-slate-700 text-white"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-amber-500 hover:bg-amber-400 text-black font-semibold"
                            >
                                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                            </Button>

                            <div className="text-center">
                                <a href="#" className="text-sm text-amber-500 hover:text-amber-400">
                                    ¿Olvidaste tu contraseña?
                                </a>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                <p className="text-center text-slate-500 text-sm mt-6">
                    Esta página es solo para administradores autorizados
                </p>
            </div>
        </div>
    );
}
