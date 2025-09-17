import {
	Box,
	Button,
	Container,
	Heading,
	Input,
	useColorModeValue,
	useToast,
	VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useProductStore } from '../store/product';

const CreatePage = () => {
	const [newProduct, setNewProduct] = useState({
		name: '',
		price: '',
		image: '',
	});
	const { t } = useLanguage();
	const toast = useToast();

	const { createProduct } = useProductStore();

	const handleAddProduct = async () => {
		const { success, message } = await createProduct(newProduct);
		if (!success) {
			toast({
				title: 'Error',
				description: message,
				status: 'error',
				isClosable: true,
			});
		} else {
			toast({
				title: 'Success',
				description: message,
				status: 'success',
				isClosable: true,
			});
		}
		setNewProduct({ name: '', price: '', image: '' });
	};

	return (
		<Container maxW={'container.sm'}>
			<VStack spacing={8}>
				<Heading as={'h1'} size={'2xl'} textAlign={'center'} mb={8}>
					{t('create.title')}
				</Heading>

				<Box
					w={'full'}
					bg={useColorModeValue('white', 'gray.800')}
					p={6}
					rounded={'lg'}
					shadow={'md'}
				>
					<VStack spacing={4}>
						<Input
							placeholder={t('create.placeholders.name')}
							name='name'
							value={newProduct.name}
							onChange={(e) =>
								setNewProduct({ ...newProduct, name: e.target.value })
							}
						/>
						<Input
							placeholder={t('create.placeholders.price')}
							name='price'
							type='number'
							value={newProduct.price}
							onChange={(e) =>
								setNewProduct({ ...newProduct, price: e.target.value })
							}
						/>
						<Input
							placeholder={t('create.placeholders.image')}
							name='image'
							value={newProduct.image}
							onChange={(e) =>
								setNewProduct({ ...newProduct, image: e.target.value })
							}
						/>

						<Button colorScheme='cyan' onClick={handleAddProduct} w='full'>
							{t('create.button')}
						</Button>
					</VStack>
				</Box>
			</VStack>
		</Container>
	);
};
export default CreatePage;
