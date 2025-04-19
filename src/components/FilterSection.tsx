
import React from 'react';
import { specialties } from '../data/mockData';
import { useAppContext } from '../context/AppContext';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const FilterSection: React.FC = () => {
  const { 
    filterSpecialty, 
    setFilterSpecialty, 
    filterAvailability, 
    setFilterAvailability 
  } = useAppContext();

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <h2 className="text-lg font-semibold mb-4">Filter Doctors</h2>
      
      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
        <div className="w-full md:w-1/2">
          <Select
            value={filterSpecialty}
            onValueChange={setFilterSpecialty}
            aria-label="Filter by specialty"
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select specialty" />
            </SelectTrigger>
            <SelectContent>
              {specialties.map((specialty) => (
                <SelectItem key={specialty} value={specialty}>
                  {specialty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full md:w-1/2 flex items-center space-x-2">
          <Switch
            id="available-filter"
            checked={filterAvailability}
            onCheckedChange={setFilterAvailability}
            aria-label="Show only available doctors"
          />
          <Label htmlFor="available-filter">Show only available doctors</Label>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
