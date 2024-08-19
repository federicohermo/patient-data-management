import React, { useState } from 'react';
import PatientList from './components/PatientList.tsx';
import PatientForm from './components/PatientForm.tsx';
import Modal from './components/Modal.tsx';
import Notification from './components/Notification.tsx';
import Loading from './components/Loading.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';
import { useTheme } from './hooks/useTheme.tsx';
import { PatientProvider, Patient } from './context/PatientContext.tsx';
import { usePatients } from './hooks/usePatients.tsx';
import './styles/App.css';

const AppContent: React.FC = () => {
  const { patients, addPatient, editPatient } = usePatients();
  const { isDarkMode, toggleTheme } = useTheme();

  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddPatient = () => {
    setSelectedPatient(null); // Clear the selected patient for a new entry
    setIsModalOpen(true);
  };

  const handleEditPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (data: Patient) => {
    setLoadingMessage(selectedPatient ? `Wait while we edit ${data.name} information...` : `Wait while we add ${data.name} as a patient...`);
    setLoading(true);
    setIsModalOpen(false);

    try {
      if (selectedPatient) {
        await editPatient(data);
        setNotification({ message: 'Patient updated successfully.', type: 'success' });
      } else {
        await addPatient(data);
        setNotification({ message: 'Patient added successfully.', type: 'success' });
      }
    } catch (error) {
      console.error('Error saving patient data:', error);
      setNotification({ message: 'Failed to save patient data.', type: 'error' });
    } finally {
      setLoading(false);
      setSelectedPatient(null);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleNotificationClose = () => {
    setNotification(null);
  };

  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : ''}`}>
      {loading && <Loading message={loadingMessage} />}
      {patients.length !== 0 && (
        <header className={`header ${isDarkMode ? 'dark-mode' : ''}`}>
          <h1 className={`title ${isDarkMode ? 'dark-mode' : ''}`}>Patient Management System</h1>
          <span className="flex-row">
            <input
              type="text"
              className={`searchBar ${isDarkMode ? 'dark-mode' : ''}`}
              placeholder="Search patients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className={`addButton ${isDarkMode ? 'dark-mode' : ''}`} onClick={handleAddPatient}>
              Add New Patient
            </button>
            <button className={`darkModeToggleButton ${isDarkMode ? 'dark-mode' : ''}`} onClick={toggleTheme}>
              <img
                src={isDarkMode ? 'https://img.icons8.com/material-outlined/24/ffffff/sun.png' : 'https://img.icons8.com/?size=100&id=36612&format=png&color=000000'}
                alt={isDarkMode ? 'Light Mode' : 'Dark Mode'}
                className={`darkModeIcon ${isDarkMode ? 'dark-mode' : ''}`}
              />
            </button>
          </span>
        </header>
      )}
      <PatientList
        patients={patients}
        onEditPatient={handleEditPatient}
        searchQuery={searchQuery}
        darkMode={isDarkMode} // Pass darkMode to PatientList if needed
      />
      <Modal isOpen={isModalOpen} onClose={handleCancel} size={"medium"} darkMode={isDarkMode}>
        <div className="formContainer">
          <PatientForm
            initialData={selectedPatient}
            onSubmit={handleFormSubmit}
            onCancel={handleCancel}
            darkMode={isDarkMode}
          />
        </div>
      </Modal>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={handleNotificationClose}
        />
      )}
    </div>
  );
};

const App: React.FC = () => (
  <ThemeProvider>
    <PatientProvider>
      <AppContent />
    </PatientProvider>
  </ThemeProvider>
);

export default App;
