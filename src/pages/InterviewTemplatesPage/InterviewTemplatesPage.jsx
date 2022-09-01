import React from 'react';
import { NavBtn } from '../../components/ui/button/NavBtn';
import { SearchInput } from '../../components/ui/input/SearchInput/SearchInput';
import { dammyText } from '../../utils/constants';

export const InterviewTemplatesPage = () => (
	<section className="main__content">
		<h2 className="main__content_title">Шаблоны</h2>
		<div className="main__content_head">
			<NavBtn btnValue={{ value: 'Новый шаблон', link: 'create-template' }} />
			<SearchInput />
		</div>
		<div className="main__content_cards">
			<div className="main__content_cards-item">
				<h3>Шаблон 1</h3>
				<p>{dammyText}</p>
				<span>Вопросов 12</span>
				<span>Страниц 3</span>
				<NavBtn btnValue={{ value: 'Создать опрос', link: 'create' }} />
			</div>
			<div className="main__content_cards-item">
				<h3>Шаблон 2</h3>
				<p>{dammyText}</p>
				<span>Вопросов 12</span>
				<span>Страниц 3</span>
				<NavBtn btnValue={{ value: 'Создать опрос', link: 'create' }} />
			</div>
			<div className="main__content_cards-item">
				<h3>Шаблон 3</h3>
				<p>{dammyText}</p>
				<span>Вопросов: 12</span>
				<span>Страниц: 3</span>
				<NavBtn btnValue={{ value: 'Создать опрос', link: 'create' }} />
			</div>
		</div>
		<h4 className="main__content_total">Всего шаблонов: ...</h4>
	</section>
);
