import { defaultTestDataPrefix } from './constants';

export const buildTestDataPrefix = () => `${defaultTestDataPrefix} ${Date.now()}`;

export const buildTestName = ({ name }: { name: string }) => `${buildTestDataPrefix()} ${name}`;
