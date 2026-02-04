
'use client';

import Link from 'next/link';
import { Menu, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { href: '/', label: 'Inicio' },
        { href: '/volumes', label: 'Volúmenes' },
        { href: '/news', label: 'Noticias' },
        { href: '/about', label: 'Acerca de' },
    ];

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-green-200 bg-white/95 backdrop-blur-sm shadow-sm">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <Link href="/" className="text-xl font-bold tracking-tight flex items-center gap-2">
                        <span className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">JUVENIS</span>
                        <span className="font-light text-gray-700">SAPIENS</span>
                    </Link>
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-6">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-gray-700 transition-colors hover:text-green-600"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" className="text-gray-700 hover:text-green-600 hover:bg-green-50">
                        <Search className="h-5 w-5" />
                    </Button>

                    <Link href="/contact">
                        <Button className="hidden md:flex bg-green-600 text-white hover:bg-green-700 font-semibold">
                            Contacto
                        </Button>
                    </Link>

                    {/* Mobile Menu */}
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden text-gray-700">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="bg-white border-green-200 text-gray-900 p-0 flex flex-col">
                            {/* Mobile Header inside Menu */}
                            <div className="p-6 border-b border-green-100 bg-green-50/50">
                                <Link href="/" onClick={() => setIsOpen(false)} className="text-xl font-bold tracking-tight flex items-center gap-2">
                                    <span className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">JUVENIS</span>
                                    <span className="font-light text-gray-700">SAPIENS</span>
                                </Link>
                                <p className="text-xs text-gray-500 mt-2">Revista Digital Académica</p>
                            </div>

                            {/* Mobile Links */}
                            <div className="flex flex-col flex-1 px-4 py-8">
                                <div className="space-y-4">
                                    {links.map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className="block px-4 py-3 text-lg font-medium text-gray-700 rounded-lg hover:bg-green-50 hover:text-green-600 transition-all border border-transparent hover:border-green-100"
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                </div>

                                <div className="mt-auto space-y-4 pt-8 border-t border-green-50">
                                    <Link href="/contact" onClick={() => setIsOpen(false)}>
                                        <Button className="w-full bg-green-600 text-white hover:bg-green-700 h-12 text-base font-bold shadow-lg shadow-green-200">
                                            Contacto
                                        </Button>
                                    </Link>
                                    <div className="text-center">
                                        <p className="text-xs text-gray-400">© {new Date().getFullYear()} Facultad de Biología, UH</p>
                                    </div>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    );
}
