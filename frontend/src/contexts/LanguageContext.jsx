import { createContext, useEffect, useState } from 'react';
import { defaultLanguage, translations } from '../translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
	const [currentLanguage, setCurrentLanguage] = useState(defaultLanguage);

	// Load language from localStorage on mount
	useEffect(() => {
		const savedLanguage = localStorage.getItem('language');
		if (savedLanguage && translations[savedLanguage]) {
			setCurrentLanguage(savedLanguage);
		}
	}, []);

	// Save language to localStorage when it changes
	useEffect(() => {
		localStorage.setItem('language', currentLanguage);
	}, [currentLanguage]);

	const t = (key, fallback = '') => {
		const keys = key.split('.');
		let value = translations[currentLanguage];

		for (const k of keys) {
			value = value?.[k];
		}

		return value || fallback || key;
	};

	const switchLanguage = (language) => {
		if (translations[language]) {
			setCurrentLanguage(language);
		}
	};

	const value = {
		currentLanguage,
		switchLanguage,
		t,
		translations: translations[currentLanguage],
	};

	return (
		<LanguageContext.Provider value={value}>
			{children}
		</LanguageContext.Provider>
	);
};
