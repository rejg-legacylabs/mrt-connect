import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Truck, Edit, Trash2, X, Check } from 'lucide-react';
import VehicleCard from '@/components/fleet/VehicleCard';
import VehicleFormModal from '@/components/fleet/VehicleFormModal';

const STATUS_FILTERS = ['all', 'available', 'in_service', 'maintenance', 'out_of_service', 'retired'];

export default function FleetManagement() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);

  const queryClient = useQueryClient();

  const { data: vehicles = [], isLoading } = useQuery({
    queryKey: ['vehicles'],
    queryFn: () => base44.entities.Vehicle.list('-created_date', 100),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Vehicle.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['vehicles'] }),
  });

  const filtered = vehicles.filter(v => {
    const matchesStatus = statusFilter === 'all' || v.status === statusFilter;
    const matchesSearch = !search || 
      `${v.vehicle_id} ${v.make} ${v.model} ${v.license_plate || ''} ${v.assigned_driver || ''}`
        .toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const statusCounts = vehicles.reduce((acc, v) => {
    acc[v.status] = (acc[v.status] || 0) + 1;
    return acc;
  }, {});

  const handleEdit = (vehicle) => {
    setEditingVehicle(vehicle);
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
    setEditingVehicle(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="font-heading font-bold text-3xl">Fleet Management</h1>
              <p className="mt-1 text-primary-foreground/70">Track vehicles, status, and maintenance</p>
            </div>
            <Button
              onClick={() => setShowForm(true)}
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
            >
              <Plus className="w-4 h-4 mr-2" /> Add Vehicle
            </Button>
          </div>

          {/* Stats Strip */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-5 gap-3">
            {['available', 'in_service', 'maintenance', 'out_of_service', 'retired'].map(status => (
              <div key={status} className="bg-white/10 rounded-lg px-4 py-3 text-center">
                <div className="text-2xl font-bold">{statusCounts[status] || 0}</div>
                <div className="text-xs text-primary-foreground/70 capitalize mt-0.5">
                  {status.replace('_', ' ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by ID, make, model, driver..."
              className="pl-9"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {STATUS_FILTERS.map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium capitalize transition-colors ${
                  statusFilter === s
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                {s === 'all' ? 'All' : s.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Vehicle Grid */}
        {isLoading ? (
          <div className="mt-12 text-center text-muted-foreground">Loading fleet...</div>
        ) : filtered.length === 0 ? (
          <div className="mt-12 text-center">
            <Truck className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No vehicles found. Add your first vehicle to get started.</p>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map(vehicle => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                onEdit={handleEdit}
                onDelete={(id) => deleteMutation.mutate(id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <VehicleFormModal
          vehicle={editingVehicle}
          onClose={handleClose}
          onSuccess={() => {
            queryClient.invalidateQueries({ queryKey: ['vehicles'] });
            handleClose();
          }}
        />
      )}
    </div>
  );
}