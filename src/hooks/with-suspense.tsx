import { Suspense } from "react";
import FallBackLoader from "../components/shared/fallback-loader";

function withSuspense(
    Component: React.LazyExoticComponent<() => JSX.Element>,
    fallback?: JSX.Element
) {
    return () => {
        return (
            <Suspense fallback={fallback ? fallback : <FallBackLoader />}>
                <Component />
            </Suspense>
        );
    };
}

export { withSuspense };
