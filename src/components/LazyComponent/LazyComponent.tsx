import { FC, ReactNode, Suspense } from 'react';

type LazyComponentProps = {
  children: ReactNode;
  fallback?: string;
};

export const LazyComponent: FC<LazyComponentProps> = ({ children, fallback = 'Loading...' }) => {
  return (
    <Suspense fallback={<div style={{ padding: '20px', textAlign: 'center' }}>{fallback}</div>}>
      {children}
    </Suspense>
  );
};
