import { PropertyDetailsPageContent } from "@/components/properties/property-details-page"

type PropertyDetailsPageProps = {
  params: Promise<{ id: string }>
}

export default async function PropertyDetailsAliasPage({
  params,
}: PropertyDetailsPageProps) {
  const { id } = await params

  return (
    <PropertyDetailsPageContent
      propertyId={id}
      callbackPath={`/properties/${id}`}
    />
  )
}
