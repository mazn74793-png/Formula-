import React from 'react';
import { BRANCHES } from '../data/mockData';
import { MapPin, Clock, Phone, MessageSquare, Calendar, Navigation } from 'lucide-react';

interface BranchesSectionProps {
  onBookAtBranch: (branchId: string) => void;
}

export const BranchesSection: React.FC<BranchesSectionProps> = ({ onBookAtBranch }) => {
  return (
    <section id="branches" className="py-20 bg-neutral-50/70 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
            <span>شبكة المراكز المعتمدة</span>
            <span aria-hidden="true">·</span>
            <span>KAIZEN SERVICE NETWORK</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
            فروعنا المجهزة بأحدث الرافعات وأجهزة التشخيص
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 mt-2">
            مواقع استراتيجية في كبرى المدن مع صالات انتظار مريحة، ومسارات صيانة سريعة، وخدمة استلام وتسليم مجدولة.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BRANCHES.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-2xl border border-neutral-200 p-6 flex flex-col justify-between hover:border-neutral-900 transition-all hover:shadow-sm"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[11px] font-mono text-red-600 font-bold uppercase">
                      {b.city}
                    </span>
                    <h3 className="text-base font-bold text-neutral-900 mt-0.5">{b.nameAr}</h3>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded">
                    {b.baysCount - b.activeBays} مسارات متاحة
                  </span>
                </div>

                <div className="space-y-2.5 text-xs text-neutral-600">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                    <span>{b.address}</span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                    <span>{b.hours}</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-neutral-400 shrink-0" />
                    <span className="tabular-nums font-mono">{b.phone}</span>
                  </div>
                </div>

                {/* Bay capacity gauge */}
                <div className="pt-2">
                  <div className="flex items-center justify-between text-[11px] text-neutral-500 mb-1">
                    <span>إشغال مسارات الورشة اليوم:</span>
                    <span className="font-mono font-bold text-neutral-900">
                      {b.activeBays} من {b.baysCount} مسارات
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-neutral-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-neutral-900 rounded-full"
                      style={{ width: `${(b.activeBays / b.baysCount) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-neutral-100 flex items-center gap-2">
                <button
                  onClick={() => onBookAtBranch(b.id)}
                  className="flex-1 py-2 px-3 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>حجز في هذا الفرع</span>
                </button>

                <a
                  href={`https://wa.me/${b.whatsapp}?text=${encodeURIComponent(`مرحباً مركز كايزن، أود الاستفسار عن حجز صيانة في ${b.nameAr}`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer"
                  title="محادثة واتساب مباشرة"
                >
                  <MessageSquare className="w-4 h-4" />
                </a>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${b.lat},${b.lng}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer"
                  title="الموقع على خرائط جوجل"
                >
                  <Navigation className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
