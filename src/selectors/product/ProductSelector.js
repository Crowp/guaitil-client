import { createSelector } from 'reselect';
import { getProductType } from '../../utils/ProductType';

class ProductSelector {
  static selectProducts(products) {
    return ProductSelector._createTableRows(products);
  }

  static _createTableRows(models) {
    return models.map(({ productDescription, ...model }) => ({
      id: model.id,
      name: productDescription.name,
      description: productDescription.description,
      status: model.status === true ? 'activo' : 'inactivo',
      productType: getProductType(productDescription.productType),
      productCost: `₡ ${productDescription.productPrice.cost}`
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
