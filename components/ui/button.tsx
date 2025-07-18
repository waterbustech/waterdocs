import { cva, type VariantProps } from 'class-variance-authority';

export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md p-2 text-sm font-medium transition-colors duration-100 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none',
  {
    variants: {
      color: {
        primary:
          'bg-fd-primary text-fd-primary-foreground hover:bg-fd-primary/80',
        outline: 'border hover:bg-fd-accent hover:text-fd-accent-foreground',
        ghost: 'hover:bg-fd-accent hover:text-fd-accent-foreground',
        secondary:
          'border bg-fd-secondary text-fd-secondary-foreground hover:bg-fd-accent hover:text-fd-accent-foreground',
      },
        variant: {
        default:
          'bg-fd-background bg-gradient-to-b from-fd-primary to-fd-primary/60 text-fd-primary-foreground shadow-inner shadow-fd-background/20 hover:bg-fd-primary/90',
        outline: 'border hover:bg-fd-accent hover:text-fd-accent-foreground',
        grow: 'border bg-gradient-to-t from-fd-primary/10 shadow-inner shadow-fd-primary/10 hover:bg-fd-accent/50 hover:text-fd-accent-foreground',
        secondary:
          'border bg-fd-secondary text-fd-secondary-foreground hover:bg-fd-accent hover:text-fd-accent-foreground',
        ghost: 'hover:bg-fd-accent hover:text-fd-accent-foreground',
        link: 'text-fd-primary underline-offset-4 hover:underline',
      },
      size: {
        sm: 'gap-1 px-2 py-1.5 text-xs',
        icon: 'p-1.5',
        'icon-sm': 'p-1.5 [&_svg]:size-4.5',
        'icon-xs': 'p-1 [&_svg]:size-4',
      },
    },
  },
);

export type ButtonProps = VariantProps<typeof buttonVariants>;

