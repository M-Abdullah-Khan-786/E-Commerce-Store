import "../CSS/MainLayout.css";
import { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
const { Header, Sider, Content } = Layout;
import { useNavigate } from "react-router-dom";
import { TbDashboard } from "react-icons/tb";
import { FaRegUserCircle } from "react-icons/fa";
import { GrCatalog } from "react-icons/gr";
import { FaProductHunt } from "react-icons/fa6";
import { SiBrandfolder } from "react-icons/si";
import { MdCategory } from "react-icons/md";
import { AiOutlineBgColors } from "react-icons/ai";

const MainLayout = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
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
              children:[
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
              ]
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
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
          Content
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
