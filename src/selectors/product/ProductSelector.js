import { createSelector } from 'reselect';
import { getProductType } from '../../utils/ProductType';
import { sortProductsByUpdateAtDate } from '../../utils/sortByUpdateAtDate';
import StringUtil from '../../utils/StringUtil';

class ProductSelector {
  static filterProducts(products, productType) {
    const data = products.filter(product => product.productDescription.productType === productType);
    return data;
  }
  static selectProducts(products) {
    return ProductSelector._createTableRows(products);
  }
  static selectProductFood(products) {
    return ProductSelector.filterProducts(products, 'FOOD');
  }
  static selectProductHandicraft(products) {
    return ProductSelector.filterProducts(products, 'HANDICRAFT');
  }
  static selectProductOthers(products) {
    return ProductSelector.filterProducts(products, 'OTHER');
  }
  static _createTableRows(models) {
    const productsSorted = sortProductsByUpdateAtDate(models);
    return productsSorted.map(({ productDescription, ...model }) => ({
      id: model.id,
      name: productDescription.name,
      description: StringUtil.cutWordFromMaxSize(productDescription.description, 50) + '...',
      status: model.status === true ? 'activo' : 'inactivo',
      productType: getProductType(productDescription.productType),
      productCost: `₡ ${productDescription.productPrice.cost}`,
      show: model.showProduct
    }));
  }
  static _localToOptionRows(models) {
    return models.map(({ ...model }) => ({
      value: model.id,
      label: `${model.name} - ${model.localType}`
    }));
  }
  static selectLocalToOptions(locals) {
    return ProductSelector._localToOptionRows(locals);
  }

  static _productToOptionRows(models) {
    return models.map(({ ...model }) => ({
      label: `${model.productDescription.id} - ${model.productDescription.name}`,
      value: model.id
    }));
  }

  static selectProductToOptions(product) {
    return ProductSelector._productToOptionRows(product);
  }
}

export default ProductSelector;

export const selectProducts = createSelector(
  state => state.products,
  ProductSelector.selectProducts
);

export const selectLocalsOptions = createSelector(
  state => state.locals,
  ProductSelector.selectLocalToOptions
);

export const selectProductOptions = createSelector(
  state => state.products,
  ProductSelector.selectProductToOptions
);
export const selectProductFood = createSelector(
  state => state.products,
  ProductSelector.selectProductFood
);
export const selectProductHandicraft = createSelector(
  state => state.products,
  ProductSelector.selectProductHandicraft
);
export const selectProductOthers = createSelector(
  state => state.products,
  ProductSelector.selectProductOthers
);
