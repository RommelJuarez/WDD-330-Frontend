export default class Alert {
  async loadAlerts() {
    try {
      const response = await fetch("./json/alerts.json");
      if (!response.ok) throw new Error("Failed to load alerts JSON");

      const alerts = await response.json();
      this.displayAlerts(alerts);
    } catch (err) {
      //console.error('Error loading alerts:', err);
    }
  }

  displayAlerts(alerts) {
    if (!alerts || alerts.length === 0) return;

    const section = document.createElement("section");
    section.classList.add("alert-list");

    alerts.forEach((alert) => {
      const p = document.createElement("p");
      p.textContent = alert.message;
      p.style.backgroundColor = alert.background;
      p.style.color = alert.color;
      section.appendChild(p);
    });

    document.querySelector("main").prepend(section);
  }
}

const alertManager = new Alert();
alertManager.loadAlerts();
