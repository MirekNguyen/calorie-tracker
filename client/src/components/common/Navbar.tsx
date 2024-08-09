'use client';
import { FC } from 'react';

export const Navbar: FC = () => {
  return (
    <header className="bg-primary text-primary-foreground py-4 px-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Calorie Tracker</h1>
      </div>
    </header>
  );
};
