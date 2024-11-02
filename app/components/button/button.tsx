"use client";

import { useGlobalContext } from '@/app/context/globalProvider';
import React from 'react';
import styled from 'styled-components';

interface Props {
	icon?: React.ReactNode;
	name?: string;
	click?: () => void;
	background?: string;
	selector?: string;
	padding?: string;
	borderRadius?: string;
	fw?: string;
	fs?: string;
	type?: "submit" | "button" | "reset" | undefined;
	border?: string; 
	color?: string;
}

const Button = ({icon, name, click, background, selector, padding, borderRadius, fw, fs, type, border, color} : Props) => {
	const {theme} = useGlobalContext();
	return (
		<ButtonStyled theme={theme}
			type={type}
			style={
				{
					backgroundColor: background,
					padding: padding || "0.5rem 1rem",
					borderRadius: borderRadius || "0.5rem",
					fontWeight: fw || "500",
					fontSize: fs,
					border: border,
					color : color || theme.colorGrey0
				}
			}
			onClick={click}
		>
		{icon && icon}
		{name}
		</ButtonStyled>
	);
};

const ButtonStyled = styled.button`
	position: relative;
	display: flex;
	align-items: center;
	color: ${(props) => props.theme.colorGrey2};
	z-index: 5;
	cursor: pointer;
	transition: all 0.55s ease-in-out;

	i {
		margin-left: 1rem;
		color: ${(props) => props.theme.colorGrey2};
		font-size: 1.5rem;
		transition: all 0.55s ease-in-out;
	}

	&:hover {
		color: ${(props) => props.theme.colorGrey0};
		i {
			color: ${(props) => props.theme.colorGrey0};
		}
	}
`;

export default Button;