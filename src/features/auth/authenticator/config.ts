import { Options } from "qr-code-styling"

const defaultDeepLink = "alienapp://create_session/authorize?callback_url=https%3A%2F%2Fsso.alien-api.com%2Fapp_callback%2F00cdf01f-f245-4ed4-8ecc-155c605fb24e&provider_address=00000001000000000000000300000000&expired_at=1752448776&link_signature=ab72e3fbe45513abe1c138ec9d0522a5d258a6604b389ee01bbc63a170dc41f5c0792f42f9f8e187b134021bc8dee6203c037cd80aef89e970e50620be49fb00"
// const defaultDeepLink = "alienapp://cs/a?cb=https%3A%2F%2Fsso.alien-api.com%2Fapp_callback%2F00cdf01f-f245-4ed4-8ecc-155c605fb24e&pa=00000001000000000000000300000000&ea=1752448776&ls=ab72e3fbe45513abe1c138ec9d0522a5d258a6604b389ee01bbc63a170dc41f5c0792f42f9f8e187b134021bc8dee6203c037cd80aef89e970e50620be49fb00"

export const qrOptions: Partial<Options> = {
    data: defaultDeepLink,
    width: 2000,
    height: 2000,
    margin: 0,
    shape: 'square',
    type: 'canvas',
    backgroundOptions: {
        color: undefined,
    },
    cornersSquareOptions: {
        type: 'extra-rounded',
    },
    cornersDotOptions: {
        type: 'rounded',
    },
    qrOptions: {
        errorCorrectionLevel: 'M',
    },
    dotsOptions: {
        color: "#ffffff",
        type: "dots"
    },
    image: "/qr-logo.png",
    imageOptions: {
        imageSize: 1,
        crossOrigin: "anonymous",
        margin: 10,
        hideBackgroundDots: true,
    },
}