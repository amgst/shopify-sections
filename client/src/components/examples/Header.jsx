import Header from '../Header';
export default function HeaderExample() {
    return <Header onSearch={(q) => console.log('Search:', q)}/>;
}
