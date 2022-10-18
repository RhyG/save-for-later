import React, { createContext, useContext } from 'react';

import { useSelections } from '@app/hooks/useSelections';

type Props = React.PropsWithChildren<{}>;

const SelectionContext = createContext<
  | {
      selections: string[];
      selectionsActive: boolean;
      updateSelections: (id: string) => void;
      clearSelections: () => void;
    }
  | undefined
>(undefined);

export const SelectionProvider = ({ children }: Props) => {
  const { selections, selectionsActive, updateSelections, clearSelections } = useSelections();

  return (
    <SelectionContext.Provider value={{ selections, selectionsActive, updateSelections, clearSelections }}>
      {children}
    </SelectionContext.Provider>
  );
};

export const useSelectionsContext = () => {
  const context = useContext(SelectionContext);

  if (context === undefined) {
    throw new Error('useSelectionsContext must be used within a SelectionProvider');
  }

  return context;
};
