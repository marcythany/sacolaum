import { AddIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import {
	Box,
	Button,
	Container,
	HStack,
	IconButton,
	SimpleGrid,
	Skeleton,
	Text,
	useColorModeValue,
	VStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useLanguage } from '../hooks/useLanguage';
import { useProductStore } from '../store/product';

const MotionBox = motion(Box);

const HomePage = () => {
	const { t } = useLanguage();
	const {
		fetchProducts,
		products,
		currentPage,
		totalPages,
		isLoading,
		setCurrentPage,
		getPaginatedProducts,
	} = useProductStore();

	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);

	const paginatedProducts = getPaginatedProducts();
	const bgGradient = useColorModeValue(
		'linear(to-br, blue.50, purple.50)',
		'linear(to-br, gray.900, purple.900)'
	);

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	const renderPagination = () => {
		if (totalPages <= 1) return null;

		const pages = [];
		const maxVisiblePages = 5;
		let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
		let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

		if (endPage - startPage + 1 < maxVisiblePages) {
			startPage = Math.max(1, endPage - maxVisiblePages + 1);
		}

		for (let i = startPage; i <= endPage; i++) {
			pages.push(
				<Button
					key={i}
					size='sm'
					variant={i === currentPage ? 'solid' : 'outline'}
					colorScheme={i === currentPage ? 'cyan' : 'gray'}
					onClick={() => handlePageChange(i)}
					_hover={{ transform: 'scale(1.05)' }}
					transition='all 0.2s'
				>
					{i}
				</Button>
			);
		}

		return (
			<HStack spacing={2} mt={8}>
				<IconButton
					icon={<ChevronLeftIcon />}
					size='sm'
					isDisabled={currentPage === 1}
					onClick={() => handlePageChange(currentPage - 1)}
					aria-label='Previous page'
				/>
				{pages}
				<IconButton
					icon={<ChevronRightIcon />}
					size='sm'
					isDisabled={currentPage === totalPages}
					onClick={() => handlePageChange(currentPage + 1)}
					aria-label='Next page'
				/>
			</HStack>
		);
	};

	return (
		<Box minH='100vh' bg={bgGradient}>
			<Container maxW='container.xl' py={8}>
				<VStack spacing={8}>
					{/* Header Section */}
					<MotionBox
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						textAlign='center'
						w='full'
					>
						<Text
							fontSize={{ base: '2xl', md: '4xl' }}
							fontWeight='bold'
							bgGradient='linear(to-r, cyan.400, purple.600, pink.500)'
							bgClip='text'
							mb={2}
						>
							{t('home.title')}
						</Text>
						<Text
							fontSize={{ base: 'md', md: 'lg' }}
							color={useColorModeValue('gray.600', 'gray.300')}
							maxW='600px'
							mx='auto'
						>
							{t('home.subtitle')}
						</Text>
					</MotionBox>

					{/* Stats Bar */}
					<MotionBox
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.5, delay: 0.1 }}
						w='full'
						maxW='400px'
					>
						<HStack
							justify='space-between'
							p={4}
							rounded='lg'
							shadow='md'
							bg={useColorModeValue('white', 'gray.800')}
							border='1px solid'
							borderColor={useColorModeValue('gray.200', 'gray.600')}
						>
							<VStack spacing={0}>
								<Text fontSize='2xl' fontWeight='bold' color='cyan.500'>
									{products.length}
								</Text>
								<Text fontSize='sm' color='gray.500'>
									{t('home.stats.totalProducts')}
								</Text>
							</VStack>
							<VStack spacing={0}>
								<Text fontSize='2xl' fontWeight='bold' color='purple.500'>
									{currentPage}
								</Text>
								<Text fontSize='sm' color='gray.500'>
									{t('home.stats.currentPage')}
								</Text>
							</VStack>
							<VStack spacing={0}>
								<Text fontSize='2xl' fontWeight='bold' color='pink.500'>
									{paginatedProducts.length}
								</Text>
								<Text fontSize='sm' color='gray.500'>
									{t('home.stats.onThisPage')}
								</Text>
							</VStack>
						</HStack>
					</MotionBox>

					{/* Loading State */}
					{isLoading && (
						<MotionBox
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							w='full'
						>
							<SimpleGrid
								columns={{ base: 1, md: 2, lg: 3 }}
								spacing={6}
								w='full'
							>
								{Array.from({ length: 6 }).map((_, i) => (
									<Box key={i} p={4} shadow='md' rounded='lg'>
										<Skeleton height='200px' rounded='md' mb={4} />
										<Skeleton height='20px' mb={2} />
										<Skeleton height='16px' width='60%' />
									</Box>
								))}
							</SimpleGrid>
						</MotionBox>
					)}

					{/* Products Grid */}
					{!isLoading && paginatedProducts.length > 0 && (
						<MotionBox
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.5, delay: 0.2 }}
							w='full'
						>
							<SimpleGrid
								columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
								spacing={6}
								w='full'
							>
								{paginatedProducts.map((product, index) => (
									<MotionBox
										key={product._id}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{
											duration: 0.3,
											delay: index * 0.1,
										}}
									>
										<ProductCard product={product} />
									</MotionBox>
								))}
							</SimpleGrid>
						</MotionBox>
					)}

					{/* Pagination */}
					{!isLoading && products.length > 10 && renderPagination()}

					{/* Empty State */}
					{!isLoading && products.length === 0 && (
						<MotionBox
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.5 }}
							textAlign='center'
							py={12}
						>
							<Text fontSize='6xl' mb={4}>
								📦
							</Text>
							<Text fontSize='2xl' fontWeight='bold' mb={4}>
								{t('home.empty.title')}
							</Text>
							<Text fontSize='lg' color='gray.500' mb={6}>
								{t('home.empty.description')}
							</Text>
							<Button
								as={Link}
								to='/create'
								colorScheme='cyan'
								size='lg'
								leftIcon={<AddIcon />}
								_hover={{ transform: 'scale(1.05)' }}
								transition='all 0.2s'
							>
								{t('home.empty.createButton')}
							</Button>
						</MotionBox>
					)}

					{/* Create Product CTA */}
					{!isLoading && products.length > 0 && (
						<MotionBox
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.5, delay: 0.3 }}
						>
							<Button
								as={Link}
								to='/create'
								colorScheme='cyan'
								size='lg'
								variant='outline'
								leftIcon={<AddIcon />}
								_hover={{
									transform: 'scale(1.05)',
									shadow: 'lg',
								}}
								transition='all 0.2s'
							>
								{t('home.createButton')}
							</Button>
						</MotionBox>
					)}
				</VStack>
			</Container>
		</Box>
	);
};
export default HomePage;
