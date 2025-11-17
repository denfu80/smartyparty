export function Footer() {
  return (
    <footer className="border-t mt-auto">
      <div className="container mx-auto py-8 px-4 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Sternenhaus. Alle Rechte vorbehalten.</p>
      </div>
    </footer>
  );
}
