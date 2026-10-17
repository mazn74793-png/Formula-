import React, { useState, useEffect } from 'react';
import { JAPANESE_BRANDS, SERVICE_PACKAGES, BRANCHES } from '../data/mockData';
import { ServiceItem, BookingRecord } from '../types';
import { X, Calendar, Clock, Car, Wrench, MapPin, User, Check, ArrowRight, ArrowLeft, ShieldCheck, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BookingWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onBookingSuccess: (booking: BookingRecord) => void;
  initialBrand?: string;
  initialModel?: string;
  initialService?: ServiceItem | null;
}

export const BookingWizard: React.FC<BookingWizardProps> = ({
  isOpen,
  onClose,
  onBookingSuccess,
  initialBrand,
  initialModel,
  initialService,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [selectedBrand, setSelectedBrand] = useState<string>(initialBrand || 'تويوتا');
  const [selectedModel, setSelectedModel] = useState<string>(initialModel || 'لاند كروزر (Land Cruiser 300 / 200)');
  const [selectedYear, setSelectedYear] = useState<number>(2023);
  const [mileage, setMileage] = useState<string>('45000');
  const [plateNumber, setPlateNumber] = useState<string>('');

  const [selectedServices, setSelectedServices] = useState<ServiceItem[]>(
    initialService ? [initialService] : [SERVICE_PACKAGES[0]]
  );
  const [customNotes, setCustomNotes] = useState<string>('');

  const [selectedBranchId, setSelectedBranchId] = useState<string>(BRANCHES[0].id);
  const [needValet, setNeedValet] = useState<boolean>(false);
  const [valetAddress, setValetAddress] = useState<string>('');

  // Date & Time
  const todayStr = new Date().toISOString().split('T')[0];
  const [bookingDate, setBookingDate] = useState<string>(todayStr);
  const [bookingTime, setBookingTime] = useState<string>('10:00 ص');

  // Customer Contact
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    if (initialBrand) {
      setSelectedBrand(initialBrand);
      const bObj = JAPANESE_BRANDS.find((b) => b.nameAr === initialBrand || b.nameEn === initialBrand);
      if (bObj && bObj.models.length > 0) {
        setSelectedModel(initialModel || bObj.models[0].nameAr);
      }
    }
    if (initialService) {
      setSelectedServices([initialService]);
    }
  }, [initialBrand, initialModel, initialService]);

  if (!isOpen) return null;

  const currentBrandObj = JAPANESE_BRANDS.find((b) => b.nameAr === selectedBrand) || JAPANESE_BRANDS[0];

  const handleBrandChange = (brandName: string) => {
    setSelectedBrand(brandName);
    const brand = JAPANESE_BRANDS.find((b) => b.nameAr === brandName);
    if (brand && brand.models.length > 0) {
      setSelectedModel(brand.models[0].nameAr);
    }
  };

  const toggleService = (service: ServiceItem) => {
    if (selectedServices.some((s) => s.id === service.id)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s.id !== service.id));
      }
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const totalPrice = selectedServices.reduce((sum, s) => sum + s.basePrice, 0) + (needValet ? 50 : 0);

  const timeSlots = [
    { time: '08:00 ص', available: true, label: 'فترة باكرة - بدون انتظار' },
    { time: '09:30 ص', available: true, label: 'متاح (3 مسارات)' },
    { time: '11:00 ص', available: true, label: 'متاح (مساران)' },
    { time: '01:30 م', available: true, label: 'متاح (4 مسارات)' },
    { time: '03:30 م', available: true, label: 'متاح (3 مسارات)' },
    { time: '05:00 م', available: true, label: 'فترة مسائية' },
    { time: '07:00 م', available: true, label: 'متاح (مسار واحد)' },
    { time: '08:30 م', available: true, label: 'آخر موعد استقبال' },
  ];

  const handleNextStep = () => {
    setErrorMsg('');
    if (step === 1) {
      if (!selectedBrand || !selectedModel) {
        setErrorMsg('يرجى تحديد طراز السيارة للاستمرار');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (selectedServices.length === 0) {
        setErrorMsg('يرجى اختيار خدمة صيانة واحدة على الأقل');
        return;
      }
      setStep(3);
    } else if (step === 3) {
      if (!bookingDate || !bookingTime) {
        setErrorMsg('يرجى تحديد تاريخ ووقت الحجز');
        return;
      }
      if (needValet && !valetAddress.trim()) {
        setErrorMsg('يرجى كتابة عنوان استلام السيارة لخدمة الفاليه');
        return;
      }
      setStep(4);
    } else if (step === 4) {
      if (!customerName.trim() || !customerPhone.trim()) {
        setErrorMsg('يرجى كتابة الاسم ورقم الجوال لتأكيد الحجز');
        return;
      }

      // Generate realistic Reference Number
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const refCode = `KZ-${randomNum}`;

      const newBooking: BookingRecord = {
        id: `booking-${Date.now()}`,
        referenceNumber: refCode,
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        brand: selectedBrand,
        model: selectedModel,
        year: Number(selectedYear),
        mileage: Number(mileage) || 0,
        plateNumber: plateNumber.trim(),
        branchId: selectedBranchId,
        services: selectedServices,
        customNotes: customNotes.trim(),
        needValet,
        valetAddress: needValet ? valetAddress.trim() : undefined,
        bookingDate,
        bookingTime,
        totalCost: totalPrice,
        status: 'received',
        technicianName: 'المهندس هيروشي تاناكا & م. فيصل الشمري',
        technicianNotes: 'تم تأكيد موعد الصيانة وتجهيز مسار العمل وقطع الغيار المطلوبة.',
        bayNumber: Math.floor(1 + Math.random() * 12),
        createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
        estimatedCompletion: `${bookingDate} الساعة 12:30 م`,
      };

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#DC2626', '#171717', '#E5E5E5'],
        });
      } catch (e) {
        // graceful ignore
      }

      onBookingSuccess(newBooking);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-neutral-200 shadow-2xl overflow-hidden my-6">
        {/* Modal Top Bar */}
        <div className="bg-white px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-600" />
              <h3 className="text-lg font-bold text-neutral-900">حجز موعد صيانة يابانية معتمدة</h3>
            </div>
            <p className="text-xs text-neutral-500 mt-0.5">
              خطوة {step} من 4 · نظام الحجز الذكي المباشر
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress indicator */}
        <div className="grid grid-cols-4 border-b border-neutral-100 text-xs text-center font-medium">
          <div className={`py-2.5 border-b-2 transition-colors ${step >= 1 ? 'border-red-600 text-neutral-900 font-bold' : 'border-transparent text-neutral-400'}`}>
            1. المركبة
          </div>
          <div className={`py-2.5 border-b-2 transition-colors ${step >= 2 ? 'border-red-600 text-neutral-900 font-bold' : 'border-transparent text-neutral-400'}`}>
            2. الخدمات
          </div>
          <div className={`py-2.5 border-b-2 transition-colors ${step >= 3 ? 'border-red-600 text-neutral-900 font-bold' : 'border-transparent text-neutral-400'}`}>
            3. الموعد والفرع
          </div>
          <div className={`py-2.5 border-b-2 transition-colors ${step >= 4 ? 'border-red-600 text-neutral-900 font-bold' : 'border-transparent text-neutral-400'}`}>
            4. بيانات الاتصال
          </div>
        </div>

        {/* Body Content by Step */}
        <div className="p-6 max-h-[68vh] overflow-y-auto space-y-5">
          {errorMsg && (
            <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200">
              {errorMsg}
            </div>
          )}

          {/* STEP 1: VEHICLE DETAILS */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-neutral-800 mb-2">
                  اختر الصانع الياباني (Brand)
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {JAPANESE_BRANDS.map((brand) => (
                    <button
                      key={brand.id}
                      type="button"
                      onClick={() => handleBrandChange(brand.nameAr)}
                      className={`p-3 rounded-xl text-center border text-xs font-bold transition-all cursor-pointer ${
                        selectedBrand === brand.nameAr
                          ? 'bg-neutral-900 text-white border-neutral-900'
                          : 'bg-white border-neutral-200 text-neutral-700 hover:border-neutral-400'
                      }`}
                    >
                      <span>{brand.nameAr}</span>
                      <span className="block text-[10px] opacity-70 font-mono mt-0.5">{brand.logoText}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-800 mb-1.5">
                  طراز السيارة ({selectedBrand})
                </label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full text-xs p-3 rounded-lg border border-neutral-300 bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900"
                >
                  {currentBrandObj.models.map((m, i) => (
                    <option key={i} value={m.nameAr}>
                      {m.nameAr}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1.5">
                    سنة الصنع
                  </label>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(Number(e.target.value))}
                    className="w-full text-xs p-3 rounded-lg border border-neutral-300 bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900 tabular-nums"
                  >
                    {[2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2012, 2010].map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1.5">
                    الممشى التقريبي (كم)
                  </label>
                  <input
                    type="number"
                    value={mileage}
                    onChange={(e) => setMileage(e.target.value)}
                    placeholder="مثال: 45000"
                    className="w-full text-xs p-3 rounded-lg border border-neutral-300 bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900 tabular-nums"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1.5">
                    رقم اللوحة (اختياري)
                  </label>
                  <input
                    type="text"
                    value={plateNumber}
                    onChange={(e) => setPlateNumber(e.target.value)}
                    placeholder="مثال: أ ب ج 1234"
                    className="w-full text-xs p-3 rounded-lg border border-neutral-300 bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: SELECT SERVICES */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-neutral-800">
                  اختر باقات الصيانة المطلوبة (يمكن اختيار أكثر من خدمة)
                </label>
                <span className="text-xs text-neutral-500">
                  تم تحديد {selectedServices.length} خدمات
                </span>
              </div>

              <div className="space-y-2.5">
                {SERVICE_PACKAGES.map((srv) => {
                  const isChecked = selectedServices.some((s) => s.id === srv.id);
                  return (
                    <div
                      key={srv.id}
                      onClick={() => toggleService(srv)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                        isChecked
                          ? 'border-neutral-900 bg-neutral-50 ring-1 ring-neutral-900'
                          : 'border-neutral-200 hover:border-neutral-300 bg-white'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 border ${isChecked ? 'bg-red-600 border-red-600 text-white' : 'border-neutral-300 bg-white'}`}>
                          {isChecked && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-neutral-900">{srv.titleAr}</p>
                          <p className="text-[11px] text-neutral-500 line-clamp-1 mt-0.5">{srv.descriptionAr}</p>
                          <span className="text-[10px] text-neutral-400 font-mono">المدة: {srv.durationMinutes} دقيقة</span>
                        </div>
                      </div>
                      <div className="text-left shrink-0">
                        <span className="text-sm font-bold text-neutral-900 tabular-nums">
                          {srv.basePrice} <span className="text-[11px] font-normal text-neutral-500">ر.س</span>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-800 mb-1">
                  ملاحظات إضافية أو أصوات ومشاكل محددة في السيارة
                </label>
                <textarea
                  rows={2}
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  placeholder="مثال: صوت صفير خفيف عند الفرملة، أو ضعف في تبريد المكيف وقت الظهر..."
                  className="w-full text-xs p-3 rounded-lg border border-neutral-300 bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900"
                />
              </div>
            </div>
          )}

          {/* STEP 3: BRANCH & TIME */}
          {step === 3 && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-neutral-800 mb-2">
                  اختر فرع الصيانة المفضل
                </label>
                <div className="space-y-2">
                  {BRANCHES.map((b) => (
                    <label
                      key={b.id}
                      className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        selectedBranchId === b.id
                          ? 'border-neutral-900 bg-neutral-50 ring-1 ring-neutral-900'
                          : 'border-neutral-200 hover:border-neutral-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="branch"
                          checked={selectedBranchId === b.id}
                          onChange={() => setSelectedBranchId(b.id)}
                          className="accent-neutral-900"
                        />
                        <div>
                          <p className="text-xs font-bold text-neutral-900">{b.nameAr}</p>
                          <p className="text-[11px] text-neutral-500">{b.address}</p>
                        </div>
                      </div>
                      <span className="text-[11px] text-emerald-700 font-medium">
                        {b.baysCount - b.activeBays} مسارات شاغرة
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Valet service toggle */}
              <div className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/50 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <strong className="text-xs font-bold text-neutral-900 block">
                      خدمة الاستلام والتوصيل من الباب (فاليه كايزن)
                    </strong>
                    <span className="text-[11px] text-neutral-500">
                      يقوم سائقنا الفني بنقل سيارتك برافعة هيدروليكية أو قيادتها بأمان وإعادتها مغسولة (+50 ر.س)
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={needValet}
                    onChange={(e) => setNeedValet(e.target.checked)}
                    className="w-4 h-4 accent-red-600 rounded cursor-pointer"
                  />
                </div>

                {needValet && (
                  <input
                    type="text"
                    value={valetAddress}
                    onChange={(e) => setValetAddress(e.target.value)}
                    placeholder="اكتب الحي والشارع وموقع الاستلام بدقة..."
                    className="w-full text-xs p-2.5 rounded-lg border border-neutral-300 bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  />
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1.5">
                    تاريخ الموعد
                  </label>
                  <input
                    type="date"
                    value={bookingDate}
                    min={todayStr}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full text-xs p-3 rounded-lg border border-neutral-300 bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900 tabular-nums"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1.5">
                    الوقت المفضل
                  </label>
                  <select
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    className="w-full text-xs p-3 rounded-lg border border-neutral-300 bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  >
                    {timeSlots.map((slot, i) => (
                      <option key={i} value={slot.time}>
                        {slot.time} - {slot.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: CONTACT & SUMMARY */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1.5">
                    الاسم الكامل للعميل
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="مثال: سلمان بن فهد"
                    className="w-full text-xs p-3 rounded-lg border border-neutral-300 bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1.5">
                    رقم الجوال (لإرسال إشعار الواتساب ورمز التتبع)
                  </label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="مثال: 0551234567"
                    className="w-full text-xs p-3 rounded-lg border border-neutral-300 bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900 tabular-nums"
                  />
                </div>
              </div>

              {/* Booking Summary Box */}
              <div className="p-4 rounded-xl border border-neutral-200 bg-neutral-50 space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                  <span className="font-bold text-neutral-900">ملخص حجز الصيانة</span>
                  <span className="text-neutral-500 font-mono">KAIZEN AUTO CARE</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-neutral-700">
                  <div>
                    <span className="text-neutral-400 block text-[11px]">السيارة:</span>
                    <strong>{selectedBrand} - {selectedModel} ({selectedYear})</strong>
                  </div>
                  <div>
                    <span className="text-neutral-400 block text-[11px]">الموعد:</span>
                    <strong className="tabular-nums">{bookingDate} - {bookingTime}</strong>
                  </div>
                  <div>
                    <span className="text-neutral-400 block text-[11px]">الفرع:</span>
                    <span>{BRANCHES.find((b) => b.id === selectedBranchId)?.nameAr}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block text-[11px]">الخدمات:</span>
                    <span>{selectedServices.length} خدمات محددة</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-neutral-200 flex items-center justify-between">
                  <span className="font-bold text-neutral-900">المبلغ التقديري المطلوب:</span>
                  <span className="text-lg font-extrabold text-neutral-900 tabular-nums">
                    {totalPrice} <span className="text-xs font-normal text-neutral-500">ر.س شامل الضريبة</span>
                  </span>
                </div>
              </div>

              <div className="p-3 bg-neutral-100 rounded-lg text-[11px] text-neutral-600 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>الدفع يتم عند استلام السيارة بعد اكتمال الصيانة واختبار الفحص الميداني، ولا يتطلب الحجز أي بطاقة ائتمان مسبقة.</span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Action Controls */}
        <div className="bg-neutral-50 px-6 py-4 border-t border-neutral-200 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep((s) => (s - 1) as any)}
              className="px-4 py-2 text-xs font-semibold text-neutral-700 bg-white border border-neutral-300 hover:bg-neutral-100 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
              <span>السابق</span>
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-neutral-900 hidden sm:inline">
              المجموع: {totalPrice} ر.س
            </span>

            <button
              type="button"
              onClick={handleNextStep}
              className="px-6 py-2.5 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm transition-all flex items-center gap-2 active:scale-[0.98] cursor-pointer"
            >
              <span>{step === 4 ? 'تأكيد الحجز النهائي واستلام التذكرة' : 'متابعة'}</span>
              <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
