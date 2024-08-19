// src/components/PatientList.tsx

import React, { useState, useEffect } from 'react';
import PatientCard from './PatientCard.tsx';
import {Patient} from '../context/PatientContext.tsx';
import '../styles/PatientList.css';

interface PatientListProps {
  patients: Patient[];
  onEditPatient: (patient: Patient) => void;
  searchQuery: string;
  darkMode?: boolean;
}

const PatientList: React.FC<PatientListProps> = ({ patients, onEditPatient, searchQuery, darkMode }) => {
  const initialCount: number = 12
  const [visibleCount, setVisibleCount] = useState(initialCount);
  const [fadeIn, setFadeIn] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(true); // Track button visibility
  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (patients.length > 0) {
      setFadeIn(true);
    }
  }, [patients]);

  const handleShowMore = () => {
    setButtonsVisible(false); // Hide buttons during the transition
    setTimeout(() => {
      setVisibleCount((prevCount) => Math.min(prevCount + 6, patients.length));
      setButtonsVisible(true)
    }, 300); // match the duration of the fadeOut animation
  };

  const handleShowLess = () => {
    setButtonsVisible(false); // Hide buttons during the transition
    setFadeIn(false);
    setTimeout(() => {
      setVisibleCount((prevCount) => Math.max(prevCount - 6, 10));
      setFadeIn(true);
      setButtonsVisible(true)
    }, 300); // match the duration of the fadeOut animation
  };

  return (
    <>
    <div className={`patientList ${darkMode ? 'dark-mode' : ''}`}>
      {filteredPatients.slice(0, visibleCount).map((patient) => (
        <div
          key={patient.id}
          className={`${fadeIn ? "fadeIn" : "fadeOut"}`}
        >
            <PatientCard
              patient={patient}
              onEdit={() => onEditPatient(patient)}
              darkMode={darkMode}
            />
        </div>
      ))}
    </div>
    <div className={`buttonContainer ${buttonsVisible ? "show" : ''}`} style={patients.length === 0 || filteredPatients.length < visibleCount ? {display: "none"} : {}}>
        {visibleCount < patients.length && (
          <button
            onClick={handleShowMore}
            className={`showMoreButton ${darkMode ? 'dark-mode' : ''}`}
          >
            Show More
          </button>
        )}
        {visibleCount > initialCount && (
          <button
            onClick={handleShowLess}
            className={`showLessButton ${fadeIn ? "fadeIn" : ''} ${darkMode ? 'dark-mode' : ''}`}
          >
            Show Less
          </button>
        )}
      </div>
    </>
  );
};

export default PatientList;

