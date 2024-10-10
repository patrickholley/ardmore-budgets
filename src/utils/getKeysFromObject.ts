const getKeysFromObjects = (obj: Record<string, unknown>) => Object.keys(obj) as Array<keyof typeof obj>;

export default getKeysFromObjects;
