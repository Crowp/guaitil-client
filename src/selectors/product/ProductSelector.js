import { createSelector } from 'reselect';

class ProductSelector {
  static selectProducts(products) {
    return ProductSelector._createTableRows(products);
  }

  static _createTableRows(models) {
    return models.map(({ local, ...model }) => ({
      id: model.id,
      name: model.name,
      description: model.description,
      status: model.status,
      productType: model.productType,
      localName: local.name
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
