import { EyeOutlined } from "@ant-design/icons";
import { Form, Input, Modal, Pagination, Select, Space, Table } from "antd";
import { useGetDashboardDonationTransitionApiQuery } from "../../../../redux/dashboardFeatures/dashboardDonationTransitionApi";
import CustomLoading from "../../shared/CustomLoading";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";

const DonationTransaction = () => {
  const [formOne] = useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [viewDetails, setViewDetails] = useState({});
  const [isModalOpenOne, setIsModalOpenOne] = useState(false);


  const { data, isLoading } = useGetDashboardDonationTransitionApiQuery({ page: currentPage, per_page: perPage, });
  const allDonationTransitions = data?.data?.data



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


  // ============== modal one start =========
  const showModalOne = (record) => {
    setViewDetails(record)
    setIsModalOpenOne(true)
  }


  const handleOkOne = () => {
    setIsModalOpenOne(false)
  };
  const handleCancelOne = () => {
    setIsModalOpenOne(false)
  };

  // ============== modal one end ===========

  console.log(viewDetails)



  useEffect(() => {
    document.body.style.overflow =
      isModalOpenOne
        ? "hidden"
        : "auto";
  }, [isModalOpenOne]);

  if (isLoading) return <CustomLoading />

  return (
    <div className="bg-[#1B2324] p-[20px] rounded-lg">
      <div>
        <div>
          <h2 className="font-semibold font-roboto text-[30px] text-[#ffffff]">
            Transactions
          </h2>
        </div>

        <div className="overflow-x-auto">
          <Table
            dataSource={allDonationTransitions}
            columns={[
              {
                title: "Invoice Id",
                dataIndex: "invoice",
              },
              {
                title: "Name",
                dataIndex: "name",
              },
              {
                title: "Email",
                dataIndex: "email",
              },
              {
                title: "Amount",
                dataIndex: "amount",
              },
              {
                title: "Currency",
                dataIndex: "currency",
              },
              {
                title: "Payment status",
                dataIndex: "payment_status",
                render: (_, record) => (
                  <Space size="middle">
                    <p className={`${record?.payment_status === 'Paid' ? "text-[#658A30]" : "text-[#F79A44]"}`}>
                      {record.payment_status}
                    </p>
                  </Space>
                ),
              },
               {
                title: "Created Date",
                dataIndex: "created_at",
                key: 'created_at',
                render: (text) => formatDate(text),
              },
              {
                title: "Action",
                key: "view",
                render: (_, record) => (
                  <div>
                    <EyeOutlined
                      onClick={() => showModalOne(record)}
                      style={{
                        color: "#A6ABAC",
                        fontSize: "18px",
                        cursor: "pointer",
                      }}
                    />
                  </div>
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
          open={isModalOpenOne}
          onOk={handleOkOne}
          onCancel={handleCancelOne}
          width={700}
          footer={null}
        >
          <Form form={formOne}>
            <div className="pt-8 text-[#ffff] space-y-2">
              <div className="border border-gray-600 rounded-md p-4 flex justify-between text-wrap">
                <p>Invoice Id</p>
                <p>{viewDetails.invoice}</p>
              </div>
              <div className="border border-gray-600 rounded-lg p-4 flex justify-between text-wrap">
                <p>transaction Id</p>
                <p>{viewDetails.transaction_id}</p>
              </div>

              <div className="border border-gray-600 rounded-md p-4 flex justify-between text-wrap">
                <p>Payment Type</p>
                <p>{viewDetails.payment_type}</p>
              </div>

              <div className="border border-gray-600 rounded-md p-4 flex justify-between text-wrap">
                <p>Donation Type</p>
                <p>{viewDetails.donation_type}</p>
              </div>
              <div className="border border-gray-600 rounded-md p-4 flex justify-between text-wrap">
                <p>Frequency</p>
                <p>{viewDetails.frequency}</p>
              </div>
              <div className="border border-gray-600 rounded-md p-4 flex justify-between text-wrap">
                <p>Name</p>
                <p>{viewDetails.name}</p>
              </div>
              <div className="border border-gray-600 rounded-md p-4 flex justify-between text-wrap">
                <p>Email</p>
                <p>{viewDetails.email}</p>
              </div>
              <div className="border border-gray-600 rounded-md p-4 flex justify-between text-wrap">
                <p>Amount</p>
                <p>{viewDetails.amount}</p>
              </div>
              <div className="border border-gray-600 rounded-md p-4 flex justify-between text-wrap">
                <p>Currency</p>
                <p>{viewDetails.currency}</p>
              </div>
              <div className="border border-gray-600 rounded-md p-4 flex justify-between text-wrap">
                <p>Phone Number</p>
                <p>{viewDetails.phone_number}</p>
              </div>
              <div className="border border-gray-600 rounded-md p-4 flex justify-between text-wrap">
                <p>Remark</p>
                {/* <p className="">DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD</p> */}
                <p>{viewDetails.remark}</p>
              </div>
              <div className="border border-gray-600 rounded-md p-4 flex justify-between text-wrap">
                <p>Created At Date</p>
                <p>{formatDate(viewDetails.created_at)}</p>
              </div>
            </div>
          </Form>
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

export default DonationTransaction;
