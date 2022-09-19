import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import './App.scss';

export const Layout = () => (
	<div className="app">
		<Header />
		<Outlet />
	</div>
);
