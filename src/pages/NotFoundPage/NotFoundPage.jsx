import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.scss';

export const NotFoundPage = () => (
	<h3 className="notfound">
		This page doesn&apos;t exist. Go <Link to="/">home</Link>
	</h3>
);
