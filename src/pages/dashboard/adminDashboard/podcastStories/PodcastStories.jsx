import { Button, Form, Input, message, Modal, Pagination, Space, Table, Upload } from "antd";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { closePodcastModalOpenFive, closePodcastModalOpenFour, closePodcastModalOpenOne, closePodcastModalOpenThree, closePodcastModalOpenTwo, podcastModalOpenFive, podcastModalOpenFour, podcastModalOpenOne, podcastModalOpenThree, podcastModalOpenTwo } from "../../../../features/modal/modalSlice";
import { useForm } from "antd/es/form/Form";
import { UploadOutlined } from "@ant-design/icons";
import { InboxOutlined } from '@ant-design/icons';
import { UploadCloud } from "lucide-react";
import TextArea from "antd/es/input/TextArea";
import { useDeleteDashboardPodcastApiMutation, useGetDashboardPodcastApiQuery, usePostDashboardPodcastApiMutation, useSingleGetDashboardPodcastApiQuery, useUpdateDashboardPodcastApiMutation } from "../../../../redux/dashboardFeatures/dashboardPodcastApi";
import CustomLoading from "../../shared/CustomLoading";
import Search from "antd/es/input/Search";
import Swal from "sweetalert2";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { FiSearch } from 'react-icons/fi';



const { Dragger } = Upload;

const PodcastStories = () => {
  const [formOne] = useForm()
  const [formTwo] = useForm()
  const [formThree] = useForm()
  const [formFour] = useForm()
  const [formFive] = useForm()


  const [selectId, setselectId] = useState(null)
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(4);

  const playerRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [ImageFileListHost, setImageFileListHost] = useState([]);
  const [ImageFileListGuest, setImageFileListGuest] = useState([]);
  const [ImageFileListThumbail, setImageFileListThumbail] = useState([]);
  const [mp3FileList, setMp3FileList] = useState([]);
  const [uploadedFileList, setUploadedFileList] = useState([]);

  const dispatch = useDispatch();
  const podcastModalOne = useSelector((state) => state.modal.podcastModalOne);
  const podcastModalTwo = useSelector((state) => state.modal.podcastModalTwo);
  const podcastModalThree = useSelector((state) => state.modal.podcastModalThree);
  const podcastModalFour = useSelector((state) => state.modal.podcastModalFour);
  const podcastModalFive = useSelector((state) => state.modal.podcastModalFive);


  const [postDashboardPodcastApi] = usePostDashboardPodcastApiMutation() // post
  const { data, isLoading, refetch } = useGetDashboardPodcastApiQuery({ search: searchText, per_page: perPage, page: currentPage }); // get
  const [deleteDashboardPodcastApi] = useDeleteDashboardPodcastApiMutation(); // delete
  const { data: podcastData } = useSingleGetDashboardPodcastApiQuery({ podcast_id: selectId }) // single podcast data
  const [updateDashboardPodcastApi] = useUpdateDashboardPodcastApiMutation(); // update


  const allPodcastData = data?.data?.data
  const singlePodcast = podcastData?.data
  const singlePodcastData = allPodcastData?.find(item => item.id === Number(selectId));







  // upload mp3 file function
  const handleUpload = async ({ file }) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      // simulate upload API
      await new Promise((res) => setTimeout(res, 2000));


      // ✅ Correct structure required by antd Upload
      const uploadedFile = {
        uid: file.uid,
        name: file.name,
        status: 'done',
        url: URL.createObjectURL(file), // required to preview/download
      };

      setUploadedFileList([uploadedFile]); // show only after success
    } catch (err) {
      message.error('Upload failed!');
    } finally {
      setIsUploading(false);
    }
  };









//  default value show modal three
  useEffect(() => {
    if (singlePodcastData?.photo) {
      const imageObj = {
        uid: '-1',
        name: 'existing_image.jpg',
        status: 'done',
        url: `${import.meta.env.VITE_API_IMAGE_BASE_URL}/${singlePodcastData?.photo}`
        // url: singlePodcastData.photo,
      };

      // First set form values
      formThree.setFieldsValue({
        podcast_title: singlePodcastData.podcast_title,
        host_title: singlePodcastData.host_title,
        guest_title: singlePodcastData.guest_title,
        image: [imageObj], // ✅ use it after defining
      });

      // Then set image file list
      setImageFileListHost([imageObj]);
    }
  }, [singlePodcastData]);


  // default value show modal for Five
  useEffect(() => {
    if (singlePodcast) {
      const guestImage = {
        uid: '-1',
        name: 'guest_profile.jpg',
        status: 'done',
        url: `${import.meta.env.VITE_API_IMAGE_BASE_URL}/${singlePodcast?.guest_profile}`,
      };

      const hostImage = {
        uid: '-2',
        name: 'host_profile.jpg',
        status: 'done',
        url: `${import.meta.env.VITE_API_IMAGE_BASE_URL}/${singlePodcast?.host_profile}`,
      };

      const thumbnailImage = {
        uid: '-3',
        name: 'thumbnail.jpg',
        status: 'done',
        url: `${import.meta.env.VITE_API_IMAGE_BASE_URL}/${singlePodcast?.thumbnail}`,
      };

      const mp3File = {
        uid: '-1',
        name: 'must upload_audio.mp3',
        status: 'done',
        url: `${import.meta.env.VITE_API_IMAGE_BASE_URL}/${singlePodcast?.mp3}`,
      };

      // First set form values
      formFive.setFieldsValue({
        podcast_title: singlePodcast.podcast_title,
        host_title: singlePodcast.host_title,
        guest_title: singlePodcast.guest_title,
        description: singlePodcast.description,
        mp3File: mp3File,
        image: [guestImage, hostImage, thumbnailImage], // ✅ use it after defining
      });

      // Then set image file list
      setUploadedFileList([mp3File]);


      setImageFileListGuest([guestImage]);
      setImageFileListHost([hostImage]);
      setImageFileListThumbail([thumbnailImage]);
    }
  }, [singlePodcast]);






  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };





  //======== podcast modal one start =========

  const showPodcastModalOne = () => {
    dispatch(podcastModalOpenOne())

  };

  const onFinishOne = async (values) => {
    setLoading(true)
    const formData = new FormData();
    const fileObj = values?.mp3File?.originFileObj;
    if (!fileObj) {
      message.error("No file selected!");
      return;
    }


    //======= image file upload =======

    if (ImageFileListHost[0]?.originFileObj) {
      formData.append("host_profile", ImageFileListHost[0].originFileObj);
    }
    if (ImageFileListGuest[0]?.originFileObj) {
      formData.append("guest_profile", ImageFileListGuest[0].originFileObj);
    }
    if (ImageFileListThumbail[0]?.originFileObj) {
      formData.append("thumbnail", ImageFileListThumbail[0].originFileObj);
    }





    formData.append("podcast_title", values.podcast_title)
    formData.append("host_title", values.host_title)
    formData.append("guest_title", values.guest_title)
    formData.append("description", values.description)
    formData.append('mp3', fileObj);

    // console.log(formData.forEach(item => {
    //   console.log(item)
    // }))

    try {
      const res = await postDashboardPodcastApi(formData).unwrap()
      console.log(res)
      if (res?.data) {
        toast.success(res?.message)
        setImageFileListHost([]);
        setImageFileListGuest([]);
        setImageFileListThumbail([]);
        setUploadedFileList([]);
        formOne.resetFields()
        dispatch(closePodcastModalOpenOne());
      }
    } catch (errors) {
      if (errors) {
        toast.error(errors?.data?.message)
      }
    }
    finally {
      setLoading(false); // End loading
    }

  }


  const podcastModalOkOne = () => {
    // dispatch(closePodcastModalOpenOne());
    formOne.submit()
  };
  const podcastModalCancelOne = () => {
    setImageFileListHost([]);
    setImageFileListGuest([]);
    setImageFileListThumbail([]);
    setUploadedFileList([]);
    formOne.resetFields()
    dispatch(closePodcastModalOpenOne());

  };
  //======== podcast modal one end =========







  // ======= podcast modal two start =========
  const onFinishTwo = () => {

  }
  const showPodcastModalTwo = (id) => {
    setselectId(id)
    dispatch(podcastModalOpenTwo())

  };


  const podcastModalOkTwo = () => {
    dispatch(closePodcastModalOpenTwo());
    formTwo.submit()
  };

  const podcastModalCancelTwo = () => {
    dispatch(closePodcastModalOpenTwo());
  };
  // ======= podcast modal two end ===========












  // ======= podcast modal three start =========
  const onFinishThree = () => {

  }
  const showPodcastModalThree = () => {
    dispatch(podcastModalOpenThree())

  };


  const podcastModalOkThree = () => {
    dispatch(closePodcastModalOpenThree());
    formThree.submit()
  };

  const podcastModalCancelThree = () => {
    dispatch(closePodcastModalOpenThree());
  };
  // ======= podcast modal three end ===========






  // ======= podcast modal four start =========

  const showPodcastModalFour = (id) => {
    setselectId(id)
    dispatch(podcastModalOpenFour())

  };


  const podcastModalOkFour = () => {
    dispatch(closePodcastModalOpenFour());

  };

  const podcastModalCancelFour = () => {
    if (playerRef.current) {
      playerRef.current.audio.current.pause();
    }

    dispatch(closePodcastModalOpenFour());
  };

  // const podcastModalCancelFour = () => {
  //   dispatch(closePodcastModalOpenFour());
  // };

  // ======= podcast modal four end ===========







  // ======= podcast modal five start =========
  const onFinishFive = async (values) => {
    setLoading(true);

    const formData = new FormData();
    const fileObj = values?.mp3File?.originFileObj;



    //======= image file upload =======

    if (ImageFileListHost[0]?.originFileObj) {
      formData.append("host_profile", ImageFileListHost[0].originFileObj);
    }
    if (ImageFileListGuest[0]?.originFileObj) {
      formData.append("guest_profile", ImageFileListGuest[0].originFileObj);
    }
    if (ImageFileListThumbail[0]?.originFileObj) {
      formData.append("thumbnail", ImageFileListThumbail[0].originFileObj);
    }





    formData.append("podcast_title", values.podcast_title)
    formData.append("host_title", values.host_title)
    formData.append("guest_title", values.guest_title)
    formData.append("description", values.description)
    formData.append('mp3', fileObj);
    formData.append("_method", "PUT");

    // console.log(formData.forEach(item => {
    //   console.log(item)
    // }))

    try {
      const res = await updateDashboardPodcastApi({
        updateInfo: formData,
        podcast_id: selectId
      }).unwrap()
      console.log(res)
      if (res?.data) {
        toast.success(res?.message)
        setImageFileListHost([]);
        setImageFileListGuest([]);
        setImageFileListThumbail([]);
        
        formFive.resetFields()
        dispatch(closePodcastModalOpenFive());
      }
    } catch (errors) {
      if (errors) {
        console.log(errors)
        toast.error(errors?.data?.message);
      }
    }
    finally {
      setLoading(false);
    }
  }


  const showPodcastModalFive = (id) => {
    setselectId(id)
    dispatch(podcastModalOpenFive())

  };


  const podcastModalOkFive = () => {
    formFive.submit()
    // dispatch(closePodcastModalOpenFive());

  };

  const podcastModalCancelFive = () => {
    dispatch(closePodcastModalOpenFive());
  };
  // ======= podcast modal five end ===========


  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Deleted this Podcast",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    });

    if (result.isConfirmed) {
      try {
        const res = await deleteDashboardPodcastApi({ podcast_id: id }).unwrap();
        if (res?.data) {
          toast.success(res?.message);
          refetch();
        }
      } catch (errors) {
        toast.error(errors.message);
      }
    }
  };



  const columns = [

    {
      title: 'Thumbail',
      dataIndex: 'thumbnail',
      render: (_, record) => (
        <div className='flex items-center gap-2'>
          <img
            src={`${import.meta.env.VITE_API_IMAGE_BASE_URL}/${record.thumbnail}`}
            alt="" className='w-[60px] h-[50px] rounded'
            onError={(e) => {
              e.target.onerror = null; // Prevent infinite loop
              e.target.src = '/dashboardPhoto/404.jpg'; // Replace with your default image path
            }}
          />
          <div>
            <p className='font-semibold'>{'record.mp3'}</p>
            <p className='font-semibold'>{'Podcast title'}</p>
          </div>
        </div>
      ),
    },

    {
      title: 'Host title',
      dataIndex: 'host_title',
    },
    {
      title: 'Guest title',
      dataIndex: 'guest_title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      render: (text) => (
        text?.length > 20 ? `${text?.slice(0, 40)}...` : text
      ),
    },

    {
      title: <div className="flex justify-center">Action</div>,
      dataIndex: "action",
      render: (_, record) => (
        <div className="flex items-center justify-center gap-3">
          {/* view details icon */}
          <button
            onClick={() => showPodcastModalFour(record?.id)}
            className=" p-1 rounded bg-blue"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <mask id="mask0_192_7619" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                <rect width="24" height="24" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_192_7619)">
                <path d="M12 16C13.25 16 14.3125 15.5625 15.1875 14.6875C16.0625 13.8125 16.5 12.75 16.5 11.5C16.5 10.25 16.0625 9.1875 15.1875 8.3125C14.3125 7.4375 13.25 7 12 7C10.75 7 9.6875 7.4375 8.8125 8.3125C7.9375 9.1875 7.5 10.25 7.5 11.5C7.5 12.75 7.9375 13.8125 8.8125 14.6875C9.6875 15.5625 10.75 16 12 16ZM12 14.2C11.25 14.2 10.6125 13.9375 10.0875 13.4125C9.5625 12.8875 9.3 12.25 9.3 11.5C9.3 10.75 9.5625 10.1125 10.0875 9.5875C10.6125 9.0625 11.25 8.8 12 8.8C12.75 8.8 13.3875 9.0625 13.9125 9.5875C14.4375 10.1125 14.7 10.75 14.7 11.5C14.7 12.25 14.4375 12.8875 13.9125 13.4125C13.3875 13.9375 12.75 14.2 12 14.2ZM12 19C9.56667 19 7.35 18.3208 5.35 16.9625C3.35 15.6042 1.9 13.7833 1 11.5C1.9 9.21667 3.35 7.39583 5.35 6.0375C7.35 4.67917 9.56667 4 12 4C14.4333 4 16.65 4.67917 18.65 6.0375C20.65 7.39583 22.1 9.21667 23 11.5C22.1 13.7833 20.65 15.6042 18.65 16.9625C16.65 18.3208 14.4333 19 12 19ZM12 17C13.8833 17 15.6125 16.5042 17.1875 15.5125C18.7625 14.5208 19.9667 13.1833 20.8 11.5C19.9667 9.81667 18.7625 8.47917 17.1875 7.4875C15.6125 6.49583 13.8833 6 12 6C10.1167 6 8.3875 6.49583 6.8125 7.4875C5.2375 8.47917 4.03333 9.81667 3.2 11.5C4.03333 13.1833 5.2375 14.5208 6.8125 15.5125C8.3875 16.5042 10.1167 17 12 17Z" fill="#49ADF4" />
              </g>
            </svg>
          </button>

          {/* edit icon */}
          <button
            onClick={() => showPodcastModalFive(record?.id)}
          >
            <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 22V18H20V22H0ZM4 14H5.4L13.2 6.225L11.775 4.8L4 12.6V14ZM2 16V11.75L13.2 0.575C13.3833 0.391667 13.5958 0.25 13.8375 0.15C14.0792 0.05 14.3333 0 14.6 0C14.8667 0 15.125 0.05 15.375 0.15C15.625 0.25 15.85 0.4 16.05 0.6L17.425 2C17.625 2.18333 17.7708 2.4 17.8625 2.65C17.9542 2.9 18 3.15833 18 3.425C18 3.675 17.9542 3.92083 17.8625 4.1625C17.7708 4.40417 17.625 4.625 17.425 4.825L6.25 16H2Z" fill="#49ADF4" />
            </svg>
          </button>

          {/* delete icon */}
          <button
            onClick={() => handleDelete(record.id)}
          >
            <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 1H10.5L9.5 0H4.5L3.5 1H0V3H14M1 16C1 16.5304 1.21071 17.0391 1.58579 17.4142C1.96086 17.7893 2.46957 18 3 18H11C11.5304 18 12.0391 17.7893 12.4142 17.4142C12.7893 17.0391 13 16.5304 13 16V4H1V16Z" fill="#FF5353" />
            </svg>

          </button>
        </div>
      ),
    },
  ];


  useEffect(() => {
    refetch(); // Refetch the data when searchText, currentPage, or perPage changes
  }, [searchText, currentPage, perPage, refetch]);



  useEffect(() => {
    document.body.style.overflow =
      podcastModalOne || podcastModalFour || podcastModalOkFive
        ? "hidden"
        : "auto";
  }, [podcastModalOne, podcastModalFour, podcastModalOkFive]);

  if (isLoading) return <CustomLoading />

  return <section className="text-[#ffff]">
    <div className="">
      <div className="">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-semibold font-roboto text-[30px] text-[#ffffff]">Podcast & stories</h2>
          {/* <button
            
            className="bg-[#ffffff3a] text-[#ffff] py-2 px-6 rounded-lg flex items-center gap-3">
            
          </button> */}
          <button onClick={showPodcastModalOne} className=" px-6 rounded-md bg-[#ffff] text-black hover:bg-[#ffffff6e] " style={{
            fontFamily: "Roboto",
            fontWeight: "bold",
            fontSize: "16px",
            height: "40px",
            marginLeft: "0px",
          }}>
            Add new Podcast
          </button>
        </div>
        <div>
          <div className="relative w-fit my-8">
            <input
              type="search"
              id="gsearch"
              name="gsearch"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search host title or guest title or description"
              className="bg-transparent border px-4 py-2 pl-10 rounded-md w-[350px]"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>
      </div>




      {/* table */}
      <div>
        <Table
          columns={columns}
          dataSource={allPodcastData}
          pagination={false}
          className="custom-ant-table"
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






      {/* modal component */}
      {/* modal one */}
      <Modal
        className="custom-ai-modal"
        centered
        open={podcastModalOne}
        onOk={podcastModalOkOne}
        onCancel={podcastModalCancelOne}
        width={800}
        footer={
          <div className="font-roboto flex justify-end gap-x-4 md:px-7 pt-[24px]">
            <button
              className="hover:bg-[#A6ABAC] px-6 rounded"
              onClick={podcastModalCancelOne}
            >
              Cancel
            </button>
            <Button
              onClick={podcastModalOkOne}
              htmlType="submit"
              className="no-hover"
              loading={loading}
            >
              {loading ? "Loading...." : "Post now"}
            </Button>
          </div>
        }
      >
        <div className="">

          <Form form={formOne} onFinish={onFinishOne} style={{ padding: "10px 10px", }}>
            {/* podcast title */}
            <div>
              <p className="text-[#FFFFFF] ">Podcast title</p>
              <Form.Item name="podcast_title"
                rules={[{ required: true, message: 'Please enter the podcast title' }]}
              >
                <Input
                  id="dashboard_podcast"
                  placeholder="Enter title"
                  style={{ padding: "10px" }}
                />
              </Form.Item>
            </div>

            {/* host tile and gest title */}
            <div className="flex items-center justify-between gap-4">
              {/* Host title */}
              <div className="w-full">
                <p className="text-[#FFFFFF] ">Host title</p>
                <Form.Item name="host_title"
                  rules={[{ required: true, message: 'Please enter the host title' }]}
                >
                  <Input
                    id="dashboard_podcast"
                    placeholder="Enter title"
                    style={{ padding: "10px" }}
                  />
                </Form.Item>
              </div>


              {/* Gust title */}
              <div className="w-full">
                <p className="text-[#FFFFFF] ">Guest title</p>
                <Form.Item name="guest_title" 
                 rules={[{ required: true, message: 'Please enter the guest title' }]}
                >
                  <Input
                    id="dashboard_podcast"
                    placeholder="Enter title"
                    style={{ padding: "10px" }}
                  />
                </Form.Item>
              </div>
            </div>

            <div className="flex  flex-col md:flex-row justify-between  gap-4">
              {/* host image upload */}
              <div className="w-[50%] flex justify-center items-center border-2 border-dashed border-[#B6B6BA] rounded-md py-2">
                <Form.Item
                  className="md:col-span-2"
                  name="image"
                  rules={[
                    {
                      required: ImageFileListHost.length === 0,
                      message: "Image required!",
                    },
                  ]}
                >
                  <Upload

                    accept="image/*"
                    maxCount={1}
                    showUploadList={{ showPreviewIcon: true }}
                    fileList={ImageFileListHost}
                    onChange={({ fileList }) => setImageFileListHost(fileList)}
                    // listType="picture-card"
                    // className="w-full"
                    beforeUpload={() => false}
                  >
                    <div style={{ cursor: "pointer" }} className="flex flex-col items-center">
                      <UploadCloud className=" text-gray-400" />
                      <span className=" text-[#fff]">Upload guest photo</span>
                    </div>
                  </Upload>
                </Form.Item>
              </div>

              {/* guest image upload */}
              <div className="w-[50%] flex justify-center items-center border-2 border-dashed border-[#B6B6BA] rounded-md py-2">
                <Form.Item
                  className="md:col-span-2"
                  name="image"
                  rules={[
                    {
                      required: ImageFileListGuest.length === 0,
                      message: "Image required!",
                    },
                  ]}
                >
                  <Upload

                    accept="image/*"
                    maxCount={1}
                    showUploadList={{ showPreviewIcon: true }}
                    fileList={ImageFileListGuest}
                    onChange={({ fileList }) => setImageFileListGuest(fileList)}
                    // listType="picture-card"
                    // className="w-full"
                    beforeUpload={() => false}
                  >
                    <div style={{ cursor: "pointer" }} className="flex flex-col items-center">
                      <UploadCloud className="w-5 h-5 text-gray-400" />
                      <span className=" text-[#fff]">Upload host photo</span>
                    </div>
                  </Upload>
                </Form.Item>
              </div>
            </div>


            {/* mp3 file upload */}
            <div className="pt-6">
              <Form.Item
                name="mp3File"
                valuePropName="file"
                getValueFromEvent={(e) => e && e.fileList[0]}
                rules={[
                  {
                    required: true,
                    message: 'Please upload an MP3 file!',
                  },
                ]}
              >
                <Dragger
                  beforeUpload={() => false} // disable auto upload
                  fileList={uploadedFileList} // only show after success
                  onChange={handleUpload}
                  accept=".mp3"
                  maxCount={1}
                  style={{
                    backgroundColor: 'transparent',
                    border: '2px dashed #888',
                    borderRadius: '8px',
                    padding: '0px 20px',
                  }}
                >
                  {isUploading ? (
                    <div className="flex justify-center mt-2 text-white">
                      <span className="animate-pulse">Uploading...</span>
                    </div>)
                    :
                    <div>
                      <p className="">
                        <InboxOutlined style={{ color: '#fff', fontSize: '32px' }} />
                      </p>
                      <p style={{ color: '#fff', fontSize: '16px', fontWeight: 500 }}>
                        Upload podcast of drag & drop here.
                      </p>
                      <p style={{ color: '#aaa', marginTop: '0px' }}>
                        Supported format MP3<br />
                        Max file size: 1 GB.
                      </p>
                    </div>
                  }

                </Dragger>
              </Form.Item>
            </div>

            <div className="flex justify-between gap-4 pt-2">
              {/* guest image upload */}
              <div className="w-[50%] h-[110px] flex justify-center items-center border-2 border-dashed border-[#B6B6BA] rounded-md py-2">
                <Form.Item
                  className="md:col-span-2"
                  name="image"
                  rules={[
                    {
                      required: ImageFileListThumbail.length === 0,
                      message: "Image required!",
                    },
                  ]}
                >
                  <Upload

                    accept="image/*"
                    maxCount={1}
                    showUploadList={{ showPreviewIcon: true }}
                    fileList={ImageFileListThumbail}
                    onChange={({ fileList }) => setImageFileListThumbail(fileList)}
                    // listType="picture-card"
                    // className="w-full"
                    beforeUpload={() => false}
                  >
                    <div style={{ cursor: "pointer" }} className="flex flex-col items-center">
                      <UploadCloud className="w-5 h-5 text-gray-400" />
                      <span className=" text-[#fff]">Upload thumbnail.</span>
                    </div>
                  </Upload>
                </Form.Item>
              </div>


              <div className="w-[50%]  h-[110px]">
                <Form.Item name="description" 
                 rules={[{ required: true, message: 'Please enter the description' }]}
                >
                  <TextArea
                    placeholder="Write a description..." style={{ backgroundColor: "transparent", padding: "10px", border: "1px solid gray", color: "#fff", height: "110px", resize: "none" }}
                    className="custom-textarea"
                  />
                </Form.Item>
              </div>
            </div>
          </Form>
        </div>
      </Modal>



      {/* update modal */}
      <Modal
        className="custom-ai-modal"
        centered
        open={podcastModalTwo}
        onOk={podcastModalOkTwo}
        onCancel={podcastModalCancelTwo}
        width={500}
        footer={
          <div className="font-roboto flex justify-end gap-x-4 md:px-7 pt-[24px]">
            <button
              className="hover:bg-[#A6ABAC] px-6 rounded"
              onClick={podcastModalCancelTwo}
            >
              Cancel
            </button>
            <Button
              onClick={podcastModalOkTwo}
              type="primary" htmlType="submit" loading={loading}
              className="no-hover"
            >
              update
            </Button>
          </div>
        }
      >
        <div className="">

          <Form form={formTwo} onFinish={onFinishTwo}>
            {/* podcast title */}
            <div>
              <p className="text-[#FFFFFF] ">Podcast title</p>
              <Form.Item name="podcast_title">
                <Input
                  id="dashboard_podcast"
                  placeholder="Enter title"
                  style={{ padding: "10px" }}
                />
              </Form.Item>
            </div>

            {/* host tile and gest title */}
            <div className="flex items-center justify-between gap-4">
              {/* Host title */}
              <div className="w-full">
                <p className="text-[#FFFFFF] ">Host title</p>
                <Form.Item name="host_title">
                  <Input
                    id="dashboard_podcast"
                    placeholder="Enter title"
                    style={{ padding: "10px" }}
                  />
                </Form.Item>
              </div>


              {/* Gust title */}
              <div className="w-full">
                <p className="text-[#FFFFFF] ">Guest title</p>
                <Form.Item name="guest_title">
                  <Input
                    id="dashboard_podcast"
                    placeholder="Enter title"
                    style={{ padding: "10px" }}
                  />
                </Form.Item>
              </div>
            </div>

            {/* host image upload */}
            <div className="flex justify-center border-2 border-dashed border-[#B6B6BA] rounded-md mb-2 pt-5">
              <Form.Item
                className="md:col-span-2"
                name="image"
                rules={[
                  {
                    required: ImageFileListHost.length === 0,
                    message: "Image required!",
                  },
                ]}
              >
                <Upload

                  accept="image/*"
                  maxCount={1}
                  showUploadList={{ showPreviewIcon: true }}
                  fileList={ImageFileListHost}
                  onChange={({ fileList }) => setImageFileListHost(fileList)}
                  listType="picture-card"
                  className="w-full"
                  beforeUpload={() => false}
                >
                  <div style={{ cursor: "pointer" }} className="flex flex-col items-center">
                    <UploadCloud className="w-5 h-5 text-gray-400" />
                    <span className="mt-2">Upload guest photo</span>
                  </div>
                </Upload>
              </Form.Item>
            </div>

            <div className="pt-4">
              <Form.Item name="description">
                <TextArea placeholder="Write a description..." style={{ backgroundColor: "transparent", padding: "10px", border: "1px solid gray", color: "#fff", height: "100px", resize: "none" }}
                />
              </Form.Item>
            </div>

            {/* guest image upload */}
            <div className="flex justify-center border-2 border-dashed border-[#B6B6BA] rounded-md mb-2 pt-5">
              <Form.Item
                className="md:col-span-2"
                name="image"
                rules={[
                  {
                    required: ImageFileListGuest.length === 0,
                    message: "Image required!",
                  },
                ]}
              >
                <Upload

                  accept="image/*"
                  maxCount={1}
                  showUploadList={{ showPreviewIcon: true }}
                  fileList={ImageFileListGuest}
                  onChange={({ fileList }) => setImageFileListGuest(fileList)}
                  listType="picture-card"
                  className="w-full"
                  beforeUpload={() => false}
                >
                  <div style={{ cursor: "pointer" }} className="flex flex-col items-center">
                    <UploadCloud className="w-5 h-5 text-gray-400" />
                    <span className="mt-2">Upload host photo</span>
                  </div>
                </Upload>
              </Form.Item>
            </div>




            {/* mp3 file upload */}
            <div>
              <Form.Item
                name="mp3File"
                valuePropName="file"
                getValueFromEvent={(e) => e && e.fileList[0]}
                rules={[
                  {
                    required: true,
                    message: 'Please upload an MP3 file!',
                  },
                ]}
              >
                <Dragger
                  beforeUpload={() => false}
                  accept=".mp3"
                  maxCount={1}
                  style={{
                    backgroundColor: 'transparent',
                    border: '2px dashed #888',
                    borderRadius: '8px',
                    padding: '30px 20px',
                  }}
                >
                  <p className="">
                    <InboxOutlined style={{ color: '#fff', fontSize: '32px' }} />
                  </p>
                  <p style={{ color: '#fff', fontSize: '16px', fontWeight: 500 }}>
                    Upload podcast of drag & drop here.
                  </p>
                  <p style={{ color: '#aaa', marginTop: '4px' }}>
                    Supported format MP3<br />
                    Max file size: 1 GB.
                  </p>
                </Dragger>
              </Form.Item>
            </div>






            {/* guest image upload */}
            <div className="flex justify-center border-2 border-dashed border-[#B6B6BA] rounded-md mb-2 pt-5">
              <Form.Item
                className="md:col-span-2"
                name="image"
                rules={[
                  {
                    required: ImageFileListThumbail.length === 0,
                    message: "Image required!",
                  },
                ]}
              >
                <Upload

                  accept="image/*"
                  maxCount={1}
                  showUploadList={{ showPreviewIcon: true }}
                  fileList={ImageFileListThumbail}
                  onChange={({ fileList }) => setImageFileListThumbail(fileList)}
                  listType="picture-card"
                  className="w-full"
                  beforeUpload={() => false}
                >
                  <div style={{ cursor: "pointer" }} className="flex flex-col items-center">
                    <UploadCloud className="w-5 h-5 text-gray-400" />
                    <span className="mt-2">Upload thumbnail.</span>
                  </div>
                </Upload>
              </Form.Item>
            </div>
          </Form>
        </div>
      </Modal>


      {/*  modal  three*/}
      <Modal
        className="custom-ai-modal"
        centered
        open={podcastModalThree}
        onOk={podcastModalOkThree}
        onCancel={podcastModalCancelThree}
        width={500}
        footer={
          <div className="font-roboto flex justify-end gap-x-4 md:px-7 pt-[24px]">
            <button
              className="hover:bg-[#A6ABAC] px-6 rounded"
              onClick={podcastModalCancelThree}
            >
              Cancel
            </button>
            <Button
              onClick={podcastModalOkThree}
              type="primary" htmlType="submit" loading={loading}
              className="no-hover"
            >
              update
            </Button>
          </div>
        }
      >
        <div className="">

          <Form form={formThree} onFinish={onFinishThree}>
            dfdffffff
          </Form>
        </div>
      </Modal>


      {/* modal four--- show details info */}
      <Modal
        centered
        open={podcastModalFour}
        onOk={() => {
          if (playerRef.current) {
            playerRef.current.audio.current.pause();
          }
          podcastModalOkFour();
        }}
        onCancel={() => {
          if (playerRef.current) {
            playerRef.current.audio.current.pause();
          }
          podcastModalCancelFour();
        }}
        width={700}
        footer={null}
        className="custom-ai-modal"
      >

        <div className="p-8">
          <h1 className="text-[#ffff] font-bold text-[24px] py-4">
            Active Reports
          </h1>

          <div className="bg-[#3a494b] text-white p-6 max-w-4xl mx-auto rounded-xl shadow-lg">
            {/* Header */}
            <div className="flex gap-4 items-center">
              <img
                src={`${import.meta.env.VITE_API_IMAGE_BASE_URL}/${singlePodcast?.thumbnail}`}
                alt="Podcast Cover"
                className="w-[120px] h-[100px]  object-cover rounded-md"
              />
              <div>
                <p className="text-sm text-[#fff]">{formatDate(singlePodcast?.created_at)}</p>
                <h2 className="text-xl font-bold">
                  {singlePodcast?.podcast_title}
                </h2>
              </div>
            </div>

            {/* Player */}
            <div className="mt-4">
              <AudioPlayer
                ref={playerRef}
                src={`${import.meta.env.VITE_API_IMAGE_BASE_URL}/${singlePodcast?.mp3}`}
                onPlay={e => console.log("Playing audio:", singlePodcast?.data?.mp3)}
                showJumpControls

                style={{
                  background: "#3a494b",
                  borderRadius: "20px",
                  color: "#ffff",
                }}
              />

            </div>







            {/* Description */}
            <p className="mt-4 text-gray-300 text-sm">
              {singlePodcast?.description}
            </p>

            {/* Host and Guest */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold">Host & guest</h3>
              <div className="flex gap-8 mt-2">
                <div className="text-center">
                  <img
                    src={`${import.meta.env.VITE_API_IMAGE_BASE_URL}/${singlePodcast?.host_profile}`}
                    alt="Emily Johnson"
                    className="w-[40px] h-[40px] object-cover rounded-full"
                  />
                  <p className="text-sm mt-1">Emily Johnson</p>
                  <p className="text-xs text-gray-400">Host</p>
                </div>
                <div className="text-center">
                  <img
                    src={`${import.meta.env.VITE_API_IMAGE_BASE_URL}/${singlePodcast?.guest_profile}`}
                    alt="Richard Mathew"
                    className="w-[40px] h-[40px] object-cover rounded-full"
                  />
                  <p className="text-sm mt-1">Richard Mathew</p>
                  <p className="text-xs text-gray-400">Guest</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal >



      {/* modal five */}
      <Modal
        className="custom-ai-modal"
        centered
        open={podcastModalFive}
        onOk={podcastModalOkFive}
        onCancel={podcastModalCancelFive}
        width={800}
        footer={
          <div className="font-roboto flex justify-end gap-x-4 md:px-7 pt-[24px]">
            <button
              className="hover:bg-[#A6ABAC] px-6 rounded"
              onClick={podcastModalCancelFive}
            >
              Cancel
            </button>
            <Button
              onClick={podcastModalOkFive}
              htmlType="submit"
              className="no-hover"
              loading={loading}
            >
              {
                loading ? "Loading..." : "Update"
              }
            </Button>
          </div>
        }
      >
        <div className="">

          <Form form={formFive} onFinish={onFinishFive} style={{ padding: "10px 10px", }}>
           {/* podcast title */}
            <div>
              <p className="text-[#FFFFFF] ">Podcast title</p>
              <Form.Item name="podcast_title"
              >
                <Input
                  id="dashboard_podcast"
                  placeholder="Enter title"
                  style={{ padding: "10px" }}
                />
              </Form.Item>
            </div>

            {/* host tile and gest title */}
            <div className="flex items-center justify-between gap-4">
              {/* Host title */}
              <div className="w-full">
                <p className="text-[#FFFFFF] ">Host title</p>
                <Form.Item name="host_title"
                >
                  <Input
                    id="dashboard_podcast"
                    placeholder="Enter title"
                    style={{ padding: "10px" }}
                  />
                </Form.Item>
              </div>


              {/* Gust title */}
              <div className="w-full">
                <p className="text-[#FFFFFF] ">Guest title</p>
                <Form.Item name="guest_title" 

                >
                  <Input
                    id="dashboard_podcast"
                    placeholder="Enter title"
                    style={{ padding: "10px" }}
                  />
                </Form.Item>
              </div>
            </div>

            <div className="flex  flex-col md:flex-row justify-between  gap-4">
              {/* host image upload */}
              <div className="w-[50%] flex justify-center items-center border-2 border-dashed border-[#B6B6BA] rounded-md py-2">
                <Form.Item
                  className="md:col-span-2"
                  name="host_profile"
                >
                  <Upload

                    accept="image/*"
                    maxCount={1}
                    showUploadList={{ showPreviewIcon: true }}
                    fileList={ImageFileListHost}
                    onChange={({ fileList }) => setImageFileListHost(fileList)}
                    beforeUpload={() => false}
                  >
                    <div style={{ cursor: "pointer" }} className="flex flex-col items-center">
                      <UploadCloud className=" text-gray-400" />
                      <span className=" text-[#fff]">Upload guest photo</span>
                    </div>
                  </Upload>
                </Form.Item>
              </div>

              {/* guest image upload */}
              <div className="w-[50%] flex justify-center items-center border-2 border-dashed border-[#B6B6BA] rounded-md py-2">
                <Form.Item
                  className="md:col-span-2"
                  name="guest_profile"
                >
                  <Upload

                    accept="image/*"
                    maxCount={1}
                    showUploadList={{ showPreviewIcon: true }}
                    fileList={ImageFileListGuest}
                    onChange={({ fileList }) => setImageFileListGuest(fileList)}
                    beforeUpload={() => false}
                  >
                    <div style={{ cursor: "pointer" }} className="flex flex-col items-center">
                      <UploadCloud className="w-5 h-5 text-gray-400" />
                      <span className=" text-[#fff]">Upload host photo</span>
                    </div>
                  </Upload>
                </Form.Item>
              </div>
            </div>


            {/* mp3 file upload */}
            <div className="pt-6">
              <Form.Item
                name="mp3File"
                valuePropName="file"
                getValueFromEvent={(e) => e && e.fileList[0]}
              >
                <Dragger
                  beforeUpload={() => false} // disable auto upload
                  fileList={uploadedFileList} // only show after success
                  onChange={handleUpload}
                  accept=".mp3"
                  maxCount={1}
                  style={{
                    backgroundColor: 'transparent',
                    border: '2px dashed #888',
                    borderRadius: '8px',
                    padding: '0px 20px',
                  }}
                >
                  {isUploading ? (
                    <div className="flex justify-center mt-2 text-white">
                      <span className="animate-pulse">Uploading...</span>
                    </div>)
                    :
                    <div>
                      <p className="">
                        <InboxOutlined style={{ color: '#fff', fontSize: '32px' }} />
                      </p>
                      <p style={{ color: '#fff', fontSize: '16px', fontWeight: 500 }}>
                        Upload podcast of drag & drop here.
                      </p>
                      <p style={{ color: '#aaa', marginTop: '0px' }}>
                        Supported format MP3<br />
                        Max file size: 1 GB.
                      </p>
                    </div>
                  }

                </Dragger>
              </Form.Item>
            </div>

            <div className="flex justify-between gap-4 pt-2">
              {/* thumbail image upload */}
              <div className="w-[50%] h-[110px] flex justify-center items-center border-2 border-dashed border-[#B6B6BA] rounded-md py-2">
                <Form.Item
                  className="md:col-span-2"
                  name="thumbnail"
                >
                  <Upload

                    accept="image/*"
                    maxCount={1}
                    showUploadList={{ showPreviewIcon: true }}
                    fileList={ImageFileListThumbail}
                    onChange={({ fileList }) => setImageFileListThumbail(fileList)}
                    beforeUpload={() => false}
                  >
                    <div style={{ cursor: "pointer" }} className="flex flex-col items-center">
                      <UploadCloud className="w-5 h-5 text-gray-400" />
                      <span className=" text-[#fff]">Upload thumbnail.</span>
                    </div>
                  </Upload>
                </Form.Item>
              </div>


              <div className="w-[50%]  h-[110px]">
                <Form.Item name="description" 
                >
                  <TextArea
                    placeholder="Write a description..." style={{ backgroundColor: "transparent", padding: "10px", border: "1px solid gray", color: "#fff", height: "110px", resize: "none" }}
                    className="custom-textarea"
                  />
                </Form.Item>
              </div>
            </div>
          </Form>
        </div>
      </Modal>

    </div>
  </section>;
};

export default PodcastStories;
