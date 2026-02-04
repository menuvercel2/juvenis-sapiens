
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function InfoSection() {
    const stats = [
        { label: 'Años de Trayectoria', value: '15+' },
        { label: 'Volúmenes Publicados', value: '42' },
        { label: 'Artículos Indexados', value: '350+' },
    ];

    return (
        <section className="py-20 bg-slate-900 border-y border-slate-800">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold text-white mb-6">Sobre Juvenis Sapiens</h2>
                <p className="max-w-3xl mx-auto text-lg text-slate-400 mb-8 leading-relaxed">
                    Nuestra misión es fomentar el intercambio de conocimiento riguroso y accesible.
                    Publicamos investigaciones originales, revisiones críticas y ensayos que desafían las fronteras
                    disciplinarias, conectando a la comunidad académica global.
                </p>

                <div className="flex justify-center mb-16">
                    <Link href="/about">
                        <Button variant="secondary" className="bg-slate-800 text-white border border-slate-700 hover:bg-slate-700">
                            Conoce nuestra Historia
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-slate-800/50 pt-12">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="space-y-2">
                            <div className="text-4xl font-bold text-amber-500">{stat.value}</div>
                            <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
