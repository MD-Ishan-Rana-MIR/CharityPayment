import React, { useEffect, useState } from 'react'

const EditImage = () => {
    const [selectId, setSelectId] = useState(null)
    const [editData, setEditData] = useState("edit section ar single obj");
    // rules ------> if you get for data and use redux for id snd 
    // example
    const { data: singleData } = useSingleGetDashboardMyTeamApiQuery(selectId, {
        skip: !selectId, // Prevent call until ID is available
    });

    const singleTeamData = singleData.data;

    // edit ta show in form for
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







    // form submit
    const onFinishOne = async (values) => {
        const formData = new FormData();

        // Only append new image if uploaded
        if (ImageFileList[0]?.originFileObj) {
            formData.append("photo", ImageFileList[0].originFileObj);
        }

        formData.append("name", values.name);
        formData.append("_method", "PUT");



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
            toast.error(errors.message);
        }



        return (
            <div>EditImage</div>
        )
    }

    export default EditImage