// src/app/components/appointment/appointment.component.ts
import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../../services/appointment.service';
import { Appointment } from '../../../models/appointment.model';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  appointments: Appointment[] = [];
  newAppointment: Appointment = { patientId: 0, providerId: 0, appointmentTime: '', status: '' };
  selectedAppointment: Appointment | undefined;
  appointmentToUpdate: Appointment | undefined;

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  // Load all appointments
  loadAppointments(): void {
    this.appointmentService.getAppointments().subscribe(appointments => {
      this.appointments = appointments;
    });
  }

  // Create a new appointment
  createAppointment(): void {
    this.appointmentService.createAppointment(this.newAppointment).subscribe(appointment => {
      this.appointments.push(appointment);
      this.newAppointment = { patientId: 0, providerId: 0, appointmentTime: '', status: '' }; // Reset form
    });
  }

  // View appointment details
  viewAppointment(id: number): void {
    this.appointmentService.getAppointmentById(id).subscribe(appointment => {
      this.selectedAppointment = appointment;
    });
  }

  // Update an existing appointment
  updateAppointment(): void {
    if (this.appointmentToUpdate) {
      this.appointmentService.updateAppointment(this.appointmentToUpdate.id!, this.appointmentToUpdate).subscribe(updatedAppointment => {
        const index = this.appointments.findIndex(appt => appt.id === updatedAppointment.id);
        if (index !== -1) {
          this.appointments[index] = updatedAppointment;
        }
        this.appointmentToUpdate = undefined;
      });
    }
  }

  // Delete an appointment
  deleteAppointment(id: number): void {
    this.appointmentService.deleteAppointment(id).subscribe(() => {
      this.appointments = this.appointments.filter(appt => appt.id !== id);
    });
  }
}
