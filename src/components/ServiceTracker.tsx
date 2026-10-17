import React, { useState } from 'react';
import { BookingRecord, BookingStatus } from '../types';
import { Search, CheckCircle2, Clock, Wrench, Shield, Car, AlertCircle, Phone, ArrowLeft } from 'lucide-react';
import { BRANCHES } from '../data/mockData';

interface ServiceTrackerProps {
  bookings: BookingRecord[];
  initialSearchCode?: string;
  onOpenBooking: () => void;
}

export const ServiceTracker: React.FC<ServiceTrackerProps> = ({
  bookings,
  initialSearchCode = '',
  onOpenBooking,
}) => {
  const [searchCode, setSearchCode] = useState<string>(initialSearchCode);
  const [searchedRecord, setSearchedRecord] = useState<BookingRecord | null>(
    bookings.find((b) => b.referenceNumber.toLowerCase() === initialSearchCode.toLowerCase()) || bookings[0]
  );
  const [errorNotFound, setErrorNotFound] = useState(false);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorNotFound(false);
    const cleaned = searchCode.trim().toUpperCase();
    const found = bookings.find((b) => b.referenceNumber.toUpperCase() === cleaned);
    if (found) {
      setSearchedRecord(found);
    } else {
      setErrorNotFound(true);
      setSearchedRecord(null);
    }
  };

  const handleSelectSample = (code: string) => {
    setSearchCode(code);
    setErrorNotFound(false);
    const found = bookings.find((b) => b.referenceNumber.toUpperCase() === code.toUpperCase());
    if (found) setSearchedRecord(found);
  };

  const stages: { key: BookingStatus; labelAr: string; desc: string }[] = [
    { key: 'received', labelAr: 'استلام وفحص الدخول', desc: 'استلام السيارة في المسار وفحص الممشى وحالة الهيكل' },
    { key: 'inspecting', labelAr: 'التشخيص الإلكتروني', desc: 'مسح كمبيوتر الأعطال وفحص الحساسات وضغط السوائل' },
    { key: 'repairing', labelAr: 'الصيانة والقطع الأصلية', desc: 'استبدال قطع OEM الأصلية وإنجاز باقات العمل' },
    { key: 'road_testing', labelAr: 'اختبار الطريق والنوعية', desc: 'اختبار القيادة ومطابقة معايير عزم الدوران والسلامة' },
    { key: 'ready_for_pickup', labelAr: 'جاهزة للاستلام', desc: 'اكتمال الغسيل والتلميع والسيارة بانتظار العميل' },
  ];

  const getStageIndex = (status: BookingStatus) => {
    switch (status) {
      case 'received':
        return 0;
      case 'inspecting':
        return 1;
      case 'repairing':
        return 2;
      case 'road_testing':
        return 3;
      case 'ready_for_pickup':
      case 'delivered':
        return 4;
      default:
        return 0;
    }
  };

  const currentStageIdx = searchedRecord ? getStageIndex(searchedRecord.status) : 0;
  const branch = searchedRecord ? BRANCHES.find((b) => b.id === searchedRecord.branchId) || BRANCHES[0] : null;

  return (
    <section id="tracker" className="py-20 bg-neutral-50/70 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
            <span>نظام المتابعة الحية للمركبة</span>
            <span aria-hidden="true">·</span>
            <span>LIVE WORKSHOP STAGE TRACKER</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
            تتبع مراحل صيانة سيارتك في الورشة لحظة بلحظة
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 mt-2">
            أدخل رقم الحجز المرجعي الخاص بك (الموجود على تذكرة الحجز أو المرسل عبر الواتساب) لمشاهدة التحديثات الفنية المباشرة من المهندس المشرف.
          </p>
        </div>

        {/* Search Input Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-neutral-200 shadow-sm max-w-3xl mb-8">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-neutral-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                placeholder="أدخل رقم الحجز (مثال: KZ-8492)"
                className="w-full pl-4 pr-11 py-3 text-sm font-mono uppercase bg-neutral-50 border border-neutral-300 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 text-sm font-bold text-white bg-neutral-900 hover:bg-neutral-800 rounded-xl transition-colors cursor-pointer"
            >
              بحث واستعلام
            </button>
          </form>

          {/* Quick sample chips */}
          <div className="mt-4 pt-4 border-t border-neutral-100 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-neutral-500 font-medium">جرّب أرقام حجز تجريبية نشطة:</span>
            {bookings.slice(0, 3).map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => handleSelectSample(b.referenceNumber)}
                className={`px-2.5 py-1 rounded font-mono text-xs border transition-colors cursor-pointer ${
                  searchedRecord?.referenceNumber === b.referenceNumber
                    ? 'bg-neutral-900 text-white border-neutral-900'
                    : 'bg-neutral-100 border-neutral-200 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {b.referenceNumber} ({b.brand})
              </button>
            ))}
          </div>
        </div>

        {/* If Not Found */}
        {errorNotFound && (
          <div className="p-6 bg-white rounded-2xl border border-red-200 text-center max-w-xl mx-auto space-y-3">
            <AlertCircle className="w-8 h-8 text-red-600 mx-auto" />
            <h3 className="text-base font-bold text-neutral-900">لم يتم العثور على حجز برقم ({searchCode})</h3>
            <p className="text-xs text-neutral-500">
              يرجى التحقق من صحة الرقم أو حجز موعد صيانة جديد الآن.
            </p>
            <button
              onClick={onOpenBooking}
              className="mt-2 px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors cursor-pointer"
            >
              احجز موعد صيانة جديد
            </button>
          </div>
        )}

        {/* Active Record Display Card */}
        {searchedRecord && (
          <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm">
            {/* Header info */}
            <div className="p-6 sm:p-8 bg-neutral-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-red-400 mb-1">
                  <span>LIVE REPAIR STATUS</span>
                  <span>/</span>
                  <span className="tabular-nums">المسار رقم {searchedRecord.bayNumber}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold">
                  {searchedRecord.brand} - {searchedRecord.model} ({searchedRecord.year})
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  العميل: {searchedRecord.customerName} · اللوحة: {searchedRecord.plateNumber || 'غير مسجلة'}
                </p>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right sm:text-left">
                  <span className="text-[11px] text-neutral-400 block">رقم الحجز</span>
                  <span className="text-2xl font-mono font-bold text-red-400 tabular-nums">
                    {searchedRecord.referenceNumber}
                  </span>
                </div>
                <div className="text-right sm:text-left">
                  <span className="text-[11px] text-neutral-400 block">الوقت المتوقع للانتهاء</span>
                  <span className="text-sm font-semibold text-emerald-400 tabular-nums block mt-1">
                    {searchedRecord.estimatedCompletion}
                  </span>
                </div>
              </div>
            </div>

            {/* Stages Visual Progression */}
            <div className="p-6 sm:p-8 border-b border-neutral-100">
              <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-6">
                مراحل الصيانة والاختبار الفني
              </h4>

              {/* Progress Stepper */}
              <div className="relative">
                {/* Connecting Line */}
                <div className="hidden lg:block absolute top-5 right-8 left-8 h-1 bg-neutral-100" />
                <div
                  className="hidden lg:block absolute top-5 right-8 h-1 bg-red-600 transition-all duration-500"
                  style={{ width: `${(currentStageIdx / (stages.length - 1)) * 100}%` }}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                  {stages.map((stage, idx) => {
                    const isCompleted = idx < currentStageIdx;
                    const isCurrent = idx === currentStageIdx;
                    return (
                      <div key={stage.key} className="relative z-10 flex flex-col items-start lg:items-center text-right lg:text-center space-y-2">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs border-2 transition-all ${
                            isCompleted
                              ? 'bg-neutral-900 border-neutral-900 text-white'
                              : isCurrent
                              ? 'bg-red-600 border-red-600 text-white shadow-md'
                              : 'bg-white border-neutral-200 text-neutral-400'
                          }`}
                        >
                          {isCompleted ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : idx + 1}
                        </div>

                        <div>
                          <p
                            className={`text-xs font-bold ${
                              isCurrent ? 'text-red-600' : isCompleted ? 'text-neutral-900' : 'text-neutral-400'
                            }`}
                          >
                            {stage.labelAr}
                          </p>
                          <p className="text-[11px] text-neutral-500 mt-0.5 leading-relaxed">
                            {stage.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Live Technician Inspection Log */}
            <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Notes */}
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-neutral-700" />
                  <h4 className="text-sm font-bold text-neutral-900">
                    تقرير المهندس المشرف على الصيانة
                  </h4>
                </div>

                <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 text-xs leading-relaxed space-y-2">
                  <div className="flex items-center justify-between text-neutral-500 border-b border-neutral-200 pb-2">
                    <span>المشرف الفني: <strong className="text-neutral-800">{searchedRecord.technicianName}</strong></span>
                    <span className="font-mono text-[10px]">آخر تحديث: {searchedRecord.createdAt}</span>
                  </div>
                  <p className="text-neutral-700 pt-1">
                    {searchedRecord.technicianNotes || 'السيارة تخضع للمعاينة الفنية وضبط الأجزاء حسب المعايير اليابانية المعتمدة.'}
                  </p>
                </div>

                {/* Services performed */}
                <div>
                  <span className="text-xs font-bold text-neutral-800 block mb-2">
                    الخدمات المجدولة في هذا الحجز:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {searchedRecord.services.map((s) => (
                      <span
                        key={s.id}
                        className="text-xs bg-white border border-neutral-200 px-3 py-1.5 rounded-lg text-neutral-700 font-medium"
                      >
                        {s.titleAr}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Branch & Contact Info */}
              <div className="lg:col-span-4 bg-neutral-50 p-5 rounded-xl border border-neutral-200 space-y-4 text-xs">
                <div>
                  <span className="text-neutral-500 block">الفرع المنفذ</span>
                  <strong className="text-neutral-900 text-sm block mt-0.5">{branch?.nameAr}</strong>
                  <p className="text-[11px] text-neutral-500 mt-0.5">{branch?.address}</p>
                </div>

                <div className="pt-2 border-t border-neutral-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500">الموعد المسجل:</span>
                    <strong className="tabular-nums text-neutral-900">{searchedRecord.bookingDate} ({searchedRecord.bookingTime})</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500">إجمالي التكلفة:</span>
                    <strong className="tabular-nums text-neutral-900">{searchedRecord.totalCost} ر.س</strong>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={`https://wa.me/${branch?.whatsapp}?text=${encodeURIComponent(`مرحباً، أستفسر عن حالة سيارتي برقم الحجز: ${searchedRecord.referenceNumber}`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 px-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>تواصل مع مستشار الصيانة بالفرع</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
