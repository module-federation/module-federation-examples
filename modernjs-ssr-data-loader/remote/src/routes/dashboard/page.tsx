import { FC } from 'react';
import './dashboard.css';

const DashboardPage: FC = () => {
  // Mock data - would typically come from an API
  const dashboardData = {
    stats: [
      { label: 'Total Revenue', value: '$12,875', trend: '+12%' },
      { label: 'Active Users', value: '1,234', trend: '+8%' },
      { label: 'Pending Tasks', value: '42', trend: '-5%' },
      { label: 'Projects', value: '8', trend: '+2%' }
    ],
    recentActivity: [
      { id: 1, type: 'task', message: 'New task assigned: Update documentation', time: '2 hours ago' },
      { id: 2, type: 'comment', message: 'Sarah commented on Project Alpha', time: '4 hours ago' },
      { id: 3, type: 'project', message: 'Project Beta deployment completed', time: '1 day ago' },
      { id: 4, type: 'alert', message: 'System maintenance scheduled', time: '2 days ago' }
    ],
    quickActions: [
      { icon: '📝', label: 'New Task' },
      { icon: '👥', label: 'Team Chat' },
      { icon: '📊', label: 'Reports' },
      { icon: '⚙️', label: 'Settings' }
    ]
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      
      <div className="stats-grid">
        {dashboardData.stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-header">
              <h3>{stat.label}</h3>
              <span className={`trend ${stat.trend.startsWith('+') ? 'positive' : 'negative'}`}>
                {stat.trend}
              </span>
            </div>
            <div className="stat-value">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-section recent-activity">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            {dashboardData.recentActivity.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className="activity-content">
                  <p>{activity.message}</p>
                  <span className="activity-time">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-section quick-actions">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            {dashboardData.quickActions.map((action, index) => (
              <button key={index} className="action-button">
                <span className="action-icon">{action.icon}</span>
                <span className="action-label">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 