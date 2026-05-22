import type { Page } from '@playwright/test';

// generic type for constructor
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor<T = {}> = new (...args: any[]) => T;

/**
 * Converts a union type (e.g. A | B | C) into an intersection (A & B & C).
 * Achieved via distributive conditional types and `infer`.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UnionToIntersection<U> = (U extends any ? (x: U) => void : never) extends (x: infer I) => void ? I : never;

/**
 * Composes multiple classes that accept a page in their constructor into a single class.
 * It copies both instance properties and prototype methods from the base classes.
 */
export const composePO = <Bases extends Constructor[]>(...bases: Bases) => {
    class Composite {
        readonly page: Page;

        constructor(page: Page) {
            this.page = page;

            // for each base class: create an instance and "throw" its properties to this
            for (const Base of bases) {
                const inst = new Base(page);
                Object.assign(this, inst);
            }
        }
    }

    //deep copy all prototype methods from the whole prototype chain (except Object)
    for (const Base of bases) {
        let proto = Base.prototype;
        while (proto && proto !== Object.prototype) {
            for (const name of Object.getOwnPropertyNames(proto)) {
                if (name === 'constructor') continue;
                if (name in Composite.prototype) continue; // don't overwrite
                Object.defineProperty(Composite.prototype, name, Object.getOwnPropertyDescriptor(proto, name)!);
            }
            proto = Object.getPrototypeOf(proto);
        }
    }

    type InstanceUnion = InstanceType<Bases[number]>;
    type InstanceIntersection = UnionToIntersection<InstanceUnion>;

    return Composite as {
        new (page: Page): InstanceIntersection;
    };
};
