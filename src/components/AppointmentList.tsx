
import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Calendar, User } from 'lucide-react';
import { format } from 'date-fns';

const AppointmentList: React.FC = () => {
  const { appointments, getDoctorById } = useAppContext();

  if (appointments.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-500">No appointments scheduled</h3>
        <p className="mt-2 text-gray-400">
          Book an appointment to get started
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => {
        const doctor = getDoctorById(appointment.doctorId);
        if (!doctor) return null;
        
        const appointmentDate = new Date(appointment.dateTime);
        const formattedDate = format(appointmentDate, 'MMMM d, yyyy');
        const formattedTime = format(appointmentDate, 'h:mm a');
        
        return (
          <div 
            key={appointment.id} 
            className="bg-white rounded-lg shadow p-4"
            aria-label={`Appointment with ${doctor.name} on ${formattedDate} at ${formattedTime}`}
          >
            <div className="flex items-start">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-16 h-16 rounded-full mr-4"
              />
              <div className="flex-1">
                <h3 className="font-medium text-lg">{doctor.name}</h3>
                <p className="text-gray-500">{doctor.specialty}</p>
                
                <div className="mt-3 flex items-center text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" aria-hidden="true" />
                  <span className="mr-4">{formattedDate}</span>
                  <span>{formattedTime}</span>
                </div>
                
                <div className="mt-2 flex items-center text-gray-500">
                  <User className="h-4 w-4 mr-1" aria-hidden="true" />
                  <span>{doctor.location}</span>
                </div>
                
                <div className="mt-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    appointment.status === 'Confirmed' 
                      ? 'bg-green-100 text-green-800' 
                      : appointment.status === 'Pending' 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {appointment.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AppointmentList;
