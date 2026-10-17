import React from 'react';
import { Phone, Shield, MapPin, Mail, Clock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-neutral-200 pt-16 pb-12 text-neutral-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-neutral-200">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-neutral-900 text-white flex items-center justify-center font-bold text-xs">
                <span className="text-red-500 mr-0.5">K</span>Z
              </div>
              <div>
                <span className="text-base font-extrabold text-neutral-900 tracking-tight block">
                  كايزن موتورز
                </span>
                <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-mono">
                  KAIZEN JAPANESE MOTORS
                </span>
              </div>
            </div>

            <p className="text-neutral-500 leading-relaxed max-w-sm">
              المركز المتخصص الأول بالمملكة لصيانة واختبار المركبات اليابانية. نلتزم بفلسفة كايزن (التحسين المستمر) والدقة الهندسية الصارمة بأيدي مهندسين معتمدين وقطع غيار وكالة أصلية 100%.
            </p>

            <div className="space-y-1.5 text-neutral-700">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-red-600" />
                <span className="font-semibold">الرقم الموحد المباشر:</span>
                <span className="font-mono tabular-nums">9200 3482</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-red-600" />
                <span>طوارئ السحب والإنقاذ (سطحة مجانية للحوادث): 800 244 0000</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-neutral-900 uppercase tracking-wider text-[11px]">
              خدمات الصيانة
            </h4>
            <ul className="space-y-2">
              <li><a href="#services" className="hover:text-red-600 transition-colors">الصيانة الدورية السريعة</a></li>
              <li><a href="#services" className="hover:text-red-600 transition-colors">فحص كمبيوتر الوكالة 50 نقطة</a></li>
              <li><a href="#services" className="hover:text-red-600 transition-colors">خرط الهوبات والفرامل الليزري</a></li>
              <li><a href="#services" className="hover:text-red-600 transition-colors">صيانة الجيربكس والـ CVT</a></li>
              <li><a href="#services" className="hover:text-red-600 transition-colors">تصفية المحرك وبواجي الإيريديوم</a></li>
            </ul>
          </div>

          {/* Brands */}
          <div className="space-y-3">
            <h4 className="font-bold text-neutral-900 uppercase tracking-wider text-[11px]">
              السيارات المدعومة
            </h4>
            <ul className="space-y-2">
              <li><a href="#brands" className="hover:text-red-600 transition-colors">صيانة تويوتا (Toyota)</a></li>
              <li><a href="#brands" className="hover:text-red-600 transition-colors">صيانة لكزس (Lexus)</a></li>
              <li><a href="#brands" className="hover:text-red-600 transition-colors">صيانة نيسان (Nissan)</a></li>
              <li><a href="#brands" className="hover:text-red-600 transition-colors">صيانة هوندا (Honda)</a></li>
              <li><a href="#brands" className="hover:text-red-600 transition-colors">مازدا وسوبارو وميتسوبيشي</a></li>
            </ul>
          </div>

          {/* Guarantee & Certs */}
          <div className="space-y-3">
            <h4 className="font-bold text-neutral-900 uppercase tracking-wider text-[11px]">
              شركاء الجودة المعتمدون
            </h4>
            <div className="space-y-1.5 text-neutral-500">
              <p>· شمعات احتراق NGK و Denso</p>
              <p>· زيوت محرك ومكونات Aisin اليابانية</p>
              <p>· مساعدات ونظام تعليق KYB</p>
              <p>· فرامل Akebono و ADVICS</p>
              <p>· أجهزة تشخيص Bosch و Denso KTS</p>
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400">
          <p>© 2026 كايزن موتورز لخدمات صيانة السيارات اليابانية. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-neutral-600">سياسة الخصوصية والضمان</span>
            <span>·</span>
            <span className="hover:text-neutral-600">الشروط والأحكام</span>
            <span>·</span>
            <span className="hover:text-neutral-600">شهادة ضريبة القيمة المضافة</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
