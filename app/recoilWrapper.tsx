'use client';

import { RecoilRoot } from 'recoil';
import { ReactNode } from 'react';

const RecoilWrapper = ({ children }: { children: ReactNode }) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

export default RecoilWrapper;
