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
    Object.assign(this, partial);
  }
}
