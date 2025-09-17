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
import { useProductStore } from '../store/product';

const CreatePage = () => {
	const [newProduct, setNewProduct] = useState({
		name: '',
		price: '',
		image: '',
	});
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
					Criar novo Produto.
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
							placeholder='Nome do Produto'
							name='name'
							value={newProduct.name}
							onChange={(e) =>
								setNewProduct({ ...newProduct, name: e.target.value })
							}
						/>
						<Input
							placeholder='Preço'
							name='price'
							type='number'
							value={newProduct.price}
							onChange={(e) =>
								setNewProduct({ ...newProduct, price: e.target.value })
							}
						/>
						<Input
							placeholder='Imagem URL'
							name='image'
							value={newProduct.image}
							onChange={(e) =>
								setNewProduct({ ...newProduct, image: e.target.value })
							}
						/>

						<Button colorScheme='cyan' onClick={handleAddProduct} w='full'>
							Adic Produto
						</Button>
					</VStack>
				</Box>
			</VStack>
		</Container>
	);
};
export default CreatePage;
