import { FC } from 'react';
import './profile.css';

const ProfilePage: FC = () => {
  // This would typically come from an API or state management
  const userProfile = {
    name: 'Jane Doe',
    title: 'Senior Software Engineer',
    avatar: 'https://via.placeholder.com/150',
    bio: 'Passionate about building scalable web applications and contributing to open-source projects. Love solving complex problems and mentoring junior developers.',
    stats: {
      projects: 23,
      followers: 1250,
      following: 428
    },
    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS']
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          <img src={userProfile.avatar} alt={userProfile.name} />
        </div>
        <div className="profile-info">
          <h1>{userProfile.name}</h1>
          <h2>{userProfile.title}</h2>
        </div>
      </div>

      <div className="profile-stats">
        <div className="stat-item">
          <span className="stat-value">{userProfile.stats.projects}</span>
          <span className="stat-label">Projects</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{userProfile.stats.followers}</span>
          <span className="stat-label">Followers</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{userProfile.stats.following}</span>
          <span className="stat-label">Following</span>
        </div>
      </div>

      <div className="profile-bio">
        <h3>About Me</h3>
        <p>{userProfile.bio}</p>
      </div>

      <div className="profile-skills">
        <h3>Skills</h3>
        <div className="skills-list">
          {userProfile.skills.map((skill, index) => (
            <span key={index} className="skill-tag">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 