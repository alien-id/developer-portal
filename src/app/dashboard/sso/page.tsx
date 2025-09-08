'use client';

import { Skeleton } from "@/components/ui/skeleton";
import { DashboardSsoIntroduction, DashboardSsoProvidersList, GetProvidersResponse } from "@/features";
import { useAxios } from "@/hooks/useAxios";
import { AxiosError } from "axios";
import { memo } from "react";
import useSWR from "swr";

const DashboardSsoPage = () => {
    const axios = useAxios();

    const providersSwr = useSWR<GetProvidersResponse, AxiosError>(
        `/providers`,
        (url: string) => axios.get(url).then(res => res.data),
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

