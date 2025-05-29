import { EyeOutlined } from "@ant-design/icons";
import { Input, Modal, Pagination, Radio, Select, Space, Table } from "antd";
import { EyeIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closeVlounterModalOpenOne,
  closeVlounterModalOpenTwo,
  volunterModalOpenOne,
  volunterModalOpenTwo,
} from "../../../../features/modal/modalSlice";
import { useGetAllVolunterDataQuery, useUpdateVolunterDataMutation } from "../../../../redux/dashboardFeatures/getVolunteersApi";
import CustomLoading from "../../shared/CustomLoading";
import { FiSearch } from "react-icons/fi";
import { usePDF } from 'react-to-pdf';
import toast from "react-hot-toast";

const Volunteers = () => {
  const [searchText, setSearchText] = useState("");
  const [selectValue, stetSelectValue] = useState("Pending");
  const [selectStatus, stetSelectStatus] = useState("Pending");
  const [selectId, setSelectId] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(8);
  const [loading, setLoading] = useState(false)
  const [volunterModalThree, setVolunterModalThree] = useState(false)
  const { targetRef } = usePDF({ filename: 'page.pdf' }); // pdf file download for

  const dispatch = useDispatch();
  const volunteerModalOne = useSelector(
    (state) => state.modal.volunterModalOne
  );
  const volunterModalTwo = useSelector((state) => state.modal.volunterModalTwo);

  const { data, isLoading, refetch } = useGetAllVolunterDataQuery({ page: currentPage, per_page: perPage, search: searchText, status: selectValue });
  const [updateVolunterData] = useUpdateVolunterDataMutation()

  const allVolunterData = data?.data?.data
  const singleVolunterData = allVolunterData?.find(item => item?.id === selectId)



  // date formate function
  const formatDate = (dateString) => {
    if (!dateString) return 'Invalid date';

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid date';

    const parts = new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).formatToParts(date);

    const day = parts.find(p => p.type === 'day')?.value;
    const month = parts.find(p => p.type === 'month')?.value;
    const year = parts.find(p => p.type === 'year')?.value;

    return `${day} ${month}, ${year}`;
  };



  // ====== vounter modal one start ===========
  const volunterModalCancelOne = () => {
    dispatch(closeVlounterModalOpenOne());
  };
  const showVolunterModalOne = () => {
    dispatch(volunterModalOpenOne());
  };
  const volunterModalOkOne = () => {
    dispatch(closeVlounterModalOpenOne());
  };
  // ====== vounter modal one end ===========

  // ====== vounter modal two start ===========
  const showVolunterModalTwo = (id) => {
    setSelectId(id)
    dispatch(volunterModalOpenTwo());
  };
  const volunterModalOkTwo = () => {
    dispatch(closeVlounterModalOpenTwo());
  };

  const volunterModalCancelTwo = () => {
    dispatch(closeVlounterModalOpenTwo());
  };
  // ====== vounter modal two end ===========


  // ====== vounter modal two start ===========
  const showVolunterModalOkThree = (record) => {
    setSelectId(record?.id)
    stetSelectStatus(record?.status)
    setVolunterModalThree(true)
  };


  const volunterModalOkThree = async () => {


    try {
      const res = await updateVolunterData({
        status: selectStatus,
        volunteer_id: selectId,
      }).unwrap()
      console.log(res)
      if (res?.success === true) {
        toast.success(res?.message)
        setVolunterModalThree(false)

      }
    } catch (errors) {
      if (errors) {
        toast.error(errors?.data?.message)
      }
    }
  };







  const volunterModalCancelThree = () => {
    setVolunterModalThree(false)
  };
  // ====== vounter modal two end ===========

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Contact number",
      dataIndex: "contact_number",
    },

    {
      title: "Donated",
      dataIndex: "donated",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: 'Create Date',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text) => formatDate(text),
    },
    {
      title: "Action",
      key: "view",
      render: (_, record) => (
        <Space size="middle">
          <p
            onClick={showVolunterModalOne}
            className="cursor-pointer text-[#DA453F]"
          >
            {record.action}
          </p>
          <p
            onClick={() => showVolunterModalOkThree(record)}
            className="cursor-pointer"
          >
            <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 22V18H20V22H0ZM4 14H5.4L13.2 6.225L11.775 4.8L4 12.6V14ZM2 16V11.75L13.2 0.575C13.3833 0.391667 13.5958 0.25 13.8375 0.15C14.0792 0.05 14.3333 0 14.6 0C14.8667 0 15.125 0.05 15.375 0.15C15.625 0.25 15.85 0.4 16.05 0.6L17.425 2C17.625 2.18333 17.7708 2.4 17.8625 2.65C17.9542 2.9 18 3.15833 18 3.425C18 3.675 17.9542 3.92083 17.8625 4.1625C17.7708 4.40417 17.625 4.625 17.425 4.825L6.25 16H2Z" fill="#A6ABAC" />
            </svg>
          </p>
          <p
            onClick={() => showVolunterModalTwo(record?.id)}
            className="cursor-pointer"
          >
            {" "}
            <EyeOutlined
              style={{
                color: "#A6ABAC",
                fontSize: "18px",
                cursor: "pointer",
              }}
            />
          </p>
        </Space>
      ),
    },
  ]


  const handleSelect = (e) => {
    stetSelectValue(e.target.value)
  };


  const onChange = (e) => {
    stetSelectStatus(e.target.value)
  }



  useEffect(() => {
    refetch(); // Refetch the data when searchText, currentPage, or perPage changes
  }, [searchText, selectValue, selectStatus, currentPage, perPage, refetch]);


  useEffect(() => {
    document.body.style.overflow =
      volunteerModalOne || volunterModalTwo || volunterModalOkThree
        ? "hidden"
        : "auto";
  }, [volunteerModalOne, volunterModalTwo, volunterModalOkThree]);

  if (isLoading) return <CustomLoading />

  return (
    <div className="bg-[#1B2324] p-[20px] rounded-lg">
      <div>
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3 pb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-8">
            <h2 className="font-semibold font-roboto text-[30px] text-[#ffff]">
              Manage volunteer
            </h2>
            <div className="relative z-50">
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
                placeholder="Search name or email"
                className="bg-[#1B2324] text-[#ffff] border px-4 py-2 pl-10 rounded-md w-[300px]"
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#ffff]" />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto relative z-10">
          <Table
            dataSource={allVolunterData}
            columns={columns}
            pagination={false}
            className="custom-ant-table"
            loading={isLoading}
          />
        </div>

        {/* modal Components */}
        <div>
          {/* modal one */}
          <Modal
            className="custom-ai-modal"
            centered
            open={volunteerModalOne}
            onOk={volunterModalOkOne}
            onCancel={volunterModalCancelOne}
            width={500}
            footer={
              <div className="font-roboto flex justify-end gap-x-4 md:px-7 pt-[24px]">
                <button
                  className="hover:bg-[#A6ABAC] px-6 rounded"
                  onClick={volunterModalCancelOne}
                >
                  Cancel
                </button>
                <button
                  className="bg-[#ffffff] py-2 px-4 rounded"
                  onClick={volunterModalOkOne}
                >
                  Yes, suspend
                </button>
              </div>
            }
          >
            <p className="text-[20px]  py-6">
              Are you sure want to suspend this user?
            </p>
            <p className="text-[#A6ABAC] text-[16px]">
              Once you suspend the user is no longer available to use the
              application.
            </p>
          </Modal>

          {/* modal two */}
          <Modal
            className="custom-auction-modal custom-view-modal"
            centered
            open={volunterModalTwo}
            onOk={volunterModalOkTwo}
            onCancel={volunterModalCancelTwo}
            width={500}
            footer={null}
          >
            <div>
              <div className="flex  items-center gap-3 border-b pb-4 border-gray-700">
                <div>
                  <h1 className="text-[14px] font-semibold ">
                    {singleVolunterData?.name}
                  </h1>
                  <p className="">{singleVolunterData?.email}</p>
                </div>
              </div>

              <div className="pt-4">
                <h1 className="text-[20px]  font-semibold">
                  Personal details
                </h1>

                {/* Personal Information */}
                <div className="">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 ">
                    <div className="space-y-2">
                      <p className="text-sm ">Contact number</p>
                      <p className="text-sm ">Location</p>
                      <p className="text-sm ">Joined</p>
                      <p className="text-sm ">Donated</p>
                      <p className="text-sm ">Reason</p>

                    </div>
                    <div className="flex justify-end md:text-end">
                      <div className="space-y-2">
                        <p className="text-sm ">{singleVolunterData?.contact_number}</p>
                        <p className="text-sm ">
                          {singleVolunterData?.location}
                        </p>
                        <p className="text-sm ">{formatDate(singleVolunterData?.created_at)}</p>
                        <p className="text-sm ">{singleVolunterData?.donated}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="">{singleVolunterData?.reason}</p>
                {
                  singleVolunterData?.upload_cv && (
                    <img src={`${import.meta.env.VITE_API_IMAGE_BASE_URL}/${singleVolunterData.upload_cv}`} alt="" className="py-8 object-contain  w-full max-h-[300px]" />
                  )
                }

                {
                  singleVolunterData?.upload_cv !== null && <div className="flex justify-end pt-4">
                    <a
                      href={`${import.meta.env.VITE_API_IMAGE_BASE_URL}/${singleVolunterData?.upload_cv}`}
                      download="CV"
                      className="bg-[#ffff] text-[#403730] py-2 px-6 rounded-lg"
                    >Download Pdf</a>
                  </div>
                }


              </div>
            </div>
          </Modal>
        </div>


        <Modal
          className="custom-ai-modal"
          centered
          open={volunterModalThree}
          onOk={volunterModalOkThree}
          onCancel={volunterModalCancelThree}
          width={500}
          footer={
            <div className="font-roboto flex justify-end md:px-7 pt-[24px]">
              <button
                className="hover:bg-[#A6ABAC] px-6 rounded"
                onClick={volunterModalCancelThree}
              >
                Cancel
              </button>
              <button
                className="bg-[#ffffff] py-2 ml-4 px-6 rounded"
                onClick={volunterModalOkThree}
              >
                {loading ? 'Loading...' : "Save"}
              </button>
            </div>
          }
        >
          <p className="text-[20px] text-[#E9EBEB] py-6">
            Changes Status
          </p>

          <div className="flex justify-center items-center border border-gray-600 rounded-lg py-4">
            <Radio.Group
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
              onChange={onChange}
              value={selectStatus}
              options={[
                {
                  value: 'Pending',
                  label: <span style={{ color: '#ffff', fontSize: '24px', fontWeight: "600" }}>Pending</span>,
                },
                {
                  value: 'Approved',
                  label: <span style={{ color: '#ffff', fontSize: '24px', fontWeight: "600" }}>Approved</span>,
                },
                {
                  value: 'Suspended',
                  label: <span style={{ color: '#ffff', fontSize: '24px', fontWeight: "600" }}>Suspended</span>,
                },
              ]}
            />
          </div>
        </Modal>


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

export default Volunteers;
