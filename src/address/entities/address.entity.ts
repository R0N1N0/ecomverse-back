export class AddressEntity {
  id: number;
  userId: number;
  country: string;
  mobile: string;
  address: string;
  additionalData?: string | null;
  description?: string | null;
  zipCode: string;
  population: string;
  province: string;
  predetermined: boolean;
  creationDate: Date;
  state: string;

  constructor(partial: Partial<AddressEntity>) {
    if (partial.id !== undefined) this.setId(partial.id);
    if (partial.userId !== undefined) this.setIdUser(partial.userId);
    if (partial.country !== undefined) this.setCountry(partial.country);
    if (partial.mobile !== undefined) this.setMobile(partial.mobile);
    if (partial.address !== undefined) this.setAddress(partial.address);
    if (partial.additionalData !== undefined)
      this.setAdditionalData(partial.additionalData);
    if (partial.description !== undefined)
      this.setDescription(partial.description);
    if (partial.zipCode !== undefined) this.setZipCode(partial.zipCode);
    if (partial.population !== undefined)
      this.setPopulation(partial.population);
    if (partial.province !== undefined) this.setProvince(partial.province);
    if (partial.predetermined !== undefined)
      this.setPredetermined(partial.predetermined);
    if (partial.creationDate !== undefined)
      this.setCreationDate(partial.creationDate);
    if (partial.state !== undefined) this.setState(partial.state);
  }

  getId() {
    return this.id;
  }
  setId(value: number) {
    this.id = value;
  }
  getIdUser() {
    return this.userId;
  }
  setIdUser(value: number) {
    this.userId = value;
  }
  getCountry() {
    return this.country;
  }
  setCountry(value: string) {
    this.country = value;
  }
  getMobile() {
    return this.mobile;
  }
  setMobile(value: string) {
    this.mobile = value;
  }
  getAddress() {
    return this.address;
  }
  setAddress(value: string) {
    this.address = value;
  }
  getAdditionalData() {
    return this.additionalData;
  }
  setAdditionalData(value: string) {
    this.additionalData = value;
  }
  getDescription() {
    return this.description;
  }
  setDescription(value: string) {
    this.description = value;
  }
  getZipCode() {
    return this.zipCode;
  }
  setZipCode(value: string) {
    this.zipCode = value;
  }
  getPopulation() {
    return this.population;
  }
  setPopulation(value: string) {
    this.population = value;
  }
  getProvince() {
    return this.province;
  }
  setProvince(value: string) {
    this.province = value;
  }
  getPredetermined() {
    return this.predetermined;
  }
  setPredetermined(value: boolean) {
    this.predetermined = value;
  }
  getCreationDate() {
    return this.creationDate;
  }
  setCreationDate(value: Date) {
    this.creationDate = value;
  }
  getState() {
    return this.state;
  }
  setState(value: string) {
    this.state = value;
  }
}
