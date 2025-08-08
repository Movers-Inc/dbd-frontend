interface BankCardProps {
  iconSrc: string;
  bankName: string;
  alt?: string;
  selected?: boolean;
  onClick?: () => void;
}

const BankCard = ({
  iconSrc,
  bankName,
  alt,
  selected = false,
  onClick
}: BankCardProps) => {
  return (
    <div
      onClick={onClick}
      className={`rounded-xl px-2 py-3 flex flex-col items-center gap-1 cursor-pointer border-2 ${
        selected ? "border-[#1976D2]" : "bg-[#F6F6F6] border-transparent"
      }`}
      style={selected ? { backgroundColor: "rgba(25, 118, 210, 0.1)" } : {}}
    >
      <img
        src={iconSrc}
        alt={alt || bankName}
        className="w-6 h-6 rounded-full"
      />
      <span
        className="text-[14px] text-black text-center line-clamp-1"
        style={{ letterSpacing: "-2.5%" }}
      >
        {bankName}
      </span>
    </div>
  );
};

export default BankCard;
