import AvatarIcon from '@/icons/avatar.svg';

export const Avatar = () => {
  return (
    <div className="w-[38px] h-[38px] cursor-pointer flex items-center justify-center border-[1px] border-white rounded-full">
      <AvatarIcon />
    </div>
  );
};
