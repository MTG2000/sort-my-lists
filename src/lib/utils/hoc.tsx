/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";

export function withProviders(
  ...providers: (
    | ((props: { children: ReactNode }) => JSX.Element)
    | [provider: (props: any) => JSX.Element, providerProps?: any]
  )[]
) {
  return <ComponentProps extends Record<string, any>>(
      WrappedComponent: (props: ComponentProps) => JSX.Element | null
    ) =>
    (props: ComponentProps) =>
      providers.reduceRight((acc, prov) => {
        if (Array.isArray(prov)) {
          const Provider = prov[0];
          return <Provider {...prov[1]}>{acc}</Provider>;
        }

        const Provider = prov;
        return <Provider>{acc}</Provider>;
      }, <WrappedComponent {...props} />);
}
