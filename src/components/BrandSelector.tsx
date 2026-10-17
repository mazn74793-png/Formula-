import React, { useState } from 'react';
import { JAPANESE_BRANDS } from '../data/mockData';
import { CarBrand } from '../types';
import { ArrowLeft, Check, Sparkles } from 'lucide-react';

interface BrandSelectorProps {
  onSelectBrandAndModel: (brandId: string, modelName: string) => void;
}

export const BrandSelector: React.FC<BrandSelectorProps> = ({ onSelectBrandAndModel }) => {
  const [selectedBrandId, setSelectedBrandId] = useState<string>('toyota');

  const currentBrand = JAPANESE_BRANDS.find((b) => b.id === selectedBrandId) || JAPANESE_BRANDS[0];

  return (
    <section id="brands" className="py-16 bg-neutral-50/70 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
            <span>المركبات المدعومة</span>
            <span aria-hidden="true">·</span>
            <span>JAPANESE AUTOMOTIVE SPECIALISTS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
            تخصص هندسي كامل في كبرى العلامات اليابانية
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 mt-2">
            مهندسونا خضعوا لبرامج تدريب معتمدة على مواصفات الصانع الياباني، مع توفر كامل لحواسيب الفحص والقطع الأصلية لكل طراز.
          </p>
        </div>

        {/* Brands Tab Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-8">
          {JAPANESE_BRANDS.map((brand) => {
            const isSelected = brand.id === selectedBrandId;
            return (
              <button
                key={brand.id}
                onClick={() => setSelectedBrandId(brand.id)}
                className={`p-4 rounded-xl text-center border transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                  isSelected
                    ? 'bg-white border-neutral-900 shadow-sm ring-1 ring-neutral-900'
                    : 'bg-white/80 border-neutral-200 hover:border-neutral-300 hover:bg-white text-neutral-700'
                }`}
              >
                <span className="text-xs font-extrabold tracking-widest text-neutral-400 uppercase font-mono">
                  {brand.logoText}
                </span>
                <span className="text-sm font-bold text-neutral-900">{brand.nameAr}</span>
                <span className="text-[10px] text-neutral-500">{brand.models.length} طراز متاح</span>
              </button>
            );
          })}
        </div>

        {/* Selected Brand Model Cards Container */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-neutral-100 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-neutral-900">
                  طرازات {currentBrand.nameAr} ({currentBrand.nameEn})
                </h3>
                <span className="text-xs bg-red-50 text-red-700 font-semibold px-2 py-0.5 rounded">
                  فحص كمبيوتر معتمد
                </span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                اختر طراز سيارتك للانتقال المباشر لجدولة الموعد أو حساب التكلفة الفورية.
              </p>
            </div>
            <button
              onClick={() => onSelectBrandAndModel(currentBrand.nameAr, currentBrand.models[0].nameAr)}
              className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
            >
              <span>حجز مباشر لسيارة {currentBrand.nameAr}</span>
              <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
            </button>
          </div>

          {/* Models Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentBrand.models.map((model, idx) => (
              <div
                key={idx}
                className="group p-4 rounded-xl border border-neutral-200 hover:border-neutral-900 bg-neutral-50/40 hover:bg-white transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-neutral-500 mb-1.5">
                    <span className="font-mono">موديلات {model.years[model.years.length - 1]} - {model.years[0]}</span>
                    <span className="capitalize text-[11px] font-medium text-neutral-600">
                      {model.category === 'suv' ? 'دفع رباعي / SUV' : model.category === 'sedan' ? 'سيدان' : model.category === 'sports' ? 'أداء رياضي' : 'بيك اب'}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-neutral-900 group-hover:text-red-600 transition-colors">
                    {model.nameAr}
                  </h4>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-200/60 flex items-center justify-between">
                  <span className="text-[11px] text-emerald-700 flex items-center gap-1 font-medium">
                    <Check className="w-3 h-3" />
                    قطع OEM متوفرة بالفرع
                  </span>
                  <button
                    onClick={() => onSelectBrandAndModel(currentBrand.nameAr, model.nameAr)}
                    className="text-xs font-semibold px-3 py-1.5 bg-neutral-900 text-white hover:bg-red-600 rounded-lg transition-colors cursor-pointer"
                  >
                    احجز صيانة
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
