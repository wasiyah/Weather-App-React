import React from 'react';
import { SunOutlined, HeatMapOutlined, SearchOutlined, AntCloudOutlined, HomeOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import WeatherData from './Components/WeatherData';
import ManualSearch from './Components/ManualSearch';
import { Route, Routes, useNavigate } from 'react-router-dom';
import WeatherIslamabad from './Components/WeatherIslamabad';
import WeatherLahore from './Components/WeatherLahore';
import WeatherKarachi from './Components/WeatherKarachi';
import WeatherPeshawar from './Components/WeatherPeshawar';

const { Header, Content, Footer, Sider } = Layout;

const App = () => {
  const navigate = useNavigate();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems = [
    { label: 'Search Manually', key: '/SearchManually', Icon: <SearchOutlined /> },
    { label: 'Cities', key: 'CityList', Icon: <HeatMapOutlined />, children: [
      { label: "Islamabad", key: "/Islamabad" },
      { label: "Lahore", key: "/Lahore" },
      { label: "Karachi", key: "/Karachi" },
      { label: "Peshawar", key: "/Peshawar" }
    ] }
  ];

  return (
    <Layout>
      <Header style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="demo-logo" />
        <h2 theme="dark" style={{ flex: 1, color: 'white', textAlign: 'center', minWidth: 0 }}>
          <AntCloudOutlined style={{ marginRight: 8 }} />
          Weather
        </h2>
      </Header>
      <Content style={{ padding: '0 48px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}></Breadcrumb>
        <Layout style={{ padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG }}>
          <Sider style={{ background: colorBgContainer }} width={200}>
            <Menu onClick={({ key }) => navigate(key)} defaultSelectedKeys={[window.Location.pathname]}>
              {menuItems.map((item) => (
                item.children ? (
                  <Menu.SubMenu key={item.key} title={item.label} icon={item.Icon}>
                    {item.children.map((city) => (
                      <Menu.Item key={city.key}>
                        <span>{city.label}</span>
                      </Menu.Item>
                    ))}
                  </Menu.SubMenu>

                  
                   ) : (
                  <Menu.Item key={item.key} icon={item.Icon}>
                    <span>{item.label}</span>
                  </Menu.Item>
                )
              ))}
            </Menu>
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            <Routes>
              <Route path="/SearchManually" element={<ManualSearch />} />
              <Route path="/Islamabad" element={<WeatherIslamabad />} />
              <Route path="/Lahore" element={<WeatherLahore />} />
              <Route path="/Karachi" element={<WeatherKarachi />} />
              <Route path="/Peshawar" element={<WeatherPeshawar />} />
            </Routes>
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Weather App ©{new Date().getFullYear()}</Footer>
    </Layout>
  );
};

export default App;
