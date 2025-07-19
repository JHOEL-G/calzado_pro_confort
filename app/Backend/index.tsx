import React, { useEffect } from 'react';

export default function Index() {
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Products`);
                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }
                const data = await response.json();
                console.log('Productos obtenidos:', data);
            } catch (err) {
                if (err instanceof Error) {
                    console.error('Error al obtener productos:', err.message);
                } else {
                    console.error('Error al obtener productos:', err);
                }
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>index</div>
    );
}