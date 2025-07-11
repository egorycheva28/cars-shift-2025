export interface Media {
    isCover: boolean;
    url: string;
}

export interface CarDTO {
    id: string;
    bodyType: 'sedan' | 'suv' | 'coupe' | 'hatchback' | 'cabriolet';
    brand: 'Haval' | 'Hyundai' | 'Volkswagen' | 'Kia' | 'Geely' | 'Mercedes' | 'Garden car' | 'Grocery cart' | 'Haier' | 'Invalid';
    color: 'black' | 'white' | 'red' | 'silver' | 'blue' | 'grey' | 'orange';
    location: string;
    media: Media[];
    name: string;
    price: number;
    steering: 'left' | 'right';
    transmission: 'automatic' | 'manual';
}