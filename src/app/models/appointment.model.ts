// src/app/models/appointment.model.ts
export interface Appointment {
  id?: number; // Optional because it is not required when creating a new appointment
  patientId: number;
  providerId: number;
  appointmentTime: string; // LocalDateTime in ISO string format
  status: string; // e.g., Scheduled, Completed, Canceled
}
