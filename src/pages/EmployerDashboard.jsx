import React, { useEffect, useState, useContext } from 'react';
import EmployerNavigation from '../components/EmployerNavigation';

const EmployerJobListingPageContent = () => {
  return (
    <div className="content">
      <h1>Job dashboard</h1>
      <p>
        See how your company and job listings are performing. You can also
        receive tips on how to change the company's culture to make it more
        desireable.
      </p>
    </div>
  );
};

export default function EmployerJobListingPage() {
  return (
    <div>
      <EmployerJobListingPageContent />
      <EmployerNavigation value={0} />
    </div>
  );
}
