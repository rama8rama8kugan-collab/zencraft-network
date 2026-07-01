'use client';

import { useState, useEffect } from 'react';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories([{ id: 'all', name: 'All Items' }, ...(data.categories || [])]);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  return (
    <div className="flex gap-4 mt-8 overflow-x-auto pb-2">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`px-6 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
            selectedCategory === category.id
              ? 'bg-gradient-accent text-dark'
              : 'border border-accent-purple/50 hover:border-accent-purple text-gray-300'
          }`}
        >
          {category.name || category.displayName}
        </button>
      ))}
    </div>
  );
}
