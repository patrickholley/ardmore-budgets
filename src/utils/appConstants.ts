import getKeysFromObject from "@utils/getKeysFromObject.ts";

const PageComponents = {
    Home: 'home-page',
    About: 'about-page',
    Contact: 'contact-page'
};

const Paths = {
    Home: '/',
    About: '/about',
    Contact: '/contact'
};

const Routes = getKeysFromObject(Paths).reduce(
    (routesObj, key) => ({ ...routesObj, [Paths[key]]: PageComponents[key] }),
    {}
);

export default {
    PageComponents,
    Paths,
    Routes
};
