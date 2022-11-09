export async function getCategories() {
  const response = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const json = await response.json();
  return json;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  if (categoryId && query) {
    const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
    const json = await response.json();
    return json;
  } if (categoryId) {
    const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`);
    const json = await response.json();
    return json;
  }
  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
  const json = await response.json();
  return json;
}

export async function getProduct(productId) {
  const response = await fetch(`https://api.mercadolibre.com/items/${productId}`);
  const json = await response.json();
  return json;
}
