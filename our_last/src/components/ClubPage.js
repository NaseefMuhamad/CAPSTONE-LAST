import React from "react";
import { useParams } from "react-router-dom";
import DataScienceClub from "../clubs/DataScienceClub";
import CybersecurityClub from "../clubs/CybersecurityClub";
import RoboticsClub from "../clubs/RoboticsClub";
import EnrollmentsTable from '../components/EnrollmentTable';

const clubComponents = {
  datascience: DataScienceClub,
  cybersecurity: CybersecurityClub,
  robotics: RoboticsClub,
};

const ClubNotFound = () => (
  <div className="club-page">
    <header className="club-header">
      <h1>Club Not Found</h1>
    </header>
    <section className="club-section">
      <p>Sorry, we couldn’t find that club. Please check the URL or return to the dashboard.</p>
    </section>
  </div>
);

function ClubPage() {
  const { clubName } = useParams();
  const ClubComponent = clubComponents[clubName?.toLowerCase()] || ClubNotFound;

  return (
    <div className="club-page">
      <header className="club-header">
        <h1>Welcome to the {clubName} Club</h1>
      </header>
      <section className="club-section">
        <ClubComponent />
        <h2>Enrollments</h2>
        {/* Pass the clubName as a prop to EnrollmentsTable */}
        <EnrollmentsTable clubName={clubName} />
      </section>
    </div>
  );
}

export default ClubPage;
