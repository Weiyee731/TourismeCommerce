import React, { useState } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from 'react-pro-sidebar';
import sidebar_items from './data/SidebarConfiguration';  // "user manual": if you pull from api and you can set it in useeffect
import SubMenuItems from "./SubMenuItems"
import SidebarProfile from "./SidebarProfile"
import SidebarButtons from "./SidebarButtons";

// utility and icons
import { isArrayNotEmpty, isStringNullOrEmpty } from "../../tools/Helpers"
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import Dashboard from '@mui/icons-material/Dashboard';

// "user manual": set your default icon styles here
const MaterialIconStyles = {
  DefaultMaterialIcon: "material-icons",
  OutlinedMaterialIcon: "material-icons-outlined",
  RoundMaterialIcon: "material-icons-round",
  SharpMaterialIcon: "material-icons-sharp",
  TwoToneMaterialIcon: "material-icons-two-tone",
}

function mapStateToProps(state) {
  return {
    // user: state.counterReducer["user"],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // CallUserProfile: () => dispatch(GitAction.CallUserProfile()),
  };
}


const Aside = ({ rtl, toggled, handleToggleSidebar, sidebarItems }) => {
  const [isCollapsed, setIsCollapsed] = useState(false) // check the sidebar is actually collapsed 
  const [collapsed, setCollapsed] = useState(false)
  const [MaterialIconStyle, setMaterialIconStyle] = useState(MaterialIconStyles.OutlinedMaterialIcon) // "user manual": set your default icon styles here

  const handleCollapseSidebar = (value) => {
    setIsCollapsed(typeof value !== "undefined" && value !== null ? value : !isCollapsed);
    setCollapsed(typeof value !== "undefined" && value !== null ? value : !isCollapsed);
  };

  return (
    <ProSidebar
      image={false} // can set the image background under this option
      rtl={rtl}
      toggled={toggled}
      collapsed={collapsed}
      breakPoint="md"
      onToggle={handleToggleSidebar}
      onMouseEnter={() => { isCollapsed && setCollapsed(false) }}
      onMouseLeave={() => { isCollapsed && setCollapsed(true) }}
      style={{zIndex: 1301}}
    >
      <SidebarHeader>
        <SidebarButtons handleCollapseSidebar={handleCollapseSidebar} isCollapsed={isCollapsed} />
        {
          !isCollapsed && <SidebarProfile />
        }
      </SidebarHeader>

      <SidebarContent className="thin-scrollbar">
        <Menu iconShape="circle" innerSubMenuArrows={false} popperArrow={false} subMenuBullets={false}>
          {
            isArrayNotEmpty(sidebarItems) && sidebarItems.map((item, index) => {
              return (
                typeof item.submenus === "undefined" || item.submenus === null ?
                  <MenuItem
                    key={item.title}
                    prefix={typeof item.prefix !== "undefined" && item.prefix !== null ? item.prefix : null}
                    icon={typeof item.icon !== "undefined" && item.icon !== null ? <span className={MaterialIconStyle}>{item.icon}</span> : ""}
                    suffix={typeof item.suffix !== "undefined" && item.suffix !== null ? item.suffix : null}
                  >
                    {item.title} {!isStringNullOrEmpty(item.to) ? <Link to={item.to} /> : ""}
                  </MenuItem>
                  :
                  <SubMenuItems key={'submenu-' + item.title} item={item} MaterialIconStyle={MaterialIconStyle} />

              )
            })
          }
        </Menu>
      </SidebarContent >

      <SidebarFooter style={{ textAlign: 'center' }}>
        {/** "user manual" : updatable footer is here */}
        <div className="sidebar-btn-wrapper" style={{ padding: '20px 24px', }}>
          <a
            href="https://github.com/WHTeoh/InitiateProject.git"
            target="_blank"
            className="sidebar-btn"
            rel="noopener noreferrer"
          >
            <MenuOutlinedIcon />
            <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
              View Source
            </span>
          </a>
        </div>
      </SidebarFooter>
    </ProSidebar >
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Aside);
