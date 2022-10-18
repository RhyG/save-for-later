import { useCallback, useState } from 'react';

/**
 * A convenience hook for managing an array of selections via IDs.
 */
export const useSelections = () => {
  const [selections, setSelections] = useState<string[]>([]);

  /* Memoised because it is used in renderItem functions */
  const updateSelections = useCallback((selectionId: string) => {
    setSelections(prevSelections => {
      if (prevSelections.includes(selectionId)) {
        return prevSelections.filter(id => id !== selectionId);
      }

      return [...prevSelections, selectionId];
    });
  }, []);

  /* Memoised because it is used in renderItem functions */
  const clearSelections = useCallback(() => setSelections([]), []);

  return {
    selections,
    selectionsActive: selections.length > 0,
    updateSelections,
    clearSelections,
  };
};
