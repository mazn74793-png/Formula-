import React from 'react';
import { BookingRecord } from '../types';
import { X, Printer, Share2, Calendar, MapPin, CheckCircle, Car, Shield, Phone } from 'lucide-react';
import { BRANCHES } from '../data/mockData';

interface BookingTicketModalProps {
  booking: BookingRecord;
  onClose: () => void;
  onOpenTrackerWithCode: (code: string) => void;
}

export const BookingTicketModal: React.FC<BookingTicketModalProps> = ({
  booking,
  onClose,
  onOpenTrackerWithCode,
}) => {
  const branch = BRANCHES.find((b) => b.id === booking.branchId) || BRANCHES[0];

  const handlePrint = () => {
    window.print();
  };

  const handleShareWhatsApp = () => {
    const text = `تأكيد حجز موعد صيانة في مركز كايزن للسيارات اليابانية:\nرقم الحجز: ${booking.referenceNumber}\nالسيارة: ${booking.brand} ${booking.model} (${booking.year})\nالتاريخ: ${booking.bookingDate} - الوقت: ${booking.bookingTime}\nالفرع: ${branch.nameAr}\nالتكلفة التقديرية: ${booking.totalCost} ر.س`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full border border-neutral-200 shadow-2xl overflow-hidden my-8 animate-in fade-in duration-200">
        {/* Ticket Header */}
        <div className="bg-neutral-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 left-4 p-1.5 rounded-lg bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors cursor-pointer"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold text-sm">
              KZ
            </div>
            <div>
              <span className="text-[11px] font-mono tracking-widest text-red-400 uppercase">
                CONFIRMED RESERVATION VOUCHER
              </span>
              <h3 className="text-xl font-bold">بطاقة تأكيد حجز الصيانة الرسمية</h3>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-neutral-800 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-neutral-400 block">رقم الحجز المرجعي</span>
              <span className="text-2xl font-mono font-bold tracking-wider text-red-400 tabular-nums">
                {booking.referenceNumber}
              </span>
            </div>
            <div className="text-left">
              <span className="text-[11px] text-neutral-400 block">حالة الحجز</span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded">
                <CheckCircle className="w-3.5 h-3.5" />
                مؤكد ومعتمد
              </span>
            </div>
          </div>
        </div>

        {/* Ticket Content */}
        <div className="p-6 space-y-6">
          {/* Customer & Car Info Strip */}
          <div className="grid grid-cols-2 gap-4 bg-neutral-50 p-4 rounded-xl border border-neutral-100 text-xs">
            <div>
              <span className="text-neutral-500 block">اسم العميل</span>
              <strong className="text-sm text-neutral-900 block mt-0.5">{booking.customerName}</strong>
              <span className="text-neutral-600 tabular-nums">{booking.customerPhone}</span>
            </div>
            <div>
              <span className="text-neutral-500 block">بيانات المركبة</span>
              <strong className="text-sm text-neutral-900 block mt-0.5">
                {booking.brand} - {booking.model}
              </strong>
              <span className="text-neutral-600">موديل {booking.year} · اللوحة: {booking.plateNumber || 'غير محدد'}</span>
            </div>
          </div>

          {/* Appointment Schedule & Branch */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="flex items-start gap-3 p-3 rounded-lg border border-neutral-200">
              <Calendar className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-neutral-900 block">الموعد والتوقيت</span>
                <p className="text-neutral-600 mt-0.5 tabular-nums">
                  {booking.bookingDate} الساعة {booking.bookingTime}
                </p>
                <span className="text-[11px] text-neutral-500">يرجى الحضور قبل الموعد بـ 10 دقائق</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg border border-neutral-200">
              <MapPin className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-neutral-900 block">الفرع المخصص</span>
                <p className="text-neutral-600 mt-0.5">{branch.nameAr}</p>
                <span className="text-[11px] text-neutral-500">{branch.address}</span>
              </div>
            </div>
          </div>

          {/* Valet service note */}
          {booking.needValet && (
            <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3 text-xs text-amber-900 flex items-center justify-between">
              <div>
                <strong>خدمة الفاليه للاستلام من الباب مفعلة:</strong>
                <p className="text-[11px] text-amber-800 mt-0.5">{booking.valetAddress}</p>
              </div>
              <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-1 rounded">
                سيتصل بك مندوب الاستلام
              </span>
            </div>
          )}

          {/* Booked Services List */}
          <div>
            <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2">
              الخدمات المجدولة ({booking.services.length})
            </h4>
            <div className="divide-y divide-neutral-100 border border-neutral-200 rounded-xl overflow-hidden">
              {booking.services.map((srv) => (
                <div key={srv.id} className="p-3 bg-white flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-neutral-900 block">{srv.titleAr}</span>
                    <span className="text-neutral-500 text-[11px]">المدة المقدرة: {srv.durationMinutes} دقيقة</span>
                  </div>
                  <span className="font-bold text-neutral-900 tabular-nums">{srv.basePrice} ر.س</span>
                </div>
              ))}
            </div>
          </div>

          {/* Total & Guarantees */}
          <div className="bg-neutral-50 p-4 rounded-xl flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-xs text-neutral-500">إجمالي التكلفة التقديرية</span>
              <p className="text-xs text-neutral-400">شاملة قطع الغيار الأصلية وأجور اليد والضريبة</p>
            </div>
            <div className="text-left">
              <span className="text-2xl font-extrabold text-neutral-900 tabular-nums">
                {booking.totalCost} <span className="text-sm font-normal text-neutral-500">ر.س</span>
              </span>
            </div>
          </div>

          {/* Simulated Barcode / Tech Strip */}
          <div className="pt-2 flex items-center justify-between border-t border-neutral-200 text-neutral-400 text-[10px] font-mono">
            <div className="space-y-0.5">
              <p>BARCODE HASH: {booking.referenceNumber}-JAP-2026</p>
              <p>BAY ALLOCATION: المسار رقم {booking.bayNumber} (منصة الرفع الهيدروليكية)</p>
            </div>
            <div className="h-6 flex items-center gap-0.5">
              {[4, 2, 6, 1, 3, 5, 2, 7, 3, 2, 5, 1, 4, 3, 6, 2, 5].map((h, i) => (
                <div key={i} className="bg-neutral-800 w-0.5" style={{ height: `${h * 3}px` }} />
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-neutral-50 px-6 py-4 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 text-xs font-semibold text-neutral-700 bg-white border border-neutral-300 hover:bg-neutral-100 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>طباعة التذكرة</span>
            </button>
            <button
              onClick={handleShareWhatsApp}
              className="px-3.5 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>مشاركة عبر واتساب</span>
            </button>
          </div>

          <button
            onClick={() => {
              onClose();
              onOpenTrackerWithCode(booking.referenceNumber);
            }}
            className="px-4 py-2 text-xs font-bold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
          >
            تتبع مسار السيارة المباشر
          </button>
        </div>
      </div>
    </div>
  );
};
