import React from 'react';
import { Calendar, ShieldCheck, Cpu, Clock, CheckCircle2, Search, ArrowLeft } from 'lucide-react';
import heroWorkshopImg from '../assets/images/hero_japanese_workshop_1792254553023.jpg';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenTracker: () => void;
  onOpenCalculator: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenBooking,
  onOpenTracker,
  onOpenCalculator,
}) => {
  return (
    <section className="relative bg-white pt-8 pb-16 md:py-20 overflow-hidden border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-600 tracking-wider">
              <span className="w-2 h-2 rounded-full bg-red-600 inline-block" />
              <span>المركز المعتمد الأول لصيانة المركبات اليابانية</span>
              <span className="text-neutral-300">/</span>
              <span className="text-neutral-500">KAIZEN TAKUMI PRECISION</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 leading-[1.25] tracking-tight">
              دقة الهندسة اليابانية
              <span className="block text-red-600">لصيانة سيارتك بأعلى المعايير</span>
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-xl">
              نقدم حلول صيانة متكاملة لسيارات تويوتا، لكزس، نيسان، هوندا، مازدا، سوبارو، وميتسوبيشي.
              أجهزة فحص إلكترونية يابانية متطورة، قطع غيار وكالة أصلية معتمدة 100%، وضمان ذهبي شامل.
            </p>

            {/* Quick action buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3.5 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm transition-all flex items-center gap-2 active:scale-[0.98] cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>احجز موعد الصيانة الآن</span>
                <ArrowLeft className="w-4 h-4 mr-1 rtl:rotate-180" />
              </button>

              <button
                onClick={onOpenCalculator}
                className="px-5 py-3.5 text-sm font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer"
              >
                حاسبة التكلفة الفورية
              </button>

              <button
                onClick={onOpenTracker}
                className="px-4 py-3.5 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Search className="w-4 h-4 text-neutral-400" />
                <span>تتبع سيارتك برقم الحجز</span>
              </button>
            </div>

            {/* Verified Trust Points */}
            <div className="pt-6 border-t border-neutral-100 grid grid-cols-2 gap-4 text-xs text-neutral-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-neutral-800 shrink-0" />
                <span>قطع غيار يابانية أصلية 100% (OEM)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-neutral-800 shrink-0" />
                <span>ضمان ذهبي موثق لمدة سنة كاملة</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-neutral-800 shrink-0" />
                <span>خدمة استلام وتسليم السيارة من بابك</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-neutral-800 shrink-0" />
                <span>تقرير فحص إلكتروني فوري بالفيديو</span>
              </div>
            </div>
          </div>

          {/* Visual Asset column */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-50 shadow-sm">
              <img
                src={heroWorkshopImg}
                alt="ورشة كايزن موتورز المتطورة لصيانة السيارات اليابانية"
                className="w-full h-[380px] sm:h-[460px] object-cover"
                referrerPolicy="no-referrer"
              />
              {/* Clean bottom badge */}
              <div className="absolute bottom-4 inset-x-4 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-neutral-200/80 shadow-md flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-neutral-900">ورشة الصيانة الرقمية النموذجية</p>
                  <p className="text-[11px] text-neutral-500 mt-0.5">رافعات هيدروليكية ومعدات كشف الأعطال الليزرية Denso</p>
                </div>
                <div className="text-left">
                  <span className="inline-block text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded">
                    16 مسار صيانة متاح
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Proof of Rigor Bar (Row below hero) */}
        <div className="mt-14 pt-8 border-t border-neutral-200 grid grid-cols-2 md:grid-cols-4 gap-6 text-neutral-800">
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tabular-nums">
              12 <span className="text-sm font-normal text-neutral-500">شهراً</span>
            </div>
            <p className="text-xs font-semibold text-neutral-700">ضمان ذهبي موثق</p>
            <p className="text-[11px] text-neutral-500">على كافة أجور اليد والقطع المستبدلة</p>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tabular-nums">
              50+ <span className="text-sm font-normal text-neutral-500">نقطة</span>
            </div>
            <p className="text-xs font-semibold text-neutral-700">فحص إلكتروني دقيق</p>
            <p className="text-[11px] text-neutral-500">بأنظمة وبروتوكولات المصانع اليابانية</p>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tabular-nums">
              45 <span className="text-sm font-normal text-neutral-500">دقيقة</span>
            </div>
            <p className="text-xs font-semibold text-neutral-700">متوسط الصيانة السريعة</p>
            <p className="text-[11px] text-neutral-500">في مسارات الخدمة الفورية السريعة</p>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tabular-nums">
              100% <span className="text-sm font-normal text-neutral-500">أصلي</span>
            </div>
            <p className="text-xs font-semibold text-neutral-700">قطع غيار OEM يابانية</p>
            <p className="text-[11px] text-neutral-500">مع شهادة المنشأ والباركود المعتمد</p>
          </div>
        </div>
      </div>
    </section>
  );
};
