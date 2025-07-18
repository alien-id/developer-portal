

import { useState } from 'react';
import Copy16Svg from '@/icons/copy-16.svg';
import ColoredSuccess16 from '@/icons/colored-success-16.svg';
import { cn } from '@/lib/utils';

type CopyFieldProps = {
    valueToShow: string;
    valueToCopy: string;
    outerWrapperClassName?: string;
    innerWrapperClassName?: string;

};

function CopyField({
    valueToShow,
    valueToCopy,
    outerWrapperClassName,
    innerWrapperClassName,
}: CopyFieldProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(valueToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // reset after 2s
    };

    return (
        <div
            className={cn(
                "h-7 w-64 px-2.5 py-1 bg-linear-[90deg,_#1A1A1A_99.94%,_#313131_137.42%,_#313131_146.6%] rounded-lg shadow-[inset_0px_0px_16px_0px_#313131] outline-1 outline-offset-[-0.50px] outline-white/10",
                outerWrapperClassName,
            )}
        >
            <div
                className={cn(
                    "flex justify-between items-center gap-1",
                    innerWrapperClassName
                )}
            >
                <div
                    className={cn(
                        "text-text-primary text-xs font-medium leading-tight"
                    )}
                >
                    {valueToShow}
                </div>

                <div className="w-4 h-4 relative">
                    <div className="w-4 h-4 left-0 top-0 absolute">
                        <button onClick={handleCopy} className='cursor-pointer'>
                            {copied ? <ColoredSuccess16 /> : <Copy16Svg />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CopyField;