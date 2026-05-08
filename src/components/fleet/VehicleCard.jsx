import React from 'react';
import { Truck, Calendar, Gauge, User, AlertTriangle, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format, isPast, differenceInDays } from 'date-fns';

const STATUS_STYLES = {
  available: 'bg-green-100 text-green-800',
  in_service: 'bg-blue-100 text-blue-800',
  maintenance: 'bg-yellow-100 text-yellow-800',
  out_of_service: 'bg-red-100 text-red-800',
  retired: 'bg-gray-100 text-gray-600',
};

function isExpiringSoon(dateStr) {
  if (!dateStr) return false;
  return differenceInDays(new Date(dateStr), new Date()) <= 30;
}

export default function VehicleCard({ vehicle, onEdit, onDelete }) {
  const alerts = [];
  if (vehicle.next_service_date && (isPast(new Date(vehicle.next_service_date)) || isExpiringSoon(vehicle.next_service_date))) {
    alerts.push('Service due');
  }
  if (vehicle.insurance_expiry && (isPast(new Date(vehicle.insurance_expiry)) || isExpiringSoon(vehicle.insurance_expiry))) {
    alerts.push('Insurance expiring');
  }
  if (vehicle.registration_expiry && (isPast(new Date(vehicle.registration_expiry)) || isExpiringSoon(vehicle.registration_expiry))) {
    alerts.push('Registration expiring');
  }

  return (
    <div className="bg-card border border-border rounded-xl p-5 space-y-4">
      {/* Top row */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-heading font-bold text-lg">{vehicle.vehicle_id}</span>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${STATUS_STYLES[vehicle.status] || 'bg-gray-100 text-gray-600'}`}>
              {vehicle.status.replace('_', ' ')}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </p>
        </div>
        <Truck className="w-8 h-8 text-muted-foreground/40 shrink-0" />
      </div>

      {/* Info rows */}
      <div className="space-y-2 text-sm">
        {vehicle.license_plate && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Plate</span>
            <span className="font-medium">{vehicle.license_plate}</span>
          </div>
        )}
        {vehicle.assigned_driver && (
          <div className="flex justify-between">
            <span className="text-muted-foreground flex items-center gap-1"><User className="w-3.5 h-3.5" /> Driver</span>
            <span className="font-medium">{vehicle.assigned_driver}</span>
          </div>
        )}
        {vehicle.current_mileage && (
          <div className="flex justify-between">
            <span className="text-muted-foreground flex items-center gap-1"><Gauge className="w-3.5 h-3.5" /> Mileage</span>
            <span className="font-medium">{vehicle.current_mileage.toLocaleString()} mi</span>
          </div>
        )}
        {vehicle.next_service_date && (
          <div className="flex justify-between">
            <span className="text-muted-foreground flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Next Service</span>
            <span className={`font-medium ${isPast(new Date(vehicle.next_service_date)) ? 'text-red-600' : isExpiringSoon(vehicle.next_service_date) ? 'text-yellow-600' : ''}`}>
              {format(new Date(vehicle.next_service_date), 'MMM d, yyyy')}
            </span>
          </div>
        )}
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {alerts.map(alert => (
            <span key={alert} className="inline-flex items-center gap-1 text-xs bg-yellow-50 text-yellow-700 border border-yellow-200 px-2 py-0.5 rounded-full">
              <AlertTriangle className="w-3 h-3" /> {alert}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2 pt-2 border-t border-border">
        <Button variant="outline" size="sm" className="flex-1" onClick={() => onEdit(vehicle)}>
          <Edit className="w-3.5 h-3.5 mr-1.5" /> Edit
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={() => confirm('Delete this vehicle?') && onDelete(vehicle.id)}
        >
          <Trash2 className="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>
  );
}