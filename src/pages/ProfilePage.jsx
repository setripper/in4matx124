import { useState } from 'react';
import AppShell, { PageHeader, Panel } from '../components/AppShell.jsx';

export default function ProfilePage() {
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <AppShell variant="employee" activeKey="settings">
      <PageHeader title="PROFILE SETTINGS" />

      <div className="profile-layout">
        <Panel title="Profile Picture" className="profile-picture-panel">
          <div className="profile-photo">
            <span>JD</span>
            <button type="button" aria-label="Change profile picture">
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M5 8h3l1.5-2h5L16 8h3v10H5z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
                <circle cx="12" cy="13" r="3" fill="none" stroke="currentColor" strokeWidth="1.8" />
              </svg>
            </button>
          </div>
          <div className="profile-photo-actions">
            <button className="button button-primary compact-button" type="button">Upload New</button>
            <button className="button button-secondary compact-button" type="button">Remove</button>
          </div>
        </Panel>

        <Panel title="Personal Information" className="profile-form-panel">
          <div className="profile-form-grid">
            <label htmlFor="first-name">FIRST NAME</label>
            <label htmlFor="last-name">LAST NAME</label>
            <input id="first-name" defaultValue="John" />
            <input id="last-name" defaultValue="Doe" />

            <label htmlFor="profile-email">EMAIL</label>
            <label htmlFor="profile-phone">PHONE</label>
            <input id="profile-email" defaultValue="john.doe@company.com" />
            <input id="profile-phone" defaultValue="(555) 123-4567" />

            <label htmlFor="employee-id">EMPLOYEE ID</label>
            <label htmlFor="profile-address">ADDRESS</label>
            <input disabled id="employee-id" defaultValue="EMP12345" />
            <input id="profile-address" defaultValue="123 Main Street" />

            <label htmlFor="profile-city">CITY</label>
            <label htmlFor="profile-state">STATE</label>
            <input id="profile-city" defaultValue="New York" />
            <select id="profile-state" defaultValue="">
              <option value="" disabled />
              <option>New York</option>
              <option>California</option>
              <option>Texas</option>
            </select>

            <label htmlFor="profile-zip">ZIP</label>
            <label htmlFor="profile-department">DEPARTMENT</label>
            <input id="profile-zip" defaultValue="10001" />
            <input disabled id="profile-department" defaultValue="Sales" />

            <label htmlFor="profile-position">POSITION</label>
            <span />
            <input disabled id="profile-position" defaultValue="Sales Representative" />
          </div>
        </Panel>

        <Panel title="Password & Security" className="profile-form-panel">
          <div className="profile-form-grid">
            <label htmlFor="current-password">CURRENT PASSWORD</label>
            <label htmlFor="new-password">NEW PASSWORD</label>
            <input id="current-password" type="password" defaultValue="password" />
            <input id="new-password" type="password" placeholder="New password" />

            <label htmlFor="confirm-new-password">CONFIRM PASSWORD</label>
            <span />
            <input id="confirm-new-password" type="password" placeholder="Confirm password" />
          </div>
          <div className="password-requirements">
            <strong>Password Requirements</strong>
            <p>At least 8 characters with uppercase, lowercase, number, and symbol.</p>
          </div>
          <label className="wire-check-row profile-two-factor" htmlFor="two-factor">
            <input
              checked={twoFactor}
              id="two-factor"
              onChange={() => setTwoFactor((current) => !current)}
              type="checkbox"
            />
            <span>Enable two-factor authentication (2FA)</span>
          </label>
        </Panel>

        <Panel title="Emergency Contact" className="profile-form-panel">
          <div className="profile-form-grid">
            <label htmlFor="contact-name">NAME</label>
            <label htmlFor="contact-relationship">RELATIONSHIP</label>
            <input id="contact-name" defaultValue="Jane Doe" />
            <input id="contact-relationship" defaultValue="Spouse" />

            <label htmlFor="contact-phone">PHONE</label>
            <label htmlFor="contact-email">EMAIL</label>
            <input id="contact-phone" defaultValue="(555) 987-6543" />
            <input id="contact-email" defaultValue="jane.doe@email.com" />
          </div>
        </Panel>

        <div className="profile-save-row">
          <button className="button button-secondary compact-button" type="button">Cancel</button>
          <button className="button button-primary compact-button" type="button">Save Changes</button>
        </div>
      </div>
    </AppShell>
  );
}
