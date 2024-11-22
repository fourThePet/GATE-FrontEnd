import { typo } from "../../styles/typo";
import { HTMLAttributes, ReactNode } from 'react';

type Typo = keyof typeof typo;

interface Props extends HTMLAttributes<HTMLSpanElement> {
  color?: string;
  type: Typo;
  children: ReactNode;
}

export default function Text({ color, type, children, ...props }: Props) {
  return (
    <span style={{ color }} css={{ ...typo[type] }} {...props}>
      {children}
    </span>
  );
}
