import getKeysFromObject from "@utils/getKeysFromObject";
import {PageComponents, Page, Paths, Routes} from "@app-types/router";

const routes: Routes = getKeysFromObject(Paths).reduce(
    (routesObj, key) => {
        const path = Paths[key as Page];
        const page = PageComponents[key as Page];
        return ({ ...routesObj, [path]: [page] })
    },
    {} as Routes
);

export default {
    Routes: routes
};
