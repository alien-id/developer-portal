import AvatarIcon from '@/icons/logo-32.svg';

export const Avatar = () => {
  return (
    <div className="w-[38px] h-[38px] cursor-pointer flex items-center justify-center border-[1px] border-white rounded-full">
      <div className="w-[22px] h-[22px] mr-[-1px]">
        <AvatarIcon />
      </div>
    </div>
  );
};
