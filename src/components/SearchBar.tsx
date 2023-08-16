"use client";
import React from "react";
import { Input } from "./ui/input";

interface SearchProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const Search: React.FC<SearchProps> = ({ onChange }) => {
  return (
    <div>
      <Input
        type="search"
        onChange={(e) => onChange(e)}
        placeholder="Search a card..."
        className="md:w-[100px] lg:w-[300px]"
      />
    </div>
  );
};
