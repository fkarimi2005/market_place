import { useState, useEffect } from 'react';
import { Product, ProductFilters } from '../types';
import { productService } from '../services/products';

export const useProducts = (filters: ProductFilters = {}) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await productService.getProducts(filters);
                setProducts(response.products);
                setTotal(response.total);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch products');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [filters]);

    return { products, loading, error, total };
};