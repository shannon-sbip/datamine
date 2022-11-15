import { useEffect, useState } from "react";
const useFileReader = () => {
  const [fileReader, setFileReader] = useState<FileReader | null>(null);
  useEffect(() => {
    setFileReader(new FileReader());
  }, []);
  return fileReader;
};
export default useFileReader;
