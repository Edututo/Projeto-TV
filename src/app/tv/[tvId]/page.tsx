
import ClientTVContentPage from "./client";

export default function Page({ params }: { params: { tvId: string } }) {
  return <ClientTVContentPage tvId={params.tvId} />;
}
