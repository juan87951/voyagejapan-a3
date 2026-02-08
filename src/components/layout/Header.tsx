'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/ui';
import { cn } from '@/lib/utils';
import content from '@/content/site.json';

export function Header() {
  const nav = content.navigation;
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const navLinks = [
    { href: '/', label: nav.home },
    { href: '/cruises', label: nav.cruises },
    { href: '/ship', label: nav.ship },
    { href: '/art', label: nav.art },
    { href: '/contact', label: nav.contact }
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      )}
    >
      <Container>
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="relative z-10" onClick={closeMobileMenu}>
            <span className={cn(
              'font-display text-2xl font-semibold transition-colors duration-300',
              isScrolled || isMobileMenuOpen ? 'text-navy' : 'text-white'
            )}>
              Voyage Japan with AsukaIII
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative py-2 text-sm font-medium transition-colors duration-300',
                  isScrolled ? 'text-navy hover:text-gold' : 'text-white/90 hover:text-white',
                  isActive(link.href) && 'text-gold'
                )}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative z-10 p-2"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span
                className={cn(
                  'block h-0.5 w-full transition-all duration-300 origin-center',
                  isScrolled || isMobileMenuOpen ? 'bg-navy' : 'bg-white',
                  isMobileMenuOpen && 'rotate-45 translate-y-2'
                )}
              />
              <span
                className={cn(
                  'block h-0.5 w-full transition-all duration-300',
                  isScrolled || isMobileMenuOpen ? 'bg-navy' : 'bg-white',
                  isMobileMenuOpen && 'opacity-0'
                )}
              />
              <span
                className={cn(
                  'block h-0.5 w-full transition-all duration-300 origin-center',
                  isScrolled || isMobileMenuOpen ? 'bg-navy' : 'bg-white',
                  isMobileMenuOpen && '-rotate-45 -translate-y-2'
                )}
              />
            </div>
          </button>
        </nav>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-100"
          >
            <Container>
              <div className="py-6 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMobileMenu}
                    className={cn(
                      'block py-3 text-lg font-medium transition-colors',
                      isActive(link.href) ? 'text-gold' : 'text-navy hover:text-gold'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
