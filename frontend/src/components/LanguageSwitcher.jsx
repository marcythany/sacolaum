import { ChevronDownIcon } from '@chakra-ui/icons';
import {
	Button,
	HStack,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';
import { useLanguage } from '../hooks/useLanguage';
import { languages } from '../translations';

const LanguageSwitcher = () => {
	const { currentLanguage, switchLanguage } = useLanguage();
	const bg = useColorModeValue('white', 'gray.800');
	const borderColor = useColorModeValue('gray.200', 'gray.600');
	const hoverBg = useColorModeValue('gray.50', 'gray.700');
	const activeBg = useColorModeValue('cyan.50', 'cyan.900');

	return (
		<Menu>
			<MenuButton
				as={Button}
				rightIcon={<ChevronDownIcon />}
				variant='outline'
				size='sm'
				borderColor={borderColor}
				bg={bg}
				_hover={{ bg: useColorModeValue('gray.50', 'gray.700') }}
			>
				<HStack spacing={2}>
					<Text>{languages[currentLanguage].flag}</Text>
					<Text>{languages[currentLanguage].name}</Text>
				</HStack>
			</MenuButton>
			<MenuList bg={bg} borderColor={borderColor}>
				{Object.entries(languages).map(([code, lang]) => (
					<MenuItem
						key={code}
						onClick={() => switchLanguage(code)}
						bg={currentLanguage === code ? activeBg : 'transparent'}
						_hover={{ bg: hoverBg }}
					>
						<HStack spacing={2}>
							<Text>{lang.flag}</Text>
							<Text>{lang.name}</Text>
						</HStack>
					</MenuItem>
				))}
			</MenuList>
		</Menu>
	);
};

export default LanguageSwitcher;
