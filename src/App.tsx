import React, { useState, useEffect } from 'react';
import { SAMPLE_BOOKINGS, SERVICE_PACKAGES } from './data/mockData';
import { BookingRecord, ServiceItem } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BrandSelector } from './components/BrandSelector';
import { ServicesShowcase } from './components/ServicesShowcase';
import { CostCalculator } from './components/CostCalculator';
import { ServiceTracker } from './components/ServiceTracker';
import { BranchesSection } from './components/BranchesSection';
import { CustomerReviews } from './components/CustomerReviews';
import { Footer } from './components/Footer';
import { BookingWizard } from './components/BookingWizard';
import { BookingTicketModal } from './components/BookingTicketModal';
import { MessageSquare, Calendar, Phone } from 'lucide-react';

export default function App() {
  const [bookings, setBookings] = useState<BookingRecord[]>(() => {
    try {
      const saved = localStorage.getItem('kz_bookings');
      if (saved) {
        const parsed = JSON.parse(saved);
        return [...parsed, ...SAMPLE_BOOKINGS];
      }
    } catch (e) {
      // ignore
    }
    return SAMPLE_BOOKINGS;
  });

  // Modal States
  const [bookingWizardOpen, setBookingWizardOpen] = useState(false);
  const [wizardBrand, setWizardBrand] = useState<string | undefined>(undefined);
  const [wizardModel, setWizardModel] = useState<string | undefined>(undefined);
  const [wizardService, setWizardService] = useState<ServiceItem | null>(null);

  // Active confirmed ticket to display
  const [activeTicket, setActiveTicket] = useState<BookingRecord | null>(null);

  // Tracker target code
  const [trackerCode, setTrackerCode] = useState<string>('KZ-8492');

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenBooking = (brand?: string, model?: string, service?: ServiceItem | null) => {
    setWizardBrand(brand);
    setWizardModel(model);
    setWizardService(service || null);
    setBookingWizardOpen(true);
  };

  const handleBookingSuccess = (newBooking: BookingRecord) => {
    const updated = [newBooking, ...bookings];
    setBookings(updated);
    try {
      const stored = JSON.parse(localStorage.getItem('kz_bookings') || '[]');
      localStorage.setItem('kz_bookings', JSON.stringify([newBooking, ...stored]));
    } catch (e) {
      // ignore
    }
    setBookingWizardOpen(false);
    setActiveTicket(newBooking);
  };

  const handleOpenTrackerWithCode = (code: string) => {
    setTrackerCode(code);
    scrollToSection('tracker');
  };

  const handleSelectBrandAndModel = (brand: string, model: string) => {
    handleOpenBooking(brand, model, null);
  };

  const handleBookService = (service: ServiceItem) => {
    handleOpenBooking(undefined, undefined, service);
  };

  const handleBookAtBranch = (branchId: string) => {
    handleOpenBooking();
  };

  const handleProceedFromCalculator = (brand: string, model: string, services: ServiceItem[]) => {
    handleOpenBooking(brand, model, services[0] || null);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 selection:bg-red-600 selection:text-white flex flex-col font-sans">
      {/* Top Navigation */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenTracker={() => scrollToSection('tracker')}
        onOpenCalculator={() => scrollToSection('calculator')}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onOpenTracker={() => scrollToSection('tracker')}
          onOpenCalculator={() => scrollToSection('calculator')}
        />

        {/* Japanese Brand & Model Navigator */}
        <BrandSelector onSelectBrandAndModel={handleSelectBrandAndModel} />

        {/* Precision Services Bento Grid & Catalog */}
        <ServicesShowcase onBookService={handleBookService} />

        {/* Instant Maintenance Cost Calculator */}
        <CostCalculator onProceedToBooking={handleProceedFromCalculator} />

        {/* Live Workshop Car Tracker */}
        <ServiceTracker
          bookings={bookings}
          initialSearchCode={trackerCode}
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* Service Branches & Live Bay Capacity */}
        <BranchesSection onBookAtBranch={handleBookAtBranch} />

        {/* Verified Customer Reviews */}
        <CustomerReviews />
      </main>

      {/* Footer */}
      <Footer />

      {/* Booking Wizard Modal */}
      <BookingWizard
        isOpen={bookingWizardOpen}
        onClose={() => setBookingWizardOpen(false)}
        onBookingSuccess={handleBookingSuccess}
        initialBrand={wizardBrand}
        initialModel={wizardModel}
        initialService={wizardService}
      />

      {/* Confirmed Ticket Voucher Modal */}
      {activeTicket && (
        <BookingTicketModal
          booking={activeTicket}
          onClose={() => setActiveTicket(null)}
          onOpenTrackerWithCode={handleOpenTrackerWithCode}
        />
      )}

      {/* Floating Fast Action Strip on Mobile/Desktop bottom right */}
      <div className="fixed bottom-5 left-5 z-30 flex items-center gap-2">
        <a
          href="https://wa.me/966551234567?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AD%D8%AC%D8%B2%20%D8%B5%D9%8A%D8%A7%D9%86%D8%A9%20%D9%84%D8%B3%D9%8A%D8%A7%D8%B1%D8%AA%D9%8A%20%D8%A7%D9%84%D9%8A%D8%A7%D8%A8%D8%A7%D9%86%D9%8A%D8%A9"
          target="_blank"
          rel="noreferrer"
          className="w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg flex items-center justify-center transition-all hover:scale-105"
          title="محادثة واتساب سريعة"
        >
          <MessageSquare className="w-5 h-5" />
        </a>

        <button
          onClick={() => handleOpenBooking()}
          className="hidden sm:flex items-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-full shadow-lg transition-all hover:scale-105 cursor-pointer active:scale-95"
        >
          <Calendar className="w-4 h-4" />
          <span>حجز موعد صيانة سريع</span>
        </button>
      </div>
    </div>
  );
}
