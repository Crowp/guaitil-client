export let sortByUpdateAtDate = (items = []) => {
  const locals = [...items];
  let membersSort = locals.sort((item1, item2) => {
    return new Date(item2.updatedAt) - new Date(item1.updatedAt);
  });
  return membersSort;
};

export let sortLocalsByUpdateAtDate = (items = []) => {
  const locals = [...items];
  let localsSort = locals.sort((local1, local2) => {
    return new Date(local2.localDescription.updatedAt) - new Date(local1.localDescription.updatedAt);
  });
  return localsSort;
};

export let sortActivityByUpdateAtDate = (items = []) => {
  const activities = [...items];
  let activitiesSorted = activities.sort((activity1, activity2) => {
    return new Date(activity2.activityDescription.updatedAt) - new Date(activity1.activityDescription.updatedAt);
  });
  return activitiesSorted;
};

export let sortReservationByUpdateAtDate = (items = []) => {
  const reservations = [...items];
  let reservationsSorted = reservations.sort((reservation1, reservation2) => {
    return new Date(reservation2.updatedAt) - new Date(reservation1.updatedAt);
  });
  return reservationsSorted;
};

export let sortAdministratorsByUpdateAtDate = (items = []) => {
  const administrators = [...items];
  let reservationsSorted = administrators.sort((administrator1, administrator2) => {
    console.log(administrator1);
    //  return new Date(reservation2.updatedAt) - new Date(reservation1.updatedAt);
  });
  return reservationsSorted;
};

export let sortProductsByUpdateAtDate = (items = []) => {
  const products = [...items];
  let productsSorted = products.sort((product1, product2) => {
    return new Date(product2.productDescription.updatedAt) - new Date(product1.productDescription.updatedAt);
  });
  return productsSorted;
};

export let sortSalesByUpdateAtDate = (items = []) => {
  const sales = [...items];
  let salesSorted = sales.sort((sale1, sale2) => {
    return new Date(sale2.updatedAt) - new Date(sale1.updatedAt);
  });
  return salesSorted;
};
