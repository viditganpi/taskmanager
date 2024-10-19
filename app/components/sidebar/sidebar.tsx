"use client";

import React from "react";
import { useGlobalContext } from "../../context/globalProvider";
import styled from "styled-components";
import Image from "next/image";

import menu from "@/app/utils/menu";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

function Sidebar() {
  const theme = useGlobalContext();
  const router = useRouter();
  const pathName = usePathname();

  const handleClick = (link: string) => {
    router.push(link);
  };

  return (
    <SidebarStyled theme={theme}>
      <div className="profile">
        <div className="profile-overlay"></div>
          <div className="image">
            <Image width={70} height={70} src="/profpic.jpeg" alt="Profile" />
          </div>
        <h1>
          <span>Vidit</span>
          <span>Mathur</span>
        </h1>
      </div>
    <ul className="nav-items">
      {menu.map((item) => {
        const link = item.link;
        const active = pathName === link ? "active" : "";
        
        return (
          <li className={`nav-item ${active}`} onClick={() => handleClick(link)}>
            {item.icon}
            <Link href={item.link}>{item.title}</Link>
          </li>
        )
      })}
    </ul>
    <button></button>
    </SidebarStyled>
  );
}

const SidebarStyled = styled.nav`
  width: ${(props) => props.theme.sidebarWidth};
  background-color: ${(props) => props.theme.colorBg2};
  border: 2px solid ${(props) => props.theme.borderColor2};
  position: relative;
  border-radius: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  color: ${(props) => props.theme.colorGrey3};

  .profile{
    margin: 1rem;
    padding: 1rem;
    position: relative;

    border-radius: 1rem;
    color: ${(props) => props.theme.colorGrey0};

    display: flex;
    align-items: center;

    .profile-overlay{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      backdrop-filter: blur(10px);
      background: ${(props) => props.theme.colorBg1};
      border-radius: 1rem;
      z-index: 0;
      border: 2px solid ${(props) => props.theme.borderColor2};
      opacity: 0.2;
      transition: all 0.5s linear;
    }

    h1{
      font-size: 1.2rem;
      display: flex;
      flex-direction: column;
      line-height: 1.4rem;
    }

    .image, h1{
      position: relative;
      z-index: 1;
    }
    
    .image{
      flex-shrink: 0;
      display: inline-block;
      overflow: hidden;
      transition: all 0.5s ease;
      border-radius: 100%;  
      width: 70px;
      height: 70px
      .img{
        border-radius: 100%;
        transition: all 0.5s ease;
      }
    }
    
    > h1{
      margin-left: 0.8rem;
      font-size: clamp(1.2rem, 4vw, 1.4rem);
      line-height: 100%;
    }
    
    &:hover{
      .profile-overlay{
        opacity: 1;
        border: 2px solid ${(props) => props.theme.borderColor2}
      }
      
      img{
        transform: scale(1.1);
      }
    }
  }

  .nav-item{
    position: relative;
    padding: 0.9rem 1rem 0.9rem 2.1rem;
    display: grid;

    grid-template-columns: 40px 1fr;
    cursor: pointer;
    align-items: center;

    &::after{
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 100%;
      background-color: ${(props) => props.theme.activeNavLinkHover};
      z-index: 1;
      transition: all 0.3s ease-in-out;
    }

    &::before{
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 100%;
      background-color: ${(props) => props.theme.colorGreenDark};
      z-index: 1;
      transition: all 0.3s ease-in-out;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }

    a{
      font-weight: 500;
      transition: all 0.3s ease-in-out;
      z-index: 2;
      line-height: 0;
    }

    i{
      display: flex;
      align-items: center;
      color: ${(props) => props.theme.colorIcons};
    }

    &:hover{
      &::after{
        width: 100%;
      }
    }
  }
    
  .active{
    background-color: ${(props) => props.theme.activeNavLink};
    i, a{
      color: ${(props) => props.theme.colorIcons2}
    }

    &::before{
      width: 0.3rem;
    }

  }
`;
export default Sidebar;