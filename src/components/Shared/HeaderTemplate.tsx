import { Badge } from 'primereact/badge';

const HeaderTemplate = (options: any): React.ReactNode => {
    const className = `${options?.className} justify-content-start`;
    const titleClassName = options?.title
    const totalCount = options?.totalCount
    return (
        <div className={className}>
            <label className="text-base font-semibold text-dark-blue mr-1">
                {titleClassName}
            </label>
            {options.hideBadge === true? <></>: <Badge value={totalCount} severity="info"></Badge> }

        </div>
    )
};

export { HeaderTemplate };