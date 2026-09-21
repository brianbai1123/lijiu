export function groupByCategory<
  C extends { id: string },
  T extends { category: C["id"] },
>(categories: C[], list: T[]) {
  return categories
    .map((category) => ({
      category,
      items: list.filter((item) => item.category === category.id),
    }))
    .filter((group) => group.items.length > 0);
}
