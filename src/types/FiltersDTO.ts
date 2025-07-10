export interface FiltersDTO {
    search: string;
    maxPrice: number | '';
    minPrice: number | '';
    transmission: 'automatic' | 'manual' | '';
    bodyType: 'sedan' | 'suv' | 'coupe' | 'hatchback' | 'cabriolet' | '';
    brand: 'Haval' | 'Hyundai' | 'Volkswagen' | 'Kia' | 'Geely' | 'Mercedes' | 'Garden car' | 'Grocery cart' | 'Haier' | 'Invalid' | '';
    color: 'black' | 'white' | 'red' | 'silver' | 'blue' | 'grey' | 'orange' | '';
    limit: number;
    page: number;
}