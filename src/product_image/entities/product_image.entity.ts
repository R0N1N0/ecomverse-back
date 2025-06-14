export class ProductImage {
    id_image: number;
    id_product: number;
    id_variant?: number;
    name: string;
    url: string;
    


    constructor(partial: Partial<ProductImage>) {
        if (partial.id_image !== undefined) this.setIdImage(partial.id_image);
        if (partial.id_product !== undefined) this.setIdProduct(partial.id_product);
        if (partial.id_variant !== undefined) this.setIdVariant(partial.id_variant);
        if (partial.name !== undefined) this.setName(partial.name);
        if (partial.url !== undefined) this.setUrl(partial.url);
    }
    getIdImage() {
        return this.id_image;
    }
    setIdImage(value: number) {
        this.id_image = value;
    }
    getIdProduct() {
        return this.id_product;
    }
    setIdProduct(value: number) {
        this.id_product = value;
    }
    getIdVariant() {
        return this.id_variant;
    }
    setIdVariant(value: number) {
        this.id_variant = value;
    }
    getName() {
        return this.name;
    }
    setName(value: string) {
        this.name = value;
    }
    getUrl() {
        return this.url;
    }
    setUrl(value: string) {
        this.url = value;
    }
}
