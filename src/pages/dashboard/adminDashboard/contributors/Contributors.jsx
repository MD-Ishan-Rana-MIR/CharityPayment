import { EyeOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Pagination, Select, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closeModalOpenOne,
  closeModalOpenThree,
  closeModalOpenTwo,
  modalOpenOne,
  modalOpenThree,
  modalOpenTwo,
} from "../../../../features/modal/modalSlice";
import { useGetDashboardContibutorsApiQuery, useSingleGetDashboardContibutorsApiQuery, useSingleGetDashboardContibutorsAuctionApiQuery } from "../../../../redux/dashboardFeatures/getDashboardContibutors";
import CustomLoading from "../../shared/CustomLoading";
import { FiSearch } from "react-icons/fi";

const Contributors = () => {
  const [selectId, setSelectId] = useState(null)
  const [singleAuctionId, setSingleAuctionId] = useState(null)
  const [searchText, setSearchText] = useState("");
  const [selectValue, stetSelectValue] = useState("Pending");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const dispatch = useDispatch();
  const modalOne = useSelector((state) => state.modal.modalOne);
  const modalTwo = useSelector((state) => state.modal.modalTwo);
  const modalThree = useSelector((state) => state.modal.modalThree);

  // const { data, isLoading,refetch } = useGetDashboardContibutorsApiQuery({ page: currentPage, per_page: perPage, search: searchText });

  const { data, isLoading, refetch } = useGetDashboardContibutorsApiQuery({ search: searchText, status: selectValue, per_page: perPage, page: currentPage });
  const { data: singleData } = useSingleGetDashboardContibutorsApiQuery({ id: selectId })
  const { data: singleContAuction } = useSingleGetDashboardContibutorsAuctionApiQuery({ auction_id: singleAuctionId })




  let contibutorActionData = [];
  let contibutorActionStatus = [];


  const singleContibutorAuction = singleContAuction?.data // single-contibutor-aucction data
  const allContibutorData = data?.data?.contributors
  const userData = singleData?.data?.user
  const auctiionSearch = singleData?.data?.contributors?.map((item) => {
    contibutorActionData.push(item.auction)
    contibutorActionStatus.push(item.status)

  })

  console.log(singleData)



  // ============== modal one start =========
  const showModalOne = (id) => {
    setSelectId(id)
    dispatch(modalOpenOne());
  };


  const handleOkOne = () => {
    dispatch(closeModalOpenOne);
  };
  const handleCancelOne = () => {
    dispatch(closeModalOpenOne());
  };

  // ============== modal one end ===========

  // ============== modal two start ============
  const showModalTwo = (id) => {
    setSingleAuctionId(id)
    dispatch(modalOpenTwo());
    dispatch(closeModalOpenOne());
  };
  const handleOkTwo = () => {
    dispatch(closeModalOpenTwo());
  };
  const handleCancelTwo = () => {
    dispatch(closeModalOpenTwo());
  };
  // ============== modal two end  =============


  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (_, record) => {
        return (
          <div className="flex items-center gap-2">
            <img src={`${import.meta.env.VITE_API_IMAGE_BASE_URL}/${record?.user?.image}`} alt="" className="w-[40px] h-[40px] rounded-full" />
            <p>{record?.user?.name}</p>
          </div>
        )
      }
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (_, record) => record?.user?.email,
    },
    {
      title: "Contact number",
      dataIndex: "contact_number",
      render: (_, record) => record?.auction?.contact_number,
    },
    {
      title: "City",
      dataIndex: "city",
      render: (_, record) => record?.auction?.city,
    },
    {
      title: "Max Bit",
      dataIndex: "max_bit_online",
    },
    {
      title: "Payment status",
      dataIndex: "payment_status",
    },
    {
      title: "Action",
      key: "view",
      render: (_, record) => (
        <div>
          <button onClick={() => showModalOne(record?.id)} className="cursor-pointer">
            {" "}
            <EyeOutlined
              style={{
                color: "#A6ABAC",
                fontSize: "18px",
                cursor: "pointer",
              }}
            />
          </button>
        </div>
      ),
    },
  ]

  const handleSelect = (e) => {
    stetSelectValue(e.target.value)
  };


  useEffect(() => {
    refetch(); // Refetch the data when searchText, currentPage, or perPage changes
  }, [searchText, selectValue, currentPage, perPage, refetch]);


  useEffect(() => {
    document.body.style.overflow =
      modalOne || modalTwo || modalThree
        ? "hidden"
        : "auto";
  }, [modalOne, modalTwo, modalThree ]);



  if (isLoading) return <CustomLoading />
  return (
    <div className="bg-[#1B2324] p-[20px] rounded-lg">
      <div>
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3 pb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-8">
            <h2 className="font-semibold font-roboto text-[30px] text-[#ffffff]">
              Manage contributors
            </h2>
            <div>
              <select name="" id=""
                value={selectValue}
                onChange={handleSelect}
                className="w-[120px] p-2 rounded bg-gray-200">
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Suspended">Suspended</option>
              </select>
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
                placeholder="Search user name"
                className="bg-[#1B2324] text-[#ffff] border px-4 py-2 pl-10 rounded-md w-[300px]"
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#ffff]" />
            </div>

          </div>
        </div>

        <div className="overflow-x-auto">
          <Table
            dataSource={allContibutorData}
            columns={columns}
            pagination={false}
            className="custom-ant-table"
          />
        </div>

        {/* ============== modal components ========== */}
        <div>


          {/* modal one */}
          <Modal
            className="custom-ai-modal"
            centered
            open={modalOne}
            onOk={handleOkOne}
            onCancel={handleCancelOne}
            width={600}
            footer={null}
          >
            <div >
              <div className="flex gap-3 border-b border-gray-600 pb-4">
                <div className="">
                  <img
                    src={`${import.meta.env.VITE_API_IMAGE_BASE_URL}/${userData?.image}`}
                    alt="login logo"
                    className="w-[40px] h-[40px] object-cover rounded-full"
                    onError={(e) => {
                      e.target.onerror = null; // prevent infinite loop
                      e.target.src = '/dashboardPhoto/dashboardLoginLogo.png';
                    }}
                  />
                </div>
                <div className="">
                  <h1 className="text-[24px] font-bold text-[#ffffff]">
                    {userData?.name}
                  </h1>
                  <p className="text-[#D9D9D9]">{userData?.email}</p>
                </div>
              </div>



              <div className="flex justify-between items-center py-4">
                <p className="text-[#ffff] font-bold text-[16px]">
                  Approved auctions
                </p>
                <p className="bg-[#4B5557] w-10 h-8 flex justify-center items-center rounded-full">
                  {contibutorActionData?.length}
                </p>
              </div>

              {/* view section */}
              <div style={{ maxHeight: '400px', overflowY: 'auto', }} className=" pb-4 space-y-6">
                {
                  contibutorActionData?.map((item, index) => {
                    console.log(item)
                    return (
                      <div className="" key={index}>
                        <div className="flex justify-between">
                          <div>
                            <h2 className="text-[#ffffff]">
                              Hearts & Bids Charity Auction for a Cause
                            </h2>
                            <div className="flex items-center gap-2 text-[#A6ABAC]">
                              <span>Price range: ${item?.start_budget} - ${item?.end_budget}</span>
                              <div className="w-2 h-2 rounded-full bg-gray-700"></div>
                              <span className="">{item?.status}</span>
                            </div>
                          </div>
                          <div
                            onClick={() => showModalTwo(item.id)}
                            className="cursor-pointer text-[#1890FF] font-semibold mr-3"
                          >
                            View
                          </div>
                        </div>


                      </div>
                    )
                  })
                }
              </div>
            </div>
          </Modal>


          {/* modal two */}
          <Modal
            className="custom-ai-modal custom-view-modal"
            centered
            open={modalTwo}
            onOk={handleOkTwo}
            onCancel={handleCancelTwo}
            width={1000}
            footer={null}
          >
            <div>
              <div className="flex justify-between gap-4">
                <div className="w-[50%]">
                  <h2 className="text-[24px] md:text-[48px] text-[#ffff] ">
                    {singleContibutorAuction?.title}
                  </h2>
                  <div className="flex items-center gap-1">
                    <span>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M9 2C9 1.44772 9.44772 1 10 1H14C14.5523 1 15 1.44772 15 2C15 2.55228 14.5523 3 14 3H10C9.44772 3 9 2.55228 9 2Z"
                          fill="#E9EBEB"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M15.7071 10.2929C16.0976 10.6834 16.0976 11.3166 15.7071 11.7071L12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071C10.9024 14.3166 10.9024 13.6834 11.2929 13.2929L14.2929 10.2929C14.6834 9.90237 15.3166 9.90237 15.7071 10.2929Z"
                          fill="#E9EBEB"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 7C8.13401 7 5 10.134 5 14C5 17.866 8.13401 21 12 21C15.866 21 19 17.866 19 14C19 10.134 15.866 7 12 7ZM3 14C3 9.02944 7.02944 5 12 5C16.9706 5 21 9.02944 21 14C21 18.9706 16.9706 23 12 23C7.02944 23 3 18.9706 3 14Z"
                          fill="#E9EBEB"
                        />
                      </svg>
                    </span>
                    <p className="text-[#ffff]">
                      Estimated price:<span className="ml-3">
                        ${singleContibutorAuction?.start_budget}  -   ${singleContibutorAuction?.end_budget}
                      </span>
                    </p>
                  </div>

                  <div className="flex  items-center gap-2 pt-[24px]">
                    <div>
                      <img
                        src={`${import.meta.env.VITE_API_IMAGE_BASE_URL}/${singleContibutorAuction?.image}`}
                        alt="photo"
                        className="object-cover w-[40px] h-[40px] rounded-full"
                        onError={(e) => {
                          e.target.onerror = null; // prevent infinite loop
                          e.target.src = '/dashboardPhoto/404.jpg';
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="text-[20px] text-[#ffffff] font-semibold">
                        {singleContibutorAuction?.name}
                      </h3>
                      <h4 className="text-[#E9EBEB]"> {singleContibutorAuction?.email}</h4>
                    </div>
                  </div>

                  <div className="space-y-2 py-6 text-[#fff]">
                    <p><span className="font-semibold">Contact Number</span> : {singleContibutorAuction?.contact_number}</p>

                    <p><span className="font-semibold">City</span> : {singleContibutorAuction?.city}</p>

                    <p><span className="font-semibold">Address</span> : {singleContibutorAuction?.address}</p>


                    {/* <p><span className="font-semibold">Update Date</span> : {formatDate(singleContibutorAuction.updated_at)}</p> */}
                  </div>

                  <div className="bg-[#4B5557] text-[#ffffff] p-4 rounded-lg max-w-[433px] mt-4">
                    <p>
                      {singleContibutorAuction?.description}
                    </p>
                  </div>

                  <div className="pt-4">
                    <h1 className="text-[30px] font-bold text-[#FFFFFF] flex items-center gap-2">
                      $ {singleContibutorAuction?.donate_share}

                    </h1>
                  </div>
                </div>

                <div className="w-[50%]">
                  <img
                    src={`${import.meta.env.VITE_API_IMAGE_BASE_URL}/${userData?.image}`}
                    alt="photo"
                    className="object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/dashboardPhoto/contributors/photo1.png';
                    }}
                  />
                </div>
              </div>
            </div>
          </Modal>
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

export default Contributors;
