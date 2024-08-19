# Patient Management System

## Overview

The **Patient Management System** is a web application designed to manage patient records efficiently. The app allows users to add, edit, and search for patients in a user-friendly interface. It supports dynamic form fields, dark mode, and animations for a modern user experience.

## Features

- **Add/Edit Patients**: Easily add new patients or edit existing records through a modal form.
- **Dynamic Fields**: Add custom fields to the patient form dynamically.
- **Search Functionality**: Quickly find patients using a search bar.
- **Dark Mode**: Toggle between light and dark themes.
- **Responsive Design**: The app is fully responsive, adapting to various screen sizes, including mobile devices.
- **Smooth Animations**: Patient cards and buttons feature smooth animations for an enhanced user experience.
- **Notification System**: Users are notified of actions like successful patient addition or errors.

## Technologies Used

- **React**: For building the user interface.
- **Context API**: To manage global states such as patient data and theme preferences.
- **TypeScript**: To enforce type safety throughout the app.
- **Axios**: For making API requests.
- **CSS/SCSS**: For styling the app, including custom animations and themes.
- **Flaticon**: For icons used in the dark mode toggle.

## Folder Structure

- **src/components**: Contains React components like `PatientList`, `PatientCard`, `PatientForm`, `Modal`, and `Notification`.
- **src/context**: Contains context providers (`PatientContext`, `ThemeContext`) for managing global state.
- **src/hooks**: Custom hooks like `usePatients` and `useTheme` to encapsulate logic related to patients and theme management.
- **src/styles**: Contains the CSS files for styling the components.

## Context API

### PatientContext

The `PatientContext` provides a centralized store for managing patient data across the app. It handles API calls for fetching, adding, editing, and searching patients.

### ThemeContext

The `ThemeContext` manages the theme of the app, allowing users to toggle between light and dark modes.

## Custom Hooks

### usePatients

This hook encapsulates the logic related to patient management, including fetching, adding, and updating patient data.

### useTheme

This hook manages the theme of the app, handling the logic for toggling between light and dark modes.

## How to Use

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/patient-management-system.git
   cd patient-management-system

2. **install dependencies**:
   ```bash
   npm install

3. **Run the application**:
   ```bash
   npm run start

1. **Access the application**:
   Open your browser and navigate to http://localhost:3000.

