"use client";

import React from "react";
import { useGlobalContext } from "../../context/globalProvider";
import styled from "styled-components";
import Image from "next/image";

import menu from "@/app/utils/menu";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Button from "../button/button";
import { arrowLeft, bars, logout } from "@/app/utils/icons";
import { useClerk, UserButton, useUser } from "@clerk/nextjs";

function Sidebar() {
  const {theme, collapsed, closeSidebar} = useGlobalContext();
  const router = useRouter();
  const pathName = usePathname();
  const {signOut} = useClerk();
  const {user} = useUser();
  
  console.log("User: ", user);
  const {firstName, lastName, imageUrl} = user || {
	firstName : "",
	lastName : "",
	imageUrl : ""
  };


  const handleClick = (link: string) => {
    router.push(link);
  };

  return (
    <SidebarStyled theme={theme} collapsed={collapsed}>
	  <button className="toggle-nav" onClick={closeSidebar}>{collapsed ? bars : arrowLeft}</button>
      <div className="profile">
        <div className="profile-overlay"></div>
          <div className="image">
            <Image width={70} height={70} src={imageUrl} alt="Profile" />
          </div>
		  <div className="user-btn absolute z-20 top-0 w-full h-full">
			<UserButton />
		  </div>
        <h1 className="capitalize">
			<span>{firstName}</span>
			<span>{lastName}</span>
        </h1>
      </div>
    <ul className="nav-items">
      {menu.map((item) => {
        const link = item.link;
        const active = pathName === link ? "active" : "";
        
        return (
          <li key={item.id}  className={`nav-item ${active}`} onClick={() => handleClick(link)}>
            {item.icon}
            <Link href={item.link}>{item.title}</Link>
          </li>
        )
      })}
    </ul>
    <div className="sign-out relative m-6">
		<Button
			name="Sign Out"
			type="submit"
			background={theme.colorRed}
			padding="0.4rem 0.8rem"
			borderRadius="0.8rem"
			fw="500"
			fs="1.2rem"
			icon={logout}
			click={() => signOut(
				() => router.push("/signin")
			)}
		/>
	</div>
    </SidebarStyled>
  );
}

const SidebarStyled = styled.nav<{collapsed: boolean}>`
  width: ${(props) => props.theme.sidebarWidth};
  background-color: ${(props) => props.theme.colorBg2};
  border: 2px solid ${(props) => props.theme.borderColor2};
  position: relative;
  border-radius: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  color: ${(props) => props.theme.colorGrey3};

  @media screen and (max-width: 768px){
	position: fixed;
	height: calc(100vh - 2rem);
	z-index: 100;
	transform: ${(props) => props.collapsed ? "translateX(-107%)" : "translateX(0)"};
	transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);

	.toggle-nav{
		display: block !important;
	}
  }

  

  .toggle-nav{
  	display: none;
	padding: 0.8rem 0.9rem;
	position: absolute;
	right: -43px;
	top: 1.8rem;

	border-top-right-radius: 1rem;
	border-bottom-right-radius: 1rem;

	background-color: ${(props) => props.theme.colorBg2};
	border-right: 2px solid ${(props) => props.theme.borderColor2};
	border-top: 2px solid ${(props) => props.theme.borderColor2};
	border-bottom: 2px solid ${(props) => props.theme.borderColor2};
  }

  

  .user-btn {
    .cl-rootBox {
      width: 100%;
      height: 100%;
	  opacity: 0;

      .cl-userButtonBox {
        width: 100%;
        height: 100%;
		opacity: 0;

        .cl-userButtonTrigger {
          width: 100%;
          height: 100%;
          opacity: 0;
        }
      }
    }
  }

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