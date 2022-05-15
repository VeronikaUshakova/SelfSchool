export class Material {
  private readonly _idMaterial: number = 0;
  private readonly _urlMaterial: string = '';
  private readonly _fileMaterial: Uint8Array = new Uint8Array(0);

  constructor(idMaterial: number, urlMaterial: string, fileMaterial: Uint8Array) {
    this._idMaterial = idMaterial;
    this._urlMaterial = urlMaterial;
    this._fileMaterial = fileMaterial;
  }

  public get idMaterial(): number {
    return this._idMaterial;
  }

  public get urlMaterial(): string {
    return this._urlMaterial;
  }

  public get fileMaterial(): Uint8Array {
    return this._fileMaterial;
  }
}
