import Link from 'next/link';
import { Container } from '@/components/ui';
import content from '@/content/site.json';

export function Footer() {
  const t = content.footer;
  const nav = content.navigation;
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: '/cruises', label: nav.cruises },
    { href: '/ship', label: nav.ship },
    { href: '/contact', label: nav.contact }
  ];

  return (
    <footer className="bg-navy text-white">
      <Container>
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <Link href="/" className="inline-block">
                <span className="font-display text-2xl font-semibold text-white">
                  Voyage Japan
                </span>
              </Link>
              <p className="mt-4 text-white/70 max-w-sm">
                {t.tagline}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-gold font-medium mb-4">{t.quickLinks}</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-gold font-medium mb-4">{t.contact}</h3>
              <ul className="space-y-3 text-white/70">
                <li>
                  <a
                    href={`mailto:${t.email}`}
                    className="hover:text-white transition-colors"
                  >
                    {t.email}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${t.phone.replace(/\s/g, '')}`}
                    className="hover:text-white transition-colors"
                  >
                    {t.phone}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50">
          <p>&copy; {currentYear} {t.copyright}</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              {t.privacy}
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              {t.terms}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
