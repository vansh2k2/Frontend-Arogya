import { useState, useEffect } from 'react';
import { API_URL } from '@/lib/api';

export interface Category {
  _id: string;
  name: string;
}

export function useCategories(type?: 'single' | 'group' | 'both') {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const url = type ? `${API_URL}/categories?type=${type}` : `${API_URL}/categories`;
        const res = await fetch(url);
        const json = await res.json();
        
        if (json.success) {
          setCategories(json.data);
        } else {
          setError(json.message || 'Failed to fetch categories');
        }
      } catch (err: any) {
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [type]);

  return { categories, loading, error };
}
