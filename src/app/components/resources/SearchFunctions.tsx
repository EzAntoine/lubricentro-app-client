const search = <T,>(
  searchText: string,
  items: T[],
  setFilteredItems: React.Dispatch<React.SetStateAction<T[]>>
) => {
  const filteredOrders = items.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  setFilteredItems(filteredOrders);
};

export default search;
