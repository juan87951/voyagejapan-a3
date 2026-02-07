import { type HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'navy' | 'cream' | 'gray';
  spacing?: 'sm' | 'md' | 'lg';
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, variant = 'default', spacing = 'lg', children, ...props }, ref) => {
    const variants = {
      default: 'bg-white',
      navy: 'bg-navy text-white',
      cream: 'bg-cream',
      gray: 'bg-gray-light'
    };

    const spacings = {
      sm: 'py-12 md:py-16',
      md: 'py-16 md:py-20',
      lg: 'py-20 md:py-28'
    };

    return (
      <section
        ref={ref}
        className={cn(variants[variant], spacings[spacing], className)}
        {...props}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = 'Section';

const SectionHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('text-center mb-12 md:mb-16', className)} {...props}>
      {children}
    </div>
  )
);

SectionHeader.displayName = 'SectionHeader';

const SectionTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn('font-display text-3xl md:text-4xl lg:text-5xl font-semibold', className)}
      {...props}
    />
  )
);

SectionTitle.displayName = 'SectionTitle';

const SectionSubtitle = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('mt-4 text-lg md:text-xl opacity-80 max-w-2xl mx-auto', className)}
      {...props}
    />
  )
);

SectionSubtitle.displayName = 'SectionSubtitle';

export { Section, SectionHeader, SectionTitle, SectionSubtitle };
