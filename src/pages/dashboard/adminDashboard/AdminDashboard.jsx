import React, { useEffect, useState } from "react";
import { LogoutOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme, Tooltip } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useGetNotificationApiQuery } from "../../../redux/dashboardFeatures/dashboardNotificationApi";
import CustomLoading from "../shared/CustomLoading";
import { useGetDashboardAdminProfileApiQuery } from "../../../redux/dashboardFeatures/dashboardAdminProfileApi";
import { CircleGauge } from "lucide-react";
const { Header, Sider, Content } = Layout;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState(location.pathname);
  const [collapsed, setCollapsed] = useState(false);

  const { data, isLoading } = useGetNotificationApiQuery(); // get
  const { data: profile } = useGetDashboardAdminProfileApiQuery(); // get

  const allNotifacitionData = data?.data
  const profileData = profile?.data


const unreadNotifications = allNotifacitionData?.filter(item => item.read_at === null);







  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems = [
    {
      key: "/admin/dashboard",
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.59069 0.80718C7.83143 0.619937 8.16853 0.619937 8.40927 0.80718L14.4093 5.47385C14.5717 5.60015 14.6666 5.79435 14.6666 6.00008V13.3334C14.6666 13.8638 14.4559 14.3726 14.0809 14.7476C13.7058 15.1227 13.1971 15.3334 12.6666 15.3334H3.33331C2.80288 15.3334 2.29417 15.1227 1.9191 14.7476C1.54403 14.3726 1.33331 13.8638 1.33331 13.3334V6.00008C1.33331 5.79435 1.42829 5.60015 1.59069 5.47385L7.59069 0.80718ZM2.66665 6.32614V13.3334C2.66665 13.5102 2.73688 13.6798 2.86191 13.8048C2.98693 13.9298 3.1565 14.0001 3.33331 14.0001H12.6666C12.8435 14.0001 13.013 13.9298 13.1381 13.8048C13.2631 13.6798 13.3333 13.5102 13.3333 13.3334V6.32614L7.99998 2.17799L2.66665 6.32614Z"
            fill="#ECEBEA"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.33331 7.99992C5.33331 7.63173 5.63179 7.33325 5.99998 7.33325H9.99998C10.3682 7.33325 10.6666 7.63173 10.6666 7.99992V14.6666C10.6666 15.0348 10.3682 15.3333 9.99998 15.3333C9.63179 15.3333 9.33331 15.0348 9.33331 14.6666V8.66659H6.66665V14.6666C6.66665 15.0348 6.36817 15.3333 5.99998 15.3333C5.63179 15.3333 5.33331 15.0348 5.33331 14.6666V7.99992Z"
            fill="#ECEBEA"
          />
        </svg>
      ),
      label: "Dashboard",
    },
    {
      key: "/admin/dashboard/contributors",
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.97631 10.3096C3.60143 9.68444 4.44928 9.33325 5.33333 9.33325H10.6667C11.5507 9.33325 12.3986 9.68444 13.0237 10.3096C13.6488 10.9347 14 11.7825 14 12.6666V13.9999C14 14.3681 13.7015 14.6666 13.3333 14.6666C12.9651 14.6666 12.6667 14.3681 12.6667 13.9999V12.6666C12.6667 12.1362 12.456 11.6274 12.0809 11.2524C11.7058 10.8773 11.1971 10.6666 10.6667 10.6666H5.33333C4.8029 10.6666 4.29419 10.8773 3.91912 11.2524C3.54405 11.6274 3.33333 12.1362 3.33333 12.6666V13.9999C3.33333 14.3681 3.03486 14.6666 2.66667 14.6666C2.29848 14.6666 2 14.3681 2 13.9999V12.6666C2 11.7825 2.35119 10.9347 2.97631 10.3096Z"
            fill="#E9EBEB"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.00002 2.66659C6.89545 2.66659 6.00002 3.56202 6.00002 4.66658C6.00002 5.77115 6.89545 6.66658 8.00002 6.66658C9.10459 6.66658 10 5.77115 10 4.66658C10 3.56202 9.10459 2.66659 8.00002 2.66659ZM4.66669 4.66658C4.66669 2.82564 6.15907 1.33325 8.00002 1.33325C9.84097 1.33325 11.3334 2.82564 11.3334 4.66658C11.3334 6.50753 9.84097 7.99992 8.00002 7.99992C6.15907 7.99992 4.66669 6.50753 4.66669 4.66658Z"
            fill="#E9EBEB"
          />
        </svg>
      ),
      label: "Contributors",
    },
    {
      key: "/admin/dashboard/volunteers",
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.976311 10.3096C1.60143 9.68444 2.44928 9.33325 3.33333 9.33325H8.66667C9.55072 9.33325 10.3986 9.68444 11.0237 10.3096C11.6488 10.9347 12 11.7825 12 12.6666V13.9999C12 14.3681 11.7015 14.6666 11.3333 14.6666C10.9651 14.6666 10.6667 14.3681 10.6667 13.9999V12.6666C10.6667 12.1362 10.456 11.6274 10.0809 11.2524C9.70581 10.8773 9.1971 10.6666 8.66667 10.6666H3.33333C2.8029 10.6666 2.29419 10.8773 1.91912 11.2524C1.54405 11.6274 1.33333 12.1362 1.33333 12.6666V13.9999C1.33333 14.3681 1.03486 14.6666 0.666667 14.6666C0.298477 14.6666 0 14.3681 0 13.9999V12.6666C0 11.7825 0.35119 10.9347 0.976311 10.3096Z"
            fill="#E9EBEB"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.00002 2.66659C4.89545 2.66659 4.00002 3.56202 4.00002 4.66658C4.00002 5.77115 4.89545 6.66658 6.00002 6.66658C7.10459 6.66658 8.00002 5.77115 8.00002 4.66658C8.00002 3.56202 7.10459 2.66659 6.00002 2.66659ZM2.66669 4.66658C2.66669 2.82564 4.15907 1.33325 6.00002 1.33325C7.84097 1.33325 9.33335 2.82564 9.33335 4.66658C9.33335 6.50753 7.84097 7.99992 6.00002 7.99992C4.15907 7.99992 2.66669 6.50753 2.66669 4.66658Z"
            fill="#E9EBEB"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.6878 9.92008C12.7799 9.56359 13.1435 9.34921 13.5 9.44125C14.2151 9.62589 14.8486 10.0428 15.3011 10.6265C15.7536 11.2102 15.9994 11.9277 16 12.6663L16 14.0001C16 14.3683 15.7015 14.6667 15.3333 14.6667C14.9651 14.6667 14.6667 14.3683 14.6667 14.0001L14.6667 12.6672C14.6667 12.6672 14.6667 12.6673 14.6667 12.6672C14.6663 12.2242 14.5188 11.7936 14.2473 11.4434C13.9759 11.0932 13.5957 10.843 13.1667 10.7322C12.8102 10.6402 12.5958 10.2766 12.6878 9.92008Z"
            fill="#E9EBEB"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.0208 1.92139C10.1121 1.56471 10.4753 1.34959 10.832 1.44092C11.549 1.6245 12.1845 2.0415 12.6384 2.62617C13.0922 3.21085 13.3385 3.92994 13.3385 4.67008C13.3385 5.41022 13.0922 6.12932 12.6384 6.71399C12.1845 7.29866 11.549 7.71566 10.832 7.89925C10.4753 7.99057 10.1121 7.77546 10.0208 7.41878C9.92949 7.06209 10.1446 6.69891 10.5013 6.60758C10.9315 6.49743 11.3128 6.24723 11.5851 5.89643C11.8574 5.54562 12.0052 5.11417 12.0052 4.67008C12.0052 4.226 11.8574 3.79454 11.5851 3.44374C11.3128 3.09293 10.9315 2.84273 10.5013 2.73258C10.1446 2.64126 9.92949 2.27807 10.0208 1.92139Z"
            fill="#E9EBEB"
          />
        </svg>
      ),
      label: "Volunteers",
    },
    {
      key: "/admin/dashboard/auction",
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.33331 2.66659C2.96512 2.66659 2.66665 2.96506 2.66665 3.33325V12.6666C2.66665 13.0348 2.96512 13.3333 3.33331 13.3333H12.6666C13.0348 13.3333 13.3333 13.0348 13.3333 12.6666V3.33325C13.3333 2.96506 13.0348 2.66659 12.6666 2.66659H3.33331ZM1.33331 3.33325C1.33331 2.22868 2.22874 1.33325 3.33331 1.33325H12.6666C13.7712 1.33325 14.6666 2.22868 14.6666 3.33325V12.6666C14.6666 13.7712 13.7712 14.6666 12.6666 14.6666H3.33331C2.22874 14.6666 1.33331 13.7712 1.33331 12.6666V3.33325Z"
            fill="#E9EBEB"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.66667 5.33333C5.48257 5.33333 5.33333 5.48257 5.33333 5.66667C5.33333 5.85076 5.48257 6 5.66667 6C5.85076 6 6 5.85076 6 5.66667C6 5.48257 5.85076 5.33333 5.66667 5.33333ZM4 5.66667C4 4.74619 4.74619 4 5.66667 4C6.58714 4 7.33333 4.74619 7.33333 5.66667C7.33333 6.58714 6.58714 7.33333 5.66667 7.33333C4.74619 7.33333 4 6.58714 4 5.66667Z"
            fill="#E9EBEB"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.1953 6.19526C10.4556 5.93491 10.8777 5.93491 11.1381 6.19526L14.4714 9.5286C14.7318 9.78894 14.7318 10.2111 14.4714 10.4714C14.2111 10.7318 13.789 10.7318 13.5286 10.4714L10.6667 7.60948L3.80476 14.4714C3.54441 14.7318 3.1223 14.7318 2.86195 14.4714C2.6016 14.2111 2.6016 13.7889 2.86195 13.5286L10.1953 6.19526Z"
            fill="#E9EBEB"
          />
        </svg>
      ),
      label: "Auction",
    },
    {
      key: "/admin/dashboard/donation-transaction",
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1.33331 14.6667C1.33331 14.2985 1.63179 14 1.99998 14H14C14.3682 14 14.6666 14.2985 14.6666 14.6667C14.6666 15.0349 14.3682 15.3333 14 15.3333H1.99998C1.63179 15.3333 1.33331 15.0349 1.33331 14.6667Z"
            fill="#E9EBEB"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.99998 6.66675C4.36817 6.66675 4.66665 6.96522 4.66665 7.33341V12.0001C4.66665 12.3683 4.36817 12.6667 3.99998 12.6667C3.63179 12.6667 3.33331 12.3683 3.33331 12.0001V7.33341C3.33331 6.96522 3.63179 6.66675 3.99998 6.66675Z"
            fill="#E9EBEB"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.66667 6.66675C7.03486 6.66675 7.33333 6.96522 7.33333 7.33341V12.0001C7.33333 12.3683 7.03486 12.6667 6.66667 12.6667C6.29848 12.6667 6 12.3683 6 12.0001V7.33341C6 6.96522 6.29848 6.66675 6.66667 6.66675Z"
            fill="#E9EBEB"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.33335 6.66675C9.70154 6.66675 10 6.96522 10 7.33341V12.0001C10 12.3683 9.70154 12.6667 9.33335 12.6667C8.96516 12.6667 8.66669 12.3683 8.66669 12.0001V7.33341C8.66669 6.96522 8.96516 6.66675 9.33335 6.66675Z"
            fill="#E9EBEB"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 6.66675C12.3682 6.66675 12.6666 6.96522 12.6666 7.33341V12.0001C12.6666 12.3683 12.3682 12.6667 12 12.6667C11.6318 12.6667 11.3333 12.3683 11.3333 12.0001V7.33341C11.3333 6.96522 11.6318 6.66675 12 6.66675Z"
            fill="#E9EBEB"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.64666 0.768083C7.86284 0.63297 8.13715 0.63297 8.35333 0.768083L13.6867 4.10142C13.9389 4.25904 14.0562 4.56465 13.9742 4.85054C13.8922 5.13642 13.6307 5.33342 13.3333 5.33342H2.66666C2.36926 5.33342 2.10782 5.13642 2.02583 4.85054C1.94384 4.56465 2.06113 4.25904 2.31333 4.10142L7.64666 0.768083ZM4.99119 4.00008H11.0088L7.99999 2.11958L4.99119 4.00008Z"
            fill="#E9EBEB"
          />
        </svg>
      ),
      label: "Transaction",
    },
    {
      key: "/admin/dashboard/service-book",
      icon: <img src="/serviceBook.png" alt="" className="w-[18px]"/>,
      label: "Service Book",
    },
    {
      key: "/admin/dashboard/podcast-stories",
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.66669 7.33333C6.66669 6.59695 7.26364 6 8.00002 6C8.7364 6 9.33335 6.59695 9.33335 7.33333C9.33335 8.06971 8.7364 8.66667 8.00002 8.66667C7.26364 8.66667 6.66669 8.06971 6.66669 7.33333Z"
            fill="#E9EBEB"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.97843 0.665557C9.40791 0.661277 10.8009 1.11658 11.9519 1.9643C13.1029 2.81202 13.9509 4.00726 14.3709 5.37366C14.7908 6.74006 14.7605 8.20526 14.2843 9.55309C13.808 10.9009 12.9112 12.06 11.7261 12.8593C11.4208 13.0652 11.0065 12.9846 10.8006 12.6793C10.5947 12.3741 10.6753 11.9597 10.9805 11.7539C11.9287 11.1144 12.6461 10.1872 13.0271 9.10891C13.408 8.03065 13.4323 6.85849 13.0964 5.76536C12.7604 4.67224 12.082 3.71606 11.1612 3.03788C10.2404 2.35971 9.126 1.99546 7.98242 1.99888C6.83884 2.00231 5.72665 2.37322 4.80993 3.0569C3.89321 3.74057 3.22052 4.70081 2.89111 5.79592C2.5617 6.89103 2.59302 8.06303 2.98043 9.13899C3.36785 10.215 4.09085 11.1379 5.04277 11.7716C5.34925 11.9757 5.43229 12.3896 5.22825 12.696C5.0242 13.0025 4.61034 13.0856 4.30386 12.8815C3.11397 12.0893 2.21021 10.9356 1.72594 9.59069C1.24167 8.24574 1.20253 6.78074 1.61429 5.41185C2.02606 4.04296 2.86692 2.84267 4.01282 1.98807C5.15871 1.13348 6.54896 0.669837 7.97843 0.665557Z"
            fill="#E9EBEB"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.89917 3.32963C8.64333 3.31095 9.37795 3.50031 10.0204 3.87639C10.6628 4.25247 11.1875 4.80035 11.5355 5.4584C11.8835 6.11644 12.041 6.85855 11.9902 7.60121C11.9394 8.34388 11.6824 9.05764 11.2481 9.6622C11.0333 9.96122 10.6167 10.0295 10.3177 9.81466C10.0187 9.59983 9.95041 9.18328 10.1652 8.88426C10.4548 8.48122 10.6261 8.00538 10.66 7.51026C10.6938 7.01515 10.5888 6.52042 10.3568 6.08172C10.1248 5.64302 9.77502 5.27777 9.34675 5.02705C8.91847 4.77633 8.42873 4.65009 7.93262 4.66254C7.43651 4.67499 6.95371 4.82563 6.53855 5.09752C6.12339 5.3694 5.79233 5.75174 5.58263 6.20153C5.37292 6.65131 5.29289 7.15069 5.35153 7.64348C5.41017 8.13626 5.60516 8.60291 5.91456 8.99092C6.14411 9.2788 6.09684 9.69825 5.80896 9.9278C5.52109 10.1574 5.10164 10.1101 4.87209 9.8222C4.40798 9.24019 4.1155 8.54021 4.02754 7.80103C3.93958 7.06184 4.05963 6.31278 4.37419 5.6381C4.68874 4.96343 5.18533 4.38992 5.80807 3.98209C6.43081 3.57426 7.155 3.3483 7.89917 3.32963Z"
            fill="#E9EBEB"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.74827 11.4381C6.74798 11.4362 6.74769 11.4344 6.74741 11.4325C6.72032 11.2523 6.73244 11.0683 6.78294 10.8932C6.83345 10.7181 6.92115 10.5559 7.04007 10.4178C7.15898 10.2797 7.3063 10.1688 7.47197 10.0928C7.63764 10.0169 7.81775 9.97754 8 9.97754C8.18226 9.97754 8.36237 10.0169 8.52804 10.0928C8.69371 10.1688 8.84103 10.2797 8.95994 10.4178C9.07885 10.5559 9.16656 10.7181 9.21706 10.8932C9.26617 11.0635 9.27899 11.2421 9.25476 11.4175L8.91204 14.4954C8.90008 14.7199 8.80561 14.9328 8.64583 15.0926C8.47455 15.2638 8.24224 15.3601 8 15.3601C7.75777 15.3601 7.52546 15.2638 7.35418 15.0926C7.19437 14.9327 7.0999 14.7198 7.08796 14.4953L6.74827 11.4381Z"
            fill="#E9EBEB"
          />
        </svg>
      ),
      label: "Podcast & stories",
    },
    {
      key: "/admin/dashboard/subscribers",
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.66669 3.33333C2.30154 3.33333 2.00002 3.63486 2.00002 4V12C2.00002 12.3651 2.30154 12.6667 2.66669 12.6667H13.3334C13.6985 12.6667 14 12.3651 14 12V4C14 3.63486 13.6985 3.33333 13.3334 3.33333H2.66669ZM0.666687 4C0.666687 2.89848 1.56516 2 2.66669 2H13.3334C14.4349 2 15.3334 2.89848 15.3334 4V12C15.3334 13.1015 14.4349 14 13.3334 14H2.66669C1.56516 14 0.666687 13.1015 0.666687 12V4Z"
            fill="#E9EBEB"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.787195 3.61791C0.998338 3.31628 1.41403 3.24292 1.71566 3.45407L8.00002 7.85312L14.2844 3.45407C14.586 3.24292 15.0017 3.31628 15.2128 3.61791C15.424 3.91954 15.3506 4.33523 15.049 4.54637L8.38232 9.21304C8.15278 9.37372 7.84725 9.37372 7.61771 9.21304L0.951042 4.54637C0.649409 4.33523 0.576052 3.91954 0.787195 3.61791Z"
            fill="#E9EBEB"
          />
        </svg>
      ),
      label: "Subscribers",
    },
    {
      key: "/admin/dashboard/my-team",
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_181042_6835)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.33331 1.33317C5.33331 0.964981 5.63179 0.666504 5.99998 0.666504H9.99998C10.3682 0.666504 10.6666 0.964981 10.6666 1.33317V5.33317C10.6666 5.70136 10.3682 5.99984 9.99998 5.99984H5.99998C5.63179 5.99984 5.33331 5.70136 5.33331 5.33317V1.33317ZM6.66665 1.99984V4.6665H9.33331V1.99984H6.66665Z"
              fill="#E9EBEB"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10 10.6667C10 10.2985 10.2985 10 10.6667 10H14.6667C15.0349 10 15.3333 10.2985 15.3333 10.6667V14.6667C15.3333 15.0349 15.0349 15.3333 14.6667 15.3333H10.6667C10.2985 15.3333 10 15.0349 10 14.6667V10.6667ZM11.3333 11.3333V14H14V11.3333H11.3333Z"
              fill="#E9EBEB"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.666687 10.6667C0.666687 10.2985 0.965164 10 1.33335 10H5.33335C5.70154 10 6.00002 10.2985 6.00002 10.6667V14.6667C6.00002 15.0349 5.70154 15.3333 5.33335 15.3333H1.33335C0.965164 15.3333 0.666687 15.0349 0.666687 14.6667V10.6667ZM2.00002 11.3333V14H4.66669V11.3333H2.00002Z"
              fill="#E9EBEB"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.00002 4.6665C8.36821 4.6665 8.66669 4.96498 8.66669 5.33317V7.33317H12.6667C13.0349 7.33317 13.3334 7.63165 13.3334 7.99984V10.6665C13.3334 11.0347 13.0349 11.3332 12.6667 11.3332C12.2985 11.3332 12 11.0347 12 10.6665V8.6665H4.00002V10.6665C4.00002 11.0347 3.70154 11.3332 3.33335 11.3332C2.96516 11.3332 2.66669 11.0347 2.66669 10.6665V7.99984C2.66669 7.63165 2.96516 7.33317 3.33335 7.33317H7.33335V5.33317C7.33335 4.96498 7.63183 4.6665 8.00002 4.6665Z"
              fill="#E9EBEB"
            />
          </g>
          <defs>
            <clipPath id="clip0_181042_6835">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
      label: "My team",
    },
    {
      key: "/admin/dashboard/faq-page",
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1.33331 1.33317C1.33331 0.964981 1.63179 0.666504 1.99998 0.666504H14C14.3682 0.666504 14.6666 0.964981 14.6666 1.33317V9.33317C14.6666 9.50998 14.5964 9.67955 14.4714 9.80457L11.8047 12.4712C11.6797 12.5963 11.5101 12.6665 11.3333 12.6665H8.27612L5.80472 15.1379C5.61405 15.3286 5.32731 15.3856 5.07819 15.2824C4.82907 15.1792 4.66665 14.9361 4.66665 14.6665V12.6665H1.99998C1.63179 12.6665 1.33331 12.368 1.33331 11.9998V1.33317ZM2.66665 1.99984V11.3332H5.33331C5.7015 11.3332 5.99998 11.6316 5.99998 11.9998V13.057L7.52858 11.5284C7.6536 11.4034 7.82317 11.3332 7.99998 11.3332H11.0572L13.3333 9.05703V1.99984H2.66665ZM7.33331 3.99984C7.7015 3.99984 7.99998 4.29831 7.99998 4.6665V7.33317C7.99998 7.70136 7.7015 7.99984 7.33331 7.99984C6.96512 7.99984 6.66665 7.70136 6.66665 7.33317V4.6665C6.66665 4.29831 6.96512 3.99984 7.33331 3.99984ZM10.6666 3.99984C11.0348 3.99984 11.3333 4.29831 11.3333 4.6665V7.33317C11.3333 7.70136 11.0348 7.99984 10.6666 7.99984C10.2985 7.99984 9.99998 7.70136 9.99998 7.33317V4.6665C9.99998 4.29831 10.2985 3.99984 10.6666 3.99984Z"
            fill="#E9EBEB"
          />
        </svg>
      ),
      label: "FAQs",
    },
    {
      key: "/admin/dashboard/settings",
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.16001 15.3332H7.86668C7.33335 15.3332 6.83335 15.1265 6.45335 14.7465C6.07335 14.3665 5.86668 13.8665 5.86668 13.3332V13.2132C5.86668 13.0998 5.83335 12.9798 5.78001 12.8798C5.72001 12.7798 5.64001 12.6932 5.53335 12.6332L5.24668 12.4665C5.04668 12.3532 4.78668 12.3532 4.58001 12.4665L4.46001 12.5332C4.02001 12.7865 3.48001 12.8598 2.96668 12.7198C2.46001 12.5798 2.01335 12.2465 1.75335 11.7865L1.60001 11.5398C1.33335 11.0732 1.26001 10.5398 1.40001 10.0198C1.54001 9.5065 1.86668 9.07317 2.32668 8.8065L2.41335 8.75317C2.52668 8.6865 2.60668 8.6065 2.66668 8.49984C2.72668 8.39984 2.75335 8.27984 2.75335 8.1665V7.81984C2.75335 7.7065 2.72001 7.59317 2.66668 7.49317C2.62001 7.39984 2.53335 7.31317 2.43335 7.25984L2.30001 7.17317C1.86668 6.91984 1.54001 6.49317 1.40001 5.97317C1.26668 5.45984 1.33335 4.91984 1.60001 4.45984L1.74668 4.2065C2.00668 3.75317 2.45335 3.41317 2.96001 3.27984C3.47335 3.13984 4.01335 3.21317 4.47335 3.47984L4.55335 3.51984C4.80001 3.65984 5.04001 3.6465 5.24668 3.5265L5.53335 3.3665C5.63335 3.3065 5.72001 3.21984 5.78001 3.11984C5.83335 3.01984 5.86668 2.89984 5.86668 2.7865V2.6665C5.86668 2.13317 6.07335 1.63317 6.45335 1.25317C6.82668 0.873171 7.33335 0.666504 7.86668 0.666504H8.16001C8.69335 0.666504 9.19335 0.873171 9.57335 1.25317C9.95335 1.63317 10.16 2.13317 10.16 2.6665V2.7865C10.16 2.89984 10.1933 3.01984 10.2467 3.11984C10.3067 3.21984 10.3867 3.3065 10.4933 3.35984L10.78 3.5265C10.98 3.63984 11.24 3.63984 11.4467 3.5265L11.5667 3.45984C12.0067 3.2065 12.5533 3.13317 13.0667 3.27317C13.58 3.41317 14.0133 3.73984 14.28 4.19984L14.4267 4.45317C14.6933 4.91317 14.7667 5.45317 14.6267 5.9665C14.4867 6.47984 14.16 6.91317 13.7 7.17984L13.6 7.2465C13.4867 7.31317 13.4067 7.39317 13.3467 7.49317C13.2867 7.59317 13.2533 7.71317 13.26 7.8265V8.15984C13.26 8.27984 13.2933 8.39317 13.3467 8.49984C13.4067 8.59984 13.4867 8.6865 13.5933 8.7465L13.6733 8.7865C14.1533 9.0665 14.4867 9.49984 14.6267 10.0132C14.7667 10.5265 14.6933 11.0665 14.4267 11.5265L14.2867 11.7798C14.0133 12.2465 13.5867 12.5798 13.0667 12.7132C12.56 12.8465 12.0067 12.7732 11.5533 12.5132L11.4733 12.4732C11.2333 12.3332 10.9933 12.3465 10.7867 12.4598L10.5 12.6265C10.3933 12.6865 10.3133 12.7732 10.2533 12.8732C10.1933 12.9732 10.1667 13.0865 10.1667 13.2065V13.3332C10.1667 13.8665 9.96001 14.3665 9.58001 14.7465C9.19335 15.1265 8.69335 15.3332 8.16001 15.3332ZM4.91335 11.0465C5.26668 11.0465 5.60668 11.1398 5.91335 11.3132L6.20001 11.4798C6.50001 11.6532 6.75335 11.9065 6.92668 12.2065C7.10001 12.5132 7.19335 12.8532 7.19335 13.2065V13.3332C7.19335 13.5132 7.26001 13.6798 7.38668 13.8065C7.52001 13.9332 7.68668 13.9998 7.86668 13.9998H8.16001C8.34001 13.9998 8.50668 13.9332 8.63335 13.8065C8.76001 13.6798 8.82668 13.5132 8.82668 13.3332V13.2132C8.82668 12.8665 8.92001 12.5198 9.09335 12.2132C9.26668 11.9065 9.52001 11.6598 9.82668 11.4798L10.1133 11.3132C10.72 10.9598 11.5067 10.9598 12.1133 11.3132L12.1933 11.3532C12.36 11.4532 12.5467 11.4732 12.72 11.4265C12.8933 11.3798 13.0333 11.2732 13.1267 11.1198L13.2667 10.8665C13.36 10.7065 13.38 10.5265 13.34 10.3532C13.2933 10.1865 13.18 10.0332 13.0267 9.9465L12.9467 9.9065C12.62 9.71984 12.3667 9.4665 12.1933 9.15984C12.02 8.85317 11.9267 8.5065 11.9267 8.15984V7.8265C11.9267 7.47984 12.02 7.1265 12.1933 6.8265C12.3667 6.51984 12.62 6.2665 12.9267 6.09317L13.02 6.03984C13.18 5.9465 13.2867 5.79984 13.3333 5.63317C13.38 5.4665 13.3533 5.27984 13.2667 5.1265L13.12 4.87317C13.0333 4.71984 12.8867 4.61317 12.7133 4.5665C12.5467 4.51984 12.36 4.5465 12.2067 4.63317L12.0867 4.69984C11.52 5.03317 10.7133 5.03984 10.1067 4.6865L9.82001 4.51984C9.52001 4.3465 9.26668 4.09317 9.09335 3.79317C8.92001 3.4865 8.82668 3.13984 8.82668 2.79317V2.6665C8.82668 2.49317 8.75335 2.31984 8.63335 2.19317C8.50668 2.07317 8.33335 1.99984 8.16001 1.99984H7.86668C7.69335 1.99984 7.52001 2.07317 7.39335 2.19317C7.27335 2.31984 7.20001 2.49317 7.20001 2.6665V2.7865C7.20001 3.13984 7.10668 3.47984 6.93335 3.7865C6.76001 4.0865 6.50668 4.33984 6.20001 4.51984L5.91335 4.67984C5.30001 5.03317 4.51335 5.03317 3.91335 4.67984L3.83335 4.63984C3.66001 4.53984 3.48001 4.51984 3.30668 4.5665C3.14001 4.6065 2.99335 4.71984 2.90668 4.87317L2.75335 5.1265C2.66668 5.27984 2.64668 5.45984 2.68668 5.63317C2.73335 5.8065 2.84668 5.9465 3.00001 6.03317L3.13335 6.11984C3.40001 6.27317 3.65335 6.51984 3.82668 6.8265C4.00001 7.13317 4.10001 7.47317 4.10001 7.81984V8.1665C4.10001 8.51317 4.01335 8.85984 3.83335 9.1665C3.66001 9.47317 3.40668 9.7265 3.10001 9.89984L3.01335 9.95317C2.84668 10.0465 2.74001 10.1932 2.69335 10.3665C2.64668 10.5398 2.67335 10.7198 2.76001 10.8732L2.90668 11.1265C2.99335 11.2798 3.14001 11.3932 3.31335 11.4398C3.48668 11.4865 3.66668 11.4598 3.82001 11.3732L3.94001 11.3065C4.21335 11.1398 4.56001 11.0465 4.91335 11.0465Z"
            fill="#E9EBEB"
          />
          <path
            d="M8.01335 10.6668C6.54001 10.6668 5.34668 9.4735 5.34668 8.00016C5.34668 6.52683 6.54001 5.3335 8.01335 5.3335C9.48668 5.3335 10.68 6.52683 10.68 8.00016C10.68 9.4735 9.48001 10.6668 8.01335 10.6668ZM8.01335 6.66683C7.28001 6.66683 6.68001 7.26683 6.68001 8.00016C6.68001 8.7335 7.28001 9.3335 8.01335 9.3335C8.74668 9.3335 9.34668 8.7335 9.34668 8.00016C9.34668 7.26683 8.74668 6.66683 8.01335 6.66683Z"
            fill="#E9EBEB"
          />
        </svg>
      ),
      label: "Settings",
    },
  ];

  // 📍 When menu item is clicked
  const handleMenuClick = (e) => {
    setSelectedKeys([e.key]);
    navigate(e.key);
  };

  // Update selectedKeys when location changes
  useEffect(() => {
    setSelectedKeys(location.pathname);
  }, [location]);

  const handleNavigate = () => {
    navigate("/");
  };
  const handleNotification = () => {
    navigate("/admin/dashboard/notification");
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Do you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1B2324", // custom green
      cancelButtonColor: "#ffffff", // custom red

      confirmButtonText: "Yes, log out",
      cancelButtonText: "No, keep me logged in",
      background: "#1B2324",
      color: "rgba(255, 255, 255, 0.5) ",
      customClass: {
        confirmButton:
          "text-[#fff] px-4 py-2 rounded hover:bg-transfarent  font-semibold",
        cancelButton: "text-gray-700  bg-[#ffffff] px-4 py-2",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("admin_token")
        navigate('/admin/dashboard/login')
      }
    });
  };

  const handleProfile = () =>{
    navigate('/admin/dashboard/settings')
  }


  if (isLoading) return <CustomLoading />
  return (
    <>
      {/* dashboard header component */}
      <Header
        style={{
          background: colorBgContainer,
          backgroundColor: "#403730",
          color: "white",
          width: "100%",
          height: "65px",
          position: "fixed",
          padding: "0px 10px 0px 10px",
          margin: "0px",
        }}
      >
        <div className="flex justify-between">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={handleNavigate}
          >
            <img src="/dashboardPhoto/dashboardLogo.png" alt="website logo" />
            <h2>Virtue Hope</h2>
          </div>
          <div className="md:flex items-center justify-between gap-6 hidden">

            {/* notification count compontnt */}
            <div onClick={handleNotification} className="relative cursor-pointer">
              <svg
                width="50"
                height="50"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.4276 16.5692H16.999V10.4978C16.999 7.97813 15.1365 5.89598 12.7133 5.54955V4.85491C12.7133 4.46027 12.3937 4.14062 11.999 4.14062C11.6044 4.14062 11.2847 4.46027 11.2847 4.85491V5.54955C8.86152 5.89598 6.99902 7.97813 6.99902 10.4978V16.5692H6.57045C6.25438 16.5692 5.99902 16.8246 5.99902 17.1406V17.7121C5.99902 17.7906 6.06331 17.8549 6.14188 17.8549H9.99902C9.99902 18.9585 10.8955 19.8549 11.999 19.8549C13.1026 19.8549 13.999 18.9585 13.999 17.8549H17.8562C17.9347 17.8549 17.999 17.7906 17.999 17.7121V17.1406C17.999 16.8246 17.7437 16.5692 17.4276 16.5692ZM11.999 18.7121C11.5258 18.7121 11.1419 18.3281 11.1419 17.8549H12.8562C12.8562 18.3281 12.4722 18.7121 11.999 18.7121ZM8.28474 16.5692V10.4978C8.28474 9.50491 8.67045 8.57277 9.37224 7.87098C10.074 7.1692 11.0062 6.78348 11.999 6.78348C12.9919 6.78348 13.924 7.1692 14.6258 7.87098C15.3276 8.57277 15.7133 9.50491 15.7133 10.4978V16.5692H8.28474Z"
                  fill="white"
                />
              </svg>
              <p className="absolute left-6 top-0 
               bg-red-500 w-6 h-6 rounded-full flex justify-center items-center text-xs">
                {unreadNotifications?.length}
              </p>
            </div>
             <div onClick={handleProfile} className="cursor-pointer">
              <img src={`${import.meta.env.VITE_API_IMAGE_BASE_URL}/${profileData?.image}`} alt="" className="w-[30px] h-[30px]"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = '/dashboardPhoto/Setting.png'; 
                }}
              />
            </div>
            <div>
              <h2>{profileData?.full_name}</h2>
            </div>
           </div>
          </div>
      </Header>

      <Layout style={{ paddingTop: "65px", minHeight: "100vh" }}>
        <Sider
          style={{ backgroundColor: "#263234" }}
          trigger={null}
          collapsible
          collapsed={collapsed}
          className="w-[354px] h-screen !fixed flex flex-col justify-between"
        >
          {/* sidebar parant div */}
          <div className="flex flex-col justify-between h-screen">
            <div>
              <Menu
                style={{ backgroundColor: "#263234", color: "#ffffff" }}
                theme="dark"
                mode="inline"
                selectedKeys={selectedKeys}
                onClick={handleMenuClick}
                items={menuItems}
              />
            </div>
            {/* Bottom part: Logout */}

            <div className="px-4 py-4 mb-16">
              {collapsed ? (
                <Tooltip title="Log out" placement="right">
                  <button
                    onClick={() => handleLogout()}
                    className="w-full text-[#DA453F] hover:text-white px-4 py-2 rounded hover:bg-[#1B2324] transition-all duration-200 flex items-center justify-start h-10"
                  >
                    <LogoutOutlined className="shrink-0" />
                    <p className="opacity-0 w-0 overflow-hidden transition-all duration-300">
                      Log out
                    </p>
                  </button>
                </Tooltip>
              ) : (
                <button
                  onClick={() => handleLogout()}
                  className="w-full text-[#DA453F] hover:text-white px-4 py-2 rounded hover:bg-[#1B2324] transition-all duration-200 flex items-center justify-start h-10"
                >
                  <LogoutOutlined className="shrink-0" />
                  <p className="opacity-100 pl-3 transition-all duration-300 whitespace-nowrap">
                    Log out
                  </p>
                </button>
              )}
            </div>
          </div>

          {/* Custom collapse button */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              right: "-14px",
              transform: "translateY(-200%)",
              zIndex: 10,
            }}
          >
            <button
              onClick={() => setCollapsed(!collapsed)}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              <svg
                width="14"
                height="66"
                viewBox="0 0 14 66"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0L14 8V58L0 66V0Z" fill="#4B5557" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.32999 29.8701C8.51223 30.0523 8.51223 30.3478 8.32999 30.53L5.85997 33.0001L8.32999 35.4701C8.51223 35.6523 8.51223 35.9478 8.32999 36.13C8.14774 36.3123 7.85227 36.3123 7.67002 36.13L4.87002 33.33C4.68778 33.1478 4.68778 32.8523 4.87002 32.6701L7.67002 29.8701C7.85227 29.6878 8.14774 29.6878 8.32999 29.8701Z"
                  fill="#E9EBEB"
                />
              </svg>
            </button>
          </div>
        </Sider>

        <Layout
          style={{ margin: "0px 0px 0px 20px", backgroundColor: "#121818" }}
        >
          {/* content */}
          <Content
            style={{
              height: "auto",
              minHeight: "calc(100vh - 65px)",
              margin: "24px 16px",
              marginLeft: collapsed ? 80 : 200,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default AdminDashboard;
