import React from 'react';
import { useParams } from 'react-router-dom';
import JoinForm from './JoinForm';
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
  const ClubComponent = clubComponents[clubName.toLowerCase()] || (() => <h2>Club not found</h2>);

  return (
    <div className="club-page">
      <ClubComponent />
      <h3>Join the Club</h3>
      <JoinForm clubName={clubName} />
    </div>
  );
}

export default ClubPage;