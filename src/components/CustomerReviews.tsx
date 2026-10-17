import React from 'react';
import { Star, ShieldCheck, Check } from 'lucide-react';

export const CustomerReviews: React.FC = () => {
  const reviews = [
    {
      name: 'عبدالمحسن الراجحي',
      role: 'مالك لكزس LX600 (موديل 2023)',
      review: 'أفضل مركز صيانة تعاملت معه في الرياض بلا منازع. الفحص بجهاز كمبيوتر الوكالة الأصلي كشف مشكلة التكييف المزدوج وحلوها بنفس اليوم بقطع دينسو الأصلية مع ضمان مكتوب.',
      rating: 5,
      date: 'منذ أسبوعين',
      city: 'الرياض',
    },
    {
      name: 'سلطان القحطاني',
      role: 'مالك تويوتا لاند كروزر 300 V6 توين تيربو',
      review: 'الصيانة الدورية السريعة أخذت بالضبط 42 دقيقة، والمميز إنك شايف سيارتك لايف عبر الزجاج في صالة الاستقبال. احترام المواعيد والاحترافية اليابانية واضحة في كل تفصيلة.',
      rating: 5,
      date: 'منذ شهر',
      city: 'جدة',
    },
    {
      name: 'م. خالد الشهري',
      role: 'مالك نيسان باترول بطل الدروب V8',
      review: 'كان عندي رجّة في الفرامل على سرعات عالية، تم خرط الهوبات على الجهاز الليزري وتركيب فحمات نيسان الأصلية واختفت الرجّة تماماً. التكلفة أقل من نصف الوكالة وبنفس الجودة.',
      rating: 5,
      date: 'منذ 3 أسابيع',
      city: 'الخبر',
    },
  ];

  return (
    <section className="py-16 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
            <span>آراء العملاء الموثقة</span>
            <span aria-hidden="true">·</span>
            <span>VERIFIED CAR OWNERS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
            ثقة ملاك السيارات اليابانية في كافة أنحاء المملكة
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 mt-2">
            تجارب حقيقية لملاك خضعوا لخدمات الصيانة الدورية والميكانيكية في كايزن موتورز.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(r.rating)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                  "{r.review}"
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-200/60">
                <div className="flex items-center justify-between">
                  <div>
                    <strong className="text-xs font-bold text-neutral-900 block">{r.name}</strong>
                    <span className="text-[11px] text-neutral-500 block mt-0.5">{r.role}</span>
                  </div>
                  <span className="text-[10px] text-neutral-400 font-mono">{r.city}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
