import type { HTMLAttributes, ReactNode } from 'react';

type Props = HTMLAttributes<HTMLElement> & {
  as?: 'div' | 'li' | 'section' | 'article';
  children: ReactNode;
};

export function Card({ as: Tag = 'div', className, children, ...rest }: Props) {
  return (
    <Tag className={['ui-card', className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </Tag>
  );
}
