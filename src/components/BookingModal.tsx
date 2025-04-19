
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useAppContext } from '../context/AppContext';
import { Calendar, Clock } from 'lucide-react';

const BookingModal: React.FC = () => {
  const {
    isBookingModalOpen,
    closeBookingModal,
    selectedDoctor,
    timeSlots,
    selectedTimeSlot,
    selectTimeSlot,
    confirmAppointment,
  } = useAppContext();

  if (!selectedDoctor) return null;

  return (
    <Dialog open={isBookingModalOpen} onOpenChange={closeBookingModal}>
      <DialogContent className="sm:max-w-md" aria-labelledby="booking-dialog-title">
        <DialogHeader>
          <DialogTitle id="booking-dialog-title">Book Appointment with {selectedDoctor.name}</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <div className="flex items-center mb-6">
            <img
              src={selectedDoctor.image}
              alt={selectedDoctor.name}
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <h3 className="font-medium">{selectedDoctor.name}</h3>
              <p className="text-sm text-gray-500">{selectedDoctor.specialty}</p>
              <p className="text-sm text-gray-500">{selectedDoctor.location}</p>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <Calendar className="mr-2 h-4 w-4" aria-hidden="true" />
              <h4 className="font-medium">Select a time</h4>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
              {timeSlots.map((slot) => (
                <Button
                  key={slot.id}
                  variant={selectedTimeSlot?.id === slot.id ? "default" : "outline"}
                  className="flex items-center justify-center"
                  disabled={!slot.available}
                  onClick={() => selectTimeSlot(slot)}
                  aria-label={`Select time slot at ${slot.time}${!slot.available ? ', unavailable' : ''}`}
                  aria-selected={selectedTimeSlot?.id === slot.id}
                >
                  <Clock className="mr-2 h-4 w-4" aria-hidden="true" />
                  {slot.time}
                </Button>
              ))}
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button
            variant="outline"
            onClick={closeBookingModal}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            onClick={confirmAppointment}
            disabled={!selectedTimeSlot}
            className="w-full sm:w-auto"
          >
            Confirm Appointment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
