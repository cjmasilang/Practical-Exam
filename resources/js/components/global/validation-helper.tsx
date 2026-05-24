export const isDuplicate = (
    data: any[] = [],
    field: string,
    value: string,
    excludeId?: number | string
) => {
    return data?.some(item =>
        item?.[field]?.toString().toLowerCase() === value?.toLowerCase() &&
        item?.id !== excludeId
    ) ?? false;
};
