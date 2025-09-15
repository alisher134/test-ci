// libraries
import type { ButtonHTMLAttributes } from 'react';

import clsx from 'clsx';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline'
}

const Button = ({
  className, variant = 'primary', children, ...props
}: Props) => (
  <button className={clsx('button', `button-${variant}`, className)} {...props}>{children}</button>
);

export default Button;
