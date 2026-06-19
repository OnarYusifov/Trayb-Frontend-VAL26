export class Config {
  brandName = "Trayb";
  brandLogoUrl = "/assets/misc/icon.webp";
  serverEndpoint = "https://data.trayb.az";
  overlayAccessToken = "";
  redirectUrl = "https://trayb.az";
  sponsorImageUrls: string[] = [];
  sponsorImageRotateSpeed = 5000; // in milliseconds

  mapbanEndpoint = "https://mapban-socket.trayb.az";
  // mapbanEndpoint = "http://localhost:11201";

  attackerColorPrimary = "#fd4756";
  attackerColorSecondary = "#ff4557";
  attackerColorShieldCurrency = "#ff838f";

  defenderColorPrimary = "#21fec5";
  defenderColorSecondary = "#61eab6";
  defenderColorShieldCurrency = "#61eab6";

  statsEndpoint = "https://stats.trayb.az";
  // statsEndpoint = "http://localhost:31000";

  extrasEndpoint = "https://extras.trayb.az";
  // extrasEndpoint = "http://localhost:5101";

  public constructor(init?: Partial<Config>) {
    Object.assign(this, init);
  }
}
