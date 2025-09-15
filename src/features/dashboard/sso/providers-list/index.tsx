'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Provider } from '../types';
import CopyField from '@/components/custom/copy-field';
import { cn, formatSecret } from '@/lib/utils';
import { robotoMono } from '@/fonts/fonts';
import { Button } from '@/components/ui/button';
import ArrowRight16Svg from '@/icons/arrow-right-16.svg';
import { useState } from 'react';
import { ProviderDetailsModal } from '@/components/ProviderDetailsModal';

interface DashboardSsoProvidersListProps {
  data: Provider[];
  onOpenCreateProvider: () => void;
}
const DashboardSsoProvidersList = ({
  data,
  onOpenCreateProvider,
}: DashboardSsoProvidersListProps) => {
  const [providerDetails, setProviderDetails] = useState<Provider>();
  const [isProviderDetailsOpen, setIsProviderDetailsOpen] = useState(false);

  return (
    <>
      <ProviderDetailsModal
        provider={providerDetails}
        isOpen={isProviderDetailsOpen}
        onClose={() => {
          setIsProviderDetailsOpen(false);
          setProviderDetails(undefined);
        }}
      />

      <h2 className="text-text-primary text-xl mb-2">List of providers</h2>

      <p className="text-text-secondary text-sm font-normal mb-4">
        Manage your SSO providers — view keys, domains, and integration details in one place.
      </p>

      <div className="mb-6">
        <Button variant="brand" onClick={() => onOpenCreateProvider()}>
          <span className="text-text-primary text-base leading-snug">Create a provider</span>
        </Button>
      </div>

      <Table className="overflow-hidden">
        <TableHeader>
          <TableRow>
            <TableHead
              className={cn(
                `max-w-[100px] text-text-secondary text-xs font-medium uppercase leading-none tracking-tight`,
                robotoMono.className,
              )}
            >
              Provider name
            </TableHead>

            <TableHead
              className={cn(
                'max-w-[80px] text-text-secondary text-xs font-medium uppercase leading-none tracking-tight',
                robotoMono.className,
              )}
            >
              Domain
            </TableHead>

            <TableHead
              className={cn(
                'max-w-[100px] text-text-secondary text-xs font-medium uppercase leading-none tracking-tight',
                robotoMono.className,
              )}
            >
              Private key
            </TableHead>

            <TableHead
              className={cn(
                'max-w-[100px] text-text-secondary text-xs font-medium uppercase leading-none tracking-tight',
                robotoMono.className,
              )}
            >
              Address
            </TableHead>

            <TableHead
              className={cn(
                'min-w-[10px] text-text-secondary text-xs font-medium uppercase leading-none tracking-tight',
                robotoMono.className,
              )}
            ></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((provider) => (
            <TableRow key={provider.id} className="group relative hover:bg-neutral-900">
              <TableCell className="font-medium">{provider.provider_name}</TableCell>

              <TableCell className="max-w-[80px] overflow-hidden text-ellipsis">
                {provider.provider_url}
              </TableCell>

              <TableCell className="max-w-[100px] relative z-10">
                <CopyField
                  valueToCopy={provider.provider_private_key}
                  valueToShow={formatSecret(provider.provider_private_key, 3, 3)}
                  outerWrapperClassName="max-w-[100px] overflow-hidden text-ellipsis"
                  innerWrapperClassName="blur-xs group-hover:blur-none transition-all duration-200 ease-in-out"
                />
              </TableCell>

              <TableCell className="max-w-[100px] relative z-10">
                <CopyField
                  valueToCopy={provider.provider_address}
                  valueToShow={formatSecret(provider.provider_address, 3, 3)}
                  outerWrapperClassName="max-w-[100px] overflow-hidden text-ellipsis z-1"
                  innerWrapperClassName="blur-xs group-hover:blur-none transition-all duration-200 ease-in-out"
                />
              </TableCell>

              <TableCell
                className={cn(
                  'min-w-[10px] max-w-[80px]',
                  'absolute right-0 z-11',
                  'h-full flex items-center',
                  'bg-gradient-to-l from-black/100 via-black/100 to-transparent',
                )}
              >
                <Button
                  onClick={() => {
                    setProviderDetails(provider);
                    setIsProviderDetailsOpen(true);
                  }}
                  variant={'ghost'}
                  className="gap-0.5 text-blue-300 text-sm leading-tight"
                >
                  Details
                  <ArrowRight16Svg />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default DashboardSsoProvidersList;
