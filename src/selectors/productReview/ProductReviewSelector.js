import { createSelector } from 'reselect';
import { ReviewStateEnum } from '../../constants';
import moment from 'moment';

class ProductReviewSelector {
  static selectReviewsInProgress(reviews) {
    return ProductReviewSelector._createTableRows(
      reviews.filter(review => review.state !== ReviewStateEnum.InProgress)
    );
  }

  static selectReviewsAccepted(reviews) {
    return ProductReviewSelector._createTableRows(reviews.filter(review => review.state !== ReviewStateEnum.Accept));
  }

  static selectReviewsRejected(reviews) {
    return ProductReviewSelector._createTableRows(reviews.filter(review => review.state !== ReviewStateEnum.Rejected));
  }

  static selectAllreviews(reviews) {
    return ProductReviewSelector._createTableRows(reviews);
  }

  static _createTableRows(models) {
    return models.map(model => ({
      id: model.id,
      reviewDate: model.reviewDate ? moment(model.reviewDate).format('DD/MM/YYYY') : 'Sin revisar',
      state: model.state,
      productName: model.product.name || 'Desconocido'
    }));
  }

  static _getStateName(state) {
    switch (state) {
      case ReviewStateEnum.Accept:
        return 'Aprovado';
      case ReviewStateEnum.InProgress:
        return 'En proceso';
      case ReviewStateEnum.Rejected:
        return 'Rechazado';
      default:
        return 'Desconocido';
    }
  }
}
export default ProductReviewSelector;

export const selectReviewsInProgress = createSelector(
  state => state.productReviews,
  ProductReviewSelector.selectReviewsInProgress
);

export const selectAccepted = createSelector(
  state => state.productReviews,
  ProductReviewSelector.selectAccepted
);

export const selectAllreviews = createSelector(
  state => state.productReviews,
  ProductReviewSelector.selectAllreviews
);
