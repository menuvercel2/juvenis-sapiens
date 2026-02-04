
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
        <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/60 backdrop-blur-md supports-[backdrop-filter]:bg-black/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <Link href="/" className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                        <span className="bg-gradient-to-r from-amber-200 to-yellow-500 bg-clip-text text-transparent">JUVENIS</span>
                        <span className="font-light text-slate-300">SAPIENS</span>
                    </Link>
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-6">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" className="text-slate-300 hover:text-white hover:bg-white/10">
                        <Search className="h-5 w-5" />
                    </Button>

                    <Link href="/contact">
                        <Button className="hidden md:flex bg-amber-500 text-black hover:bg-amber-400 font-semibold">
                            Contacto
                        </Button>
                    </Link>

                    {/* Mobile Menu */}
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden text-slate-300">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="bg-slate-950 border-slate-800 text-white">
                            <div className="flex flex-col gap-6 mt-8">
                                {links.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="text-lg font-medium hover:text-amber-400 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                                <Link href="/contact" onClick={() => setIsOpen(false)}>
                                    <Button className="w-full bg-amber-500 text-black hover:bg-amber-400">
                                        Contacto
                                    </Button>
                                </Link>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    );
}
