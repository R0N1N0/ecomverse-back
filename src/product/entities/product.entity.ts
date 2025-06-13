export class ProductEntity {
  id_product: number;
  name: string;
  description?: string;
  price: number;
  creationDate: Date;
  DeletedDate?: Date;
  state: string;

  constructor(partial: Partial<ProductEntity>) {
    if (partial.id_product !== undefined) this.setIdProduct(partial.id_product);
    if (partial.name !== undefined) this.setName(partial.name);
    if (partial.description !== undefined)
      this.setDescription(partial.description);
    if (partial.price !== undefined) this.setPrice(partial.price);
    if (partial.creationDate !== undefined)
      this.setCreationDate(partial.creationDate);
    if (partial.DeletedDate !== undefined)
      this.setDeletedDate(partial.DeletedDate);
    if (partial.state !== undefined) this.setState(partial.state);
  }

  getIdProduct() {
    return this.id_product;
  }
  setIdProduct(value: number) {
    this.id_product = value;
  }

  getName() {
    return this.name;
  }
  setName(value: string) {
    this.name = value;
  }

  getDescription() {
    return this.description;
  }
  setDescription(value: string) {
    this.description = value;
  }

  getPrice() {
    return this.price;
  }
  setPrice(value: number) {
    this.price = value;
  }

  getCreationDate() {
    return this.creationDate;
  }
  setCreationDate(value: Date) {
    this.creationDate = value;
  }

  getDeletedDate() {
    return this.DeletedDate;
  }
  setDeletedDate(value: Date) {
    this.DeletedDate = value;
  }

  getState() {
    return this.state;
  }
  setState(value: string) {
    this.state = value;
  }
}
