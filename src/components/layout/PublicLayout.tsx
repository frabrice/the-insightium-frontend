import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../shared/Footer';
import AuthModal from '../auth/AuthModal';
import { useReaderAuth } from '../../contexts/ReaderAuthContext';

export default function PublicLayout() {
  const { showAuthModal, setShowAuthModal } = useReaderAuth();

  return (
    <div className="min-h-screen bg-brand-cream dark:bg-brand-black transition-colors duration-300">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </div>
  );
}
