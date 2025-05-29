import { Card, Avatar, Typography, Row, Col, Button } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import useAxiosPublic from "../../../pages/hooks/useAxiosPublic";
import { imgUrl } from "../../../helper/imgUrl";

const { Title, Paragraph, Text } = Typography;

const UserDetailsModal = ({ personalData, auctionData,setUserDetailsModal,setPaymentModal,setAuctionDetailsModal }) => {
  const name = personalData.name;
  const email = personalData.email;
  const contact_number = personalData.contact_number;
  const city = personalData.city;
  const address = personalData.address;
  const profile = personalData.profile;
  const title = auctionData.title;
  const image = auctionData.image;
  const description = auctionData.description;
  const donate_share = auctionData.donate_share;
  console.log(
    name,
    email,
    contact_number,
    city,
    address,
    profile,
    title,
    image,
    description,
    donate_share
  );

  const axiosPublic = useAxiosPublic();
  const openPaymentModal = ()=>{
    setUserDetailsModal(false);
    setPaymentModal(true)
  };
  const closeModal = ()=>{
    setUserDetailsModal(false);
    setAuctionDetailsModal(true)
  }

  return (
    <div>
      <Card
        hoverable
        cover={
          <img
            alt={title}
            src={`${imgUrl}/${image}`}
            style={{ height: 200, objectFit: "cover" }}
          />
        }
        style={{
          width: 400,
          margin: "auto",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <Card.Meta
          avatar={<Avatar src={profile} size={64} />}
          title={<Title level={4}>{name}</Title>}
          description={<Text type="secondary">{city}</Text>}
        />

        <div style={{ marginTop: 16 }}>
          <Title level={5}>{title}</Title>
          <Paragraph ellipsis={{ rows: 2 }}>{description}</Paragraph>

          <Row gutter={[8, 8]}>
            <Col span={24}>
              <Text strong>Donate Share:</Text> {donate_share}
            </Col>
            <Col span={24}>
              <MailOutlined style={{ marginRight: 8 }} />
              <Text>{email}</Text>
            </Col>
            <Col span={24}>
              <PhoneOutlined style={{ marginRight: 8 }} />
              <Text>{contact_number}</Text>
            </Col>
            <Col span={24}>
              <EnvironmentOutlined style={{ marginRight: 8 }} />
              <Text>{address}</Text>
            </Col>
          </Row>
        </div>
      </Card>
      <div className=" flex flex-col md:flex-row md:justify-end justify-start  lg:flex-row  lg:justify-end mt-5 mb-2">
        <Button onClick={closeModal} className="  navBtn1  ">
          Back
        </Button>
        <Button className="navBtn2" onClick={openPaymentModal}>
          Proceed next step
        </Button>
      </div>
    </div>
  );
};

export default UserDetailsModal;
