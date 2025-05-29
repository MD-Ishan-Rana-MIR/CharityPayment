import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Form, Spin } from "antd";
import { useForm } from "antd/es/form/Form";
import toast from "react-hot-toast";
import { useDeleteDashboardFaqApiMutation, useGetDashboardFaqApiQuery, usePostDashboardFaqApiMutation, useUpdateDashboardFaqApiMutation } from "../../../../redux/dashboardFeatures/DashboardFaqApi";
import { useState } from "react";
import CustomLoading from "../../shared/CustomLoading";



const FAQs = () => {
  const [postDashboardFaqApi] = usePostDashboardFaqApiMutation();
  const { data, refetch, isLoading } = useGetDashboardFaqApiQuery();
  const [deleteFaq] = useDeleteDashboardFaqApiMutation();
  const [updateDashboardFaqApi] = useUpdateDashboardFaqApiMutation()
  const [formOne] = useForm();
  const [selectedFaqId, setSelectedFaqId] = useState(null);

  const allFaqData = data?.data?.data


  // post & update request
  const onFinishOne = async (values) => {
    const faqInfo = {
      question: values.question,
      answer: values.answer,
    };

    try {
      if (selectedFaqId) {
        // update
        const res = await updateDashboardFaqApi({
          id: selectedFaqId,
          faqInfo: faqInfo,
        }).unwrap();

        if (res?.data) {
          toast.success(res?.message);
          formOne.resetFields();
          setSelectedFaqId(null); // reset selected
          refetch();
        }
      } else {
        // add
        const res = await postDashboardFaqApi(faqInfo).unwrap();
        if (res?.data) {
          toast.success(res?.message);
          formOne.resetFields();
          refetch();
        }
      }
    } catch (errors) {
      toast.error(errors.message);
    }
  };



  // delete request
  const handleDelete = async (faqId) => {
    try {
      const res = await deleteFaq(faqId).unwrap();
      if (res?.success === true) {
        toast.success(res.message);
        refetch() // refresh list after delete
      }
    } catch (errors) {
      toast.error(errors.message);
    }
  };

  // update request
  const handleUpdate = (item) => {
    formOne.setFieldsValue({
      question: item.question,
      answer: item.answer,
    });
    setSelectedFaqId(item.id);
  }

  if (isLoading) return <CustomLoading />
  return (
    <div className="bg-[#1B2324] p-[20px] rounded-lg">
      <div>
        <div className=" flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3 pb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <h2 className="font-semibold font-roboto text-[30px] text-[#ffffff]">
              Manage FAQs
            </h2>
          </div>
        </div>
      </div>

      <Form form={formOne} onFinish={onFinishOne}>
        <div>
          <Form.Item name="question"
            rules={[
              {
                required: true,
                message: "Please enter your question"
              },
            ]}
          >
            <textarea
              placeholder="Enter Your Question"
              style={{
                backgroundColor: "transparent",
                border: "1px solid gray",
                padding: "8px",
                width: "100%",
                color: "#ffffff",
                borderRadius: "5px"
              }}
              className="resize-none"
            />
          </Form.Item>
        </div>
        <div>
          <Form.Item name="answer"
            rules={[
              {
                required: true,
                message: "Please enter your answer"
              },
            ]}
          >
            <textarea
              placeholder="Enter Your Answer"
              style={{
                backgroundColor: "transparent",
                border: "1px solid gray",
                padding: "8px",
                width: "100%",
                height: "150px",
                color: "#ffffff",
                borderRadius: "5px"
              }}
              className="resize-none"
            />
          </Form.Item>
        </div>
        <div className="flex justify-end">
          <button type="submit" className=" px-6 rounded-md bg-[#ffff] hover:bg-[#ffffff6e] " style={{
            fontFamily: "Roboto",
            fontWeight: "bold",
            fontSize: "16px",
            height: "40px",
            marginLeft: "0px",
          }}>
            Add
          </button>
          {/* <Button htmlType="submit"></Button> */}

        </div>
      </Form>
      <div className=" h-auto text-[#ffff] p-4">
        {allFaqData?.slice(0, 5).map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b border-gray-700 py-4"
          >
            <div className="flex flex-col">
              <span className="text-xl">{item?.question}</span>
              <p className="text-sm text-gray-400">
                <span className="text-xl text-[#ffff]">Ans : </span> {item?.answer}
              </p>
            </div>
            <div className="flex gap-4">
              <EditOutlined
                onClick={() => handleUpdate(item)}
                className="cursor-pointer hover:text-blue-400" />
              <DeleteOutlined
                onClick={() => handleDelete(item?.id)}
                className="cursor-pointer hover:text-red-400" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;
