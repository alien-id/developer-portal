'use client';

import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/custom/custom-dialog';
import Close16Svg from '@/icons/close-16.svg';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/custom/custom-accordion';
import { useEffect, useMemo, useRef, useState } from 'react';
import FloatingLabelInput from '@/components/custom/custom-input';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import Spinner24Svg from '@/icons/spinner-24.svg';
import Keyline16Svg from '@/icons/keyline-24.svg';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { codeForButton, codeForClient, codeForServer } from './constants';
import CopyField from '@/components/custom/copy-field';
import { cn, formatSecret } from '@/lib/utils';
import { useAxios } from '@/hooks/useAxios';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import QRCodeStyling, { Options } from 'qr-code-styling';
import Refresh16Svg from '@/icons/refresh-16.svg';

type CreateProviderRequestPayload = {
  provider_name: string;
  provider_url: string;
};

const formSchema = z.object({
  providerName: z.string().min(2, {
    message: 'Name must be at least 2 characters',
  }),
  providerDomainUrl: z.string().url({
    message: 'Please provide valid URL, e.g. https://example.com',
  }),
});

type Deeplink = {
  deep_link: string;
  polling_code: string;
  expiredAt: string;
};

type PollResponse = {
  status: 'created' | 'pending';
  provider_id?: string;
  provider_address?: string;
  provider_private_key?: string;
};

const qrOptions: Partial<Options> = {
  data: 'https://test.com',
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
    color: '#ffffff',
    type: 'dots',
  },
  image: '/qr-logo.png',
  imageOptions: {
    imageSize: 1,
    crossOrigin: 'anonymous',
    margin: 10,
    hideBackgroundDots: true,
  },
};

const DashboardCreateProvider = ({
  refetch,
  isOpen,
  onClose,
}: {
  refetch: () => void;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const axios = useAxios();
  const [accordionCurrent, setAccordionCurrent] = useState('1');
  const [deeplink, setDeeplink] = useState<Deeplink>();
  const [provider, setProvider] = useState<PollResponse>();
  const [error, setError] = useState<string>();

  const qrInstanceRef = useRef<QRCodeStyling>(new QRCodeStyling(qrOptions));
  const qrElementRef = useRef<HTMLDivElement>(null);

  const createProvider = useMemo(() => {
    return async (payload: CreateProviderRequestPayload) => {
      return (
        await axios.post('/providers', payload, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
      ).data;
    };
  }, [axios]);

  const queryClient = useQueryClient();

  const { mutate: trigger, isLoading: isMutating } = useMutation<
    Deeplink,
    Error,
    CreateProviderRequestPayload
  >(createProvider);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      providerName: '',
      providerDomainUrl: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const payload: CreateProviderRequestPayload = {
      provider_name: values.providerName,
      provider_url: values.providerDomainUrl,
    };

    trigger(payload, {
      onSuccess: (deeplink) => {
        setDeeplink(deeplink);
        setAccordionCurrent('2');

        qrInstanceRef.current.update({
          data: deeplink.deep_link,
        });
      },
      onError: (e) => {
        setError(e instanceof Error ? e.message : String(e));
      },
    });
  };

  useEffect(() => {
    if (qrElementRef.current) {
      qrInstanceRef.current.append(qrElementRef.current);
    }
  }, [qrElementRef.current]);

  const handleFinish = () => {
    onClose();
    queryClient.invalidateQueries(['/providers']);
  };

  const handleMockScan = () => {
    if (!deeplink?.deep_link) return;

    fetch('/api/mock-provider-callback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        deep_link: deeplink.deep_link,
      }),
    });
  };

  const { data: pollData } = useQuery({
    queryKey: ['deeplink-poll', deeplink?.polling_code],
    queryFn: async () => {
      const res = await axios.post<PollResponse>('/poll', {
        polling_code: deeplink!.polling_code,
      });
      return res.data;
    },
    enabled: Boolean(deeplink?.polling_code),
    refetchInterval: 5000,
    refetchIntervalInBackground: true,
    retry: false,
    onError: (err) => setError(err as string),
  });

  useEffect(() => {
    if (pollData?.status === 'created') {
      refetch();
      setProvider({ ...pollData });
      setAccordionCurrent('3');
    }
  }, [pollData, refetch]);

  useEffect(() => {
    onReset();
  }, [isOpen]);

  const onReset = () => {
    form.reset();
    setDeeplink(undefined);
    setProvider(undefined);
    setAccordionCurrent('1');
    setError(undefined);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[640px] max-h-[90dvh] py-3">
        <DialogHeader>
          <DialogTitle className="text-text-primary text-xl leading-loose">
            Create a provider
          </DialogTitle>
          <DialogDescription className="text-text-secondary text-sm font-normal leading-tight">
            Set up your SSO integration in five simple steps.
          </DialogDescription>

          <DialogClose>
            <div className="w-8 h-7 relative bg-bg-secondary rounded-[42px] border border-stroke-disabled">
              <Close16Svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
              <span className="sr-only">Close</span>
            </div>
          </DialogClose>
        </DialogHeader>

        <DialogBody>
          {error ? (
            <div className="flex flex-col gap-4 mt-8">
              <p className="text-center text-text-primary text-2xl leading-loose mb-4">
                Request failed
              </p>

              <button
                onClick={() => onReset()}
                className="px-4 py-2 bg-button-secondary-bg-active rounded-full flex justify-center items-center gap-1 cursor-pointer"
              >
                <Refresh16Svg />

                <span className="justify-center text-text-primary text-base leading-snug">
                  Try again
                </span>
              </button>
            </div>
          ) : (
            <Accordion
              type="single"
              collapsible
              className="w-full flex flex-col gap-2"
              value={accordionCurrent}
            >
              <AccordionItem value="1">
                <AccordionTrigger className="flex flex-row items-center py-2">
                  <div
                    className={cn(
                      `w-5 h-5 text-xs leading-none rounded-full relative overflow-hidden`,
                      accordionCurrent === '1'
                        ? 'bg-alpha-blue-24 text-blue-300'
                        : 'border border-stroke-default text-neutral-400',
                    )}
                  >
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ">
                      1
                    </div>
                  </div>

                  <span className="text-text-primary text-base leading-snug">
                    Enter provider name and domain
                  </span>
                </AccordionTrigger>

                <AccordionContent className="flex flex-col text-balance pl-9 pr-8 pb-2 gap-4">
                  <p className="text-text-secondary text-sm font-normals leading-tight">
                    Name your provider and specify the domain.
                  </p>

                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 ">
                      <div className="flex flex-col gap-2">
                        <FormField
                          control={form.control}
                          name="providerName"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <FloatingLabelInput
                                  id="provider-name"
                                  label="Provider name"
                                  disabled={isMutating}
                                  {...field}
                                />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="providerDomainUrl"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <FloatingLabelInput
                                  id="provider-domain"
                                  label="Domain"
                                  disabled={isMutating}
                                  {...field}
                                />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <button
                        type="submit"
                        className="px-4 py-2 bg-button-primary-bg-active rounded-full self-start"
                      >
                        <div className="h-6 text-center justify-center text-text-primary text-base leading-snug flex flex-row gap-2 items-center">
                          {isMutating && <Spinner24Svg className="animate-spin" />}
                          Continue
                        </div>
                      </button>
                    </form>
                  </Form>
                </AccordionContent>
              </AccordionItem>

              <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-neutral-400/20" />

              <AccordionItem value="2">
                <AccordionTrigger className="flex flex-row items-center py-2">
                  <div
                    className={cn(
                      `w-5 h-5 text-xs leading-none rounded-full relative overflow-hidden`,
                      accordionCurrent === '2'
                        ? 'bg-alpha-blue-24 text-blue-300'
                        : 'border border-stroke-default text-neutral-400',
                    )}
                  >
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ">
                      2
                    </div>
                  </div>

                  <span className="text-text-primary text-base leading-snug">
                    Scan with Alien App to create provider
                  </span>
                </AccordionTrigger>

                <AccordionContent className="flex flex-col text-balance pl-9 pr-8 pb-2 gap-4">
                  {deeplink ? (
                    <>
                      <div className="mt-4 max-w-[340px] max-h-[340px] p-[24px] mx-auto rounded-[32px] relative border border-stroke-default">
                        <div
                          ref={qrElementRef}
                          className={cn(
                            'w-full h-full grid place-items-center overflow-hidden',
                            '[&>*]:w-full [&>*]:h-full [&>*]:max-w-full [&>*]:max-h-full [&>*]:object-contain',
                          )}
                        />
                      </div>

                      <button
                        className={cn('text-text-secondary text-xs p-1 cursor-pointer')}
                        onClick={handleMockScan}
                      >
                        Mock scan
                      </button>
                    </>
                  ) : null}
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
                      accordionCurrent === '3'
                        ? 'bg-alpha-blue-24 text-blue-300'
                        : 'border border-stroke-default text-neutral-400',
                    )}
                  >
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ">
                      3
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

                  {provider ? (
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
                  ) : (
                    <p className="text-text-secondary text-sm font-normal leading-tight">
                      Generate provider on first step to see full example!
                    </p>
                  )}

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
                      accordionCurrent === '4'
                        ? 'bg-alpha-blue-24 text-blue-300'
                        : 'border border-stroke-default text-neutral-400',
                    )}
                  >
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ">
                      4
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
                      accordionCurrent === '5'
                        ? 'bg-alpha-blue-24 text-blue-300'
                        : 'border border-stroke-default text-neutral-400',
                    )}
                  >
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ">
                      5
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
                    onClick={() => setAccordionCurrent('6')}
                    className="px-4 py-2 bg-button-primary-bg-active rounded-full self-start"
                  >
                    <div className="h-6 text-center justify-center text-text-primary text-base leading-snug flex flex-row gap-2 items-center">
                      Continue
                    </div>
                  </button>
                </AccordionContent>
              </AccordionItem>

              <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-neutral-400/20" />

              <AccordionItem value="6">
                <AccordionTrigger
                  onClick={() => provider && setAccordionCurrent('6')}
                  className={`flex flex-row items-center py-2 ${provider && 'cursor-pointer'}`}
                >
                  <div
                    className={cn(
                      `w-5 h-5 text-xs leading-none rounded-full relative overflow-hidden`,
                      accordionCurrent === '6'
                        ? 'bg-alpha-blue-24 text-blue-300'
                        : 'border border-stroke-default text-neutral-400',
                    )}
                  >
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ">
                      6
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
                    onClick={handleFinish}
                    className="px-4 py-2 bg-button-primary-bg-active rounded-full self-start"
                  >
                    <div className="h-6 text-center justify-center text-text-primary text-base leading-snug flex flex-row gap-2 items-center">
                      Finish
                    </div>
                  </button>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default DashboardCreateProvider;
