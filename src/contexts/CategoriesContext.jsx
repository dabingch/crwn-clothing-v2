import { createContext, useState, useEffect } from 'react'

// import { addCollectionAndDocuments } from '../utils/firebase/firebase.js'
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.js'

// import SHOP_DATA from '../shop-data.js'

export const CategoriesContext = createContext({
	categoriesMap: {},
})

export const CategoriesProvider = ({ children }) => {
	const [categoriesMap, setCategoriesMap] = useState({})

	// Run once to add the SHOP_DATA to the firestore
	// useEffect(() => {
	// 	addCollectionAndDocuments('categories', SHOP_DATA)
	// }, [])

	useEffect(() => {
		const getCategoriesMap = async () => {
			const categoryMap = await getCategoriesAndDocuments()
			setCategoriesMap(categoryMap)
		}

		getCategoriesMap()
	}, [])

	const value = { categoriesMap }

	return (
		<CategoriesContext.Provider value={value}>
			{children}
		</CategoriesContext.Provider>
	)
}
