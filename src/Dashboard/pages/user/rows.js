import moment from 'moment';
export const rows = (data) => {
console.log(data)
  const row = [];
  // let userReferralCount 
  // data?.usersReferralCounts.map((count, index)=> {
  //  userReferralCount = count
  // })
  data &&
    data?.data?.loans?.map((item, index) => {
      row.push({
        id: item._id,
        term: item.terms.length,
        isLoanApproved: item.isLoanApproved,
        isPaid: item.isPaid
      });
    });
  return row
}