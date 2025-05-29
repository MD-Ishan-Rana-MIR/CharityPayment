import { EyeOutlined } from "@ant-design/icons";
import { Input, Pagination, Select, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { useGetDashboardSubscribersApiQuery } from "../../../../redux/dashboardFeatures/dashboardSubscribersApi";
import CustomLoading from "../../shared/CustomLoading";
import { FiSearch } from "react-icons/fi";

const Subscribers = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const { data, refetch, isLoading } = useGetDashboardSubscribersApiQuery({ page: currentPage, per_page: perPage, search: searchText })

  const allSubscriberData = data?.data?.data
  // const subscribedDate = '2025-05-01 03:45:25'.split(' ')[0];


  // This function handles the search input change and refetches the data
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    setCurrentPage(1); // Reset to the first page whenever the search term changes
  };

  useEffect(() => {
    refetch(); // Refetch the data when searchText, currentPage, or perPage changes
  }, [searchText, currentPage, perPage, refetch]);


  if (isLoading) return <CustomLoading />

  return (
    <div className="bg-[#1B2324] p-[20px] rounded-lg">
      <div>
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3 pb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <h2 className="font-semibold font-roboto text-[30px] text-[#ffffff]">
              Subscribers
            </h2>
            <div>
              <h2 className="text-[#ffffff]">( {allSubscriberData?.length} )</h2>
            </div>
          </div>

          <div>
            <div className="relative w-fit">
              <input
                type="search"
                id="gsearch"
                name="gsearch"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search email..."
                className="bg-[#1B2324] text-[#ffff] border px-4 py-2 pl-10 rounded-md w-[300px]"
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#ffff]" />
            </div>

          </div>
        </div>

        <div className="overflow-x-auto">
          <Table
            dataSource={allSubscriberData}
            columns={[
              {
                title: "Email",
                dataIndex: "email",
              },
              {
                title: "Subscribed on",
                dataIndex: "subscribed_on",
                render: (text) => text?.split(" ")[0],
              },
            ]}
            pagination={false}
            className="custom-ant-table"
            loading={isLoading}
          />
        </div>

        {/* pagination */}
        <div className="flex justify-end pt-4">
          <Pagination
            current={currentPage}
            pageSize={perPage}
            total={data?.data?.total || 0}
            onChange={(page, pageSize) => {
              setCurrentPage(page)
              setPerPage(pageSize)
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Subscribers;
