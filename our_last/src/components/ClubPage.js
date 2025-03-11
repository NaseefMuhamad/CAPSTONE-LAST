import React from 'react';
import { useParams } from 'react-router-dom';
import DataScienceClub from '../clubs/DataScienceClub';
import CybersecurityClub from '../clubs/CybersecurityClub';
import RoboticsClub from '../clubs/RoboticsClub';

const clubComponents = {
  datascience: DataScienceClub,
  cybersecurity: CybersecurityClub,
  robotics: RoboticsClub,
};

function ClubPage() {
  const { clubName } = useParams();
  const ClubComponent = clubComponents[clubName.toLowerCase()] || (() => (
    <div className="club-page">
      <header className="club-header">
        <h1>Club Not Found</h1>
      </header>
      <section className="club-section">
        <p>Sorry, we couldn’t find that club. Please check the URL or return to the dashboard.</p>
      </section>
    </div>
  ));

  return <ClubComponent />;
}

export default ClubPage;