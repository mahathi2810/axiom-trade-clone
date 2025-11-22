'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/atoms/Icon';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-axiom-dark">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="rounded-full bg-axiom-red/10 p-4">
          <Icon name="warning" size={32} className="text-axiom-red" />
        </div>
        <h2 className="text-xl font-semibold text-foreground">
          Something went wrong!
        </h2>
        <p className="max-w-md text-sm text-muted-foreground">
          {error.message || 'An unexpected error occurred. Please try again.'}
        </p>
        <Button
          onClick={reset}
          className="bg-axiom-green text-axiom-dark hover:bg-axiom-green/90"
        >
          Try again
        </Button>
      </div>
    </div>
  );
}
