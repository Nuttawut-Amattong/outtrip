import React from "react";
import TripForm from "../component/tripcomponent/TripForm";

const CreateTripPage = () => {
  return (
    <div className="create-trip-page">
      <h2>Create New Trip</h2>
      <div className="create-trip-form">
         <TripForm />
      </div>
      
    </div>
  );
};

export default CreateTripPage;
