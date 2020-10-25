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
  'TOU-DR1': {
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
  },
  'TOU-DR2': {
    'weekday': {
      'off-peak': [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,22,23],
      'on-peak': [17,18,19,20,21]
    },
    'weekend': {
      'off-peak': [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,22,23],
      'on-peak': [17,18,19,20,21]
    }    
  }
}

/**
 * Calculate current SDGE time of use
 * 
 * @param {String} plan - sdge plan
 * @param {Number} time - hour of day
 * @param {Number} day - day of the week
 * 
 * @return {String} - SDGE time of use
*/
const calculateTimeofUse = (plan, time, day) => {
  if ( day === 0 || day === 6 ) {
    for (const tier in tiers[plan].weekend) {
      if ( tiers[plan].weekend[tier].includes(time) ) {
        return tier;
      }
    }
  } else {
    for (const tier in tiers[plan].weekday) {
      if ( tiers[plan].weekday[tier].includes(time) ) {
        return tier;
      }
    }
  }
}

class TimeOfUse extends HTMLElement {
  set hass(hass) {
    if (!this.content) {
      const card = document.createElement('ha-card');
      card.style.color = '#FFFFFF';
      card.header = 'SDGE Time of Use';
      card.style.color = '#FFFFFF';
      this.content = document.createElement('div');
      this.content.style.padding = '0 16px 16px';
      card.appendChild(this.content);
      this.appendChild(card);
      
      // Energy plan
      const energyPlan = this.config.plan;
      
      // Time of use
      const now = new Date();
      const currentDate = getCurrentDate(now);
      const timeOfUse = calculateTimeofUse(energyPlan, now.getHours(), now.getDay());
        
      if ( timeOfUse === 'super-off-peak' ) {
        card.style.background = '#b1bf4a';
      } else if ( timeOfUse === 'off-peak' ) {
        card.style.background = '#40ae49';
      } else {
        card.style.background = '#f68d1e';
      }
      
      this.content.innerHTML = `
        <div>
          ${currentDate}
          <br>
          <h1 style="text-transform: uppercase; text-align: center;">${timeOfUse}</h1>
        </div>
      `;
    }
  }

  setConfig(config) {
    if (!config.plan) {
      throw new Error('You need to define a plan');
    }
    this.config = config;
  }

  // The height of your card. Home Assistant uses this to automatically
  // distribute all cards over the available columns.
  getCardSize() {
    return 3;
  }
}

customElements.define('time-of-use', TimeOfUse);
