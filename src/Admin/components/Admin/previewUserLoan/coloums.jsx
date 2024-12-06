import { AiOutlineEye } from "react-icons/ai";
import { FaRegEyeSlash } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import { Button } from "@material-ui/core";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { Admintoken, adminServerURl } from "../../../../../serverURL";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { getUserLoans } from "../../../../redux/loansSlice";

const handleApprove = async (data) => {
  const res = await axios.post(`${adminServerURl}/aprrove-loan`, data, {
    headers: {
      Authorization: `Bearer ${Admintoken}`,
    },
  });
  if (res.data) {
    toast.success(res.data.message)
    window.location.reload()
  }
  return res.data
}

export const columns = (userId) => [

  { field: "SNo", headerName: "SNo.", minWidth: 100, flex: 0.3 },
  {
    field: "terms",
    headerName: "Total Terms",
    type: "text",
    minWidth: 120,
    flex: 0.6,
  },

  {
    field: "isLoanApproved",
    headerName: "Loan Approved",
    type: "text",
    minWidth: 120,
    flex: 0.6,
    renderCell: (params) => {
      return (
        <>
          <span>
            {params.row.isApproved ?
              <span className="bg-green-300 p-2 rounded">Approved</span>
              :
              <span className="bg-red-300 p-2 rounded" >Pending</span>
            }
          </span>
        </>
      );
    },
  },
  {
    field: "isPaid",
    headerName: "Loan",
    type: "text",
    minWidth: 120,
    flex: 0.6,
    renderCell: (params) => {
      return (
        <>
          <span>
            {params.row.isPaid ?
              <span className="bg-green-300 p-2 rounded">Paid</span>
              :
              <span className="bg-red-300 p-2 rounded" >UnPaid</span>
            }
          </span>
        </>
      );
    },
  },
  {
    field: " ",
    flex: 0.4,
    minWidth: 150,
    headerName: "Action",
    sortable: false,
    renderCell: (params) => {
      console.log(params.row)
      return (
        <>
          <Link to={`/admin/preview-terms/${params.row.userId}/${params.row.id}`}>
            <Button>
              <AiOutlineEye size={20} color="black" />
            </Button>
          </Link>

          <Button onClick={() => handleApprove({ userId: userId, loanId: params.row.id, aprroved: true })}>
            <IoCheckmarkCircleOutline size={20} color="black" />
          </Button>
        </>
      );
    },
  },
];