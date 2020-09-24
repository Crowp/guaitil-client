import { createSelector } from 'reselect';
import { getProductType } from '../../utils/ProductType';

class ProductSelector {
  static selectProducts(products) {
    return ProductSelector._createTableRows(products);
  }

  static _createTableRows(models) {
    return models.map(({ productPrice, ...model }) => ({
      id: model.id,
      name: model.name,
      description: model.description,
      status: model.status,
      productType: getProductType(model.productType),
      productCost: `₡ ${productPrice.cost}`
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
      label: `${model.id} - ${model.name}`,
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
