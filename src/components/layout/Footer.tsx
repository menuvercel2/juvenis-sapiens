
import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Footer() {
    return (
        <footer className="w-full bg-gray-50 text-gray-700 py-12 border-t border-green-200">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* Brand */}
                <div className="space-y-4">
                    <Link href="/" className="text-2xl font-bold tracking-tight">
                        <span className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">JUVENIS</span>
                        <span className="font-light text-gray-700">SAPIENS</span>
                    </Link>
                    <p className="text-sm leading-relaxed text-gray-600">
                        Revista digital académica dedicada a la difusión del conocimiento científico y cultural.
                    </p>
                </div>

                {/* Links */}
                <div>
                    <h3 className="text-gray-900 font-semibold mb-4">Enlaces Rápidos</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/volumes" className="hover:text-green-600 transition-colors">Volúmenes</Link></li>
                        <li><Link href="/news" className="hover:text-green-600 transition-colors">Noticias</Link></li>
                        <li><Link href="/about" className="hover:text-green-600 transition-colors">Acerca de</Link></li>
                        <li><Link href="/contact" className="hover:text-green-600 transition-colors">Contacto</Link></li>
                    </ul>
                </div>

                {/* Legal */}
                <div>
                    <h3 className="text-gray-900 font-semibold mb-4">Legal</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/privacy" className="hover:text-green-600 transition-colors">Política de Privacidad</Link></li>
                        <li><Link href="/terms" className="hover:text-green-600 transition-colors">Términos de Uso</Link></li>
                        <li><Link href="/admin" className="hover:text-green-600 transition-colors">Acceso Admin</Link></li>
                    </ul>
                </div>

                {/* Contact info */}
                <div>
                    <h3 className="text-gray-900 font-semibold mb-4">Contacto</h3>
                    <ul className="space-y-3 text-sm">
                        <li className="flex items-start gap-3">
                            <Mail className="w-5 h-5 text-green-600 shrink-0" />
                            <span>contacto@juvenissapiens.com</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <Phone className="w-5 h-5 text-green-600 shrink-0" />
                            <span>+1 (555) 123-4567</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-green-600 shrink-0" />
                            <span>Calle Universitaria 123,<br />Ciudad del Saber</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-12 pt-8 border-t border-green-200 text-center text-xs text-gray-500">
                © {new Date().getFullYear()} Juvenis Sapiens. Todos los derechos reservados.
            </div>
        </footer>
    );
}
