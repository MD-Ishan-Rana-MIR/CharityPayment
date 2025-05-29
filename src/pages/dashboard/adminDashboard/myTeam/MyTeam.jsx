import { Button, Form, Input, message, Modal, Pagination, Upload } from "antd";
import CustomNotFound from "../../../../components/shared/CustomNotFound";
import { useDispatch, useSelector } from "react-redux";
import {
  closeTeamModalOpenFour,
  closeTeamModalOpenOne,
  closeTeamModalOpenThree,
  closeTeamModalOpenTwo,
  teamModalOpenFour,
  teamModalOpenOne,
  teamModalOpenThree,
  teamModalOpenTwo,
} from "../../../../features/modal/modalSlice";
import { useForm } from "antd/es/form/Form";
import {
  CopyOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  LinkOutlined,
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined,
  XOutlined,
} from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

import { UploadCloud } from "lucide-react";
import { useDeleteDashboardMyTeamApiMutation, useGetDashboardMyTeamApiQuery, usePostDashboardMyTeamApiMutation, useSingleGetDashboardMyTeamApiQuery, useUpdateDashboardMyTeamApiMutation } from "../../../../redux/dashboardFeatures/myTeam/dashboardMyTeamApi";
import CustomLoading from "../../shared/CustomLoading";


const MyTeam = () => {
  const [selectId, setSelectId] = useState(null)
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(8);
  const [loading, setLoading] = useState(false)


  const [postDashboardMyTeamApi] = usePostDashboardMyTeamApiMutation() // post
  const { data, refetch, isLoading } = useGetDashboardMyTeamApiQuery({ page: currentPage, per_page: perPage }); // get
  const [deleteDashboardMyTeamApi] = useDeleteDashboardMyTeamApiMutation() // delete
  const [updateDashboardMyTeamApi] = useUpdateDashboardMyTeamApiMutation() // update
  const { data: singleData, } = useSingleGetDashboardMyTeamApiQuery(selectId, {
    skip: !selectId, // Prevent call until ID is available
  }); // single team get


  const allMyTeams = data?.data?.data;
  const totalLength = data?.data?.total
  const singleTeamData = singleData?.data;



  const [formOne] = useForm();
  const [formTwo] = useForm();
  const [formThree] = useForm();
  const dispatch = useDispatch();
  const teamModalOne = useSelector((state) => state.modal.teamModalOne);
  const teamModalTwo = useSelector((state) => state.modal.teamModalTwo);
  const teamModalThree = useSelector((state) => state.modal.teamModalThree);
  const teamModalFour = useSelector((state) => state.modal.teamModalFour);
  const [ImageFileList, setImageFileList] = useState([]);

  const inputRef = useRef(null);
  const handleCopy = () => {
    if (inputRef.current?.input) {
      navigator.clipboard.writeText(inputRef.current.input.value);
      message.success("Link copied to clipboard!");
    }
  };





  useEffect(() => {
    if (singleTeamData?.photo) {
      const imageObj = {
        uid: '-1',
        name: 'existing_image.jpg',
        status: 'done',
        url: `${import.meta.env.VITE_API_IMAGE_BASE_URL}/${singleTeamData?.photo}`
        // url: singleTeamData.photo,
      };

      // First set form values
      formThree.setFieldsValue({
        name: singleTeamData.name,
        designation: singleTeamData.designation,
        work_experience: singleTeamData.work_experience,
        twitter_link: singleTeamData.twitter_link,
        linkedIn_link: singleTeamData.linkedIn_link,
        instagram_link: singleTeamData.instagram_link,
        image: [imageObj], // ✅ use it after defining
      });

      // Then set image file list
      setImageFileList([imageObj]);
    }
  }, [singleTeamData]);






  // ========= team modal one start =============
  const onFinishOne = async (values) => {
    setLoading(true)
    const formData = new FormData();
    if (ImageFileList[0]?.originFileObj) {
      formData.append("photo", ImageFileList[0].originFileObj);
    }

    formData.append("name", values.name)
    formData.append("designation", values.designation)
    formData.append("work_experience", values.work_experience)
    formData.append("twitter_link", values.twitter_link)
    formData.append("linkedIn_link", values.linkedIn_link)
    formData.append("instagram_link", values.instagram_link)

    console.log(formData.forEach(value => {
      console.log(value)
    }))

    try {
      const res = await postDashboardMyTeamApi(formData).unwrap()

      if (res?.data) {
        toast.success(res?.message)
        setImageFileList([]);
        formOne.resetFields()
        dispatch(closeTeamModalOpenOne());
      }
    } catch (errors) {
      toast.error(errors.message);
    }
    finally {
      setLoading(false)
    }


  };

  const showTeamModalOne = () => {
    dispatch(teamModalOpenOne());
  };
  const teamModalOkOne = () => {
    formOne.submit();
  };
  const teamModalCancelOne = () => {
    setImageFileList([]);
    formOne.resetFields()
    dispatch(closeTeamModalOpenOne());

  };
  // ========= team modal one end ===============



  // ========= team modal two start =============

  const showTeamModalTwo = (id) => {
    // delete and update for id set
    setSelectId(id)
    dispatch(teamModalOpenTwo());
  };
  const teamModalOkTwo = () => {

  };
  const teamModalCancelTwo = () => {
    dispatch(closeTeamModalOpenTwo());
  };
  // ========= team modal two end ===============




  // ========= team modal three start =============
  const onFinishThree = async (values) => {
    setLoading(true)
    const formData = new FormData();
    if (ImageFileList[0]?.originFileObj) {
      formData.append("photo", ImageFileList[0].originFileObj);
    }

    formData.append("name", values.name)
    formData.append("designation", values.designation)
    formData.append("work_experience", values.work_experience)
    formData.append("twitter_link", values.twitter_link)
    formData.append("linkedIn_link", values.linkedIn_link)
    formData.append("instagram_link", values.instagram_link)
    formData.append("_method", "PUT");

    // console.log(formData.forEach(value => {
    //   console.log(value)
    // }))

    try {
      const res = await updateDashboardMyTeamApi({
        updateInfo: formData,
        team_id: selectId
      }).unwrap()

      if (res?.data) {
        toast.success(res?.message)
        setImageFileList([]);
        formOne.resetFields()
        dispatch(closeTeamModalOpenThree());
      }
    } catch (errors) {
      if (errors) {
        if (errors) {
          toast.error(errors?.data?.message)
        }
      }
    } finally {
      setLoading(false)
    }



  }
  const showTeamModalThree = () => {
    dispatch(teamModalOpenThree());
    dispatch(closeTeamModalOpenTwo());

  };
  const teamModalOkThree = () => {
    formThree.submit()
  };
  const teamModalCancelThree = () => {
    setImageFileList([]);
    formOne.resetFields()
    dispatch(closeTeamModalOpenThree());
  };
  // ========= team modal three end ===============










  // ========= team modal four start =============
  const showTeamModalFour = () => {
    dispatch(closeTeamModalOpenTwo());
    dispatch(teamModalOpenFour());


  };
  const teamModalOkFour = async () => {
    dispatch(closeTeamModalOpenFour());
    try {
      const res = await deleteDashboardMyTeamApi(selectId).unwrap();
      if (res?.success === true) {
        toast.success(res.message);
        refetch()
      }
    } catch (errors) {
      toast.error(errors.message);
    }
  };
  const teamModalCancelFour = () => {
    dispatch(closeTeamModalOpenFour());
  };
  // ========= team modal four end ===============

  useEffect(() => {
    refetch();
  }, [currentPage, perPage, refetch]);


  useEffect(() => {
    document.body.style.overflow =
      teamModalOne || teamModalTwo || teamModalThree || teamModalFour
        ? "hidden"
        : "auto";
  }, [teamModalOne, teamModalTwo, teamModalThree, teamModalFour]);

  if (isLoading) return <CustomLoading />

  return (
    <div className="bg-[#1B2324] p-[20px] rounded-lg lg:min-h-[840px]">
      <div>
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3 pb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-2">

            <h2 className="font-semibold font-roboto text-[30px] text-[#ffffff]">
              My teammate
            </h2>
            <div>
              <h2 className="text-[#ffffff]">({totalLength})</h2>
            </div>
          </div>

          <div>
            <button
              onClick={showTeamModalOne}
              className="flex items-center gap-2 bg-[#ffffff] p-2 rounded-lg font-semibold text-[16px]"
            >
              New teammate
              <span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0.976311 10.3103C1.60143 9.68517 2.44928 9.33398 3.33333 9.33398H8C8.88406 9.33398 9.7319 9.68517 10.357 10.3103C10.9821 10.9354 11.3333 11.7833 11.3333 12.6673V14.0007C11.3333 14.3688 11.0349 14.6673 10.6667 14.6673C10.2985 14.6673 10 14.3688 10 14.0007V12.6673C10 12.1369 9.78929 11.6282 9.41421 11.2531C9.03914 10.878 8.53043 10.6673 8 10.6673H3.33333C2.8029 10.6673 2.29419 10.878 1.91912 11.2531C1.54405 11.6282 1.33333 12.1369 1.33333 12.6673V14.0007C1.33333 14.3688 1.03486 14.6673 0.666667 14.6673C0.298477 14.6673 0 14.3688 0 14.0007V12.6673C0 11.7833 0.35119 10.9354 0.976311 10.3103Z"
                    fill="#403730"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5.66665 2.66732C4.56208 2.66732 3.66665 3.56275 3.66665 4.66732C3.66665 5.77189 4.56208 6.66732 5.66665 6.66732C6.77122 6.66732 7.66665 5.77189 7.66665 4.66732C7.66665 3.56275 6.77122 2.66732 5.66665 2.66732ZM2.33331 4.66732C2.33331 2.82637 3.8257 1.33398 5.66665 1.33398C7.5076 1.33398 8.99998 2.82637 8.99998 4.66732C8.99998 6.50827 7.5076 8.00065 5.66665 8.00065C3.8257 8.00065 2.33331 6.50827 2.33331 4.66732Z"
                    fill="black"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M13.3334 4.66602C13.7015 4.66602 14 4.96449 14 5.33268V9.33268C14 9.70087 13.7015 9.99935 13.3334 9.99935C12.9652 9.99935 12.6667 9.70087 12.6667 9.33268V5.33268C12.6667 4.96449 12.9652 4.66602 13.3334 4.66602Z"
                    fill="black"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M10.6667 7.33268C10.6667 6.96449 10.9652 6.66602 11.3334 6.66602H15.3334C15.7015 6.66602 16 6.96449 16 7.33268C16 7.70087 15.7015 7.99935 15.3334 7.99935H11.3334C10.9652 7.99935 10.6667 7.70087 10.6667 7.33268Z"
                    fill="black"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>

        <div>

          {
            allMyTeams.length > 0 ? (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 max-w-6xl mx-auto">
                  {allMyTeams.map((item, index) => {
                    return (
                      <div key={index} className="max-w-[308px] ">
                        <img
                          src={`${import.meta.env.VITE_API_IMAGE_BASE_URL}/${item.photo}`}
                          alt="my team"
                          className="rounded-[12px] object-cover md:h-[296px] md:w-[280px]"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/dashboardPhoto/404.jpg';
                          }}
                        />
                        <h3 className="text-[20px] text-[#FFFFFF] pt-[24px] pb-[8px] font-semibold">
                          {item.name}
                        </h3>
                        <p className=" text-[#B1ADAA]">
                          {item.designation}
                        </p>
                        <p className="pt-[16px] pb-[20px] text-[#B1ADAA] text-wrap">{item.work_experience}</p>

                        <div className="flex justify-between items-center md:pr-1 lg:pr-2">
                          <div className="flex items-center gap-[20px]">
                            <a href={item.instagram_link}>  <svg
                              width="25"
                              height="24"
                              viewBox="0 0 25 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M16.4455 23L10.896 15.0901L3.94886 23H1.00977L9.59209 13.2311L1.00977 1H8.55571L13.786 8.45502L20.3393 1H23.2784L15.0943 10.3165L23.9914 23H16.4455ZM19.7185 20.77H17.7398L5.21811 3.23H7.1971L12.2121 10.2532L13.0793 11.4719L19.7185 20.77Z"
                                fill="#A6ABAC"
                              />
                            </svg></a>

                            <a href={item.linkedIn_link}><svg
                              width="25"
                              height="24"
                              viewBox="0 0 25 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M22.7234 0H2.27187C1.29219 0 0.5 0.773438 0.5 1.72969V22.2656C0.5 23.2219 1.29219 24 2.27187 24H22.7234C23.7031 24 24.5 23.2219 24.5 22.2703V1.72969C24.5 0.773438 23.7031 0 22.7234 0ZM7.62031 20.4516H4.05781V8.99531H7.62031V20.4516ZM5.83906 7.43438C4.69531 7.43438 3.77188 6.51094 3.77188 5.37187C3.77188 4.23281 4.69531 3.30937 5.83906 3.30937C6.97813 3.30937 7.90156 4.23281 7.90156 5.37187C7.90156 6.50625 6.97813 7.43438 5.83906 7.43438ZM20.9516 20.4516H17.3937V14.8828C17.3937 13.5562 17.3703 11.8453 15.5422 11.8453C13.6906 11.8453 13.4094 13.2937 13.4094 14.7891V20.4516H9.85625V8.99531H13.2687V10.5609H13.3156C13.7891 9.66094 14.9516 8.70938 16.6813 8.70938C20.2859 8.70938 20.9516 11.0813 20.9516 14.1656V20.4516Z"
                                fill="#A6ABAC"
                              />
                            </svg></a>
                            <a href={item.twitter_link}><svg
                              width="25"
                              height="24"
                              viewBox="0 0 25 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clip-path="url(#clip0_179908_6549)">
                                <path
                                  d="M12.5 2.16094C15.7063 2.16094 16.0859 2.175 17.3469 2.23125C18.5188 2.28281 19.1516 2.47969 19.5734 2.64375C20.1313 2.85938 20.5344 3.12188 20.9516 3.53906C21.3734 3.96094 21.6313 4.35938 21.8469 4.91719C22.0109 5.33906 22.2078 5.97656 22.2594 7.14375C22.3156 8.40937 22.3297 8.78906 22.3297 11.9906C22.3297 15.1969 22.3156 15.5766 22.2594 16.8375C22.2078 18.0094 22.0109 18.6422 21.8469 19.0641C21.6313 19.6219 21.3687 20.025 20.9516 20.4422C20.5297 20.8641 20.1313 21.1219 19.5734 21.3375C19.1516 21.5016 18.5141 21.6984 17.3469 21.75C16.0813 21.8062 15.7016 21.8203 12.5 21.8203C9.29375 21.8203 8.91406 21.8062 7.65313 21.75C6.48125 21.6984 5.84844 21.5016 5.42656 21.3375C4.86875 21.1219 4.46563 20.8594 4.04844 20.4422C3.62656 20.0203 3.36875 19.6219 3.15313 19.0641C2.98906 18.6422 2.79219 18.0047 2.74063 16.8375C2.68438 15.5719 2.67031 15.1922 2.67031 11.9906C2.67031 8.78438 2.68438 8.40469 2.74063 7.14375C2.79219 5.97187 2.98906 5.33906 3.15313 4.91719C3.36875 4.35938 3.63125 3.95625 4.04844 3.53906C4.47031 3.11719 4.86875 2.85938 5.42656 2.64375C5.84844 2.47969 6.48594 2.28281 7.65313 2.23125C8.91406 2.175 9.29375 2.16094 12.5 2.16094ZM12.5 0C9.24219 0 8.83438 0.0140625 7.55469 0.0703125C6.27969 0.126563 5.40313 0.332812 4.64375 0.628125C3.85156 0.9375 3.18125 1.34531 2.51563 2.01562C1.84531 2.68125 1.4375 3.35156 1.12813 4.13906C0.832812 4.90313 0.626563 5.775 0.570313 7.05C0.514063 8.33437 0.5 8.74219 0.5 12C0.5 15.2578 0.514063 15.6656 0.570313 16.9453C0.626563 18.2203 0.832812 19.0969 1.12813 19.8563C1.4375 20.6484 1.84531 21.3188 2.51563 21.9844C3.18125 22.65 3.85156 23.0625 4.63906 23.3672C5.40313 23.6625 6.275 23.8687 7.55 23.925C8.82969 23.9812 9.2375 23.9953 12.4953 23.9953C15.7531 23.9953 16.1609 23.9812 17.4406 23.925C18.7156 23.8687 19.5922 23.6625 20.3516 23.3672C21.1391 23.0625 21.8094 22.65 22.475 21.9844C23.1406 21.3188 23.5531 20.6484 23.8578 19.8609C24.1531 19.0969 24.3594 18.225 24.4156 16.95C24.4719 15.6703 24.4859 15.2625 24.4859 12.0047C24.4859 8.74688 24.4719 8.33906 24.4156 7.05938C24.3594 5.78438 24.1531 4.90781 23.8578 4.14844C23.5625 3.35156 23.1547 2.68125 22.4844 2.01562C21.8188 1.35 21.1484 0.9375 20.3609 0.632812C19.5969 0.3375 18.725 0.13125 17.45 0.075C16.1656 0.0140625 15.7578 0 12.5 0Z"
                                  fill="#A6ABAC"
                                />
                                <path
                                  d="M12.5 5.83594C9.09688 5.83594 6.33594 8.59688 6.33594 12C6.33594 15.4031 9.09688 18.1641 12.5 18.1641C15.9031 18.1641 18.6641 15.4031 18.6641 12C18.6641 8.59688 15.9031 5.83594 12.5 5.83594ZM12.5 15.9984C10.2922 15.9984 8.50156 14.2078 8.50156 12C8.50156 9.79219 10.2922 8.00156 12.5 8.00156C14.7078 8.00156 16.4984 9.79219 16.4984 12C16.4984 14.2078 14.7078 15.9984 12.5 15.9984Z"
                                  fill="#A6ABAC"
                                />
                                <path
                                  d="M20.3469 5.59141C20.3469 6.38828 19.7 7.03047 18.9078 7.03047C18.1109 7.03047 17.4688 6.3836 17.4688 5.59141C17.4688 4.79453 18.1156 4.15234 18.9078 4.15234C19.7 4.15234 20.3469 4.79922 20.3469 5.59141Z"
                                  fill="#A6ABAC"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_179908_6549">
                                  <rect
                                    width="24"
                                    height="24"
                                    fill="white"
                                    transform="translate(0.5)"
                                  />
                                </clipPath>
                              </defs>
                            </svg></a>
                          </div>
                          <div
                            onClick={() => showTeamModalTwo(item?.id)}
                            className="cursor-pointer"
                          >
                            <span> <svg
                              width="25"
                              height="24"
                              viewBox="0 0 25 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M10.5 12C10.5 10.8954 11.3954 10 12.5 10C13.6046 10 14.5 10.8954 14.5 12C14.5 13.1046 13.6046 14 12.5 14C11.3954 14 10.5 13.1046 10.5 12Z"
                                fill="#B1ADAA"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M17.5 12C17.5 10.8954 18.3954 10 19.5 10C20.6046 10 21.5 10.8954 21.5 12C21.5 13.1046 20.6046 14 19.5 14C18.3954 14 17.5 13.1046 17.5 12Z"
                                fill="#B1ADAA"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M3.5 12C3.5 10.8954 4.39543 10 5.5 10C6.60457 10 7.5 10.8954 7.5 12C7.5 13.1046 6.60457 14 5.5 14C4.39543 14 3.5 13.1046 3.5 12Z"
                                fill="#B1ADAA"
                              />
                            </svg></span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* modal components */}
                <div>
                  {/* modal one */}
                  <Modal
                    className="custom-ai-modal"
                    centered
                    open={teamModalOne}
                    onOk={teamModalOkOne}
                    onCancel={teamModalCancelOne}
                    width={500}
                    footer={
                      <div className="font-roboto flex justify-end gap-x-4 md:px-7 pt-[24px]">
                        <button
                          className="hover:bg-[#A6ABAC] text-[#ffffff] py-2 px-4 rounded"
                          onClick={teamModalCancelOne}
                        >
                          Cancel
                        </button>
                        <Button
                          className="bg-[#ffffff] px-6 rounded"
                          onClick={teamModalOkOne}
                          loading={loading}
                        >
                          {loading ? "Loading...." : "Add"}
                        </Button>
                      </div>
                    }
                  >
                    <div className="">
                      <div>
                        <h1 className="text-[#FFFFFF] font-bold text-[24px] py-4">
                          Add new teammate
                        </h1>
                        <Form form={formOne} onFinish={onFinishOne}>
                          <div>
                            <p className="text-[#FFFFFF] ">Name</p>
                            <Form.Item name="name">
                              <Input
                                id="dashboard_team_create"
                                placeholder="Enter Your Name"
                                style={{ padding: "10px" }}
                              />
                            </Form.Item>
                          </div>
                          <div>
                            <p className="text-[#FFFFFF] ">Designation</p>
                            <Form.Item name="designation">
                              <Input
                                id="dashboard_team_create"
                                placeholder="Enter Your designation"
                                style={{ padding: "10px" }}
                              />
                            </Form.Item>
                          </div>

                          <div>
                            <p className="text-[#FFFFFF] ">Works experience</p>
                            <Form.Item name="work_experience">
                              <Input
                                id="dashboard_team_create"
                                placeholder="Enter Your work experience"
                                style={{ padding: "10px" }}
                              />
                            </Form.Item>
                          </div>

                          <div className="flex justify-center border border-[#B6B6BA] rounded-md mb-2 pt-5">
                            <Form.Item
                              className="md:col-span-2"
                              name="image"
                              rules={[
                                {
                                  required: ImageFileList.length === 0,
                                  message: "Image required!",
                                },
                              ]}
                            >
                              <Upload

                                accept="image/*"
                                maxCount={1}
                                showUploadList={{ showPreviewIcon: true }}
                                fileList={ImageFileList}
                                onChange={({ fileList }) => setImageFileList(fileList)}
                                listType="picture-card"
                                className="w-full"
                                beforeUpload={() => false}
                              >
                                <div style={{ cursor: "pointer" }} className="flex flex-col items-center">
                                  <UploadCloud className="w-5 h-5 text-gray-400" />
                                  <span className="mt-2">Choose File</span>
                                </div>
                              </Upload>
                            </Form.Item>
                          </div>

                          <div className="pt-4">
                            <div>
                              <Form.Item name="linkedIn_link">
                                <Input
                                  id="dashboard_team_create"
                                  ref={inputRef}
                                  placeholder="paste linkedIn link"
                                  prefix={
                                    <LinkedinOutlined
                                      style={{
                                        backgroundColor: "transparent",
                                        color: "white",
                                        fontSize: "24px",
                                      }}
                                      size={250}
                                    />
                                  }
                                  suffix={
                                    <CopyOutlined
                                      onClick={handleCopy}
                                      style={{
                                        color: "white",
                                        cursor: "pointer",
                                      }}
                                    />
                                  }
                                  allowClear
                                  style={{
                                    backgroundColor: "transparent",
                                    padding: "10px",
                                    color: "#ffffff",
                                  }}
                                  className="custom-input-borderColor"
                                />
                              </Form.Item>
                            </div>

                            <div>
                              <Form.Item name="twitter_link">
                                <Input
                                  id="dashboard_team_create"
                                  ref={inputRef}
                                  placeholder="paste twitter link"
                                  prefix={
                                    <XOutlined
                                      style={{
                                        backgroundColor: "transparent",
                                        color: "white",
                                        fontSize: "24px",
                                      }}
                                      size={250}
                                    />
                                  }
                                  suffix={
                                    <CopyOutlined
                                      onClick={handleCopy}
                                      style={{
                                        color: "white",
                                        cursor: "pointer",
                                      }}
                                    />
                                  }
                                  allowClear
                                  style={{
                                    backgroundColor: "transparent",
                                    padding: "10px",
                                    color: "#ffffff",
                                  }}
                                  className="custom-input-borderColor"
                                />
                              </Form.Item>
                            </div>

                            <div>
                              <Form.Item name="instagram_link">
                                <Input
                                  id="dashboard_team_create"
                                  ref={inputRef}
                                  placeholder="paste instagram link"
                                  prefix={
                                    <InstagramOutlined
                                      style={{
                                        backgroundColor: "transparent",
                                        color: "white",
                                        fontSize: "24px",
                                      }}
                                      size={250}
                                    />
                                  }
                                  suffix={
                                    <CopyOutlined
                                      onClick={handleCopy}
                                      style={{
                                        color: "white",
                                        cursor: "pointer",
                                      }}
                                    />
                                  }
                                  allowClear
                                  style={{
                                    backgroundColor: "transparent",
                                    padding: "10px",
                                    color: "#ffffff",
                                  }}
                                  className="custom-input-borderColor"
                                />
                              </Form.Item>
                            </div>
                          </div>
                        </Form>
                      </div>
                    </div>
                  </Modal>



                  {/* modal two */}
                  <Modal
                    className=""
                    centered
                    open={teamModalTwo}
                    onOk={teamModalOkTwo}
                    onCancel={teamModalCancelTwo}
                    width={250}
                    footer={null}
                  >
                    <div>
                      <h1
                        className="text-[14px] font-semibold text-[#263234] border-b pb-4 cursor-pointer"

                        onClick={showTeamModalThree}
                      >
                        Edit profile
                      </h1>
                      <h1
                        onClick={showTeamModalFour}
                        className="text-[14px] font-semibold text-[#DA453F] pt-4 cursor-pointer"
                      >
                        Remove teammate
                      </h1>
                    </div>
                  </Modal>

                  {/* modal three */}
                  <Modal
                    className="custom-ai-modal"
                    centered
                    open={teamModalThree}
                    onOk={teamModalOkThree}
                    onCancel={teamModalCancelThree}
                    width={600}
                    footer={
                      <div className="font-roboto flex justify-end gap-x-4 md:px-7 pt-[24px]">
                        <button
                          className="hover:bg-[#A6ABAC] text-[#FFFFFF] px-6 rounded"
                          onClick={teamModalCancelThree}
                        >
                          Cancel
                        </button>
                        <Button
                          className="bg-[#ffffff] py-2 px-4 rounded"
                          onClick={teamModalOkThree}
                          loading={loading}
                        >
                          {loading ? "Loading...." : "Update"}
                        </Button>
                      </div>
                    }
                  >
                    <div>
                      <h1 className="text-[#FFFFFF] font-bold text-[24px] py-4">
                        Edit information
                      </h1>
                      <Form form={formThree} onFinish={onFinishThree}>
                        <div>
                          <p className="text-[#FFFFFF] ">Name</p>
                          <Form.Item name="name">
                            <Input
                              id="dashboard_team_create"
                              placeholder="Enter Your Name"
                              style={{ padding: "10px" }}
                            />
                          </Form.Item>
                        </div>
                        <div>
                          <p className="text-[#FFFFFF] ">Designation</p>
                          <Form.Item name="designation">
                            <Input
                              id="dashboard_team_create"
                              placeholder="Enter Your designation"
                              style={{ padding: "10px" }}
                            />
                          </Form.Item>
                        </div>

                        <div>
                          <p className="text-[#FFFFFF] ">Works experience</p>
                          <Form.Item name="work_experience">
                            <Input
                              id="dashboard_team_create"
                              placeholder="Enter Your work experience"
                              style={{ padding: "10px" }}
                            />
                          </Form.Item>
                        </div>

                        <div className="flex justify-center border border-[#B6B6BA] rounded-md mb-2 pt-5">
                          <Form.Item
                            className="md:col-span-2"
                            name="image"
                            rules={[
                              {
                                required: ImageFileList.length === 0,
                              },
                            ]}
                          >
                            <Upload

                              accept="image/*"
                              maxCount={1}
                              showUploadList={{ showPreviewIcon: true }}
                              fileList={ImageFileList}
                              onChange={({ fileList }) => setImageFileList(fileList)}
                              listType="picture-card"
                              className="w-full"
                              beforeUpload={() => false}
                            >
                              <div style={{ cursor: "pointer" }} className="flex flex-col items-center">
                                <UploadCloud className="w-5 h-5 text-gray-400" />
                                <span className="mt-2">Choose File</span>
                              </div>
                            </Upload>
                          </Form.Item>
                        </div>

                        <div className="pt-4">
                          <div>
                            <Form.Item name="linkedIn_link">
                              <Input
                                id="dashboard_team_create"
                                ref={inputRef}
                                placeholder="paste linkedIn link"
                                prefix={
                                  <LinkedinOutlined
                                    style={{
                                      backgroundColor: "transparent",
                                      color: "white",
                                      fontSize: "24px",
                                    }}
                                    size={250}
                                  />
                                }
                                suffix={
                                  <CopyOutlined
                                    onClick={handleCopy}
                                    style={{
                                      color: "white",
                                      cursor: "pointer",
                                    }}
                                  />
                                }
                                allowClear
                                style={{
                                  backgroundColor: "transparent",
                                  padding: "10px",
                                  color: "#ffffff",
                                }}
                                className="custom-input-borderColor"
                              />
                            </Form.Item>
                          </div>

                          <div>
                            <Form.Item name="twitter_link">
                              <Input
                                id="dashboard_team_create"
                                ref={inputRef}
                                placeholder="paste twitter link"
                                prefix={
                                  <XOutlined
                                    style={{
                                      backgroundColor: "transparent",
                                      color: "white",
                                      fontSize: "24px",
                                    }}
                                    size={250}
                                  />
                                }
                                suffix={
                                  <CopyOutlined
                                    onClick={handleCopy}
                                    style={{
                                      color: "white",
                                      cursor: "pointer",
                                    }}
                                  />
                                }
                                allowClear
                                style={{
                                  backgroundColor: "transparent",
                                  padding: "10px",
                                  color: "#ffffff",
                                }}
                                className="custom-input-borderColor"
                              />
                            </Form.Item>
                          </div>

                          <div>
                            <Form.Item name="instagram_link">
                              <Input
                                id="dashboard_team_create"
                                ref={inputRef}
                                placeholder="paste instagram link"
                                prefix={
                                  <InstagramOutlined
                                    style={{
                                      backgroundColor: "transparent",
                                      color: "white",
                                      fontSize: "24px",
                                    }}
                                    size={250}
                                  />
                                }
                                suffix={
                                  <CopyOutlined
                                    onClick={handleCopy}
                                    style={{
                                      color: "white",
                                      cursor: "pointer",
                                    }}
                                  />
                                }
                                allowClear
                                style={{
                                  backgroundColor: "transparent",
                                  padding: "10px",
                                  color: "#ffffff",
                                }}
                                className="custom-input-borderColor"
                              />
                            </Form.Item>
                          </div>
                        </div>
                      </Form>
                    </div>
                  </Modal>

                  {/* modal four */}
                  <Modal
                    className="custom-ai-modal"
                    centered
                    open={teamModalFour}
                    onOk={teamModalOkFour}
                    onCancel={teamModalCancelFour}
                    width={500}
                    footer={
                      <div className="font-roboto flex justify-end gap-x-4 md:px-7 pt-[24px]">
                        <button
                          className="hover:bg-[#A6ABAC] text-[#DA453F] py-2 px-4 rounded"
                          onClick={teamModalOkFour}
                        >
                          Yes, remove
                        </button>
                        <button
                          className="bg-[#ffffff] px-6 rounded"
                          onClick={teamModalCancelFour}
                        >
                          No, cancel
                        </button>
                      </div>
                    }
                  >
                    <div className="">
                      <div>
                        <h1 className="text-[#E9EBEB] font-semibold text-[20px] flex items-center gap-2">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12Z" fill="#DA453F" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12C11 11.4477 11.4477 11 12 11Z" fill="#DA453F" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11 8C11 7.44772 11.4477 7 12 7H12.01C12.5623 7 13.01 7.44772 13.01 8C13.01 8.55228 12.5623 9 12.01 9H12C11.4477 9 11 8.55228 11 8Z" fill="#DA453F" />
                          </svg>
                          Remove teammate
                        </h1>
                        <p className="text-[#A6ABAC]">
                          Do you want to remove the teammate from <br /> your
                          team.
                        </p>
                      </div>
                    </div>
                  </Modal>


                </div>

                {/* pagination */}
                <div className="flex justify-end pt-10">
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
            )
              :
              <CustomNotFound />
          }
        </div>




        {/* copy for condition allMytems.length */}
        <div>
          <Modal
            className="custom-ai-modal"
            centered
            open={teamModalOne}
            onOk={teamModalOkOne}
            onCancel={teamModalCancelOne}
            width={500}
            footer={
              <div className="font-roboto flex justify-end gap-x-4 md:px-7 pt-[24px]">
                <button
                  className="hover:bg-[#A6ABAC] text-[#ffffff] py-2 px-4 rounded"
                  onClick={teamModalCancelOne}
                >
                  Cancel
                </button>
                <Button
                  className="bg-[#ffffff] px-6 rounded"
                  onClick={teamModalOkOne}
                  loading={loading}
                >
                  {loading ? "Loading...." : "Add"}
                </Button>
              </div>
            }
          >
            <div className="">
              <div>
                <h1 className="text-[#FFFFFF] font-bold text-[24px] py-4">
                  Add new teammate
                </h1>
                <Form form={formOne} onFinish={onFinishOne}>
                  <div>
                    <p className="text-[#FFFFFF] ">Name</p>
                    <Form.Item name="name">
                      <Input
                        id="dashboard_team_create"
                        placeholder="Enter Your Name"
                        style={{ padding: "10px" }}
                      />
                    </Form.Item>
                  </div>
                  <div>
                    <p className="text-[#FFFFFF] ">Designation</p>
                    <Form.Item name="designation">
                      <Input
                        id="dashboard_team_create"
                        placeholder="Enter Your designation"
                        style={{ padding: "10px" }}
                      />
                    </Form.Item>
                  </div>

                  <div>
                    <p className="text-[#FFFFFF] ">Works experience</p>
                    <Form.Item name="work_experience">
                      <Input
                        id="dashboard_team_create"
                        placeholder="Enter Your work experience"
                        style={{ padding: "10px" }}
                      />
                    </Form.Item>
                  </div>

                  <div className="flex justify-center border border-[#B6B6BA] rounded-md mb-2 pt-5">
                    <Form.Item
                      className="md:col-span-2"
                      name="image"
                      rules={[
                        {
                          required: ImageFileList.length === 0,
                          message: "Image required!",
                        },
                      ]}
                    >
                      <Upload

                        accept="image/*"
                        maxCount={1}
                        showUploadList={{ showPreviewIcon: true }}
                        fileList={ImageFileList}
                        onChange={({ fileList }) => setImageFileList(fileList)}
                        listType="picture-card"
                        className="w-full"
                        beforeUpload={() => false}
                      >
                        <div style={{ cursor: "pointer" }} className="flex flex-col items-center">
                          <UploadCloud className="w-5 h-5 text-gray-400" />
                          <span className="mt-2">Choose File</span>
                        </div>
                      </Upload>
                    </Form.Item>
                  </div>

                  <div className="pt-4">
                    <div>
                      <Form.Item name="linkedIn_link">
                        <Input
                          id="dashboard_team_create"
                          ref={inputRef}
                          placeholder="paste linkedIn link"
                          prefix={
                            <LinkedinOutlined
                              style={{
                                backgroundColor: "transparent",
                                color: "white",
                                fontSize: "24px",
                              }}
                              size={250}
                            />
                          }
                          suffix={
                            <CopyOutlined
                              onClick={handleCopy}
                              style={{
                                color: "white",
                                cursor: "pointer",
                              }}
                            />
                          }
                          allowClear
                          style={{
                            backgroundColor: "transparent",
                            padding: "10px",
                            color: "#ffffff",
                          }}
                          className="custom-input-borderColor"
                        />
                      </Form.Item>
                    </div>

                    <div>
                      <Form.Item name="twitter_link">
                        <Input
                          id="dashboard_team_create"
                          ref={inputRef}
                          placeholder="paste twitter link"
                          prefix={
                            <XOutlined
                              style={{
                                backgroundColor: "transparent",
                                color: "white",
                                fontSize: "24px",
                              }}
                              size={250}
                            />
                          }
                          suffix={
                            <CopyOutlined
                              onClick={handleCopy}
                              style={{
                                color: "white",
                                cursor: "pointer",
                              }}
                            />
                          }
                          allowClear
                          style={{
                            backgroundColor: "transparent",
                            padding: "10px",
                            color: "#ffffff",
                          }}
                          className="custom-input-borderColor"
                        />
                      </Form.Item>
                    </div>

                    <div>
                      <Form.Item name="instagram_link">
                        <Input
                          id="dashboard_team_create"
                          ref={inputRef}
                          placeholder="paste instagram link"
                          prefix={
                            <InstagramOutlined
                              style={{
                                backgroundColor: "transparent",
                                color: "white",
                                fontSize: "24px",
                              }}
                              size={250}
                            />
                          }
                          suffix={
                            <CopyOutlined
                              onClick={handleCopy}
                              style={{
                                color: "white",
                                cursor: "pointer",
                              }}
                            />
                          }
                          allowClear
                          style={{
                            backgroundColor: "transparent",
                            padding: "10px",
                            color: "#ffffff",
                          }}
                          className="custom-input-borderColor"
                        />
                      </Form.Item>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </Modal>
        </div>

      </div>
    </div>
  );
};

export default MyTeam;
