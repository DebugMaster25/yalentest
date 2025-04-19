
import React from 'react';
import { Doctor } from '../data/mockData';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';

interface DoctorCardProps {
  doctor: Doctor;
  onBookAppointment: (doctor: Doctor) => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onBookAppointment }) => {
  const { name, specialty, rating, availability, location, image } = doctor;
  
  // Determine availability badge class
  const availabilityClass = 
    availability === 'Available' ? 'available' : 
    availability === 'Limited' ? 'limited' : 'unavailable';

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
      aria-label={`Doctor card for ${name}`}
    >
      <div className="flex flex-col md:flex-row">
        {/* Doctor image */}
        <div className="md:w-1/3 p-4 flex items-center justify-center">
          <img 
            src={image} 
            alt={`Dr. ${name}`} 
            className="w-32 h-32 rounded-full object-cover"
          />
        </div>
        
        {/* Doctor information */}
        <div className="md:w-2/3 p-4">
          <h2 className="text-xl font-semibold mb-1">{name}</h2>
          <p className="text-gray-600 mb-2">{specialty}</p>
          
          <div className="flex items-center mb-2">
            <Star className="h-4 w-4 text-yellow-500 mr-1" aria-hidden="true" />
            <span aria-label={`Rating ${rating} out of 5`}>{rating}/5</span>
          </div>
          
          <div className="mb-2">
            <span 
              className={`px-2 py-1 rounded-full text-xs font-medium ${availabilityClass}`}
              aria-label={`Availability status: ${availability}`}
            >
              {availability}
            </span>
          </div>
          
          <p className="text-gray-500 mb-4">{location}</p>
          
          <Button
            onClick={() => onBookAppointment(doctor)}
            className="w-full"
            disabled={availability === 'Unavailable'}
            aria-label={`Book appointment with ${name}`}
          >
            Book Appointment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
