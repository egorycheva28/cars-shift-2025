export interface FiltersDTO {
    search: string;
    maxPrice: number | '';
    minPrice: number | '';
    transmission: string | 'automatic' | 'manual' | '';
    bodyType: string | 'sedan' | 'suv' | 'coupe' | 'hatchback' | 'cabriolet' | '';
    brand: string | 'Haval' | 'Hyundai' | 'Volkswagen' | 'Kia' | 'Geely' | 'Mercedes' | 'Garden car' | 'Grocery cart' | 'Haier' | 'Invalid' | '';
    color: string | 'black' | 'white' | 'red' | 'silver' | 'blue' | 'grey' | 'orange' | '';
    limit: number;
    page: number;
}