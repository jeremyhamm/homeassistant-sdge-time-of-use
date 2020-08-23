class ContentCardExample extends HTMLElement {
  set hass(hass) {
    if (!this.content) {
      const card = document.createElement('ha-card');
      card.header = 'SDGE Current Tier';
      this.content = document.createElement('div');
      this.content.style.padding = '0 16px 16px';
      card.appendChild(this.content);
      this.appendChild(card);
    }

    const entityId = this.config.entity;
    const state = hass.states[entityId];
    const stateStr = state ? state.state : 'unavailable';

    this.content.innerHTML = `
      The state of ${entityId} is ${stateStr}!
      <br><br>
      <img src="https://cdn.shopify.com/s/files/1/1465/8230/files/whitney-mnt_large.jpg?v=1475605534">
    `;
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error('You need to define an entity');
    }
    this.config = config;
  }

  // The height of your card. Home Assistant uses this to automatically
  // distribute all cards over the available columns.
  getCardSize() {
    return 3;
  }
}

customElements.define('time-of-use', ContentCardExample);