"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function TermsOfServiceDialog() {
  return (
    <div className="text-center text-sm text-muted-foreground mt-4">
      By signing in, you agree to our{" "}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="link" className="p-0 h-auto text-sm underline">
            Terms of Service
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Terms of Service</DialogTitle>
            <DialogDescription>
              Please read these terms carefully before using mtgtracker.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-8 py-4 text-sm">
            <div className="space-y-2">
              <h3 className="font-medium">1. Acceptance of Terms</h3>
              <p className="text-muted-foreground font-light">
                By accessing and using mtgtracker, you acknowledge that you have
                read, understood, and agree to be bound by these Terms of
                Service.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">2. Description of Service</h3>
              <p className="text-muted-foreground font-light">
                i don't know man. just don't try to break anything and i'll try
                not to leak your data.
                <br />
                also you should probably play more lands.
              </p>
            </div>
          </div>
          <DialogFooter>
            <DialogTrigger asChild>
              <Button variant="outline">Close</Button>
            </DialogTrigger>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
