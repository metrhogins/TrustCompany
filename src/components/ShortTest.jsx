import React from "react";
import { useNavigate } from "react-router-dom";

const ShortTest = () => {
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate("/contact");
  };

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      {/* Iframe */}
      <iframe
        title="Forms App"
        allowTransparency={true}
        allowFullScreen={true}
        allow="geolocation; microphone; camera"
        src="https://vc3b3ipj.forms.app/form/6971a722f253df9dcdb8b12d"
        frameBorder="0"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
        }}
      />
    </div>
  );
};

export default ShortTest;
