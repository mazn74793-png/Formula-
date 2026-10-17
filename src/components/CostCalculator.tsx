import React, { useState } from 'react';
import { JAPANESE_BRANDS, SERVICE_PACKAGES } from '../data/mockData';
import { ServiceItem } from '../types';
import { Calculator, Check, ArrowLeft, Clock, ShieldCheck, Sparkles } from 'lucide-react';

interface CostCalculatorProps {
  onProceedToBooking: (brand: string, model: string, services: ServiceItem[]) => void;
}

export const CostCalculator: React.FC<CostCalculatorProps> = ({ onProceedToBooking }) => {
  const [selectedBrand, setSelectedBrand] = useState<string>('تويوتا');
  const currentBrandObj = JAPANESE_BRANDS.find((b) => b.nameAr === selectedBrand) || JAPANESE_BRANDS[0];
  const [selectedModel, setSelectedModel] = useState<string>(currentBrandObj.models[0].nameAr);
  const [mileageRange, setMileageRange] = useState<string>('50000');

  const [selectedServices, setSelectedServices] = useState<ServiceItem[]>([
    SERVICE_PACKAGES[0],
    SERVICE_PACKAGES[1],
  ]);

  const handleBrandChange = (brandName: string) => {
    setSelectedBrand(brandName);
    const b = JAPANESE_BRANDS.find((item) => item.nameAr === brandName);
    if (b && b.models.length > 0) {
      setSelectedModel(b.models[0].nameAr);
    }
  };

  const toggleService = (srv: ServiceItem) => {
    if (selectedServices.some((s) => s.id === srv.id)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s.id !== srv.id));
      }
    } else {
      setSelectedServices([...selectedServices, srv]);
    }
  };

  // Math breakdown
  const subtotal = selectedServices.reduce((acc, curr) => acc + curr.basePrice, 0);
  const partsEstimate = Math.round(subtotal * 0.65);
  const laborEstimate = Math.round(subtotal * 0.35);
  const totalMinutes = selectedServices.reduce((acc, curr) => acc + curr.durationMinutes, 0);

  return (
    <section id="calculator" className="py-20 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
            <span>تسعير شفاف وبدون مفاجآت</span>
            <span aria-hidden="true">·</span>
            <span>INSTANT MAINTENANCE ESTIMATOR</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
            حاسبة تكلفة الصيانة الفورية المعتمدة
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 mt-2">
            احصل على تقدير دقيق لتكلفة قطع الغيار الأصلية وأجور اليد الفنية والمدة المقدرة لإنجاز سيارتك قبل الحضور للورشة.
          </p>
        </div>

        {/* 2-Column Split Estimator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column (Span 7) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Brand & Model pickers */}
            <div className="bg-neutral-50 p-6 rounded-2xl border border-neutral-200 space-y-4">
              <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                <Calculator className="w-4 h-4 text-neutral-700" />
                <span>1. تحديد مواصفات المركبة</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                    الشركة الصانعة
                  </label>
                  <select
                    value={selectedBrand}
                    onChange={(e) => handleBrandChange(e.target.value)}
                    className="w-full text-xs p-3 rounded-lg border border-neutral-300 bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  >
                    {JAPANESE_BRANDS.map((b) => (
                      <option key={b.id} value={b.nameAr}>
                        {b.nameAr} ({b.nameEn})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                    الطراز
                  </label>
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="w-full text-xs p-3 rounded-lg border border-neutral-300 bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  >
                    {currentBrandObj.models.map((m, idx) => (
                      <option key={idx} value={m.nameAr}>
                        {m.nameAr}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  العداد الحالي (الممشى التقريبي)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['10,000 كم', '30,000 كم', '50,000 كم', '100,000+ كم'].map((range) => (
                    <button
                      key={range}
                      type="button"
                      onClick={() => setMileageRange(range)}
                      className={`py-2 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                        mileageRange === range
                          ? 'bg-neutral-900 text-white border-neutral-900'
                          : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Service Packages checklist */}
            <div className="bg-neutral-50 p-6 rounded-2xl border border-neutral-200 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-neutral-900">
                  2. حدد بنود الصيانة المطلوبة
                </h3>
                <span className="text-xs text-neutral-500">
                  {selectedServices.length} خدمات محددة
                </span>
              </div>

              <div className="space-y-2">
                {SERVICE_PACKAGES.map((srv) => {
                  const isChecked = selectedServices.some((s) => s.id === srv.id);
                  return (
                    <div
                      key={srv.id}
                      onClick={() => toggleService(srv)}
                      className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-white border-neutral-900 shadow-sm ring-1 ring-neutral-900'
                          : 'bg-white/70 border-neutral-200 hover:border-neutral-300 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border ${
                            isChecked ? 'bg-red-600 border-red-600 text-white' : 'border-neutral-300'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3" />}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-neutral-900">{srv.titleAr}</p>
                          <span className="text-[11px] text-neutral-500 font-mono">
                            المدة: {srv.durationMinutes} دقيقة · ياباني أصلي OEM
                          </span>
                        </div>
                      </div>

                      <span className="text-xs font-bold text-neutral-900 tabular-nums">
                        {srv.basePrice} ر.س
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quotation Summary Card (Span 5) */}
          <div className="lg:col-span-5 bg-neutral-900 text-white rounded-2xl p-6 sm:p-8 space-y-6 sticky top-28 shadow-xl">
            <div>
              <span className="text-[11px] font-mono tracking-widest text-red-400 uppercase">
                ESTIMATED INVOICE BREAKDOWN
              </span>
              <h3 className="text-xl font-bold mt-1">كشف التقدير المالي المبدئي</h3>
              <p className="text-xs text-neutral-400 mt-1">
                {selectedBrand} - {selectedModel} ({mileageRange})
              </p>
            </div>

            {/* Price lines */}
            <div className="space-y-3 pt-4 border-t border-neutral-800 text-xs">
              <div className="flex items-center justify-between text-neutral-300">
                <span>قطع الغيار الأصلية المعتمدة (OEM):</span>
                <span className="font-mono tabular-nums text-white">{partsEstimate} ر.س</span>
              </div>
              <div className="flex items-center justify-between text-neutral-300">
                <span>أجور اليد الفنية والفحص الإلكتروني:</span>
                <span className="font-mono tabular-nums text-white">{laborEstimate} ر.س</span>
              </div>
              <div className="flex items-center justify-between text-neutral-300">
                <span>المدة التقريبية المقدرة في الورشة:</span>
                <span className="font-mono tabular-nums text-emerald-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {totalMinutes} دقيقة
                </span>
              </div>
              <div className="flex items-center justify-between text-neutral-300">
                <span>ضريبة القيمة المضافة (15%):</span>
                <span className="font-mono text-emerald-400">مشمولة في السعر</span>
              </div>
            </div>

            {/* Total Highlight */}
            <div className="pt-4 border-t border-neutral-800 flex items-baseline justify-between">
              <div>
                <span className="text-xs text-neutral-400 block">الإجمالي النهائي التقديري</span>
                <span className="text-xs text-emerald-400 font-medium">مع ضمان 12 شهراً</span>
              </div>
              <div className="text-left">
                <span className="text-3xl font-extrabold text-white tabular-nums">
                  {subtotal}{' '}
                  <span className="text-sm font-normal text-neutral-400">ر.س</span>
                </span>
              </div>
            </div>

            {/* Included guarantees */}
            <div className="p-3.5 bg-neutral-800/70 rounded-xl space-y-1.5 text-[11px] text-neutral-300">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-red-400 shrink-0" />
                <span>فحص وضبط هواء الإطارات الأربعة مجاناً</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-red-400 shrink-0" />
                <span>غسيل وتلميع خارجي للسيارة هدية</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-red-400 shrink-0" />
                <span>تسليم فاتورة رسمية معتمدة من هيئة الزكاة والضريبة</span>
              </div>
            </div>

            {/* Action button */}
            <button
              onClick={() => onProceedToBooking(selectedBrand, selectedModel, selectedServices)}
              className="w-full py-3.5 px-4 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
            >
              <span>تأكيد هذا الحساب وحجز الموعد الآن</span>
              <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
