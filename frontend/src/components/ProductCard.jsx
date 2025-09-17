import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
	AspectRatio,
	Badge,
	Box,
	Button,
	Heading,
	HStack,
	IconButton,
	Image,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	Tooltip,
	useColorModeValue,
	useDisclosure,
	useToast,
	VStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useProductStore } from '../store/product';

const MotionBox = motion(Box);

const ProductCard = ({ product }) => {
	const [updatedProduct, setUpdatedProduct] = useState(product);

	const bg = useColorModeValue('white', 'gray.800');

	const { deleteProduct, updateProduct } = useProductStore();
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const handleDeleteProduct = async (pid) => {
		const { success, message } = await deleteProduct(pid);
		if (!success) {
			toast({
				title: 'Error',
				description: message,
				status: 'error',
				duration: 3000,
				isClosable: true,
			});
		} else {
			toast({
				title: 'Success',
				description: message,
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
		}
	};

	const handleUpdateProduct = async (pid, updatedProduct) => {
		const { success, message } = await updateProduct(pid, updatedProduct);
		onClose();
		if (!success) {
			toast({
				title: 'Error',
				description: message,
				status: 'error',
				duration: 3000,
				isClosable: true,
			});
		} else {
			toast({
				title: 'Success',
				description: 'Produto atualizado com sucesso',
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
		}
	};

	return (
		<MotionBox
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
			whileHover={{ y: -8 }}
			position='relative'
			shadow='lg'
			rounded='2xl'
			overflow='hidden'
			_hover={{
				shadow: '2xl',
				transform: 'translateY(-4px)',
			}}
			bg={bg}
			border='1px solid'
			borderColor={useColorModeValue('gray.200', 'gray.600')}
		>
			{/* Image Container */}
			<Box position='relative' overflow='hidden'>
				<AspectRatio ratio={4 / 3}>
					<Image
						src={product.image}
						alt={product.name}
						objectFit='cover'
						transition='transform 0.3s ease'
						_hover={{ transform: 'scale(1.05)' }}
					/>
				</AspectRatio>

				{/* Overlay Actions */}
				<Box
					position='absolute'
					top={3}
					right={3}
					opacity={0}
					transition='opacity 0.3s'
					_groupHover={{ opacity: 1 }}
				>
					<HStack spacing={2}>
						<Tooltip label='Edit Product' placement='top'>
							<IconButton
								size='sm'
								icon={<EditIcon />}
								onClick={onOpen}
								colorScheme='cyan'
								variant='solid'
								rounded='full'
								shadow='md'
								_hover={{ transform: 'scale(1.1)' }}
							/>
						</Tooltip>
						<Tooltip label='Delete Product' placement='top'>
							<IconButton
								size='sm'
								icon={<DeleteIcon />}
								onClick={() => handleDeleteProduct(product._id)}
								colorScheme='red'
								variant='solid'
								rounded='full'
								shadow='md'
								_hover={{ transform: 'scale(1.1)' }}
							/>
						</Tooltip>
					</HStack>
				</Box>
			</Box>

			{/* Content */}
			<Box p={5} role='group'>
				<VStack align='start' spacing={3}>
					<Heading
						as='h3'
						size='md'
						noOfLines={2}
						fontWeight='600'
						color={useColorModeValue('gray.800', 'white')}
						lineHeight='1.3'
					>
						{product.name}
					</Heading>

					<HStack justify='space-between' w='full' align='center'>
						<Text
							fontWeight='bold'
							fontSize='xl'
							color='cyan.500'
							fontFamily='mono'
						>
							R$ {product.price}
						</Text>
						<Badge
							colorScheme='purple'
							variant='subtle'
							rounded='full'
							px={3}
							py={1}
							fontSize='xs'
							fontWeight='semibold'
						>
							NEW
						</Badge>
					</HStack>

					{/* Action Buttons - Always Visible */}
					<HStack spacing={3} w='full' pt={2}>
						<Button
							size='sm'
							colorScheme='cyan'
							variant='outline'
							flex={1}
							onClick={onOpen}
							_hover={{ bg: 'cyan.50', borderColor: 'cyan.300' }}
						>
							Edit
						</Button>
						<Button
							size='sm'
							colorScheme='red'
							variant='outline'
							flex={1}
							onClick={() => handleDeleteProduct(product._id)}
							_hover={{ bg: 'red.50', borderColor: 'red.300' }}
						>
							Delete
						</Button>
					</HStack>
				</VStack>
			</Box>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />

				<ModalContent>
					<ModalHeader>Atualizar Produto</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<VStack spacing={4}>
							<Input
								placeholder='Nome do Produto'
								name='name'
								value={updatedProduct.name}
								onChange={(e) =>
									setUpdatedProduct({ ...updatedProduct, name: e.target.value })
								}
							/>
							<Input
								placeholder='Preço'
								name='price'
								type='number'
								value={updatedProduct.price}
								onChange={(e) =>
									setUpdatedProduct({
										...updatedProduct,
										price: e.target.value,
									})
								}
							/>
							<Input
								placeholder='Imagem URL'
								name='image'
								value={updatedProduct.image}
								onChange={(e) =>
									setUpdatedProduct({
										...updatedProduct,
										image: e.target.value,
									})
								}
							/>
						</VStack>
					</ModalBody>

					<ModalFooter>
						<Button
							colorScheme='cyan'
							mr={3}
							onClick={() => handleUpdateProduct(product._id, updatedProduct)}
						>
							Atualizar
						</Button>
						<Button variant='ghost' onClick={onClose}>
							Cancelar
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</MotionBox>
	);
};
export default ProductCard;
