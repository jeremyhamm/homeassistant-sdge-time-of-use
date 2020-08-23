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
const getCurrentDate = () => {
  const now = new Date();
  return `${getDayofWeek(now.getDay())} ${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`
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

    this.content.innerHTML = `
      Today is ${getCurrentDate()}
      <br><br>
      <img src="https://cdn.shopify.com/s/files/1/1465/8230/files/whitney-mnt_large.jpg?v=1475605534">
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