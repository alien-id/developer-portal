'use client';

import { Skeleton } from '@/components/ui/skeleton';
import {
  DashboardSsoIntroduction,
  DashboardSsoProvidersList,
  GetProvidersResponse,
} from '@/features';
import { useAxios } from '@/hooks/useAxios';
import { AxiosError } from 'axios';
import { memo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useState, useMemo } from 'react';
import DashboardCreateProvider from '@/features/dashboard/sso/create-provider';

const DashboardSsoPage = () => {
  const axios = useAxios();
  const [isOpen, setIsOpen] = useState(false);

  const { data, isPending: isLoading, isError, refetch } = useQuery<GetProvidersResponse, AxiosError>({
    queryKey: ['providers'],
    queryFn: async () => {
      const { data } = await axios.get('/providers');
      return data;
    },
  });

  const content = useMemo(() => {
    if (isLoading || isError) return;

    if (!data?.providers || data.providers.length === 0)
      return <DashboardSsoIntroduction onOpenCreateProvider={() => setIsOpen(true)} />;

    return (
      <DashboardSsoProvidersList
        onOpenCreateProvider={() => setIsOpen(true)}
        data={data.providers}
      />
    );
  }, [data?.providers, isError, isLoading]);

  if (isLoading || isError) return <Skeleton className="h-full w-full rounded-xl" />;

  return (
    <>
      <DashboardCreateProvider refetch={refetch} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <div className="w-full h-full">{content}</div>
    </>
  );
};

export default memo(DashboardSsoPage);
