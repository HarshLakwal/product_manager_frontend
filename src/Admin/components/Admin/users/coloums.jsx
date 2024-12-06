import { AiOutlineEye } from "react-icons/ai";
import { FaRegEyeSlash } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

export const columns = [
  { field: "SNo", headerName: "SNo.", minWidth: 100, flex: 0.3 },
  {
    field: "name",
    headerName: "Name",
    type: "text",
    minWidth: 150,
    flex: 0.8,
  },
  {
    field: "loan",
    headerName: "Total Loans",
    type: "text",
    minWidth: 120,
    flex: 0.6,
  },
  {
    field: "creditScore",
    headerName: "Credit Score",
    type: "text",
    minWidth: 120,
    flex: 0.6,
  },
  // {
  //   field: "isLoanApproved",
  //   headerName: "Loan Approved",
  //   type: "text",
  //   minWidth: 120,
  //   flex: 0.6,
  //   renderCell: (params) => {
  //     return (
  //       <>
  //         <span>
  //           {params.row.isLoanApproved ?
  //             <span className="bg-green-300 p-2 rounded">Approved</span>
  //             :
  //             <span className="bg-red-300 p-2 rounded" >Pending</span>
  //           }
  //         </span>
  //       </>
  //     );
  //   },
  // },
  // {
  //   field: "isPaid",
  //   headerName: "Loan",
  //   type: "text",
  //   minWidth: 120,
  //   flex: 0.6,
  //   renderCell: (params) => {
  //     return (
  //       <>
  //         <span>
  //           {params.row.isPaid ?
  //             <span className="bg-green-300 p-2 rounded">Paid</span>
  //             :
  //             <span className="bg-red-300 p-2 rounded" >UnPaid</span>
  //           }
  //         </span>
  //       </>
  //     );
  //   },
  // },
  {
    field: " ",
    flex: 0.4,
    minWidth: 100,
    headerName: "Action",
    sortable: false,
    renderCell: (params) => {

      return (
        <>

          <Link to={`/admin/preview-loan/${params.row.id}`}>
            <Button>
              <AiOutlineEye size={20} color="black" />
            </Button>
          </Link>

          {/* <Button>
            <IoCheckmarkCircleOutline size={20} color="black" />
          </Button> */}

        </>
      );
    },
  },
];