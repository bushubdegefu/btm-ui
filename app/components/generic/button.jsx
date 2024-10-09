import { Button } from "@/components/ui/button";

export function NormalButton({ label, handleClick }) {
  return (
    <Button
      onClick={handleClick ? handleClick : null}
      aria-label={label}
      type="button"
    >
      {label}
    </Button>
  );
}

export function TabNormalButton({ label, handleClick, token, index }) {
  return (
    <Button
      onClick={handleClick ? handleClick : null}
      aria-label={label}
      type="button"
    >
      {label}
    </Button>
  );
}
