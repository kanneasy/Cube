import type { InputHTMLAttributes, SelectHTMLAttributes } from 'react';

export function Input({ className, ...rest }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={['ui-input', className].filter(Boolean).join(' ')} {...rest} />;
}

export function Select({ className, children, ...rest }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={['ui-select', className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </select>
  );
}
