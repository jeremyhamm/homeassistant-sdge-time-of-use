/**
 * Translate day of week number to name
 * 
 * @param {Number} - day of week 0-6
 * 
 * @return {String} - day of the week name
*/
const getDayofWeek = (dow) => {
  switch (dow) {
    case 0:
      return 'Sunday';
    case 1:
      return 'Monday';
    case 2:
      return 'Tuesday';
    case 3:
      return 'Wednesday';
    case 4:
      return 'Thursday';
    case 5:
      return 'Friday';
    case 6:
      return 'Saturday';
    }
}

/**
 * Get current date (mm/dd/yyyy)
 * 
 * @return {String}
*/
const getCurrentDate = (date) => {
  return `${getDayofWeek(date.getDay())} ${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

/**
 * SDGE Tiers by day and hour of day
*/
const tiers = {
  'weekday': {
    'super-off-peak': [0,1,2,3,4,5],
    'off-peak': [6,7,8,9,10,11,12,13,14,15,21,22,23],
    'on-peak': [16,17,18,19,20]
  },
  'weekend': {
    'super-off-peak': [0,1,2,3,4,5,6,7,8,9,10,11,12,13],
    'off-peak': [14,15,21,22,23],
    'on-peak': [16,17,18,19,20]
  }
}

/**
 * Calculate current SDGE time of use
 * 
 * @param {Number} - current time
 * 
 * @return {String} - SDGE time of use
*/
const calculateTimeofUse = (time, day) => {
  if ( day === 0 || day === 6 ) {
        
  } else {
    tiers.weekday
  }
}

class ContentCardExample extends HTMLElement {
  set hass(hass) {
    if (!this.content) {
      const card = document.createElement('ha-card');
      card.header = 'SDGE Time of Use';
      this.content = document.createElement('div');
      this.content.style.padding = '0 16px 16px';
      card.appendChild(this.content);
      this.appendChild(card);
    }

    const entityId = this.config.entity;
    const state = hass.states[entityId];
    const stateStr = state ? state.state : 'unavailable';
    
    // Time of use
    const now = new Date();
    const currentDate = getCurrentDate(now);
    const timeOfUse = calculateTimeofUse(now.toTimeString(), now.getDay());

    this.content.innerHTML = `
      Today is ${currentDate}
      <br>
      The current <b>Time of Use</b> is: ${timeOfUse}
    `;
  }

  setConfig(config) {
    this.config = config;
  }

  // The height of your card. Home Assistant uses this to automatically
  // distribute all cards over the available columns.
  getCardSize() {
    return 3;
  }
}

customElements.define('time-of-use', ContentCardExample);