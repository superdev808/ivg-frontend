'use client';
import { useGetCalculatorInfoQuery } from "@/redux/hooks/apiHooks";
import { useCallback } from "react";

const useCalculatorsInfo = () => {
  const { data: calcInfoMap = {}, isLoading: isCalcInfoLoading, isError: isCalcInfoError } = useGetCalculatorInfoQuery({}, {
    pollingInterval: 3600 * 1000,
    refetchOnMountOrArgChange: true,
    skip: false,
  })

  const findColumnFromColIndex = useCallback((calcType: string, colIndex: string) => {
    let { input, output } = calcInfoMap[calcType];
    return [...input, ...output].find(item => item.colIndex == colIndex);
  }, [calcInfoMap]);

  return {
    calcInfoMap,
    isCalcInfoLoading,
    isCalcInfoError,
    findColumnFromColIndex
  }
}

export default useCalculatorsInfo