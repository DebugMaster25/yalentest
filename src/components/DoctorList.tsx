
import React from 'react';
import { useAppContext } from '../context/AppContext';
import DoctorCard from './DoctorCard';

const DoctorList: React.FC = () => {
  const { filteredDoctors, openBookingModal } = useAppContext();

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
      {filteredDoctors.length > 0 ? (
        filteredDoctors.map((doctor) => (
          <DoctorCard 
            key={doctor.id} 
            doctor={doctor} 
            onBookAppointment={openBookingModal} 
          />
        ))
      ) : (
        <div className="col-span-full text-center py-8">
          <p className="text-gray-500">No doctors match your filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default DoctorList;
