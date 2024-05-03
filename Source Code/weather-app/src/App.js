import React, { useState } from 'react';
import { SunOutlined, HeatMapOutlined, SearchOutlined, AntCloudOutlined, CloudOutlined,MoonOutlined} from '@ant-design/icons'; 
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import ManualSearch from './Components/ManualSearch';
import { Route, Routes, useNavigate } from 'react-router-dom';
import WeatherIslamabad from './Components/WeatherIslamabad';
import WeatherLahore from './Components/WeatherLahore';
import WeatherKarachi from './Components/WeatherKarachi';
import WeatherPeshawar from './Components/WeatherPeshawar';

const { Header, Content, Footer, Sider } = Layout;
const {SubMenu} =Menu;
const items = [
  { label: 'Weather App', Icon: <CloudOutlined /> },
  {
    label: 'Cities',
    key: 'CityList',
    Icon: <HeatMapOutlined />,
    children: [
      { label: 'Islamabad', key: '/Islamabad' },
      { label: 'Lahore', key: '/Lahore' },
      { label: 'Karachi', key: '/Karachi' },
      { label: 'Peshawar', key: '/Peshawar' },
    ],
  },
  { label: 'Search Manually', key: '/SearchManually', Icon: <SearchOutlined /> },
];

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = (key) => {
    navigate(key);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
    
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
  {items.map((item) =>
    item.children ? (
      <SubMenu key={item.key} title={item.label} icon={item.Icon}>
        {item.children.map((child) => (
          <Menu.Item key={child.key} onClick={() => handleMenuClick(child.key)}>
            {child.label}
          </Menu.Item>
        ))}
      </SubMenu>
    ) : (
      <Menu.Item key={item.key} icon={item.Icon} onClick={() => handleMenuClick(item.key)}>
        {item.label}
      </Menu.Item>
    )
  )}
</Menu>

      </Sider>
      
      <Layout>
      <Header style={{ padding: 0, background: colorBgContainer,  alignItems: 'center' }}><div style={{ display: 'flex', alignItems: 'center',justifyContent:'center' }}>
  <AntCloudOutlined style={{ fontSize: '24px', marginRight: '8px' }} />
  <h1 style={{ margin: 0, color: '#000000'}}>Weather Forecast</h1>
  </div>
</Header>

        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
          
          </Breadcrumb>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer, borderRadius: borderRadiusLG }}>
            {/* Content based on routes */}
            <Routes>
              <Route path="/SearchManually" element={<ManualSearch />} />
              <Route path="/Islamabad" element={<WeatherIslamabad />} />
              <Route path="/Lahore" element={<WeatherLahore />} />
              <Route path="/Karachi" element={<WeatherKarachi />} />
              <Route path="/Peshawar" element={<WeatherPeshawar />} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Weather App ©{new Date().getFullYear()} Created by Wasia</Footer>
      </Layout>
    </Layout>
  );
};

export default App;
