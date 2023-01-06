import './category.styles.scss'

import ProductCard from '../../components/product-card/ProductCard'

import { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { CategoriesContext } from '../../contexts/CategoriesContext'

const Category = () => {
	const { category } = useParams()
	const { categoriesMap } = useContext(CategoriesContext)

	// Due to async function, products will be empty object at first
	// So only render products if it is exists
	const [products, setProducts] = useState(categoriesMap[category])

	useEffect(() => {
		setProducts(categoriesMap[category])
	}, [category, categoriesMap])

	return (
		<div className='category-container'>
			{products &&
				products.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
		</div>
	)
}

export default Category
