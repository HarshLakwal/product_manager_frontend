export const rows = (data) => {
  const row = [];
  data &&
    data?.loans?.map((item, index) => {
      row.push({
        id: item._id,
        userId: data.userId._id,
        SNo: index + 1,
        isApproved: item?.isLoanApproved,
        terms: item?.terms?.length,
        isPaid: item.isPaid
      });
    });
  return row
}