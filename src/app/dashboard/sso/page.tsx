'use client';

import { DashboardSsoIntroduction, DashboardSsoProvidersList, GetProvidersResponse } from "@/features";
import axiosInstance from "@/lib/axios";
import { AxiosError } from "axios";
import useSWR from "swr";

const providersFetcher = (url: string) => axiosInstance.get(url).then(res => res.data);

const DashboardSsoPage = () => {
    const providersSwr = useSWR<GetProvidersResponse, AxiosError>(
        `/providers`,
        providersFetcher,
    );

    if (providersSwr.error) return <div>error</div>

    if (providersSwr.isLoading) return <div>loading</div>

    if (!providersSwr.data?.providers || providersSwr.data.providers.length === 0) return <DashboardSsoIntroduction />

    return (
        <DashboardSsoProvidersList data={providersSwr.data.providers} />
    )
}

export default DashboardSsoPage;

