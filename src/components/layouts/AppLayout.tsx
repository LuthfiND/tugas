'use client';

import { usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { isAuthenticatedUser, loadUserFromLocalStorage } from '@/store/slices/AuthSlice'; 
import NavbarPage from '@/components/layouts/Navbar';
import { useRouter } from 'next/navigation';
import { AppDispatch, RootState } from '@/lib/store';
import { useAppSelector } from '@/store/hooks';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const authState = useAppSelector(state => state.auth);
  const authenticated = authState?.isAuthenticated || false;


  useEffect(() => {
dispatch(isAuthenticatedUser()) 
dispatch(loadUserFromLocalStorage()); 

  }, [dispatch]);
  const hideNavbar = pathname === '/login' || pathname === '/register';


  return (
    <>
      {!hideNavbar && <NavbarPage />}
      {children}
    </>
  );
}