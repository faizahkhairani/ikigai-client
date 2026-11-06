interface PageHeaderProps {
  title: string;
  description?: string;
}

const PageHeader = ({
  title,
  description,
}: PageHeaderProps) => {
  return (
    <div className="flex items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">
          {title}
        </h1>

        {description && (
          <p className="mt-1 text-sm text-slate-500">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
