import { ReactNode } from 'react';
import { wrapper } from './index.styles';

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({children} : LayoutProps){
    return(
        <div css={wrapper}>
            {children}
        </div>
    )
}