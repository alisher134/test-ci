import type { InputHTMLAttributes } from 'react';

import clsx from 'clsx';

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const Checkbox = ({ className, ...props }: Props) => (
  <input className={clsx('checkbox', className)} type="checkbox" {...props} />
);

export default Checkbox;
