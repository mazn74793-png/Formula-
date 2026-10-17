import React from 'react';
import { SERVICE_PACKAGES } from '../data/mockData';
import { ServiceItem } from '../types';
import { Check, Clock, Wrench, Shield, ArrowLeft, Cpu } from 'lucide-react';
import engineImg from '../assets/images/service_engine_inspection_1792254554422.jpg';
import brakeImg from '../assets/images/service_brake_chassis_1792254554662.jpg';
import loungeImg from '../assets/images/workshop_reception_lounge_1792254554799.jpg';

interface ServicesShowcaseProps {
  onBookService: (service: ServiceItem) => void;
}

export const ServicesShowcase: React.FC<ServicesShowcaseProps> = ({ onBookService }) => {
  return (
    <section id="services" className="py-20 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
              <span>خدمات الصيانة الاحترافية</span>
              <span aria-hidden="true">·</span>
              <span>JAPANESE PRECISION SERVICES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              باقات صيانة صممت وفق أدلة الصانع الياباني بدقة متناهية
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 mt-2">
              كل مسمار وكل قطرة زيت يتم التعامل معها بمقاييس عزم الدوران الصارمة (Torque Specs) بدون اجتهاد شخصي.
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium text-neutral-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              أجهزة فحص Denso و Bosch
            </span>
            <span aria-hidden="true">·</span>
            <span>أسعار شفافة شاملة للضريبة</span>
          </div>
        </div>

        {/* Bento Grid Marquee Capabilities */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
          {/* Bento Card 1: Engine & ECU (Span 7) */}
          <div className="lg:col-span-7 bg-neutral-50 rounded-2xl overflow-hidden border border-neutral-200 group flex flex-col justify-between">
            <div className="relative h-64 sm:h-72 overflow-hidden">
              <img
                src={engineImg}
                alt="فحص المحرك والكمبيوتر بالأنظمة اليابانية"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-neutral-900/20 to-transparent" />
              <div className="absolute bottom-4 right-4 left-4 text-white">
                <span className="text-[11px] font-mono tracking-wider text-red-300 font-semibold uppercase">
                  ECU DIAGNOSTICS & DENSO SENSORS
                </span>
                <h3 className="text-lg sm:text-xl font-bold mt-1">
                  فحص كمبيوتر الوكالة وبرمجة الحساسات الدقيقة
                </h3>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm text-neutral-600 leading-relaxed">
                تشخيص إلكتروني مباشر عبر قراءة البيانات الحية (Live Data) لحساسات المحرك والجيربكس ومنظومة حقن الوقود، مع معايرة خلوص الصمامات وتنظيف الثروتل وإعادة ضبط البرمجة.
              </p>
              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-neutral-500">
                  متوافق مع: <strong className="text-neutral-800">V6, V8, Twin-Turbo & Hybrid</strong>
                </span>
                <button
                  onClick={() => onBookService(SERVICE_PACKAGES[1])}
                  className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
                >
                  <span>حجز فحص الكمبيوتر</span>
                  <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
                </button>
              </div>
            </div>
          </div>

          {/* Bento Card 2: Brakes & Chassis (Span 5) */}
          <div className="lg:col-span-5 bg-neutral-50 rounded-2xl overflow-hidden border border-neutral-200 group flex flex-col justify-between">
            <div className="relative h-64 sm:h-72 overflow-hidden">
              <img
                src={brakeImg}
                alt="صيانة الفرامل والهوبات الليزرية"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-neutral-900/20 to-transparent" />
              <div className="absolute bottom-4 right-4 left-4 text-white">
                <span className="text-[11px] font-mono tracking-wider text-red-300 font-semibold uppercase">
                  BRAKE CALIBRATION & DISCS
                </span>
                <h3 className="text-lg sm:text-xl font-bold mt-1">
                  نظام الفرامل الهيدروليكي والخرط الليزري
                </h3>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm text-neutral-600 leading-relaxed">
                خرط هوبات متطور بدون فك مع ضمان عدم وجود أي رجّة، أقمشة سيراميك وكالة، واستبدال سائل الفرامل بالضغط الهيدروليكي الآمن.
              </p>
              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-neutral-500">
                  مستوى الأمان: <strong className="text-neutral-800">اختبار ديناميكي معتمد</strong>
                </span>
                <button
                  onClick={() => onBookService(SERVICE_PACKAGES[2])}
                  className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
                >
                  <span>حجز خدمة الفرامل</span>
                  <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
                </button>
              </div>
            </div>
          </div>

          {/* Bento Card 3: Omotenashi Customer Hospitality (Span 12 Full Width) */}
          <div className="lg:col-span-12 bg-neutral-900 text-white rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-6 p-8 sm:p-12 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-red-400 uppercase tracking-widest">
                <span>ضيافة أوموتيناشي اليابانية</span>
                <span>/</span>
                <span>OMOTENASHI VIP LOUNGE</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                استمتع بقهوتك وشاهد صيانة سيارتك عبر الزجاج البانورامي
              </h3>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                وفرنا لك صالة انتظار فاخرة مزودة بإنترنت فائق السرعة، ومساحات عمل هادئة، ومشروبات يابانية وعربية مختارة، مع إمكانية متابعة سيارتك وهي على الرافعة في بث مباشر أو عبر الشاشات الشفافة.
              </p>
              <div className="pt-2 flex flex-wrap gap-4 text-xs text-neutral-400">
                <span>· خدمة فاليه مجانية للاستلام من الباب</span>
                <span>· تقرير مصور لقطع الغيار المستبدلة</span>
                <span>· غسيل وتلميع مجاني مع الصيانة الدورية</span>
              </div>
            </div>
            <div className="lg:col-span-6 h-64 sm:h-80 lg:h-full">
              <img
                src={loungeImg}
                alt="صالة استراحة واستقبال كايزن موتورز"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* Detailed Service Catalog Cards */}
        <div className="pt-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-neutral-900">
              قائمة الباقات والخدمات مع الأسعار والمدة
            </h3>
            <span className="text-xs text-neutral-500">اختر الباقة لحجز موعد فوري</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICE_PACKAGES.map((srv) => (
              <div
                key={srv.id}
                className="bg-white rounded-2xl border border-neutral-200 p-6 flex flex-col justify-between hover:border-neutral-900 transition-all hover:shadow-sm"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="text-xs font-medium text-neutral-500 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {srv.durationMinutes} دقيقة
                    </span>
                    {srv.popular && (
                      <span className="text-[11px] font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded">
                        الأكثر طلباً
                      </span>
                    )}
                  </div>

                  <h4 className="text-base font-bold text-neutral-900 leading-snug mb-2">
                    {srv.titleAr}
                  </h4>

                  <p className="text-xs text-neutral-600 mb-4 leading-relaxed">
                    {srv.descriptionAr}
                  </p>

                  <div className="space-y-1.5 mb-6">
                    <p className="text-[11px] font-bold text-neutral-700 uppercase tracking-wider">
                      تشمل الخدمة:
                    </p>
                    {srv.includes.map((inc, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-neutral-600">
                        <Check className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-neutral-500 block">تبدأ التكلفة من</span>
                    <span className="text-xl font-extrabold text-neutral-900 tabular-nums">
                      {srv.basePrice}{' '}
                      <span className="text-xs font-normal text-neutral-500">ر.س</span>
                    </span>
                  </div>

                  <button
                    onClick={() => onBookService(srv)}
                    className="px-4 py-2 text-xs font-bold text-white bg-neutral-900 hover:bg-red-600 rounded-lg transition-colors cursor-pointer"
                  >
                    اختر واحجز
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
