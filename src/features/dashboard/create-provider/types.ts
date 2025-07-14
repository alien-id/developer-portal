export type CreateProviderRequestPayload = {
    provider_name: string,
    provider_url: string,
}

export type CreatedProvider = {
    provider_address: string,
    provider_name: string,
    provider_private_key: string,
    provider_url: string,
}