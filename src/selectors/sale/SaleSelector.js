import { createSelector } from 'reselect';
import moment from 'moment';

class SaleSelector {
  static selectSales(sales) {
    return SaleSelector._createTableRows(sales);
  }

  static _createTableRows(models) {
    return models.map(({ productDescription, ...model }) => ({
      id: model.id,
      saleDate: new moment(model.saleDate).format('DD/MM/YYYY'),
      amountSold: model.amountSold,
      productName: productDescription.name
    }));
  }
}

export default SaleSelector;

export const selectSales = createSelector(
  state => state.sales,
  SaleSelector.selectSales
);
