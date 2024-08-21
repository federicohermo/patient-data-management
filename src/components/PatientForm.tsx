// src/components/PatientForm.tsx

import React, { useState, ChangeEvent} from 'react';
import { Patient } from '../context/PatientContext';
import Modal from "./Modal"
import '../styles/PatientForm.css';

interface PatientFormProps {
  initialData?: Patient | null;
  onSubmit: (data: Patient) => void;
  onCancel: () => void;
  darkMode?: boolean;
}

const PatientForm: React.FC<PatientFormProps> = ({ initialData, onSubmit, onCancel, darkMode }) => {
  const [formData, setFormData] = useState<Patient>(initialData || { id: '', name: '', description: '' });
  const [additionalFields, setAdditionalFields] = useState<{ [key: string]: string }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newFieldName, setNewFieldName] = useState('');
  const [modalError,setModalError] = useState<string | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAdditionalFieldChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setAdditionalFields({ ...additionalFields, [e.target.name]: e.target.value });
  };

  const handleAddField = () => {
    setIsModalOpen(true);
  };

  const handleModalSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent form submission

    if (newFieldName.trim() === '') {
      setModalError('Field Name is required');
      return;
    }
    setAdditionalFields({ ...additionalFields, [newFieldName]: '' });
    setIsModalOpen(false);
    setNewFieldName('');
    setModalError(null);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.id) newErrors.id = 'Valid id is required';
    if (!formData.website) newErrors.website = 'Website URL is required';
    if (!formData.description) newErrors.description = 'Description is required';
    initialData && Object.keys(initialData).map((key) => {
      if (!formData[key].trim()) newErrors[key] = key.charAt(0).toUpperCase() + key.slice(1) + ' is required';
      return newErrors;
    })
    additionalFields && Object.keys(additionalFields).map((key) => {
      if (!additionalFields[key].trim()) newErrors[key] = key.charAt(0).toUpperCase() + key.slice(1) + ' is required';
      return newErrors;
    })
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent form submission

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return; // Prevent form submission if there are validation errors
    }
  
    // Merge additionalFields into formData
    const newFormData = { ...formData, ...additionalFields };
    
    onSubmit(newFormData);  // Pass the combined data back to the parent component
  };

  return (
    <form onSubmit={handleSubmit} className={`form ${darkMode ? 'dark-mode' : ''}`}>
      {initialData ? Object.keys(initialData).map((key) => {
        return(key !== "createdAt" &&
          <div className={`formGroup ${darkMode ? 'dark-mode' : ''}`}>
            <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
            <input
              type="text"
              id={key}
              name={key}
              value={formData[key]}
              onChange={handleInputChange}
              className={errors[key] ? "errorInput" : ''}
            />
            {errors[key] && <p className="errorMessage">{errors[key]}</p>}
          </div>
        )
      })
      : 
      <>
      <div className={`formGroup ${darkMode ? 'dark-mode' : ''}`}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className={errors.name ? "errorInput" : ''}
        />
        {errors.name && <p className="errorMessage">{errors.name}</p>}
      </div>

      <div className={`formGroup ${darkMode ? 'dark-mode' : ''}`}>
        <label htmlFor="id">ID</label>
        <input
          type="text"
          id="id"
          name="id"
          value={formData.id}
          onChange={handleInputChange}
          className={errors.id ? "errorInput" : ''}
        />
        {errors.id && <p className="errorMessage">{errors.id}</p>}
      </div>

      <div className={`formGroup ${darkMode ? 'dark-mode' : ''}`}>
        <label htmlFor="website">Website URL</label>
        <input
          type="text"
          id="website"
          name="website"
          value={formData.website}
          onChange={handleInputChange}
          className={errors.website ? "errorInput" : ''}
        />
        {errors.website && <p className="errorMessage">{errors.website}</p>}
      </div>

      <div className={`formGroup ${darkMode ? 'dark-mode' : ''}`}>
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className={errors.description ? "errorInput" : ''}
        />
        {errors.description && <p className="errorMessage">{errors.description}</p>}
      </div>
      </>}

      {Object.keys(additionalFields).map((fieldName) => (
        <div className={`formGroup ${darkMode ? 'dark-mode' : ''}`}>
        <label htmlFor={fieldName}>{fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}:</label>
        <input
          id={fieldName}
          name={fieldName}
          value={formData[fieldName]}
          onChange={handleAdditionalFieldChange}
          className={errors[fieldName] ? "errorInput" : ''}
        />
        {errors[fieldName] && <p className="errorMessage">{errors[fieldName]}</p>}
        </div>
      ))}
      {initialData ? 
      <button type="button" className={`addFieldButton ${darkMode ? 'dark-mode' : ''}`} onClick={handleAddField}>
        Add Field
      </button> 
      : null}

      <div className={`formActions ${darkMode ? 'dark-mode' : ''}`}>
        <button type="submit" className={`submitButton ${darkMode ? 'dark-mode' : ''}`} onClick={validateForm}>Submit</button>
        <button type="button" onClick={onCancel} className={`cancelButton ${darkMode ? 'dark-mode' : ''}`}>Cancel</button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} size={"small"} darkMode={darkMode}>
        <div className={`form ${darkMode ? 'dark-mode' : ''}`}>
          <div className={`formGroup ${darkMode ? 'dark-mode' : ''}`}>
            <label htmlFor="newField">Field Name:</label>
            <input
              type="text"
              id="newField"
              value={newFieldName}
              onChange={(e) => setNewFieldName(e.target.value)}
              className={modalError ? "errorInput" : ''}
            />
            {modalError && <p className='errorMessage'>{modalError}</p>}
          </div>
          <div className={`formActions ${darkMode ? 'dark-mode' : ''}`}>
            <button type="button" className={`submitButton ${darkMode ? 'dark-mode' : ''}`} onClick={handleModalSubmit}>+</button>
          </div>
        </div>
      </Modal>
    </form>
  );
};

export default PatientForm;

