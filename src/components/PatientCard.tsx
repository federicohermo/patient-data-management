import React, { useState, useRef, useEffect } from 'react';
import { Patient } from '../context/PatientContext.tsx';
import '../styles/PatientCard.css'; // Assuming CSS Modules for styling

interface PatientCardProps {
  patient: Patient;
  onEdit: () => void;
  className?: string;
  darkMode?: boolean;
}

const PatientCard: React.FC<PatientCardProps> = ({ patient, onEdit, className, darkMode }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const detailsRef = useRef<HTMLDivElement>(null);

  const toggleDescription = () => {
    setIsDescriptionExpanded(prev => !prev);
  };

  const getShortDescription = (description: string) => {
    if (description.length <= 200) {
      return description;
    }
    return isDescriptionExpanded ? description : `${description.slice(0, 200)}...`;
  };

  useEffect(() => {
    if (detailsRef.current) {
      detailsRef.current.style.maxHeight = isExpanded ? `${detailsRef.current.scrollHeight}px` : '0px';
    }
    !isExpanded && setIsDescriptionExpanded(false)
  }, [isExpanded, isDescriptionExpanded]);

  return (
    <div className={`patientCard ${className} ${darkMode ? 'dark-mode' : ''}`} id={`patient-${patient.id}`}>
      <div className="patientHeader">
        <span className="flex-row jBtwn">
          {patient.avatar && <img src={patient.avatar} alt={`${patient.name}'s avatar`} className="avatar" />}
          <div><a className={`${darkMode ? 'dark-mode' : ''}`} href={patient.website}>{patient.name}'s personal website</a></div>
          {patient.avatar ? null : <div style={{height: "7rem"}}></div>}
        </span>
      </div>
      <div className="patientBody"> 
        <h3>{patient.name}</h3>
        
      </div>
      <div className="patientFooter">
        <span className="flex-row jBtwn">
          <button className={`editButton ${darkMode ? 'dark-mode' : ''}`} onClick={onEdit}>Edit</button>
          <button className={`${isExpanded? "expandButton hide":"expandButton"} ${darkMode ? 'dark-mode' : ''}`} onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? "Hide Information" : "Additional Information"} 
            <i className={isExpanded ? "arrow up" : "arrow down"}></i>
          </button>
        </span>
      </div>
      <div
        className={`patientDetails ${isExpanded ? 'expanded' : ''}`}
        ref={detailsRef}
      >
        {Object.keys(patient).map((key) => {
          return(<>
            {
              (key !== "avatar" && key !== "createdAt" && key !== "website" && key !== "name" && patient[key] !== '') ? 
              <>
              <p><b>{key.charAt(0).toUpperCase() + key.slice(1)}:</b> {getShortDescription(patient[key])}</p>
              {patient[key].length > 200 && (
                <button className={`readMoreButton ${darkMode ? 'dark-mode' : ''}`} onClick={toggleDescription}>
                  {isDescriptionExpanded ? "Read less" : "Read more"}
                </button>
              )}
              </> :
              null
            }
          </>)}
        )}
      </div>
    </div>
  );
};

export default PatientCard;
