export const formatTimestampToDate = (milliseconds: number) => {
    const date = new Date(milliseconds);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
}

export const activeCar = (status: number, startDate: number, endDate: number) => {
    const newDate = new Date().getTime();
    if (status == 0 && newDate >= startDate && newDate <= endDate) {
        return true;
    }

    return false;
}

export const formatDate = (date: (Date | '' | string)) => {
    if (!date) return "Нет данных";
    return new Date(date).toLocaleDateString("ru-RU");
};