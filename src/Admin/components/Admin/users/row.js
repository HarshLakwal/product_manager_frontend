export const rows = (data) => {
  const row = [];
  data &&
    data?.data?.map((item, index) => {
      row.push({
        id: item._id,
        SNo: index + 1,
        name: item?.name,
        creditScore: item?.creditScore,
        loan: item.totalLoans,
        // isLoanApproved: item.isLoanApproved,
        // isPaid: item.isPaid
      });
    });
  return row
}