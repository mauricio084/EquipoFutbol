export class Configure {
  private static config: any = null;
  private static status: number;

  public static init() {
    this.loadConfigure('./assets/constantes/config.json');
  }

  public static loadConfigure(filePath: string): void {
    const request = new XMLHttpRequest();
    request.open('GET', filePath, false);
    request.send();
    if (request.status === 200) {
      this.config = JSON.parse(request.responseText);
    }
    this.status = request.status;
  }

  public static getIpPeticiones(): string {
    return `${this.config.IP}`;
  }
}
