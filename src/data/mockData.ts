
export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  availability: 'Available' | 'Limited' | 'Unavailable';
  location: string;
  image: string;
}

export interface Appointment {
  id: string;
  doctorId: string;
  dateTime: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
}

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

export const specialties = [
  'All Specialties',
  'Primary Care',
  'Cardiology',
  'Dermatology',
  'Neurology',
  'Pediatrics',
  'Psychiatry',
  'Orthopedics',
];

export const doctors: Doctor[] = [
  {
    id: 'd1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Primary Care',
    rating: 4.8,
    availability: 'Available',
    location: 'Downtown Medical Center',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    id: 'd2',
    name: 'Dr. Michael Chen',
    specialty: 'Cardiology',
    rating: 4.9,
    availability: 'Limited',
    location: 'Heart & Vascular Institute',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: 'd3',
    name: 'Dr. Emily Rodriguez',
    specialty: 'Dermatology',
    rating: 4.7,
    availability: 'Available',
    location: 'Skin Health Clinic',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
  {
    id: 'd4',
    name: 'Dr. James Wilson',
    specialty: 'Neurology',
    rating: 4.9,
    availability: 'Unavailable',
    location: 'Neuroscience Center',
    image: 'https://randomuser.me/api/portraits/men/22.jpg',
  },
  {
    id: 'd5',
    name: 'Dr. Lisa Thompson',
    specialty: 'Pediatrics',
    rating: 4.8,
    availability: 'Available',
    location: 'Children\'s Medical Group',
    image: 'https://randomuser.me/api/portraits/women/17.jpg',
  },
  {
    id: 'd6',
    name: 'Dr. Robert Garcia',
    specialty: 'Psychiatry',
    rating: 4.6,
    availability: 'Limited',
    location: 'Behavioral Health Center',
    image: 'https://randomuser.me/api/portraits/men/35.jpg',
  },
  {
    id: 'd7',
    name: 'Dr. Jennifer Lee',
    specialty: 'Orthopedics',
    rating: 4.9,
    availability: 'Available',
    location: 'Sports Medicine & Orthopedic Center',
    image: 'https://randomuser.me/api/portraits/women/90.jpg',
  },
  {
    id: 'd8',
    name: 'Dr. David Kim',
    specialty: 'Primary Care',
    rating: 4.7,
    availability: 'Available',
    location: 'Family Medicine Associates',
    image: 'https://randomuser.me/api/portraits/men/29.jpg',
  },
];

export const getTimeSlots = (doctorId: string): TimeSlot[] => {
  // In a real app, this would come from an API based on the doctor and date
  return [
    { id: 't1', time: '9:00 AM', available: true },
    { id: 't2', time: '10:00 AM', available: true },
    { id: 't3', time: '11:00 AM', available: false },
    { id: 't4', time: '1:00 PM', available: true },
    { id: 't5', time: '2:00 PM', available: true },
    { id: 't6', time: '3:00 PM', available: false },
    { id: 't7', time: '4:00 PM', available: true },
  ];
};

export const mockAppointments: Appointment[] = [
  {
    id: 'a1',
    doctorId: 'd1',
    dateTime: '2025-04-25T09:00:00',
    status: 'Confirmed',
  },
  {
    id: 'a2',
    doctorId: 'd3',
    dateTime: '2025-04-28T14:00:00',
    status: 'Pending',
  },
];
