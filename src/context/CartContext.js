import { createContext, useReducer, useContext, useState, useEffect, useRef } from 'react';
import { fetchProducts } from './api';

const FilterContext = createContext();

const initialState = {
    category: [],
    brand: [],
    country: [],
    award: [],
    utility: [],
    startup: [],
    minPrice: '',
    maxPrice: '',
    sortBy: '',
    searchQuery: '',
};

const filterReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_FILTERS':
            return { ...state, ...action.payload };
        case 'CLEAR_ALL':
            return initialState
        default:
            return state;
    }
};

export const FilterProvider = ({ children }) => {
    const [state, dispatch] = useReducer(filterReducer, initialState);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const latestTimestampRef = useRef(0);
    const [selectedItems, setSelectedItems] = useState([]);
    const updateFilters = (newFilters) => {
        dispatch({ type: 'UPDATE_FILTERS', payload: newFilters });
    };

    const fetchFilteredProducts = async (filters, pageNo) => {
        setIsLoading(true);
        const currentTimestamp = Date.now();
        latestTimestampRef.current = currentTimestamp;

        try {
            const response = await fetchProducts(filters, pageNo);
            const data = await response.json();
            console.log('filtered data', data);

            // Ensure we are updating the state only with the latest data
            if (currentTimestamp === latestTimestampRef.current) {
                return data.productList;
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const clearAll = () => {
        dispatch({ type: 'CLEAR_ALL' });
        setSelectedItems([])
    }
    useEffect(() => {
        fetchFilteredProducts(state, 1).then((data) => {
            setFilteredProducts(data);
        });
    }, [state]);

    return (
        <FilterContext.Provider value={{ filters: state, updateFilters, filteredProducts, isLoading, error, clearAll, setSelectedItems, selectedItems, fetchFilteredProducts }}>
            {children}
        </FilterContext.Provider>
    );
};

export const useFilterContext = () => useContext(FilterContext);