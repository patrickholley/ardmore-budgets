export enum PageComponents {
    Home = 'home-page',
    About = 'about-page',
    Contact = 'contact-page',
}

export type PageComponent = `${PageComponents}`;
export type Page = keyof typeof PageComponents;

export enum Paths {
    Home = '/',
    About = '/about',
    Contact = '/contact',
}

export type Path = `${Paths}`;
export type Routes = Record<Path, PageComponent>;
