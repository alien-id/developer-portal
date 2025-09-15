'use client';

import Link16Svg from '@/icons/link-16.svg';
import DashboardCreateProvider from '../create-provider';
import CopyField from '@/components/custom/copy-field';

const DashboardSsoIntroduction = () => {
  return (
    <div className="w-full h-full rounded-[40px] border border-stroke-default px-[110px] py-[36px]">
      <h2 className="text-text-primary text-xl mb-2">Introduction</h2>

      <p className="text-text-secondary text-sm font-normal mb-4">
        Before creating your first integration, here’s a quick overview of the initial steps. This
        helps you understand what’s coming next.
      </p>

      <div className="flex flex-col gap-1">
        <div className="p-4 bg-bg-secondary rounded-2xl border border-stroke-disabled inline-flex flex-row gap-3">
          <div className="w-5 h-5 relative rounded-full border border-stroke-default text-neutral-400 text-xs leading-none">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">1</div>
          </div>

          <div className="w-96 inline-flex flex-col  items-start gap-4">
            <div className="flex flex-col  items-start gap-1">
              <div className="flex flex-col  items-start gap-1">
                <div className=" text-text-primary text-sm leading-tight mb-1">
                  Create a new provider
                </div>

                <div className="text-text-secondary text-sm font-normal leading-tight">
                  To start, you’ll need to create a new provider that defines your product.
                  <br />
                  <br />
                  Once created, you’ll receive a private key and a private address — both are
                  required to securely initialize your SSO integration. Store them safely: they act
                  as credentials for your provider.
                </div>
              </div>
            </div>

            <DashboardCreateProvider />
          </div>
        </div>

        <div className="p-4 bg-bg-secondary rounded-2xl border border-stroke-disabled inline-flex flex-row gap-3">
          <div className="w-5 h-5 relative rounded-full border border-stroke-default text-neutral-400 text-xs leading-none">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">2</div>
          </div>

          <div className="w-96 inline-flex flex-col  items-start gap-4">
            <div className="flex flex-col  items-start gap-1">
              <div className="flex flex-col  items-start gap-1">
                <div className=" text-text-primary text-sm leading-tight mb-1">
                  Install the SDKs
                </div>

                <div className="text-text-secondary text-sm font-normal leading-tight">
                  Next, you need to choose an SDK for your project:
                </div>
              </div>
            </div>

            <div className="text-text-secondary text-sm font-normal leading-tight">
              Base SSO SDK for backend integration, or for integrating into native JavaScript app,
              or when your framework isn’t listed below.
            </div>
            <div className="flex flex-col gap-2">
              <CopyField
                valueToCopy={'npm install @alien_org/sso-sdk-core'}
                valueToShow={'npm install @alien_org/sso-sdk-core'}
              />
            </div>

            <div className="text-text-secondary text-sm font-normal leading-tight">
              React SSO SDK for React/Next.js applications.
            </div>
            <div className="flex flex-col gap-2">
              <CopyField
                valueToCopy={'npm install @alien_org/sso-sdk-react'}
                valueToShow={'npm install @alien_org/sso-sdk-react'}
              />
            </div>
          </div>
        </div>

        <div className="p-4 bg-bg-secondary rounded-2xl border border-stroke-disabled inline-flex flex-row gap-3">
          <div className="w-5 h-5 relative rounded-full border border-stroke-default text-neutral-400 text-xs leading-none">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">3</div>
          </div>

          <div className="w-96 inline-flex flex-col  items-start gap-4">
            <div className="flex flex-col  items-start gap-1">
              <div className="flex flex-col  items-start gap-1">
                <div className=" text-text-primary text-sm leading-tight mb-1">
                  Finish client setup & customization
                </div>

                <div className="text-text-secondary text-sm font-normal leading-tight">
                  In the final step, you’ll initialize the client and complete a few remaining
                  settings.
                </div>
              </div>
            </div>

            <div className="flex flex-row flex-wrap gap-2">
              <div className="inline-flex justify-start items-center gap-[3px]">
                <div className="border-b border-white/20 flex justify-center items-center gap-2.5">
                  <div className="justify-start text-white text-xs leading-none">Usage example</div>
                </div>
                <div className="w-4 h-4 relative overflow-hidden">
                  <Link16Svg />
                </div>
              </div>

              <div className="inline-flex justify-start items-center gap-[3px]">
                <div className="border-b border-white/20 flex justify-center items-center gap-2.5">
                  <div className="justify-start text-white text-xs leading-none">
                    Integrating the sign-in button
                  </div>
                </div>
                <div className="w-4 h-4 relative overflow-hidden">
                  <Link16Svg />
                </div>
              </div>

              <div className="inline-flex justify-start items-center gap-[3px]">
                <div className="border-b border-white/20 flex justify-center items-center gap-2.5">
                  <div className="justify-start text-white text-xs leading-none">API Reference</div>
                </div>
                <div className="w-4 h-4 relative overflow-hidden">
                  <Link16Svg />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSsoIntroduction;
