import React, { useState } from 'react';
import { Calendar, Phone, Menu, X, Car } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenTracker: () => void;
  onOpenCalculator: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenTracker,
  onOpenCalculator,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Single text element wordmark */}
          <a href="#" className="flex items-center gap-3 text-slate-900 whitespace-nowrap shrink-0 group">
            <div className="w-10 h-10 rounded-lg bg-neutral-900 text-white flex items-center justify-center font-bold tracking-wider text-sm shadow-sm group-hover:bg-red-600 transition-colors">
              <span className="text-red-500 group-hover:text-white mr-0.5">K</span>Z
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-extrabold tracking-tight text-neutral-900 leading-none">
                كايزن موتورز
              </span>
              <span className="text-[11px] font-medium text-neutral-500 uppercase tracking-widest mt-1">
                KAIZEN JAPANESE MOTORS
              </span>
            </div>
          </a>

          {/* Zone 2: 4-5 concise single-line text links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-700">
            <a
              href="#services"
              className="hover:text-red-600 transition-colors whitespace-nowrap shrink-0"
            >
              خدمات الصيانة
            </a>
            <button
              onClick={onOpenCalculator}
              className="hover:text-red-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              حاسبة التكلفة
            </button>
            <button
              onClick={onOpenTracker}
              className="hover:text-red-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              تتبع سيارتك
            </button>
            <a
              href="#brands"
              className="hover:text-red-600 transition-colors whitespace-nowrap shrink-0"
            >
              السيارات المدعومة
            </a>
            <a
              href="#branches"
              className="hover:text-red-600 transition-colors whitespace-nowrap shrink-0"
            >
              الفروع والمراكز
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="hidden sm:flex items-center gap-4 shrink-0">
            <a
              href="tel:920000000"
              className="text-xs font-semibold text-neutral-600 hover:text-neutral-900 flex items-center gap-1.5 whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-neutral-400" />
              <span className="tabular-nums">9200 3482</span>
            </a>
            <button
              onClick={onOpenBooking}
              className="px-5 py-2.5 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors whitespace-nowrap shadow-sm cursor-pointer flex items-center gap-2 active:scale-[0.98]"
            >
              <Calendar className="w-4 h-4" />
              <span>احجز موعد صيانة</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenBooking}
              className="px-3 py-1.5 text-xs font-bold text-white bg-red-600 rounded-lg whitespace-nowrap"
            >
              حجز موعد
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-600 hover:text-neutral-900 focus:outline-none"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-white px-4 py-4 space-y-3">
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-neutral-800 hover:text-red-600"
          >
            خدمات الصيانة
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenCalculator();
            }}
            className="block w-full text-right py-2 text-sm font-medium text-neutral-800 hover:text-red-600"
          >
            حاسبة التكلفة الفورية
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenTracker();
            }}
            className="block w-full text-right py-2 text-sm font-medium text-neutral-800 hover:text-red-600"
          >
            تتبع حالة السيارة المباشر
          </button>
          <a
            href="#brands"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-neutral-800 hover:text-red-600"
          >
            السيارات اليابانية المدعومة
          </a>
          <a
            href="#branches"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-neutral-800 hover:text-red-600"
          >
            الفروع وأوقات العمل
          </a>
          <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
            <span className="text-xs text-neutral-500">الرقم الموحد المباشر:</span>
            <a href="tel:920000000" className="text-xs font-bold text-neutral-800 tabular-nums">
              9200 3482
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
