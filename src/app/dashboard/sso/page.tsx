'use client';

import { Skeleton } from "@/components/ui/skeleton";
import { DashboardSsoIntroduction, DashboardSsoProvidersList, GetProvidersResponse } from "@/features";
import axiosInstance from "@/lib/axios";
import { AxiosError } from "axios";
import { memo } from "react";
import useSWR from "swr";

const providersFetcher = (url: string) => axiosInstance.get(url).then(res => res.data);

const DashboardSsoPage = () => {
    const providersSwr = useSWR<GetProvidersResponse, AxiosError>(
        `/providers`,
        providersFetcher,
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
            revalidateOnReconnect: false,
        }
    );

    if (providersSwr.error) return null;

    if (providersSwr.isLoading) return <Skeleton className="h-full w-full rounded-xl" />;

    if (!providersSwr.data?.providers || providersSwr.data.providers.length === 0) return <DashboardSsoIntroduction />

    return (
        <DashboardSsoProvidersList data={providersSwr.data.providers} />
    )
}

export default memo(DashboardSsoPage);

