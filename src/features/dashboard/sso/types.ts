export type Provider = {
    created_at: string,
    id: string,
    provider_address: string,
    provider_name: string,
    provider_private_key: string,
    provider_url: string,
}

export type GetProvidersResponse = {
    providers: Provider[],
}