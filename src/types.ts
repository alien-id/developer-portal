export type User = {
    app_callback_payload: {
        full_name: string
    },
    app_callback_session_address: string,
    app_callback_session_signature: string,
    expired_at: number,
    issued_at: number,
}