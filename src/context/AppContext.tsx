
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Doctor, Appointment, mockAppointments, doctors, TimeSlot, getTimeSlots } from '../data/mockData';
import { useToast } from '@/components/ui/use-toast';

interface AppContextType {
  doctors: Doctor[];
  filteredDoctors: Doctor[];
  appointments: Appointment[];
  selectedDoctor: Doctor | null;
  selectedTimeSlot: TimeSlot | null;
  isBookingModalOpen: boolean;
  activeTab: 'doctors' | 'appointments';
  filterSpecialty: string;
  filterAvailability: boolean;
  timeSlots: TimeSlot[];
  setFilterSpecialty: (specialty: string) => void;
  setFilterAvailability: (available: boolean) => void;
  openBookingModal: (doctor: Doctor) => void;
  closeBookingModal: () => void;
  selectTimeSlot: (timeSlot: TimeSlot) => void;
  confirmAppointment: () => void;
  setActiveTab: (tab: 'doctors' | 'appointments') => void;
  getDoctorById: (id: string) => Doctor | undefined;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>(doctors);
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'doctors' | 'appointments'>('doctors');
  const [filterSpecialty, setFilterSpecialty] = useState('All Specialties');
  const [filterAvailability, setFilterAvailability] = useState(false);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  
  const { toast } = useToast();

  useEffect(() => {
    let result = [...doctors];
    
    // Filter by specialty
    if (filterSpecialty !== 'All Specialties') {
      result = result.filter(doctor => doctor.specialty === filterSpecialty);
    }
    
    // Filter by availability
    if (filterAvailability) {
      result = result.filter(doctor => doctor.availability !== 'Unavailable');
    }
    
    setFilteredDoctors(result);
  }, [filterSpecialty, filterAvailability]);

  const openBookingModal = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setTimeSlots(getTimeSlots(doctor.id));
    setSelectedTimeSlot(null);
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    setSelectedDoctor(null);
    setSelectedTimeSlot(null);
  };

  const selectTimeSlot = (timeSlot: TimeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };

  const confirmAppointment = () => {
    if (!selectedDoctor || !selectedTimeSlot) return;
    
    // Create a new appointment
    const newAppointment: Appointment = {
      id: `a${appointments.length + 1}`,
      doctorId: selectedDoctor.id,
      dateTime: new Date().toISOString(), // This would normally use the selected date and time
      status: 'Confirmed',
    };
    
    setAppointments([...appointments, newAppointment]);
    closeBookingModal();
    
    toast({
      title: "Appointment Confirmed",
      description: `Your appointment with ${selectedDoctor.name} has been booked.`,
    });
    
    // Switch to appointments tab
    setActiveTab('appointments');
  };

  const getDoctorById = (id: string) => {
    return doctors.find(doc => doc.id === id);
  };

  return (
    <AppContext.Provider value={{
      doctors,
      filteredDoctors,
      appointments,
      selectedDoctor,
      selectedTimeSlot,
      isBookingModalOpen,
      activeTab,
      filterSpecialty,
      filterAvailability,
      timeSlots,
      setFilterSpecialty,
      setFilterAvailability,
      openBookingModal,
      closeBookingModal,
      selectTimeSlot,
      confirmAppointment,
      setActiveTab,
      getDoctorById,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
