// src/context/PatientContext.tsx

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

export interface Patient {
  [key: string]: any; // Supports additional fields
}

interface PatientContextType {
  patients: Patient[];
  addPatient: (patient: Patient) => Promise<void>;
  editPatient: (patient: Patient) => Promise<void>;
}

export const PatientContext = createContext<PatientContextType | undefined>(undefined);

interface PatientProviderProps {
  children: ReactNode;
}

export const PatientProvider: React.FC<PatientProviderProps> = ({ children }) => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get<Patient[]>('https://63bedcf7f5cfc0949b634fc8.mockapi.io/users');
        setPatients(response.data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, []);

  const addPatient = async (newPatient: Patient) => {
    try {
      await axios.post('https://63bedcf7f5cfc0949b634fc8.mockapi.io/users', newPatient);
      setPatients((prevPatients) => [...prevPatients, newPatient]);
    } catch (error) {
      console.error('Error adding patient:', error);
    }
  };

  const editPatient = async (updatedPatient: Patient) => {
    try {
      await axios.put(`https://63bedcf7f5cfc0949b634fc8.mockapi.io/users/${updatedPatient.id}`, updatedPatient);
      setPatients((prevPatients) =>
        prevPatients.map((patient) =>
          patient.id === updatedPatient.id ? updatedPatient : patient
        )
      );
    } catch (error) {
      console.error('Error editing patient:', error);
    }
  };

  return (
    <PatientContext.Provider value={{ patients, addPatient, editPatient }}>
      {children}
    </PatientContext.Provider>
  );
};
