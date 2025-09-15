import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/custom/custom-dialog';
import Close16Svg from '@/icons/close-16.svg';
import { Provider } from '@/features';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/custom/custom-accordion';
import { cn, formatSecret } from '@/lib/utils';
import FloatingLabelInput from '@/components/custom/custom-input';
import CopyField from '@/components/custom/copy-field';
import Keyline16Svg from '@/icons/keyline-24.svg';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {
  codeForButton,
  codeForClient,
  codeForServer,
} from '@/features/dashboard/sso/create-provider/constants';
import { useState } from 'react';
import CheckMarkIcon from '@/icons/check-mark.svg';

export const ProviderDetailsModal = ({
  isOpen,
  onClose,
  provider,
}: {
  provider?: Provider;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [accordionCurrent, setAccordionCurrent] = useState<'1' | '2' | '3' | '4' | '5'>('1');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[640px] max-h-[90dvh] py-3">
        <DialogHeader>
          <DialogTitle className="text-text-primary text-xl leading-loose">
            Details of the provider
          </DialogTitle>

          <DialogClose>
            <div className="w-8 h-7 relative bg-bg-secondary rounded-[42px] border border-stroke-disabled">
              <Close16Svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
              <span className="sr-only">Close</span>
            </div>
          </DialogClose>
        </DialogHeader>

        <DialogBody>
          {provider ? (
            <Accordion
              type="single"
              collapsible
              className="w-full flex flex-col gap-2"
              value={accordionCurrent}
            >
              <AccordionItem value="1">
                <AccordionTrigger
                  onClick={() => provider && setAccordionCurrent('1')}
                  className="cursor-pointer flex flex-row items-center py-2"
                >
                  <div
                    className={cn(
                      `w-5 h-5 text-xs leading-none rounded-full relative overflow-hidden`,
                      'bg-alpha-blue-24 text-blue-300',
                    )}
                  >
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ">
                      <CheckMarkIcon />
                    </div>
                  </div>

                  <span className="text-text-primary text-base leading-snug">Provider data</span>
                </AccordionTrigger>

                <AccordionContent className="flex flex-col text-balance pl-9 pr-8 pb-2 gap-4">
                  <p className="text-text-secondary text-sm font-normals leading-tight">
                    Name and domain of your provider.
                  </p>

                  <div className="flex flex-col gap-2">
                    <FloatingLabelInput
                      id="provider-name"
                      label="Provider name"
                      disabled={true}
                      value={provider.provider_name}
                    />

                    <FloatingLabelInput
                      id="provider-domain"
                      label="Domain"
                      disabled={true}
                      value={provider.provider_url}
                    />
                  </div>

                  <button
                    onClick={() => setAccordionCurrent('2')}
                    className="px-4 py-2 bg-button-primary-bg-active rounded-full self-start"
                  >
                    <div className="h-6 text-center justify-center text-text-primary text-base leading-snug flex flex-row gap-2 items-center">
                      Continue
                    </div>
                  </button>
                </AccordionContent>
              </AccordionItem>

              <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-neutral-400/20" />

              <AccordionItem value="2">
                <AccordionTrigger
                  onClick={() => provider && setAccordionCurrent('2')}
                  className={`flex flex-row items-center py-2 ${provider && 'cursor-pointer'}`}
                >
                  <div
                    className={cn(
                      `w-5 h-5 text-xs leading-none rounded-full relative overflow-hidden`,
                      'bg-alpha-blue-24 text-blue-300',
                    )}
                  >
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ">
                      <CheckMarkIcon />
                    </div>
                  </div>

                  <span className="text-text-primary text-base leading-snug">
                    Provider private key and provider address
                  </span>
                </AccordionTrigger>

                <AccordionContent className="flex flex-col text-balance pl-9 pr-8 pb-2 gap-4">
                  <p className="text-text-secondary text-sm font-normals leading-tight">
                    We generated a unique provider private key and provider address,
                    <br />
                    which are required to initialize and authenticate your integration
                  </p>

                  <div className="flex flex-col gap-2">
                    <div className="inline-flex items-center gap-2">
                      <CopyField
                        valueToCopy={provider.provider_address!}
                        valueToShow={formatSecret(provider.provider_address!)}
                      />

                      <div className="text-text-secondary text-sm font-normal leading-tight">
                        Provider address
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-2">
                      <CopyField
                        valueToCopy={provider.provider_private_key!}
                        valueToShow={formatSecret(provider.provider_private_key!)}
                      />

                      <div className="text-text-secondary text-sm font-normal leading-tight">
                        Provider private key
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setAccordionCurrent('3')}
                    className="px-4 py-2 bg-button-primary-bg-active rounded-full self-start"
                  >
                    <div className="h-6 text-center justify-center text-text-primary text-base leading-snug flex flex-row gap-2 items-center">
                      Continue
                    </div>
                  </button>
                </AccordionContent>
              </AccordionItem>

              <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-neutral-400/20" />

              <AccordionItem value="3">
                <AccordionTrigger
                  onClick={() => provider && setAccordionCurrent('3')}
                  className={`flex flex-row items-center py-2 ${provider && 'cursor-pointer'}`}
                >
                  <div
                    className={cn(
                      `w-5 h-5 text-xs leading-none rounded-full relative overflow-hidden`,
                      'bg-alpha-blue-24 text-blue-300',
                    )}
                  >
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ">
                      <CheckMarkIcon />
                    </div>
                  </div>

                  <span className="text-text-primary text-base leading-snug">
                    Install and connect the SDKs
                  </span>
                </AccordionTrigger>

                <AccordionContent className="flex flex-col text-balance pl-9 pr-8 pb-2 gap-4">
                  <p className="text-text-secondary text-sm font-normals leading-tight">
                    Add our SDK to your project:
                  </p>

                  <div className="flex flex-col gap-2">
                    <div className="flex flex-row gap-2 items-center">
                      <CopyField
                        valueToCopy={'npm install @alien_org/sso-sdk-core'}
                        valueToShow={'npm install @alien_org/sso-sdk-core'}
                      />
                    </div>
                  </div>

                  <p className="text-text-secondary text-sm font-normals leading-tight">
                    If you use React/Next.js, also add React SDK:
                  </p>
                  <div>
                    <div className="flex flex-row gap-2 items-center">
                      <CopyField
                        valueToCopy={'npm install @alien_org/sso-sdk-react'}
                        valueToShow={'npm install @alien_org/sso-sdk-react'}
                      />
                    </div>
                  </div>

                  <p className="text-text-secondary text-sm font-normals leading-tight">
                    They handle frontend and backend parts of the SSO flow.
                  </p>

                  <button
                    onClick={() => setAccordionCurrent('4')}
                    className="px-4 py-2 bg-button-primary-bg-active rounded-full self-start"
                  >
                    <div className="h-6 text-center justify-center text-text-primary text-base leading-snug flex flex-row gap-2 items-center">
                      Continue
                    </div>
                  </button>
                </AccordionContent>
              </AccordionItem>

              <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-neutral-400/20" />

              <AccordionItem value="4">
                <AccordionTrigger
                  onClick={() => provider && setAccordionCurrent('4')}
                  className={`flex flex-row items-center py-2 ${provider && 'cursor-pointer'}`}
                >
                  <div
                    className={cn(
                      `w-5 h-5 text-xs leading-none rounded-full relative overflow-hidden`,
                      'bg-alpha-blue-24 text-blue-300',
                    )}
                  >
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ">
                      <CheckMarkIcon />
                    </div>
                  </div>

                  <span className="text-text-primary text-base leading-snug">
                    Customize Alien ID button
                  </span>
                </AccordionTrigger>

                <AccordionContent className="flex flex-col text-balance pl-9 pr-8 pb-2 gap-4">
                  <p className="text-text-secondary text-sm font-normals leading-tight">
                    We provide ready-made HTML and CSS, React. Using our
                    <br />
                    standard button helps build user trust. Custom styling is optional.
                  </p>

                  <div className="w-96 h-36 px-3 py-1 bg-linear-[90deg,_#1A1A1A_99.94%,_#313131_137.42%,_#313131_146.6%] rounded-lg shadow-[inset_0px_0px_16px_0px_#313131] outline-1 outline-offset-[-0.50px] outline-white/10 flex items-center justify-center">
                    <div className="w-72 h-12 px-4 py-2 bg-button-primary-bg-active rounded-2xl flex justify-center items-center gap-2">
                      <Keyline16Svg />

                      <div className="text-center justify-center text-text-primary text-base leading-snug">
                        Sign-in with Alien ID
                      </div>
                    </div>
                  </div>

                  <SyntaxHighlighter className="w-96" wrapLongLines language="tsx" style={oneDark}>
                    {codeForButton()}
                  </SyntaxHighlighter>

                  <button
                    onClick={() => setAccordionCurrent('5')}
                    className="px-4 py-2 bg-button-primary-bg-active rounded-full self-start"
                  >
                    <div className="h-6 text-center justify-center text-text-primary text-base leading-snug flex flex-row gap-2 items-center">
                      Continue
                    </div>
                  </button>
                </AccordionContent>
              </AccordionItem>

              <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-neutral-400/20" />

              <AccordionItem value="5">
                <AccordionTrigger
                  onClick={() => provider && setAccordionCurrent('5')}
                  className={`flex flex-row items-center py-2 ${provider && 'cursor-pointer'}`}
                >
                  <div
                    className={cn(
                      `w-5 h-5 text-xs leading-none rounded-full relative overflow-hidden`,
                      'bg-alpha-blue-24 text-blue-300',
                    )}
                  >
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ">
                      <CheckMarkIcon />
                    </div>
                  </div>

                  <span className="text-text-primary text-base leading-snug">
                    Use the integration example
                  </span>
                </AccordionTrigger>

                <AccordionContent className="flex flex-col text-balance pl-9 pr-8 pb-2 gap-4">
                  <p className="text-text-secondary text-sm font-normals leading-tight">
                    Get a working code sample with your key and address
                    <br />
                    already included. Use it as a starting point for your integration.
                  </p>

                  {provider ? (
                    <>
                      <p className="text-text-secondary text-sm font-normals leading-tight">
                        Server (Node.js + Express) example:
                      </p>
                      <SyntaxHighlighter
                        className="w-[440px]"
                        wrapLongLines
                        language="ts"
                        style={oneDark}
                      >
                        {codeForServer(
                          provider.provider_address!,
                          provider.provider_private_key!,
                          process.env.NEXT_PUBLIC_ALIEN_SSO_ROUTER_URL!,
                        )}
                      </SyntaxHighlighter>

                      <p className="text-text-secondary text-sm font-normals leading-tight">
                        Client example:
                      </p>
                      <SyntaxHighlighter
                        className="w-[440px]"
                        wrapLongLines
                        language="ts"
                        style={oneDark}
                      >
                        {codeForClient(
                          provider.provider_address!,
                          process.env.NEXT_PUBLIC_ALIEN_SSO_ROUTER_URL!,
                        )}
                      </SyntaxHighlighter>
                    </>
                  ) : (
                    <p className="text-text-secondary text-sm font-normal leading-tight">
                      Generate provider on first step to see full example!
                    </p>
                  )}

                  <button
                    onClick={() => onClose()}
                    className="px-4 py-2 bg-button-primary-bg-active rounded-full self-start"
                  >
                    <div className="h-6 text-center justify-center text-text-primary text-base leading-snug flex flex-row gap-2 items-center">
                      Finish
                    </div>
                  </button>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ) : null}
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};
