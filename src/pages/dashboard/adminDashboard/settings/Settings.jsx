import { useDispatch, useSelector } from "react-redux";
import {
  closeSettingModalOpenOne,
  closeSettingModalOpenTwo,
  settingModalOpenOne,
  settingModalOpenTwo,
} from "../../../../features/modal/modalSlice";
import { Form, Input, Modal, Upload } from "antd";
import { UploadCloud } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { useGetDashboardAdminProfileApiQuery, usePostDashboardAdminProfileApiMutation, useSingleImageupdateDashboardAdminProfileApiMutation, useUpdateDashboardAdminProfileApiMutation } from "../../../../redux/dashboardFeatures/dashboardAdminProfileApi";
import CustomLoading from "../../shared/CustomLoading";
import toast from "react-hot-toast";
import axios from "axios";



const Settings = () => {
  const [loading, setLoading] = useState(false)
  const [formOne] = useForm()
  const [formTwo] = useForm()
  const [ImageFileList, setImageFileList] = useState([]);
  const dispatch = useDispatch();
  const settingModalOne = useSelector((state) => state.modal.settingModalOne);
  const settingModalTwo = useSelector((state) => state.modal.settingModalTwo);


  const [postDashboardAdminProfileApi] = usePostDashboardAdminProfileApiMutation() // post
  const { data, isLoading } = useGetDashboardAdminProfileApiQuery() // get
  const [updateDashboardAdminProfileApi] = useUpdateDashboardAdminProfileApiMutation(); // update
  const [singleImageupdateDashboardAdminProfileApi] = useSingleImageupdateDashboardAdminProfileApiMutation()

  const profileData = data?.data
  // console.log(profileData)

  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    if (data?.data?.image) {
      setImageUrl(`${import.meta.env.VITE_API_IMAGE_BASE_URL}/${data.data.image}`);
    }
  }, [data]);



  // one
  useEffect(() => {
    if (settingModalOne && profileData) {
      formOne.setFieldsValue({
        email: profileData.email,
      });
    }
  }, [settingModalOne, profileData, formOne]);


  // two
  useEffect(() => {
    if (settingModalTwo && profileData) {

      const imageObj = {
        uid: '-1',
        name: 'existing_image.jpg',
        status: 'done',
        url: `${import.meta.env.VITE_API_IMAGE_BASE_URL}/${profileData?.image}`
        // url: singleTeamData.photo,
      };


      formTwo.setFieldsValue({
        full_name: profileData.full_name,
        image: [imageObj],
      });

      setImageFileList([imageObj]);
    }
  }, [settingModalTwo, profileData, formTwo]);











  // ==== setting modal one start =======
  const onFinishOne = async (values) => {
    setLoading(true)
    const formData = new FormData();
    formData.append("new_password", values.new_password)
    formData.append("new_password_confirmation", values.new_password_confirmation)
    formData.append("email", values.email)

    // console.log(formData.forEach(value => {
    //   console.log(value)
    // }))

    try {
      const res = await postDashboardAdminProfileApi(formData).unwrap()
      console.log(res)
      if (res?.data) {
        toast.success(res?.message)
        formOne.resetFields()
        dispatch(closeSettingModalOpenOne());
      }
    } catch (errors) {
      toast.error(errors.data.message)
    } finally {
      setLoading(false)
    }

  }



  const showSettingModalOne = () => {
    dispatch(settingModalOpenOne());
  };
  const settingModalOkOne = () => {
    formOne.submit()
  };
  const settingModalCancelOne = () => {
    dispatch(closeSettingModalOpenOne());
  };

  // ==== setting modal one end =========





  // ==== setting modal two start =======
  const onFinishTwo = async (values) => {
    setLoading(true)
    const formData = new FormData();
    if (ImageFileList[0]?.originFileObj) {
      formData.append("image", ImageFileList[0].originFileObj);
    }

    formData.append("full_name", values.full_name)
    formData.append("_method", "PUT");

    // console.log(formData.forEach(value => {
    //   console.log(value)
    // }))



    try {
      const res = await updateDashboardAdminProfileApi({ updateInfo: formData }).unwrap()
      if (res?.data) {
        toast.success(res?.message)
        dispatch(closeSettingModalOpenTwo());
      }
    } catch (errors) {
      toast.error(errors.message);
    } finally {
      setLoading(false)
    }

  }

  const showSettingModalTwo = () => {
    dispatch(settingModalOpenTwo());
  };
  const settingModalOkTwo = () => {
    formTwo.submit()
  };
  const settingModalCancelTwo = () => {
    dispatch(closeSettingModalOpenTwo());
  };
  // ==== setting modal two end =========






  // only image upload function
  const handleUpload = async ({ file }) => {
    setLoading(true)

    const formData = new FormData();
    formData.append("image", file);
    formData.append("_method", "PUT");

    try {
      const res = await singleImageupdateDashboardAdminProfileApi({ updateInfo: formData }).unwrap()
      if (res?.data) {
        toast.success('Image update successfully')
      }
    }
    catch (errors) {
      toast.error(errors.message);
    } finally {
      setLoading(false)
    }
  };










  useEffect(() => {
    document.body.style.overflow =
      settingModalOne || settingModalTwo
        ? "hidden"
        : "auto";
  }, [settingModalOne, settingModalTwo]);

  if (isLoading) return <CustomLoading />

  return (
    <div className="bg-[#1B2324] p-[20px] rounded-lg">
      <div>
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3 pb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <h2 className="font-semibold font-roboto text-[30px] text-[#ffffff]">
              Account settings
            </h2>
          </div>
        </div>

        {/* setting */}
        <div className="bg-[#263234] py-3 px-3 md:px-0 md:py-10 rounded-lg flex justify-center items-center">
          <div className="relative cursor-pointer">
            <Upload
              accept="image/*"
              maxCount={1}
              showUploadList={false}
              customRequest={handleUpload}
            >
              <img
                src={imageUrl}
                alt=""
                className="h-[200px] w-[200px] object-cover rounded-full"
              />
              <span className="absolute bottom-0 right-0">
                <svg
                  width="50"
                  height="50"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="32" height="32" rx="2" fill="#263234" />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12.7318 7.35982C12.9218 7.13182 13.2032 7 13.5 7H18.5C18.7968 7 19.0782 7.13182 19.2682 7.35982L21.4684 10H24C24.7957 10 25.5587 10.3161 26.1213 10.8787C26.6839 11.4413 27 12.2043 27 13V22C27 22.7957 26.6839 23.5587 26.1213 24.1213C25.5587 24.6839 24.7957 25 24 25H8C7.20435 25 6.44129 24.6839 5.87868 24.1213C5.31607 23.5587 5 22.7956 5 22V13C5 12.2044 5.31607 11.4413 5.87868 10.8787C6.44129 10.3161 7.20435 10 8 10H10.5316L12.7318 7.35982ZM13.9684 9L11.7682 11.6402C11.5782 11.8682 11.2968 12 11 12H8C7.73478 12 7.48043 12.1054 7.29289 12.2929C7.10536 12.4804 7 12.7348 7 13V22C7 22.2652 7.10536 22.5196 7.29289 22.7071C7.48043 22.8946 7.73478 23 8 23H24C24.2652 23 24.5196 22.8946 24.7071 22.7071C24.8946 22.5196 25 22.2652 25 22V13C25 12.7348 24.8946 12.4804 24.7071 12.2929C24.5196 12.1054 24.2652 12 24 12H21C20.7032 12 20.4218 11.8682 20.2318 11.6402L18.0316 9H13.9684Z"
                    fill="#E9EBEB"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M16 15C14.8954 15 14 15.8954 14 17C14 18.1046 14.8954 19 16 19C17.1046 19 18 18.1046 18 17C18 15.8954 17.1046 15 16 15ZM12 17C12 14.7909 13.7909 13 16 13C18.2091 13 20 14.7909 20 17C20 19.2091 18.2091 21 16 21C13.7909 21 12 19.2091 12 17Z"
                    fill="#E9EBEB"
                  />
                </svg>
              </span>
            </Upload>
          </div>
        </div>








        <div className=" max-w-2xl">
          <div className="  text-[#E9EBEB] px-4 sm:px-6 md:px-12 py-16 space-y-12">
            {/* Personal Information */}
            <div className="pb-12">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-gray-700 pb-4">
                <h2 className="text-xl font-semibold">Personal information</h2>
                <h2
                  onClick={showSettingModalOne}
                  className="underline cursor-pointer"
                >
                  Update Password
                </h2>

                <h1
                  onClick={showSettingModalTwo}
                  className="underline cursor-pointer text-sm text-[#E9EBEB]  mt-2 sm:mt-0">
                  Edit personal information
                </h1>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6 mt-6">
                <div>
                  <p className="text-sm text-[#E9EBEB]">Full Name</p>
                  <p className="text-lg">{profileData?.full_name}</p>
                </div>
                <div>
                  <p className="text-sm text-[#E9EBEB]">E-mail</p>
                  <p className="text-lg break-all">{profileData?.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* setting modal components */}
      <div>

        {/* setting modal one */}
        <Modal
          centered
          className="custom-ai-modal"
          open={settingModalOne}
          onOk={settingModalOkOne}
          onCancel={settingModalCancelOne}
          width={500}
          footer={
            <div className="font-roboto flex justify-end gap-x-4 md:px-7 pt-[24px]">
              <button
                className="hover:bg-[#A6ABAC] px-6 rounded"
                onClick={settingModalCancelOne}
              >
                Cancel
              </button>
              <button
                className="bg-[#ffffff] py-2 px-4 rounded"
                onClick={settingModalOkOne}
              >
                {
                  loading ? "Loading...." : "Update password"
                }
              </button>
            </div>
          }
        >
          <div>
            <Form form={formOne} onFinish={onFinishOne}>

              <div className="flex flex-col justify-center items-center">
                <img
                  src="/dashboardPhoto/dashboardLoginLogo.png"
                  alt="login logo"
                  className="object-cover w-[30%]"
                />
                <h2 className="font-roboto  text-[#E9EBEB] text-[16px]">
                  Virtue Hope
                </h2>
              </div>
              <div className="py-[24px]">
                <p className="font-roboto text-[24px] font-bold text-[#ffffff] ">
                  Create a new password
                </p>
              </div>



              <div>
                <p className="font-roboto font-bold text-[#E9EBEB] text-[16px]">
                  Email
                </p>
                <Form.Item
                  name="email">
                  <Input readOnly style={{
                    border: "1px solid #B6B6BA",
                    padding: "10px",
                    backgroundColor: "transparent",
                    color: "#ffffff",

                  }} />
                </Form.Item>
              </div>

              <div>
                <p className="font-roboto font-bold text-[#E9EBEB] text-[16px]">
                  New password
                </p>
                <Form.Item
                  name="new_password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your new password!",
                    },
                  ]}
                >
                  <Input.Password
                    type="password"
                    placeholder="Enter your password"
                    style={{
                      border: "1px solid #B6B6BA",
                      padding: "10px",
                      backgroundColor: "transparent",
                      color: "#ffffff",
                    }}
                  />
                </Form.Item>
              </div>

              <div>
                <p className="font-roboto font-bold text-[#E9EBEB] text-[16px]">
                  Confirm new password
                </p>
                <Form.Item
                  name="new_password_confirmation"
                  rules={[
                    {
                      required: true,
                      message: "Please input your confirm new password!",
                    },
                  ]}
                >
                  <Input.Password
                    type="password"
                    placeholder="Enter your password"
                    style={{
                      border: "1px solid #B6B6BA",
                      padding: "10px",
                      backgroundColor: "transparent",
                      color: "#ffffff",
                    }}
                  />
                </Form.Item>
              </div>
            </Form>
          </div>
        </Modal>

        {/* setting modal two */}
        <Modal
          centered
          className="custom-ai-modal"
          open={settingModalTwo}
          onOk={settingModalOkTwo}
          onCancel={settingModalCancelTwo}
          width={500}
          footer={
            <div className="font-roboto flex justify-end gap-x-4 md:px-7 pt-[24px]">
              <button
                className="hover:bg-[#A6ABAC] px-6 rounded"
                onClick={settingModalCancelTwo}
              >
                Cancel
              </button>
              <button
                className="bg-[#ffffff] py-2 px-4 rounded"
                onClick={settingModalOkTwo}
              >
                {
                  loading ? "Loading....." : "Update Profile"
                }
              </button>
            </div>
          }
        >
          <div>
            <Form form={formTwo} onFinish={onFinishTwo}>

              {/* full name */}
              <div>
                <p className="text-[#FFFFFF] ">Full Name</p>
                <Form.Item name="full_name">
                  <Input
                  id="dashboard_setting_name"
                    placeholder="Enter Your Name"
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
            </Form>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Settings;
