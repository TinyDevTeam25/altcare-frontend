import React from "react";
// Import the icon files. They will be used as URLs in <img> tags.
import arrowRightIconUrl from "../../assets/Line-arrow-right.svg";
import accountSettingsIconUrl from "../../assets/candle-2.svg";

const AccountSettingsSection = () => {
  return (
    <section className="profile-section">
      <h2 className="section-heading">
        {/* THIS IS THE FIX: Use an <img> tag */}
        <img
          src={accountSettingsIconUrl}
          alt="Account Settings"
          className="section-icon settings"
        />
        Account Settings
      </h2>
      <p className="account-settings-description">
        Manage your password, email preferences, and notification settings.
      </p>
      <div className="account-settings-links">
        <a href="#" className="account-settings-link">
          <span>Change Password</span>
          {/* THIS IS THE FIX: Use an <img> tag */}
          <img src={arrowRightIconUrl} alt="Go" className="arrow-icon" />
        </a>
        <a href="#" className="account-settings-link">
          <span>Manage Notifications</span>
          {/* THIS IS THE FIX: Use an <img> tag */}
          <img src={arrowRightIconUrl} alt="Go" className="arrow-icon" />
        </a>
      </div>
    </section>
  );
};

export default AccountSettingsSection;