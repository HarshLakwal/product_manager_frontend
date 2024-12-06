import React from "react";
import AdminPreviewTermsPage from "../components/Admin/previewUserTerms/AdminPreviewUserTermsPage";
import Navbar from "../../UserDashboard/components/Sheared/Navbar";

const AdminDashboardPreviewUserTermsPage = () => {
  return (
    <div>
     
      <div className="w-full flex flex-col" style={{background:'#e7e7e7'}}>
      <Navbar />
        <div className="items-start justify-between  w-full h-[auto]">
          <div className="w-[80px] 800px:w-[330px]">
          </div>
          <AdminPreviewTermsPage/>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPreviewUserTermsPage;
