interface Props {
  title: string;
}

export default function SectionHeader({ title }: Props) {
  return (
    <div className="flex justify-between items-center mb-6 mt-8">
      <h2 className="text-cyan-400 text-lg font-bold uppercase tracking-wide border-b-2 border-transparent hover:border-cyan-400 cursor-pointer transition-all">
        {title}
      </h2>
      <button className="text-xs text-slate-400 hover:text-white transition-colors">
        View More
      </button>
    </div>
  );
}