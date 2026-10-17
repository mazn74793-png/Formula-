export interface CarBrand {
  id: string;
  nameAr: string;
  nameEn: string;
  country: string;
  logoText: string;
  models: {
    nameAr: string;
    nameEn: string;
    years: number[];
    category: 'suv' | 'sedan' | 'sports' | 'truck';
  }[];
}

export interface ServiceItem {
  id: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  category: 'maintenance' | 'inspection' | 'brakes' | 'engine' | 'ac' | 'electrical';
  durationMinutes: number;
  basePrice: number; // in SAR
  includes: string[];
  recommendedIntervalKm: number;
  popular?: boolean;
}

export interface Branch {
  id: string;
  nameAr: string;
  nameEn: string;
  city: string;
  address: string;
  phone: string;
  whatsapp: string;
  hours: string;
  baysCount: number;
  activeBays: number;
  lat: number;
  lng: number;
}

export type BookingStatus = 'received' | 'inspecting' | 'repairing' | 'road_testing' | 'ready_for_pickup' | 'delivered';

export interface BookingRecord {
  id: string;
  referenceNumber: string; // e.g. KZ-7892
  customerName: string;
  customerPhone: string;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  plateNumber: string;
  branchId: string;
  services: ServiceItem[];
  customNotes?: string;
  needValet: boolean;
  valetAddress?: string;
  bookingDate: string;
  bookingTime: string;
  totalCost: number;
  status: BookingStatus;
  technicianName: string;
  technicianNotes?: string;
  bayNumber: number;
  createdAt: string;
  estimatedCompletion: string;
}
