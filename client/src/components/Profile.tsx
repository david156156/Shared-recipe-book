import { FunctionComponent } from "react";

interface ProfileProps {}

const Profile: FunctionComponent<ProfileProps> = () => {
  return (
    <div className="container" style={{ minHeight: "100vh", padding: "2rem" }}>
      <h1>הפרופיל שלי</h1>
      <div className="profile-placeholder">
        <p>תוכן הפרופיל יופיע כאן בקרוב...</p>
      </div>
    </div>
  );
};

export default Profile;
