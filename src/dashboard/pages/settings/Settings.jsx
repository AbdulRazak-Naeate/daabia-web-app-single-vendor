import React from 'react'
import './settings.css';
import TabsPanel from './tabspanel/TabsPanel'
const Settings = () => {
  return (
    <div className='settings'>
      <div className="settingsTitleContainer">
            <h1 className="SettingsTitle">Settings</h1>
          
            </div>
      <TabsPanel/>
    </div>
  )
}

export default Settings
