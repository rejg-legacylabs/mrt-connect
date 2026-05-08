import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';

const VEHICLE_TYPES = ['sedan', 'suv', 'van', 'cargo_van', 'minibus', 'bus', 'truck'];
const STATUSES = ['available', 'in_service', 'maintenance', 'out_of_service', 'retired'];
const FUEL_TYPES = ['gasoline', 'diesel', 'hybrid', 'electric', 'other'];

const EMPTY = {
  vehicle_id: '', make: '', model: '', year: '', vin: '', license_plate: '',
  vehicle_type: 'van', capacity: '', status: 'available', assigned_driver: '',
  current_mileage: '', last_service_date: '', next_service_date: '', next_service_mileage: '',
  insurance_expiry: '', registration_expiry: '', fuel_type: 'gasoline', color: '', notes: '',
};

export default function VehicleFormModal({ vehicle, onClose, onSuccess }) {
  const [form, setForm] = useState(vehicle ? { ...vehicle } : EMPTY);
  const [saving, setSaving] = useState(false);

  const set = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const data = {
      ...form,
      year: form.year ? Number(form.year) : undefined,
      capacity: form.capacity ? Number(form.capacity) : undefined,
      current_mileage: form.current_mileage ? Number(form.current_mileage) : undefined,
      next_service_mileage: form.next_service_mileage ? Number(form.next_service_mileage) : undefined,
    };
    if (vehicle?.id) {
      await base44.entities.Vehicle.update(vehicle.id, data);
    } else {
      await base44.entities.Vehicle.create(data);
    }
    setSaving(false);
    onSuccess();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="font-heading font-semibold text-lg">
            {vehicle ? 'Edit Vehicle' : 'Add Vehicle'}
          </h2>
          <button onClick={onClose} className="p-1.5 hover:bg-secondary rounded-md transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Identity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Fleet ID *</Label>
              <Input value={form.vehicle_id} onChange={e => set('vehicle_id', e.target.value)} placeholder="MRT-001" required />
            </div>
            <div className="space-y-1.5">
              <Label>Status *</Label>
              <Select value={form.status} onValueChange={v => set('status', v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {STATUSES.map(s => <SelectItem key={s} value={s} className="capitalize">{s.replace('_', ' ')}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label>Make *</Label>
              <Input value={form.make} onChange={e => set('make', e.target.value)} placeholder="Ford" required />
            </div>
            <div className="space-y-1.5">
              <Label>Model *</Label>
              <Input value={form.model} onChange={e => set('model', e.target.value)} placeholder="Transit" required />
            </div>
            <div className="space-y-1.5">
              <Label>Year *</Label>
              <Input type="number" value={form.year} onChange={e => set('year', e.target.value)} placeholder="2023" required />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Vehicle Type *</Label>
              <Select value={form.vehicle_type} onValueChange={v => set('vehicle_type', v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {VEHICLE_TYPES.map(t => <SelectItem key={t} value={t} className="capitalize">{t.replace('_', ' ')}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Capacity (passengers/lbs)</Label>
              <Input type="number" value={form.capacity} onChange={e => set('capacity', e.target.value)} placeholder="8" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>License Plate</Label>
              <Input value={form.license_plate} onChange={e => set('license_plate', e.target.value)} placeholder="ABC-1234" />
            </div>
            <div className="space-y-1.5">
              <Label>VIN</Label>
              <Input value={form.vin} onChange={e => set('vin', e.target.value)} placeholder="1HGBH41JXMN109186" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Fuel Type</Label>
              <Select value={form.fuel_type} onValueChange={v => set('fuel_type', v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {FUEL_TYPES.map(f => <SelectItem key={f} value={f} className="capitalize">{f}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Color</Label>
              <Input value={form.color} onChange={e => set('color', e.target.value)} placeholder="White" />
            </div>
          </div>

          <hr className="border-border" />

          {/* Operations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Assigned Driver</Label>
              <Input value={form.assigned_driver} onChange={e => set('assigned_driver', e.target.value)} placeholder="Driver name" />
            </div>
            <div className="space-y-1.5">
              <Label>Current Mileage</Label>
              <Input type="number" value={form.current_mileage} onChange={e => set('current_mileage', e.target.value)} placeholder="45000" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Last Service Date</Label>
              <Input type="date" value={form.last_service_date} onChange={e => set('last_service_date', e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Next Service Date</Label>
              <Input type="date" value={form.next_service_date} onChange={e => set('next_service_date', e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Insurance Expiry</Label>
              <Input type="date" value={form.insurance_expiry} onChange={e => set('insurance_expiry', e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Registration Expiry</Label>
              <Input type="date" value={form.registration_expiry} onChange={e => set('registration_expiry', e.target.value)} />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Notes / Maintenance History</Label>
            <textarea
              value={form.notes}
              onChange={e => set('notes', e.target.value)}
              placeholder="Any additional notes..."
              rows={3}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={saving} className="bg-primary text-primary-foreground">
              {saving ? 'Saving...' : vehicle ? 'Update Vehicle' : 'Add Vehicle'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}