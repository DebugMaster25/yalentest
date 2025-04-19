
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { AppProvider, useAppContext } from '../context/AppContext';
import FilterSection from '../components/FilterSection';
import DoctorList from '../components/DoctorList';
import AppointmentList from '../components/AppointmentList';
import BookingModal from '../components/BookingModal';

const AppContent: React.FC = () => {
  const { activeTab, setActiveTab } = useAppContext();

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-primary mb-2">HealthBooker</h1>
        <p className="text-gray-600">Find and schedule appointments with top doctors</p>
      </header>

      <main className="max-w-5xl mx-auto">
        <Tabs 
          value={activeTab} 
          onValueChange={(value) => setActiveTab(value as 'doctors' | 'appointments')}
          className="w-full"
        >
          <TabsList className="w-full grid grid-cols-2 mb-8">
            <TabsTrigger 
              value="doctors"
              aria-label="View doctors tab"
            >
              Find Doctors
            </TabsTrigger>
            <TabsTrigger 
              value="appointments"
              aria-label="View appointments tab"
            >
              My Appointments
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="doctors" className="space-y-6">
            <FilterSection />
            <DoctorList />
          </TabsContent>
          
          <TabsContent value="appointments">
            <AppointmentList />
          </TabsContent>
        </Tabs>
      </main>
      
      <BookingModal />
      
      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} HealthBooker. All rights reserved.</p>
      </footer>
    </div>
  );
};

const Index: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default Index;
