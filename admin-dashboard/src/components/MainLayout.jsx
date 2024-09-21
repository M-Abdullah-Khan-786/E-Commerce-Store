import "../CSS/MainLayout.css";
import { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
const { Header, Sider, Content } = Layout;
import { Outlet, useNavigate } from "react-router-dom";
import { TbDashboard } from "react-icons/tb";
import { FaRegUserCircle } from "react-icons/fa";
import { GrCatalog, GrDeliver } from "react-icons/gr";
import { FaProductHunt } from "react-icons/fa6";
import { SiBrandfolder } from "react-icons/si";
import { MdCategory } from "react-icons/md";
import { AiOutlineBgColors } from "react-icons/ai";
import { ImBlogger } from "react-icons/im";
import { MdOutlineContactPhone } from "react-icons/md";

const MainLayout = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical">
          <h2 className="text-center text-white py-3 fs-5 mb-0">E-Store</h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key == "signout") {
              console.log("Sign Out");
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <TbDashboard className="fs-4" />,
              label: "Dashboard",
            },
            {
              key: "customers",
              icon: <FaRegUserCircle className="fs-4" />,
              label: "Customers",
            },
            {
              key: "catalog",
              icon: <GrCatalog className="fs-4" />,
              label: "Catalog",
              children: [
                {
                  key: "product",
                  icon: <FaProductHunt className="fs-4" />,
                  label: "Add Product",
                },
                {
                  key: "product-list",
                  icon: <FaProductHunt className="fs-4" />,
                  label: "Products List",
                },
                {
                  key: "brand",
                  icon: <SiBrandfolder className="fs-4" />,
                  label: "Add Brand",
                },
                {
                  key: "brand-list",
                  icon: <SiBrandfolder className="fs-4" />,
                  label: "Brands List",
                },
                {
                  key: "color",
                  icon: <AiOutlineBgColors className="fs-4" />,
                  label: "Add Color",
                },
                {
                  key: "color-list",
                  icon: <AiOutlineBgColors className="fs-4" />,
                  label: "Colors List",
                },
                {
                  key: "category",
                  icon: <MdCategory className="fs-4" />,
                  label: "Add Category",
                },
                {
                  key: "category-list",
                  icon: <MdCategory className="fs-4" />,
                  label: "Category List",
                },
              ],
            },
            {
              key: "orders",
              icon: <GrDeliver className="fs-4" />,
              label: "Orders",
            },
            {
              key: "blogs",
              icon: <ImBlogger className="fs-4" />,
              label: "Blogs",
              children: [
                {
                  key: "blog",
                  icon: <ImBlogger className="fs-4" />,
                  label: "Add Blog",
                },
                {
                  key: "blogs-list",
                  icon: <ImBlogger className="fs-4" />,
                  label: "Blog List",
                },
                {
                  key: "blog-category",
                  icon: <ImBlogger className="fs-4" />,
                  label: "Add Blog Category",
                },
                {
                  key: "blogs-category-list",
                  icon: <ImBlogger className="fs-4" />,
                  label: "Blog Category List",
                },
              ],
            },
            {
              key: "inquiries",
              icon: <MdOutlineContactPhone className="fs-4" />,
              label: "Inquiries",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
        className="d-flex justify-content-between ps-3 pe-5"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div className="d-flex gap-3 align-items-center" >
            <h1>Admin</h1>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
