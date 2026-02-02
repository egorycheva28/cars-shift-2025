export const bodyTypeOptions = [
    { value: '', label: '' },
    { value: 'sedan', label: 'Седан' },
    { value: 'suv', label: 'Внедорожник' },
    { value: 'coupe', label: 'Купе' },
    { value: 'hatchback', label: 'Хэтчбек' },
    { value: 'cabriolet', label: 'Кабриолет' }
];

export const brandOptions = [
    { value: '', label: '' },
    { value: 'Haval', label: 'Haval' },
    { value: 'Hyundai', label: 'Hyundai' },
    { value: 'Volkswagen', label: 'Volkswagen' },
    { value: 'Kia', label: 'Kia' },
    { value: 'Geely', label: 'Geely' },
    { value: 'Mercedes', label: 'Mercedes' },
    { value: 'Garden car', label: 'Садовая тачка' },
    { value: 'Grocery cart', label: 'Продуктовая тележка' },
    { value: 'Haier', label: 'Стиральная машина' },
    { value: 'Invalid', label: 'Инвалидное кресло' }
];

export const colors = [
    { name: '', value: 'conic-gradient(indigo, violet,red, orange, yellow, green, blue)' },
    { name: 'black', value: '#000000' },
    { name: 'white', value: '#FFFFFF' },
    { name: 'red', value: '#FF0000' },
    { name: 'blue', value: '#0000FF' },
    { name: 'grey', value: '#808080' },
    { name: 'silver', value: '#C0C0C0' },
    { name: 'orange', value: '#FFA500' }
];

export const translateTransmission = {
    'automatic': 'Автомат',
    'manual': 'Механика'
}

export const translateSteering = {
    'left': 'Левый',
    'right': 'Правый'
}

export const translateBodyType = {
    'sedan': 'Седан',
    'suv': 'Внедорожник',
    'coupe': 'Купе',
    'hatchback': 'Хэтчбек',
    'cabriolet': 'Кабриолет'
}

export const translateColor = {
    'black': 'Черный',
    'white': 'Белый',
    'red': 'Красный',
    'silver': 'Серебряный',
    'blue': 'Синий',
    'grey': 'Серый',
    'orange': 'Оранжевый'
}

export const translateStatus: { [key: number]: string } = {
    0: 'Создана',
    1: 'Отменена'
}