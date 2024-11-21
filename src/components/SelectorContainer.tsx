import React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";

interface SelectorContainerProps {
  items: {
    id: string;
    name: string;
    description?: string;
    createdAt?: string;
    logoUrl?: string;
  }[];
  selectedItem: string;
  isFetching: boolean;
  setSelectedItem: (itemId: string) => void;
  handleSearch: () => void;
  buttonTextLoading?: string;
  buttonTextDefault?: string;
  showCreationDate?: boolean;
}

export const SelectorContainer: React.FC<SelectorContainerProps> = ({
  items = [],
  selectedItem,
  isFetching,
  setSelectedItem,
  handleSearch,
  buttonTextLoading = "Chargement...",
  buttonTextDefault = "Récupérer les tickets",
  showCreationDate = true,
}) => {
  return (
    <div className="flex flex-col items-stretch w-full space-y-2 md:space-x-2 md:space-y-0 md:flex-row">
      <Select
        value={selectedItem}
        onValueChange={(value) => setSelectedItem(value)}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {items.map((item, index) => (
            <SelectItem value={item.id} key={`${item.name}-${index}`}>
              <div className="flex items-center space-x-3">
                <img
                  src={
                    item.logoUrl ||
                    "https://seeklogo.com/images/G/gitlab-logo-FAA48EFD02-seeklogo.com.png"
                  }
                  alt={`${item.name} logo`}
                  className="w-6 h-6 rounded-full"
                />
                <div className="flex flex-col">
                  <span className="font-medium">{item.name}</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {item.description}
                    {showCreationDate && item.createdAt && (
                      <>
                        {" "}
                        • Créé le{" "}
                        {new Date(item.createdAt).toLocaleDateString()}
                      </>
                    )}
                  </p>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <button
        onClick={handleSearch}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full md:w-1/2"
        disabled={isFetching}
      >
        {isFetching ? buttonTextLoading : buttonTextDefault}
      </button>
    </div>
  );
};
