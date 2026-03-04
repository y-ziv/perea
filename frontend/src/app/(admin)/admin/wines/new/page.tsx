import { WineForm } from "@/components/admin/WineForm";

export default function NewWinePage() {
  return (
    <div>
      <h1 className="font-heading-secondary text-h3 text-copper">יין חדש</h1>
      <div className="mt-8">
        <WineForm mode="create" />
      </div>
    </div>
  );
}
