// hooks/useCustomers.ts
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { customerService } from '../services/CustomerService';
import type { Customer } from '../types';

const EMPTY_CUSTOMERS: Customer[] = [];

export const useCustomers = (search: string, page: number, pageSize: number) => {
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ['customers', search, page, pageSize],
    queryFn: () => customerService.list(search, page, pageSize),
    placeholderData: keepPreviousData,
  });

  return {
    customers: data?.customers ?? EMPTY_CUSTOMERS,
    pagination: data?.pagination ?? null,
    isLoading,
    isFetching,
    error,
  };
};