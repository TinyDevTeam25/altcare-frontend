import React from 'react';
import ArrowRightIcon from '../assets/Line-arrow-right.svg';
import AccountSettingsIcon from '../assets/candle-2.svg';


const AccountSettingsSection = () => {
  return (
    <section className="profile-section">
      <h2 className="section-heading">
        <AccountSettingsIcon className="section-icon settings" />


        Account Settings
      </h2>
      <p className="account-settings-description">Manage your password, email preferences, and notification settings.</p>
      <div className="account-settings-links">
        <a href="#" className="account-settings-link">
          <span>Change Password</span>
          {/* 🌟 RENDER YOUR ARROW RIGHT ICON HERE 🌟 */}
          {/* Choose ONE of the options below and delete the others/fallback: */}

          {/* Option 1: If using an SVG component */}
          <ArrowRightIcon className="arrow-icon" />

          {/* Option 2: If using an image file */}
          {/* <img src={ArrowRightImage} alt="Arrow Right" className="arrow-icon" /> */}

          {/* Fallback/Placeholder if no icon is provided */}
          {/* <span className="arrow-icon flex items-center justify-center font-bold">&rarr;</span> */}
        </a>
        <a href="#" className="account-settings-link">
          <span>Manage Notifications</span>
          {/* 🌟 RENDER YOUR ARROW RIGHT ICON HERE 🌟 */}
          {/* Choose ONE of the options below and delete the others/fallback: */}

          {/* Option 1: If using an SVG component */}
          <ArrowRightIcon className="arrow-icon" />

          {/* Option 2: If using an image file */}
          {/* <img src={ArrowRightImage} alt="Arrow Right" className="arrow-icon" /> */}

          {/* Fallback/Placeholder if no icon is provided */}
          {/* <span className="arrow-icon flex items-center justify-center font-bold">&rarr;</span> */}
        </a>
      </div>
    </section>
  );
};

export default AccountSettingsSection;