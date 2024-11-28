import { Headline, Inline, Inset } from "design-system";
import type * as Route from "./+types.index";

export function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const message = url.searchParams.get("message");
  return {
    message: message ?? "Hello, Bento!",
  };
}

export default function Index({ loaderData }: Route.ComponentProps) {
  return (
    <Inset space={40}>
      <Inline space={0} align="center">
        <Headline size="large">{loaderData.message}</Headline>
      </Inline>
    </Inset>
  );
}
