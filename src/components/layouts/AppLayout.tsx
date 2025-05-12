'use client';

import { usePathname } from 'next/navigation';
import NavbarPage from '@/components/layouts/Navbar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNavbar = pathname === '/login' || pathname === '/register';

  return (
    <>
      {!hideNavbar && <NavbarPage />}
      {children}
    </>
  );
}
