import React, { createContext, useState, useContext } from "react";
import Loader from "@/components/Loader";

const LoaderContext = createContext({
  showLoader: () => {},
  hideLoader: () => {}
});

export const useLoader = () => useContext(LoaderContext);

export const LoaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);

  const showLoader = () => setLoading(true);
  const hideLoader = () => setLoading(false);

  return (
    <LoaderContext.Provider value={{ showLoader, hideLoader }}>
      {loading && <Loader />}
      {children}
    </LoaderContext.Provider>
  );
};
