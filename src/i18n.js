import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
// import { DateTime } from 'luxon';

i18n
	.use(Backend)
	.use(LanguageDetector)
	.use(initReactI18next)

	.init({
		load: 'languageOnly',
		backend: {
			loadPath: `${process.env.API_HOST}/locales/{{lng}}_{{ns}}.json`,
		},
		debug: true,
		fallbackLng: ['en', 'ru'],
		interpolation: {
			escapeValue: false,
		},
	});

// i18n.services.formatter.add('DATE_HUGE', (value, lng, options) =>
// 	DateTime.fromJSDate(value).setLocale(lng).toLocaleString(DateTime.DATE_HUGE)
// );

export default i18n;
