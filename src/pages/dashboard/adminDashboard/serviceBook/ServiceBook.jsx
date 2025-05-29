
import { Input, Modal, Pagination, Radio, Select, Space, Table } from "antd";
import { useEffect, useState } from "react";
import CustomLoading from "../../shared/CustomLoading";
import { useGetdashboardServiceBookApiQuery, useUpdatedashboardServiceBookApiMutation } from "../../../../redux/dashboardFeatures/dashboardServiceBookApi";
import { EyeOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { closeserviceModalOpenOne, serviceModalOpenOne } from "../../../../features/modal/modalSlice";
import toast from "react-hot-toast";

const ServiceBook = () => {
  const [selectId, setSelectId] = useState('')
  const [selectValue, setSelectValue] = useState(null)
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const serviceModalOne = useSelector((state) => state.modal.serviceModalOne);
  const dispatch = useDispatch();
  const { data, isLoading, refetch } = useGetdashboardServiceBookApiQuery();
  const [updatedashboardServiceBookApi] = useUpdatedashboardServiceBookApiMutation()

  const serviceBookData = data?.data?.data



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


  // =========== service modal one start ==============
  const showServiceModalOne = (record) => {
    setSelectId(record?.id)
    setSelectValue(record?.book_status)
    dispatch(serviceModalOpenOne())

  };



  const serviceModalOkOne = async () => {
    setLoading(true)
    try {
      const res = await updatedashboardServiceBookApi({
        book_id: selectId,
        book_status: selectValue
      }).unwrap()
      if (res?.success === true) {
        toast.success(res?.message)
        dispatch(closeserviceModalOpenOne());
      }
    } catch (errors) {
      console.log(errors)
    } finally {
      setLoading(false)
    }
  };



  const serviceModalCancelOne = () => {
    dispatch(closeserviceModalOpenOne());
  };
  // =========== service modal one end ==============


  const onChange = (e) => {
    setSelectValue(e.target.value)
  }

  console.log(selectId, selectValue)

  if (isLoading) return <CustomLoading />

  return (
    <div className="bg-[#1B2324] p-[20px] rounded-lg">
      <div>
        <div>
          <h2 className="font-semibold font-roboto text-[30px] text-[#ffffff]">
            Service Book
          </h2>
        </div>


        <div className="overflow-x-auto">
          <Table
            dataSource={serviceBookData}
            columns={[
              {
                title: "Name",
                dataIndex: "name",
              },
              {
                title: "Email",
                dataIndex: "email",
              },
              {
                title: "Contact Number",
                dataIndex: "telephone_number",
              },
              {
                title: "Service Time",
                dataIndex: "book_time",
              },
              {
                title: "Created Date",
                dataIndex: "created_at",
                key: 'created_at',
                render: (text) => formatDate(text),
              },
              {
                title: "Book Date",
                dataIndex: "book_date",
              },
              {
                title: "Book Status",
                dataIndex: "book_status",
              },
              {
                title: "Action",
                key: "view",
                render: (_, record) => (
                  <p
                    onClick={() => showServiceModalOne(record)}
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
                ),
              },
            ]}
            pagination={false}
            className="custom-ant-table"
          />
        </div>



        <Modal
          className="custom-ai-modal"
          centered
          open={serviceModalOne}
          onOk={serviceModalOkOne}
          onCancel={serviceModalCancelOne}
          width={500}
          footer={
            <div className="font-roboto flex justify-end md:px-7 pt-[24px]">
              <button
                className="hover:bg-[#A6ABAC] px-6 rounded"
                onClick={serviceModalCancelOne}
              >
                Cancel
              </button>
              <button
                className="bg-[#ffffff] py-2 ml-4 px-6 rounded"
                onClick={serviceModalOkOne}
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
              value={selectValue}
              options={[
                {
                  value: 'Pending',
                  label: <span style={{ color: '#ffff', fontSize: '24px', fontWeight: "600" }}>Pending</span>,
                },
                {
                  value: 'Accepted',
                  label: <span style={{ color: '#ffff', fontSize: '24px', fontWeight: "600" }}>Accepted</span>,
                },
                {
                  value: 'Rejected',
                  label: <span style={{ color: '#ffff', fontSize: '24px', fontWeight: "600" }}>Rejected</span>,
                },
              ]}
            />
          </div>
        </Modal>

        {/* pagination */}
        {/* <div className="flex justify-end pt-4">
          <Pagination
            current={currentPage}
            pageSize={perPage}
            total={data?.data?.total || 0}
            onChange={(page, pageSize) => {
              setCurrentPage(page)
              setPerPage(pageSize)
            }}
          />
        </div> */}
      </div>
    </div>
  );
};

export default ServiceBook;
