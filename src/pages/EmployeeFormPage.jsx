// src/pages/EmployeeFormPage.js

import React from 'react';

import EmployeeFormContent from '../components/EmployeeFormContent/EmployeeFormContent';
import EmployeeNavigation from '../components/EmployeeNavigation';

export default function EmployeeFormPage() {
  return (
    <div>
      <EmployeeFormContent />
      <EmployeeNavigation value={2} />
    </div>
  );
}
