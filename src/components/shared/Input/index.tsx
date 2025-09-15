// libraries
import type { InputHTMLAttributes } from 'react';

import clsx from 'clsx';

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const Input = ({ className, ...props }: Props) => (
  <input className={clsx('input', className)} {...props} />
);

export default Input;
