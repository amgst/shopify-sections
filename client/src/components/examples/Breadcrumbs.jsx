import Breadcrumbs from '../Breadcrumbs';
export default function BreadcrumbsExample() {
    return (<Breadcrumbs items={[
            { label: 'Browse', href: '/browse' },
            { label: 'Product Display' },
        ]}/>);
}
