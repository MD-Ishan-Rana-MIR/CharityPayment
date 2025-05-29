import { EyeOutlined } from "@ant-design/icons";
import { Form, Input, InputNumber, Modal, Pagination, Select, Space, Table, Upload } from "antd";
import { EyeIcon, UploadCloud } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  actionModalOpenFour,
  actionModalOpenOne,
  actionModalOpenThree,
  actionModalOpenTwo,
  closeActionModalOpenFour,
  closeActionModalOpenOne,
  closeActionModalOpenThree,
  closeActionModalOpenTwo,
  closeTeamModalOpenFour,
} from "../../../../features/modal/modalSlice";

import CustomLoading from "../../shared/CustomLoading";

import { useForm } from "antd/es/form/Form";
import toast from "react-hot-toast";
import { usePDF } from 'react-to-pdf';
import { useDeleteActionMutation, useGetActionQuery, useSingleGetActionQuery, useUpdateActionMutation, useUpdateActionTwoMutation } from "../../../../redux/dashboardFeatures/dashboardGetActionApi";
import { FiSearch } from "react-icons/fi";



const Auction = () => {
  const [formOne] = useForm();
  const [formFour] = useForm();
  const [selectId, setSelectId] = useState('')
  const [loading, setLoading] = useState(false);
  const [modalThreeData, setModalThreeData] = useState({})
  const [searchText, setSearchText] = useState("");
  const [selectValue, stetSelectValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(8);
  const [ImageFileListOne, setImageFileListOne] = useState([]);
  const [ImageFileListTwo, setImageFileListTwo] = useState([]);

  const { toPDF, targetRef } = usePDF({ filename: 'page.pdf' }); // pdf file download for





  const dispatch = useDispatch();
  const actionModalOne = useSelector((state) => state.modal.actionModalOne);
  const actionModalTwo = useSelector((state) => state.modal.actionModalTwo);
  const actionModalThree = useSelector((state) => state.modal.actionModalThree);
  const actionModalFour = useSelector((state) => state.modal.actionModalFour);
  const { data, isLoading, refetch } = useGetActionQuery({
    search: searchText,
    status: selectValue,
    per_page: perPage,
    page: currentPage,
  });
  const [deleteAction] = useDeleteActionMutation();
  const [updateAction] = useUpdateActionMutation();
  const { data: singleAction, } = useSingleGetActionQuery({ id: selectId })
  const [updateActionTwo] = useUpdateActionTwoMutation()

  const allAuctionData = data?.data?.data
  const updateModalData = singleAction?.data




  useEffect(() => {
    if (updateModalData && updateModalData?.image && updateModalData?.profile) {

      const autionImage = {
        uid: '-2',
        name: 'auction image',
        status: 'done',
        url: `${import.meta.env.VITE_API_IMAGE_BASE_URL}/${updateModalData?.host_profile}`,
      };

      const ProfileImage = {
        uid: '-3',
        name: 'profile image',
        status: 'done',
        url: `${import.meta.env.VITE_API_IMAGE_BASE_URL}/${updateModalData?.thumbnail}`,
      };

      // First set form values
      formFour.setFieldsValue({
        name: updateModalData.name,
        email: updateModalData.email,
        title: updateModalData.title,
        description: updateModalData.description,
        guest_title: updateModalData.guest_title,
        city: updateModalData.city,
        address: updateModalData.address,
        contact_number: updateModalData.contact_number,
        donate_share: updateModalData.donate_share,
        image: [autionImage],
        image: [autionImage, ProfileImage], // ✅ use it after defining
      });

      // Then set image file list
      setImageFileListOne([autionImage]);
      setImageFileListTwo([ProfileImage]);
    }
  }, [updateModalData]);






  //======== action modal one start =========
  const onFinishOne = async (values) => {

    const formData = new FormData();

    formData.append("start_budget", values.start_budget)
    formData.append("end_budget", values.end_budget)
    formData.append("duration", values.duration)
    formData.append("_method", "PUT");

    // console.log(formData.forEach(value => {
    //   console.log(value)
    // }))

    try {
      const res = await updateAction({
        updateInfo: formData,
        auction_id: selectId,
      }).unwrap()

      if (res?.data) {
        toast.success(res?.message)
        formOne.resetFields();
        dispatch(closeActionModalOpenOne());
      }
    }
    catch (errors) {
      toast.error(errors?.data?.message)
    }
  }


  const showActionModalOne = (record) => {
    setSelectId(record?.id)
    dispatch(actionModalOpenOne());
  };

  const actionModalOkOne = () => {
    formOne.submit()

  };
  const actionModalCancelOne = () => {
    dispatch(closeActionModalOpenOne());
  };
  //======== action modal one end =========

  //======== action modal two start =========
  const showActionModalTwo = (record) => {
    setSelectId(record?.id)
    dispatch(actionModalOpenTwo());
  };

  const actionModalOkTwo = async () => {
    try {
      const res = await deleteAction({ id: selectId }).unwrap()
      if (res?.data) {
        refetch()
        toast.success(res?.message)
        dispatch(closeActionModalOpenTwo());
      }
    } catch (errors) {
      toast.error(errors?.message)
    }



  };
  const actionModalCancelTwo = () => {
    dispatch(closeActionModalOpenTwo());
  };
  //======== action modal two end =========

  //======== action modal three start =========
  const showActionModalThree = (record) => {
    setSelectId(record?.id)
    setModalThreeData(record)
    dispatch(actionModalOpenThree());
  };

  const actionModalOkThree = () => {
    dispatch(closeActionModalOpenThree());
  };
  const actionModalCancelThree = () => {
    dispatch(closeActionModalOpenThree());
  };
  //======== action modal three end =========










  //======== action modal four start =========
  const onFinishFour = async (values) => {
    setLoading(true)
    const formData = new FormData();
    if (ImageFileListOne[0]?.originFileObj) {
      formData.append("image", ImageFileListOne[0].originFileObj);
    }

    if (ImageFileListTwo[0]?.originFileObj) {
      formData.append("profile", ImageFileListTwo[0].originFileObj);
    }

    formData.append("title", values.title)
    formData.append("description", values.description)
    formData.append("donate_share", values.donate_share)
    formData.append("name", values.name)
    formData.append("email", values.email)
    formData.append("contact_number", values.contact_number)
    formData.append("city", values.city)
    formData.append("address", values.address)
    formData.append("_method", "PUT");

    // console.log(formData.forEach(value => {
    //   console.log(value)
    // }))

    try {
      const res = await updateActionTwo({
        updateInfoTwo: formData,
        id: selectId
      }).unwrap()
      console.log(res)
      if (res?.data) {
        toast.success(res?.message)
        setImageFileListOne([]);
        setImageFileListTwo([]);
        formFour.resetFields()
        dispatch(closeActionModalOpenFour());
      }
    } catch (errors) {
      toast.error(errors.message);
    } finally {
      setLoading(false)
    }

  }

  const showActionModalFour = (record) => {
    setSelectId(record?.id)
    dispatch(actionModalOpenFour());
  };

  const actionModalOkFour = () => {
    formFour.submit()
    // dispatch(closeActionModalOpenFour());
  };
  const actionModalCancelFour = () => {
    dispatch(closeActionModalOpenFour());
  };
  //======== action modal four end =========


  const handleSelect = (e) => {
    stetSelectValue(e.target.value)
  };


  useEffect(() => {
    refetch(); // Refetch the data when searchText, currentPage, or perPage changes
  }, [searchText, selectValue, perPage, currentPage, refetch]);



  useEffect(() => {
    document.body.style.overflow =
      actionModalOne || actionModalTwo || actionModalThree || actionModalFour
        ? "hidden"
        : "auto";
  }, [actionModalOne, actionModalTwo, actionModalThree, actionModalFour]);

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


  if (isLoading) return <CustomLoading />

  return (
    <div className="bg-[#1B2324] p-[20px] rounded-lg">
      <div>
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3 pb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-10">
            <h2 className="font-semibold font-roboto text-[30px] text-[#ffffff]">
              Manage auction listing
            </h2>
            <div className="relative z-50">
              <select name="" id=""
                value={selectValue}
                onChange={handleSelect}
                className="w-[120px] p-2 rounded bg-gray-200">
                <option value="Pending">Pending</option>
                <option value="Declared">Declared</option>
                <option value="Remove">Remove</option>
              </select>
            </div>
          </div>

          <div className="relative w-fit">
            <input
              type="search"
              id="gsearch"
              name="gsearch"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search title or description"
              className="bg-[#1B2324] text-[#ffff] border px-4 py-2 pl-10 rounded-md w-[300px]"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#ffff]" />
          </div>
        </div>

        {/* 
        // donate_share,
        // status,title, */}
        <div className="overflow-x-auto relative z-10">
          <Table
            dataSource={allAuctionData}
            columns={[
              {
                title: "Name",
                dataIndex: "name",
                render: (_, record) => (
                  <div className="flex items-center gap-2">
                    {record?.profile ? (
                      <img
                        src={`${import.meta.env.VITE_API_IMAGE_BASE_URL}/${record.profile}`}
                        alt=""
                        className="w-[40px] h-[40px] rounded-full"
                      />
                    ) : (
                      <img src="/dashboardPhoto/404.jpg" alt="" className="w-[40px] h-[40px] rounded-full" />
                    )}
                    <p>{record.name}</p>
                  </div>
                ),
              },
              {
                title: "Title",
                dataIndex: "title",
              },
              {
                title: "Description",
                dataIndex: "description",
                render: (text) => {
                  return text?.length > 20 ? text?.slice(0, 25) + "..." : text;
                },
              },
              {
                title: "Start Budget",
                dataIndex: "start_budget",
              },
              {
                title: "End Eudget",
                dataIndex: "end_budget",
              },
              {
                title: "Duration",
                dataIndex: "duration",
                render: (text) => text ?? "N/A",
              },
              {
                title: "Donate Share",
                dataIndex: "donate_share",
              },
              {
                title: "Status",
                dataIndex: "status",
                render: (_, record) => (
                  <div>
                    {record.status}
                  </div>
                ),
              },

              {
                title: "Action",
                key: "view",
                render: (_, record) => (
                  <Space size="middle">
                    <p
                      onClick={() => showActionModalOne(record)}
                      className="text-[#658A30] cursor-pointer"
                    >
                      Declare
                    </p>

                    <p
                      onClick={() => showActionModalFour(record)}
                      className=" cursor-pointer"
                    >
                      <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 22V18H20V22H0ZM4 14H5.4L13.2 6.225L11.775 4.8L4 12.6V14ZM2 16V11.75L13.2 0.575C13.3833 0.391667 13.5958 0.25 13.8375 0.15C14.0792 0.05 14.3333 0 14.6 0C14.8667 0 15.125 0.05 15.375 0.15C15.625 0.25 15.85 0.4 16.05 0.6L17.425 2C17.625 2.18333 17.7708 2.4 17.8625 2.65C17.9542 2.9 18 3.15833 18 3.425C18 3.675 17.9542 3.92083 17.8625 4.1625C17.7708 4.40417 17.625 4.625 17.425 4.825L6.25 16H2Z" fill="#658A30" />
                      </svg>

                    </p>

                    <p
                      onClick={() => showActionModalTwo(record)}
                      className=" cursor-pointer"
                    >
                      <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 1H10.5L9.5 0H4.5L3.5 1H0V3H14M1 16C1 16.5304 1.21071 17.0391 1.58579 17.4142C1.96086 17.7893 2.46957 18 3 18H11C11.5304 18 12.0391 17.7893 12.4142 17.4142C12.7893 17.0391 13 16.5304 13 16V4H1V16Z" fill="#FF5353" />
                      </svg>

                    </p>


                    <p
                      onClick={() => showActionModalThree(record)}
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
            ]}
            pagination={false}
            className="custom-ant-table"
            loading={isLoading}
          />
        </div>

        {/* modal components */}
        {/* modal one */}
        {
          singleAction && <Modal
            className="custom-ai-modal"
            centered
            open={actionModalOne}
            onOk={actionModalOkOne}
            onCancel={actionModalCancelOne}
            width={500}
            footer={
              <div className="font-roboto flex justify-end gap-x-4 md:px-7 pt-[24px]">
                <button
                  className="hover:bg-[#A6ABAC] px-6 rounded"
                  onClick={actionModalCancelOne}
                >
                  Cancel
                </button>
                <button
                  className="bg-[#ffffff] py-2 px-4 rounded"
                  onClick={actionModalOkOne}
                >
                  Yes, declare
                </button>
              </div>
            }
          >
            <div className="">
              <div className="pb-6">
                <h1 className="text-[#E9EBEB] font-semibold text-[20px]">
                  Declare auction
                </h1>
              </div>
              <Form form={formOne} onFinish={onFinishOne}>
                {/* maximum budget */}
                <div>
                  <p className="text-[#fff]">Maximum budget</p>
                  <Form.Item name="start_budget" rules={[
                    { required: true, message: 'Please enter the maximum budget' },
                    {
                      type: 'number',
                      min: 0,
                      message: 'Budget must be a positive number',
                    },
                  ]}>
                    <InputNumber id="dashboard_auction" style={{ width: "100%", height: "40px", backgroundColor: "transparent", WebkitTextFillColor: "#fff", }}
                    />
                  </Form.Item>
                </div>

                {/* minimum budget */}
                <div>
                  <p className="text-[#fff]">Minimum budget</p>
                  <Form.Item name="end_budget" rules={[
                    { required: true, message: 'Please enter the minimum budget' },
                    {
                      type: 'number',
                      min: 0,
                      message: 'Budget must be a positive number',
                    },
                  ]}>
                    <InputNumber id="dashboard_auction" style={{ width: "100%", height: "40px", backgroundColor: "transparent", WebkitTextFillColor: "#fff", }} />
                  </Form.Item>
                </div>
                {/* duration time */}
                <div>
                  <p className="text-[#fff]">Duration time</p>
                  <Form.Item name="duration" rules={[
                    { required: true, message: 'Please enter the duration time' },
                    {
                      type: 'number',
                      min: 1,
                      message: 'Duration must be at least 1',
                    },
                  ]}>
                    <InputNumber id="dashboard_auction" style={{ width: "100%", height: "40px", backgroundColor: "transparent", WebkitTextFillColor: "#fff", }} />
                  </Form.Item>
                </div>
              </Form>
            </div>
          </Modal>
        }

        {/* modal two */}
        <Modal
          className="custom-ai-modal"
          centered
          open={actionModalTwo}
          onOk={actionModalOkTwo}
          onCancel={actionModalCancelTwo}
          width={500}
          footer={
            <div className="font-roboto flex justify-end gap-x-4 md:px-7 pt-[24px]">
              <button
                className="hover:bg-[#A6ABAC] text-[#DA453F] px-6 rounded"
                onClick={actionModalOkTwo}
              >
                Yes, remove
              </button>
              <button
                className="bg-[#ffffff] py-2 px-4 rounded"
                onClick={actionModalCancelTwo}
              >
                No, keep it
              </button>
            </div>
          }
        >
          <div className="">
            <div>
              <h1 className="text-[#E9EBEB] font-semibold text-[20px]">
                Remove auction
              </h1>
              <p className="text-[#A6ABAC]">
                Do you want to remove the auction <br /> permanently from your
                website?
              </p>
            </div>
          </div>
        </Modal>

        {/* modal three */}
        <Modal
          className="custom-auction-modal custom-view-modal"
          centered
          open={actionModalThree}
          onOk={actionModalOkThree}
          onCancel={actionModalCancelThree}
          width={800}
          footer={null}
        >

          <div>
            <div ref={targetRef} className="flex justify-between gap-4">
              <div className="w-[50%]">
                <h2 className="text-[24px] md:text-[38px]  ">
                  {/* {modalThreeData?.title} */}
                  {modalThreeData?.title
                    ? modalThreeData.title.charAt(0).toUpperCase() + modalThreeData.title.slice(1)
                    : ''}
                </h2>

                <div className="flex flex-col ">
                  <p className=" py-2">
                    Estimated price: <span>${modalThreeData?.start_budget} - ${modalThreeData?.end_budget}</span>
                  </p>
                  <div className="flex items-center gap-2">
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
                          fill="#263234"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M15.7071 10.2929C16.0976 10.6834 16.0976 11.3166 15.7071 11.7071L12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071C10.9024 14.3166 10.9024 13.6834 11.2929 13.2929L14.2929 10.2929C14.6834 9.90237 15.3166 9.90237 15.7071 10.2929Z"
                          fill="#263234"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 7C8.13401 7 5 10.134 5 14C5 17.866 8.13401 21 12 21C15.866 21 19 17.866 19 14C19 10.134 15.866 7 12 7ZM3 14C3 9.02944 7.02944 5 12 5C16.9706 5 21 9.02944 21 14C21 18.9706 16.9706 23 12 23C7.02944 23 3 18.9706 3 14Z"
                          fill="#263234"
                        />
                      </svg>
                    </span>
                    <p className="">{modalThreeData?.duration || 0} days</p>
                  </div>
                </div>

                <div className="flex  items-center gap-2 pt-[24px]">
                  <div>
                    <img
                      src={`${import.meta.env.VITE_API_IMAGE_BASE_URL}/${modalThreeData?.profile}`}
                      alt="" className='w-[50px] h-[50px] rounded-full'
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/dashboardPhoto/404.jpg';
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="text-[20px]  font-semibold">
                      {modalThreeData?.name}
                    </h3>
                    <h4 className="">{modalThreeData?.email}</h4>
                  </div>
                </div>

                <div className="space-y-2 py-6">
                  <p><span className="font-semibold">Contact Number</span> : {modalThreeData.contact_number}</p>
                  <p><span className="font-semibold">City</span> : {modalThreeData.city}</p>
                  <p><span className="font-semibold">Donate Share</span> : {modalThreeData.donate_share}</p>
                  <p><span className="font-semibold">Status</span> : {modalThreeData.status}</p>
                  <p><span className="font-semibold">Address</span> : {modalThreeData.address}</p>
                  <p><span className="font-semibold">Created Date</span> : {formatDate(modalThreeData.created_at)}</p>
                </div>
                <div className="bg-[#4b55571e]  p-4 rounded-lg max-w-[433px] mt-4">

                  <p>
                    {modalThreeData?.description}
                  </p>
                </div>


              </div>

              <div className="w-[50%]">
                <img
                  src={`${import.meta.env.VITE_API_IMAGE_BASE_URL}/${modalThreeData?.image}`}
                  alt="" className='w-full h-full object-cover'
                  onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop
                    e.target.src = "/dashboardPhoto/contributors/photo1.png"; // Replace with your default image path
                  }}
                />
              </div>
            </div>
            {
              modalThreeData?.image && <div className="pt-8">
                <a
                  href={`${import.meta.env.VITE_API_IMAGE_BASE_URL}/${modalThreeData?.image}`}
                  download="CV"
                  className="bg-[#ffff] text-[#403730] py-2 px-6 rounded-lg"
                >Download Pdf</a>

              </div>
            }

          </div>
        </Modal>





        {/* modal four */}
        <Modal
          className="custom-ai-modal"
          centered
          open={actionModalFour}
          onOk={actionModalOkFour}
          onCancel={actionModalCancelFour}
          width={900}
          footer={
            <div className="font-roboto flex justify-end gap-x-4 md:px-7 pt-[24px]">
              <button
                className="hover:bg-[#A6ABAC] text-[#DA453F] px-6 rounded"
                onClick={actionModalCancelFour}
              >
                Cancel
              </button>

              <button
                className="bg-[#ffffff] py-2 px-4 rounded"
                onClick={actionModalOkFour}
              >
                {
                  loading ? "Loading..." : "Update"
                }
              </button>

            </div>
          }
        >
          <div className="">
            <Form form={formFour} onFinish={onFinishFour} style={{ marginTop: "20px" }}>
              <div className="flex items-center gap-4">
                {/* name */}
                <div className="w-[50%]">
                  <p className="text-[#FFFFFF]">Name</p>
                  <Form.Item
                    name="name"
                  >
                    <Input
                      id="dashboard_auction"
                      placeholder="Enter Your Name"
                      style={{ padding: "10px" }}
                    />
                  </Form.Item>
                </div>

                {/* email */}
                <div className="w-[50%]">
                  <p className="text-[#FFFFFF]">Email</p>
                  <Form.Item
                    name="email"
                    rules={[
                      { type: "email", message: "Please enter a valid email" },
                    ]}
                  >
                    <Input
                      id="dashboard_auction"
                      placeholder="Enter Your Email"
                      style={{ padding: "10px" }}
                    />
                  </Form.Item>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* title */}
                <div className="w-[50%]">
                  <p className="text-[#FFFFFF]">Title</p>
                  <Form.Item
                    name="title"
                  >
                    <Input
                      id="dashboard_auction"
                      placeholder="Enter Your Title"
                      style={{ padding: "10px" }}
                    />
                  </Form.Item>
                </div>

                {/* description */}
                <div className="w-[50%]">
                  <p className="text-[#FFFFFF]">Description</p>
                  <Form.Item
                    name="description"
                  >
                    <Input
                      id="dashboard_auction"
                      placeholder="Enter Your description"
                      style={{ padding: "10px" }}
                    />
                  </Form.Item>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* city */}
                <div className="w-[50%]">
                  <p className="text-[#FFFFFF]">City</p>
                  <Form.Item
                    name="city"
                  >
                    <Input
                      id="dashboard_auction"
                      placeholder="Enter Your City"
                      style={{ padding: "10px" }}
                    />
                  </Form.Item>
                </div>

                {/* address */}
                <div className="w-[50%]">
                  <p className="text-[#FFFFFF]">Address</p>
                  <Form.Item
                    name="address"
                  >
                    <Input
                      id="dashboard_auction"
                      placeholder="Enter Your Address"
                      style={{ padding: "10px" }}
                    />
                  </Form.Item>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* contact number */}
                <div className="w-[50%]">
                  <p className="text-[#fff]">Contact number</p>
                  <Form.Item name="contact_number" >
                    <InputNumber id="dashboard_auction" style={{ width: "100%", height: "40px", backgroundColor: "transparent", WebkitTextFillColor: "#fff", }} />
                  </Form.Item>
                </div>

                {/* donate share */}
                <div className="w-[50%]">
                  <p className="text-[#fff]">Donate share</p>
                  <Form.Item name="donate_share" >
                    <InputNumber id="dashboard_auction" style={{ width: "100%", height: "40px", backgroundColor: "transparent", WebkitTextFillColor: "#fff", }} />
                  </Form.Item>
                </div>
              </div>

              {/* image */}
              <div className="flex justify-center border border-[#B6B6BA] rounded-md mb-2 pt-5">
                <Form.Item
                  className="md:col-span-2"
                  name="image"
                >
                  <Upload

                    accept="image/*"
                    maxCount={1}
                    showUploadList={{ showPreviewIcon: true }}
                    fileList={ImageFileListOne}
                    onChange={({ fileList }) => setImageFileListOne(fileList)}
                    beforeUpload={() => false}
                  >
                    <div style={{ cursor: "pointer" }} className="flex flex-col items-center">
                      <UploadCloud className="w-5 h-5 text-gray-400" />
                      <span className="mt-2 text-[#fff] px-1">Choose Auction photo</span>
                    </div>
                  </Upload>
                </Form.Item>
              </div>




              {/*profile image  */}
              <div className="flex justify-center border border-[#B6B6BA] rounded-md mb-2 pt-5">
                <Form.Item
                  className="md:col-span-2"
                  name="profile"
                >
                  <Upload

                    accept="image/*"
                    maxCount={1}
                    showUploadList={{ showPreviewIcon: true }}
                    fileList={ImageFileListTwo}
                    onChange={({ fileList }) => setImageFileListTwo(fileList)}
                    // listType="picture-card"
                    // className="w-full"
                    beforeUpload={() => false}
                  >
                    <div style={{ cursor: "pointer" }} className="flex flex-col items-center">
                      <UploadCloud className="w-5 h-5 text-gray-400" />
                      <span className="mt-2 text-[#fff]">Choose profile photo</span>
                    </div>
                  </Upload>
                </Form.Item>
              </div>

            </Form>
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

export default Auction;
