import { Spinner } from '@/components/atoms';

export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-axiom-dark">
      <div className="flex flex-col items-center gap-4">
        <Spinner size="lg" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}
